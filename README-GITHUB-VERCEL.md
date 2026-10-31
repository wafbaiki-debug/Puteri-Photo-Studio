# Puteri Suhaimi Photo Studio v1.7.5 - GitHub / Vercel Update

This is an update for the existing GitHub repository, Vercel project and Supabase database. It does not deploy automatically. Keep the existing Supabase project and production Vercel project.

## 1. Upload these files to the existing GitHub repository

Extract the outer update bundle and upload/replace these files in the repository root on branch `main`:

1. `build.js`
2. `package.json`
3. `vercel.json`
4. `.vercelignore`
5. `.gitignore`
6. `Puteri-Photo-Studio-GitHub-Upload-v1.7.5.zip`
7. `README-GITHUB-VERCEL.md`

The source ZIP contains the customer app, admin dashboard, Supabase SQL schema and migrations, Edge Functions, PWA assets and setup guides. Vercel's `build.js` extracts only the public web assets into `dist/` and injects the public Supabase configuration from Vercel Environment Variables. The standalone v1.7.5 SQL migration is also supplied separately in the outer bundle for easy use in Supabase SQL Editor.

## 2. Update Supabase first - preserve all existing data

Do not run the root `schema.sql` on the live database. Do not recreate the Supabase project.

1. Open the existing Supabase project -> SQL Editor.
2. Run `20261031_late_manual_payment_reactivation_v1_7_5.sql` once. This replaces the receipt-submission, booking-lookup and receipt-storage authorization functions. It does not delete bookings or receipt files. It also creates/updates `lookup_booking_for_payment`, so a separate v1.7.3 lookup migration is not required for this feature.
3. Confirm the query completes successfully. If it reports an error, stop and resolve it before deploying the new app.
4. Keep the existing admin push tables, Edge Functions, webhook and VAPID secrets if they are already working. Do not recreate them unnecessarily.

Optional existing-project migrations (run only if the feature is not already installed):

- `20261031_ios_receipt_heic_10mb.sql` - enables HEIC/HEIF and 10 MB private receipt uploads.
- `20261031_expire_unpaid_holds_cron_v1_7_4.sql` - schedules expiry of unpaid 10-minute holds every minute. Enable `pg_cron` first. The app's availability, create and lookup RPCs also expire old holds.
- `supabase/migrations/20261030_admin_push_notifications.sql` - creates the admin push subscription and notification log tables. Run only if they do not exist.

## 3. Payment rules in v1.7.5

- A new unpaid booking gets an initial 10-minute slot hold. It is not yet a valid booking and does not appear in the confirmed-booking list.
- If the customer uploads a receipt within the initial 10 minutes, the booking becomes `pending_verification`; the timer no longer applies and the slot stays blocked while the admin checks Maybank.
- If no receipt is submitted by expiry, the unpaid hold becomes `expired` and the slot is released.
- If the customer has paid in full but the 10 minutes have already passed, they may search the original booking by code or phone and submit the receipt if the requested future slot is still free. The database rechecks the slot at upload time.
- If another active hold, pending verification or confirmed booking overlaps the requested time, the late receipt is rejected. The system does not create an overlapping booking.
- An accepted late receipt updates the original booking row to `pending_verification`; it does not create a duplicate and does not start another 10-minute timer.
- The admin receives a push notification only after a receipt is accepted. Admin must check the actual Maybank transaction and press **Sahkan bayaran** only after the full package amount has arrived.
- Only admin-confirmed `confirmed` / `completed` bookings appear in the valid-booking list. A receipt image alone is not proof of bank credit.

## 4. Admin push notifications

If push is already configured, keep the existing settings. Otherwise:

1. Set `PUSH_VAPID_PUBLIC_KEY`, `PUSH_VAPID_PRIVATE_KEY`, `PUSH_VAPID_SUBJECT` and `PUSH_WEBHOOK_SECRET` in Supabase Edge Function Secrets.
2. Deploy `manage-admin-push-subscription` and `notify-admin-push` from `supabase/functions`.
3. Configure a Database Webhook for `public.bookings`, event `UPDATE`, URL `https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-admin-push`.
4. Add headers `Content-Type: application/json` and `x-webhook-secret` with the same value as `PUSH_WEBHOOK_SECRET`.
5. On each admin device, log in and press **Aktifkan notifikasi**. Use **Uji notifikasi**.

The push function notifies the admin when a manual Maybank receipt first changes a booking to `pending_verification`. It works for both on-time and eligible late receipts. No push is sent for an unpaid booking hold.

## 5. Vercel build settings

Keep the existing Vercel project connected to the same GitHub repository and `main` branch. Set the project build settings to:

- Framework Preset: `Other`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Keep these Production Environment Variables:

- `SUPABASE_URL` - the existing project's HTTPS URL.
- `SUPABASE_ANON_KEY` - public anon/publishable key only.
- `VAPID_PUBLIC_KEY` - public VAPID key for the admin PWA.

Never put the service-role key, database password, VAPID private key or `PUSH_WEBHOOK_SECRET` in GitHub, browser files or Vercel public assets.

After committing the uploaded files to `main`, wait for the newest Vercel deployment to show `Ready`.

## 6. Acceptance tests before real bookings

1. Create a test booking. Confirm it is a 10-minute unpaid hold only, with no push and no valid-booking list entry.
2. Submit a receipt before 10 minutes. Confirm it moves to the separate admin review queue and sends one push. Wait beyond 10 minutes: the pending slot must remain blocked.
3. Create another test booking and leave it unpaid beyond 10 minutes. Confirm it expires and the slot becomes available.
4. Search that expired booking by code or phone and submit a late receipt while the future slot is still free. Confirm the original row becomes `pending_verification`, the slot is blocked, and the admin receives one push.
5. Attempt a late receipt after another customer has taken the slot with an active hold or confirmed booking. Confirm the upload is rejected and no overlap is created.
6. Admin opens the receipt and checks the actual Maybank account. Confirm only after the full amount is received; then verify the booking becomes `confirmed` and appears in the valid-booking list.
7. Verify cancelling a pending request releases its slot.

Push delivery is best-effort and depends on device/browser permission and connectivity. The Admin Dashboard and actual Maybank transaction remain authoritative.
