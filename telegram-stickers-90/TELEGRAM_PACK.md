# Telegram sticker-pack automation

This directory can create the 90-sticker Telegram pack from GitHub Actions.

## One-time setup

1. Create a bot in Telegram with `@BotFather` and give it a username.
2. Send `/start` to that bot once from the Telegram account that should own the sticker pack.
3. In this GitHub repository open **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `TELEGRAM_BOT_TOKEN` — token issued by BotFather.
   - `TELEGRAM_USER_ID` — numeric Telegram user ID of the pack owner.
4. Never commit either value to the repository.

## Create the pack

Open **Actions → Create Telegram sticker pack → Run workflow**.

Inputs:

- `pack_title` — visible title, default `Bunnies 90`.
- `pack_slug` — base part of the short link, default `bunnies_90`. The required `_by_<bot_username>` suffix is added automatically.
- `emoji` — emoji attached to every sticker, default `🐰`.

The workflow prepares the improved v2-style images on a transparent 512×512 canvas, creates the pack, uploads all 90 stickers, and writes the final `https://t.me/addstickers/...` link into the workflow summary.

The job is resumable: if creation stops after some stickers are uploaded, rerun the workflow with the same slug and it continues from the current sticker count.

## Source

`source-stickers.zip` contains the original 90 prepared WebP files. The Action applies the v2 cleanup before uploading them to Telegram.
