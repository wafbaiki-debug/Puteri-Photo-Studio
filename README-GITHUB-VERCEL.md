# Puteri Suhaimi Photo Studio - GitHub and Vercel deployment (v1.5.0)

## Upload these five files to the ROOT of the existing GitHub repository

- `Puteri-Photo-Studio-GitHub-Upload-v1.5.0.zip`
- `package.json`
- `build.js`
- `vercel.json`
- `README-GITHUB-VERCEL.md`

Extract the outer repository bundle first. Upload the five files above to the root of the existing GitHub repository. Replace the existing `package.json`, `build.js`, `vercel.json`, and README when GitHub asks. Keep the older v1.4.0 source ZIP until the new deployment is verified.

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

## Supabase database migration - REQUIRED

After the new frontend deploys, run `20261030_operating_hours_update.sql` once in the existing Supabase SQL Editor. It replaces the server-side `create_booking` validation so bookings are accepted only inside the same normal operating segments as the website. The SQL file is included inside the inner source ZIP at `supabase/migrations/20261030_operating_hours_update.sql` and is also provided separately for easy use.

Do not rerun the package migration unnecessarily; the owner has already confirmed PUTERI RM140/15 min, MARYAM RM170/30 min and PREMIUM RM330/60 min in `public.packages`.

## Important

The inner source ZIP contains the full PWA source, Supabase SQL and Edge Functions. The build wrapper publishes only the public PWA assets to Vercel `dist/`. Fiuu merchant credentials, payment callback registration, VAPID private keys and end-to-end payment tests remain separate launch requirements.
