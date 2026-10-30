# Puteri Suhaimi Photo Studio - GitHub and Vercel deployment (v1.6.0)

## Upload these five files to the ROOT of the existing GitHub repository

- `Puteri-Photo-Studio-GitHub-Upload-v1.6.0.zip`
- `package.json`
- `build.js`
- `vercel.json`
- `README-GITHUB-VERCEL.md`

Extract the outer repository bundle first. Upload the five files above to the root of the existing GitHub repository. Replace the existing `package.json`, `build.js`, `vercel.json`, and README when GitHub asks. Keep the previous source ZIP until the new deployment is verified.

## Vercel build settings

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Required Vercel Production environment variables (already set for the existing project):
- `SUPABASE_URL` - the project's HTTPS URL.
- `SUPABASE_ANON_KEY` - the public Supabase anon/publishable key.

Optional:
- `VAPID_PUBLIC_KEY` - public VAPID key for admin push notifications.

The build injects Supabase browser configuration from Vercel environment variables. Never put a Supabase service-role key, Fiuu secret/verify key, or VAPID private key in GitHub or browser code.

## Official normal operating hours

- Morning: 09:00-12:00.
- Midday break: 12:00-14:00.
- Afternoon: 14:00-18:00.
- Evening break: 18:00-20:00.
- Night: 20:00-00:00.
- Time zone: `Asia/Kuala_Lumpur`.

When Ramadan start/end dates are configured in Admin -> Tetapan, the existing special Ramadan schedule remains 09:00-12:30 and 14:00-18:00.

## Booking hold duration - REQUIRED DATABASE UPDATE

Unpaid bookings are now held for **10 minutes** only. The customer countdown, demo mode and database `public.create_booking` RPC are aligned to this duration. When the 10-minute hold expires without payment/receipt submission, the booking hold is released by the existing expiry mechanism. A submitted manual-transfer receipt moves the booking to pending verification and is no longer treated as an unpaid hold.

For the existing live Supabase project, run `20261030_booking_hold_10_minutes.sql` once in the Supabase SQL Editor after the v1.5.0 operating-hours migration. This migration replaces `public.create_booking` and preserves the existing normal/Ramadan hours validation, package duration, price and overlap protection. It does not delete existing bookings or package rows. The SQL file is included in the inner source ZIP at `supabase/migrations/20261030_booking_hold_10_minutes.sql` and is also supplied separately.

Do not rerun the earlier v1.5.0 operating-hours migration after applying the 10-minute migration unless using the updated copy inside this v1.6.0 source package; the current v1.6.0 copy also uses a 10-minute hold.

## Existing package catalogue

The existing Supabase package rows are retained: PUTERI RM140/15 min, MARYAM RM170/30 min and PREMIUM RM330/60 min. Do not rerun the package migration unnecessarily.

## Important

The inner source ZIP contains the full PWA source, Supabase SQL and Edge Functions. The build wrapper publishes only the public PWA assets to Vercel `dist/`. Fiuu merchant credentials, payment callback registration, VAPID private keys and end-to-end payment tests remain separate launch requirements. The `create-fiuu-payment` Edge Function source has an updated 10-minute expiry message; if that function is already deployed, redeploy that function from the updated source separately.
