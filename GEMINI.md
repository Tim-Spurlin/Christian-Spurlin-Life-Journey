# ChristianKota.com — Antigravity / Gemini CLI brief

You are in the **live** website repo. Edits here auto-publish. Follow this file.

## Workspace (required)

- **Only this folder:** `/home/saphyre-solutions/Projects/christiankota.com`
- **Open in Antigravity:** File → Open Folder → that path (or desktop launcher **Edit ChristianKota.com**). Do **not** clone https://github.com/Tim-Spurlin/Christian-Spurlin-Life-Journey into `~/antigravity/` — that is a second copy and will not publish.
- **GitHub (AI Studio push):** `origin` is `https://github.com/Tim-Spurlin/Christian-Spurlin-Life-Journey.git`. Histories are unrelated; this folder is the live source of truth.
- **Live URLs:** https://christiankota-com.web.app/ and https://christiankota-4bnzk2lg4a-uc.a.run.app
- **Project owner (personal Gmail):** `christianspurlin2725@gmail.com` — ADC still works; `gcloud auth login` for this user is expired/revoked
- **Deploy account (workspace admin):** `tim.spurlin@saphyresolutions.com` — granted Editor + Cloud Run Admin on `gen-lang-client-0321760041`
- **GCP:** project `gen-lang-client-0321760041` (Cloud Run), billing/everything project in Antigravity is `translation-0-503319` (different project)
- **Do not** use `gcloud config set account christianspurlin2725@gmail.com` until that login is refreshed; site-sync must pass `--account=tim.spurlin@saphyresolutions.com`
- **Do not** work in `~/antigravity/ChristianKota.com-|…` or any other export copy. That folder is not watched.

## How publish already works (do not replace it)

A user service `site-sync-daemon` is always on.

1. You save files **in this directory**.
2. After **90 seconds** with no further writes, site-sync runs  
   `gcloud run deploy christiankota --source=/home/saphyre-solutions/Projects/christiankota.com --project=gen-lang-client-0321760041 --region=us-central1 --allow-unauthenticated`
3. Firebase Hosting `christiankota-com` **proxies everything to that Cloud Run service**. Updating Cloud Run updates the web.app URL.
4. AI Studio **zip** drops in `~/Downloads` or `~/Desktop` are imported into **this** folder, then published the same way.

If auto-publish is paused, `~/.local/state/site-sync/PAUSE` exists. Resume via the desktop item **Resume Website Auto-Publish**, or delete that file.

## What you SHOULD do

- Edit the site in this repo (React/Vite). Keep changes scoped.
- Save files here and **wait ~90s**. That is the publish trigger. You do not need to run deploy.
- If the user asks “did it go live?”, check `systemctl --user status site-sync-daemon.service` and `~/.local/state/site-sync/daemon.log`.
- If they imported from AI Studio, tell them: zip in Downloads **or** edit this folder — not “Open in Antigravity” (that creates a second copy).
- Use `gcloud` as `tim.spurlin@saphyresolutions.com` for Cloud Run publish (personal Gmail user creds are revoked).

## What you MUST NOT do

- Do **not** run `firebase deploy` unless Firebase CLI is logged in as `christianspurlin2725@gmail.com`. It is often still `tim.spurlin@saphyresolutions.com` and will 403.
- Do **not** remove the Cloud Run rewrite in `firebase.json`. Hosting is a proxy on purpose.
- Do **not** `gcloud run deploy` yourself unless site-sync is paused or the user explicitly wants a manual retry. Two deploys at once fight and time out.
- Do **not** change NetworkManager, Wi-Fi (HECTOR / HECTOR-ALFA), Ethernet, or firewall.
- Do **not** open or “fix” `~/antigravity/…` as if it were production.
- Do **not** treat Gemini skill-conflict warnings as site bugs. They are unrelated.
- Do **not** `gcloud config set account christianspurlin2725@gmail.com` for deploys while that token is revoked. Workspace admin is the working CLI identity.

## If deploy fails with storage.googleapis.com ReadTimeout

That is a **slow upload**, not a wrong folder. The live site usually stays on the last good revision. Do not rewrite architecture. Tell the user to wait for a stable network or retry **one** `gcloud run deploy` after confirming no other `gcloud.py run deploy christiankota` is running.

## Quick check you are in the right place

```bash
pwd   # must be /home/saphyre-solutions/Projects/christiankota.com
```
