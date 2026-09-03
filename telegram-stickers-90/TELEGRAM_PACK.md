# Telegram sticker-pack automation

This repository can create the 90-sticker Telegram pack through GitHub Actions.

## One-time setup

1. Create a bot in Telegram with `@BotFather` and give it a username.
2. Send `/start` to that bot once from the Telegram account that should own the sticker pack. The workflow detects your numeric Telegram user ID automatically from this private `/start` message.
3. In this GitHub repository open **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `TELEGRAM_BOT_TOKEN` — token issued by BotFather.
4. Download the improved archive `telegram-stickers-90-v2.zip` from the ChatGPT task and upload it to this directory with the exact path:
   `telegram-stickers-90/telegram-stickers-90-v2.zip`.
5. Never commit the bot token as an ordinary file.

Optional: `TELEGRAM_USER_ID` is still supported as an Actions secret if you ever need to explicitly override the automatically detected owner.

## Create the pack

Open **Actions → Create Telegram sticker pack → Run workflow**.

Inputs:

- `pack_title` — visible title, default `Bunnies 90`.
- `pack_slug` — base part of the short link, default `bunnies_90`. The required `_by_<bot_username>` suffix is added automatically.
- `emoji` — emoji attached to every sticker, default `🐰`.

The workflow validates all 90 improved WebP files, creates the pack, uploads the stickers, and writes the final `https://t.me/addstickers/...` link into the workflow summary.

The job is resumable: if creation stops after some stickers are uploaded, rerun the workflow with the same slug and it continues from the current sticker count.
