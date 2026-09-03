#!/usr/bin/env python3
"""Create or resume a Telegram sticker set from the repository archive."""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys
import tempfile
import time
import zipfile
from pathlib import Path

import requests
from PIL import Image, ImageEnhance, ImageFilter


TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
OWNER_ID_RAW = os.environ.get("TELEGRAM_USER_ID", "").strip()


class TelegramError(RuntimeError):
    pass


def _request(method: str, data: dict | None = None, file_path: Path | None = None) -> dict:
    if not TOKEN:
        raise TelegramError("TELEGRAM_BOT_TOKEN is empty")

    url = f"https://api.telegram.org/bot{TOKEN}/{method}"
    attempts = 8

    for attempt in range(attempts):
        files = None
        fh = None
        try:
            if file_path is not None:
                fh = file_path.open("rb")
                files = {
                    "sticker_file": (
                        file_path.name,
                        fh,
                        "image/webp",
                    )
                }
            response = requests.post(url, data=data or {}, files=files, timeout=180)
        finally:
            if fh is not None:
                fh.close()

        try:
            payload = response.json()
        except Exception as exc:  # pragma: no cover - defensive
            raise TelegramError(
                f"Telegram {method} returned HTTP {response.status_code} with non-JSON response"
            ) from exc

        if payload.get("ok"):
            return payload["result"]

        error_code = payload.get("error_code")
        description = payload.get("description", "Unknown Telegram API error")
        retry_after = (payload.get("parameters") or {}).get("retry_after")

        if error_code == 429 and retry_after is not None and attempt + 1 < attempts:
            wait = max(float(retry_after), 1.0) + 0.5
            print(f"Telegram rate limit reached; retrying in {wait:.1f}s", flush=True)
            time.sleep(wait)
            continue

        raise TelegramError(f"Telegram {method} failed ({error_code}): {description}")

    raise TelegramError(f"Telegram {method} failed after retries")


def _get_sticker_set(name: str) -> dict | None:
    try:
        return _request("getStickerSet", {"name": name})
    except TelegramError as exc:
        text = str(exc)
        if "STICKERSET_INVALID" in text or "sticker set name is invalid" in text.lower():
            return None
        raise


def _normalize_pack_name(slug: str, bot_username: str) -> str:
    slug = slug.strip().lower()
    slug = re.sub(r"[^a-z0-9_]+", "_", slug)
    slug = re.sub(r"_+", "_", slug).strip("_")
    if not slug:
        slug = "stickers"
    if not slug[0].isalpha():
        slug = f"pack_{slug}"

    suffix = f"_by_{bot_username}"
    max_base = 64 - len(suffix)
    if max_base < 1:
        raise TelegramError("Bot username is too long to build a valid sticker-set name")

    slug = slug[:max_base].rstrip("_")
    if not slug:
        slug = "s"[:max_base]
    return f"{slug}{suffix}"


def _sticker_number(path: Path) -> int:
    match = re.search(r"(\d+)$", path.stem)
    return int(match.group(1)) if match else 10**9


def _extract_archive(archive: Path, destination: Path) -> list[Path]:
    if not archive.exists():
        raise FileNotFoundError(f"Archive not found: {archive}")

    with zipfile.ZipFile(archive) as zf:
        zf.extractall(destination)

    stickers = sorted(destination.rglob("sticker_*.webp"), key=_sticker_number)
    if len(stickers) != 90:
        raise TelegramError(f"Expected 90 WebP stickers in archive, found {len(stickers)}")
    return stickers


