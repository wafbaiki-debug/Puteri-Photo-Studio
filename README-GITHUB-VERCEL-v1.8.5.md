# Puteri Photo Studio v1.8.5 — Frontend deployment bundle

This bundle publishes the v1.8.5 web frontend to the existing Vercel project. It includes the customer-side “Makluman status tempahan / Aktifkan notifikasi” panel in the payment step and the Admin device-owner management UI.

## GitHub upload
Upload/replace these four files at the repository root on the production branch connected to the existing Vercel project:
- `build.js`
- `package.json`
- `Puteri-Photo-Studio-GitHub-Upload-v1.8.5.zip`
- `README-GITHUB-VERCEL-v1.8.5.md`

Commit message: `Release v1.8.5 - Customer Push UI and Device Management`

## Vercel settings
Keep the existing project. Build command: `npm run build`. Output directory: `dist`.

Required Production environment variables:
- `SUPABASE_URL` — existing project URL
- `SUPABASE_ANON_KEY` or `SUPABASE_PUBLISHABLE_KEY` — public browser key only
- `VAPID_PUBLIC_KEY` or `PUSH_VAPID_PUBLIC_KEY` — VAPID public key (87-character public key in this project)

Never add `SUPABASE_SERVICE_ROLE_KEY`, `PUSH_VAPID_PRIVATE_KEY`, `PUSH_WEBHOOK_SECRET`, or `PUSH_CRON_SECRET` to frontend build values or this repository. Keep those in Supabase Edge Function Secrets only.

## After deployment
1. Wait for Vercel Production deployment to show Ready.
2. Open the production URL in a fresh browser tab and refresh. If installed as PWA, close and reopen it; the Service Worker cache name is bumped to v1.8.5.
3. Open a test booking payment panel. The customer push opt-in panel should appear below the payment heading/timer and above the bank account card.
4. Test customer opt-in on each separate device/browser profile. The browser notification permission belongs to the device/browser, not the phone number.

This frontend deployment does not itself configure Supabase Database Webhooks or prove end-to-end push delivery. Test automatic events separately after deployment.