def _enhance_sticker(source: Path, destination: Path) -> None:
    """Apply the same v2 cleanup used for the improved local archive."""
    img = Image.open(source).convert("RGBA")
    alpha = img.getchannel("A")
    bbox = alpha.getbbox()
    obj = img.crop(bbox) if bbox else img

    red, green, blue, alpha = obj.split()
    rgb = Image.merge("RGB", (red, green, blue))
    rgb = rgb.filter(ImageFilter.MedianFilter(size=3))
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.5, percent=160, threshold=3))
    rgb = ImageEnhance.Contrast(rgb).enhance(1.02)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.08)
    obj = Image.merge("RGBA", (*rgb.split(), alpha))

    max_side = max(obj.size)
    target = 400
    scale = min(target / max_side, 1.0) if max_side else 1.0
    new_size = (
        max(1, round(obj.width * scale)),
        max(1, round(obj.height * scale)),
    )
    obj = obj.resize(new_size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    position = ((512 - obj.width) // 2, (512 - obj.height) // 2)
    canvas.alpha_composite(obj, position)
    canvas.save(destination, format="WEBP", lossless=True, method=4)


def _prepare_stickers(source_files: list[Path], destination: Path) -> list[Path]:
    destination.mkdir(parents=True, exist_ok=True)
    result: list[Path] = []

    for index, source in enumerate(source_files, start=1):
        output = destination / f"sticker_{index:03d}.webp"
        _enhance_sticker(source, output)

        with Image.open(output) as img:
            if img.size != (512, 512):
                raise TelegramError(f"Invalid canvas for {output.name}: {img.size}")
        if output.stat().st_size > 512 * 1024:
            raise TelegramError(f"Sticker exceeds 512 KiB: {output.name}")
        result.append(output)

    return result


def _input_sticker(emoji: str) -> str:
    return json.dumps(
        {
            "sticker": "attach://sticker_file",
            "format": "static",
            "emoji_list": [emoji],
        },
        ensure_ascii=False,
    )


def _create_set(owner_id: int, name: str, title: str, sticker: Path, emoji: str) -> None:
    data = {
        "user_id": str(owner_id),
        "name": name,
        "title": title,
        "stickers": json.dumps(
            [
                {
                    "sticker": "attach://sticker_file",
                    "format": "static",
                    "emoji_list": [emoji],
                }
            ],
            ensure_ascii=False,
        ),
        "sticker_type": "regular",
    }
    _request("createNewStickerSet", data, sticker)


def _add_sticker(owner_id: int, name: str, sticker: Path, emoji: str) -> None:
    data = {
        "user_id": str(owner_id),
        "name": name,
        "sticker": _input_sticker(emoji),
    }
    _request("addStickerToSet", data, sticker)


def _write_github_output(pack_name: str, pack_url: str) -> None:
    output_path = os.environ.get("GITHUB_OUTPUT")
    if output_path:
        with open(output_path, "a", encoding="utf-8") as fh:
            fh.write(f"pack_name={pack_name}\n")
            fh.write(f"pack_url={pack_url}\n")

    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as fh:
            fh.write("## Telegram sticker pack\n\n")
            fh.write(f"Created/resumed **{pack_name}** with 90 stickers.\n\n")
            fh.write(f"[Open sticker pack]({pack_url})\n")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", required=True, type=Path)
    parser.add_argument("--title", required=True)
    parser.add_argument("--slug", required=True)
    parser.add_argument("--emoji", default="🐰")
    args = parser.parse_args()

    if not TOKEN:
        raise TelegramError("Missing TELEGRAM_BOT_TOKEN GitHub Actions secret")
    if not OWNER_ID_RAW:
        raise TelegramError("Missing TELEGRAM_USER_ID GitHub Actions secret")

    try:
        owner_id = int(OWNER_ID_RAW)
    except ValueError as exc:
        raise TelegramError("TELEGRAM_USER_ID must be a numeric Telegram user ID") from exc

    title = args.title.strip()
    if not 1 <= len(title) <= 64:
        raise TelegramError("Sticker-set title must be 1-64 characters")

    me = _request("getMe")
    bot_username = str(me.get("username") or "").strip()
    if not bot_username:
        raise TelegramError("Bot has no username")

    pack_name = _normalize_pack_name(args.slug, bot_username)
    pack_url = f"https://t.me/addstickers/{pack_name}"

    print(f"Preparing 90 stickers for pack: {pack_name}")
    with tempfile.TemporaryDirectory(prefix="telegram-stickers-") as tmp:
        tmp_path = Path(tmp)
        extracted = _extract_archive(args.archive, tmp_path / "source")
        prepared = _prepare_stickers(extracted, tmp_path / "prepared")

        current = _get_sticker_set(pack_name)
        if current is None:
            print("Creating sticker set with sticker 1/90", flush=True)
            _create_set(owner_id, pack_name, title, prepared[0], args.emoji)
            start_index = 1
        else:
            existing_count = len(current.get("stickers") or [])
            if existing_count > len(prepared):
                raise TelegramError(
                    f"Existing set has {existing_count} stickers; expected at most {len(prepared)}"
                )
            print(
                f"Sticker set already exists with {existing_count} stickers; resuming from there",
                flush=True,
            )
            start_index = existing_count

        for zero_index in range(start_index, len(prepared)):
            print(f"Uploading sticker {zero_index + 1}/90", flush=True)
            _add_sticker(owner_id, pack_name, prepared[zero_index], args.emoji)
            time.sleep(0.15)

    final_set = _get_sticker_set(pack_name)
    final_count = len((final_set or {}).get("stickers") or [])
    if final_count != 90:
        raise TelegramError(f"Pack creation finished with {final_count} stickers instead of 90")

    _write_github_output(pack_name, pack_url)
    print(f"DONE: {pack_url}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (TelegramError, FileNotFoundError, zipfile.BadZipFile) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
