# Puteri Suhaimi Photo Studio – GitHub and Vercel deployment (v1.4.0)

## Upload these files to the ROOT of the GitHub repository

- `Puteri-Photo-Studio-GitHub-Upload-v1.4.0.zip`
- `package.json`
- `build.js`
- `vercel.json`
- `README-GITHUB-VERCEL.md`

Extract the outer repository bundle first. Upload the five files above to the root of the existing GitHub repository. Do not upload the outer bundle itself.

## Vercel build settings

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Required Vercel Production environment variables:
- `SUPABASE_URL` – the project's HTTPS URL.
- `SUPABASE_ANON_KEY` – the public Supabase anon/publishable key.

Optional:
- `VAPID_PUBLIC_KEY` – public VAPID key for admin push notifications.

The build injects Supabase browser configuration from Vercel environment variables. Never put a Supabase service-role key, Fiuu secret/verify key, or VAPID private key in GitHub or browser code.

## Database migration

The current project already has the v1.3.0 schema and the owner has confirmed the PUTERI, MARYAM and PREMIUM rows in `public.packages`. The source ZIP now also includes `supabase/migrations/20261030_puteri_raya_packages.sql` for reproducible setup. Do not rerun it unnecessarily; it adjusts the package and booking duration constraints to allow 60 minutes and seeds/updates the three packages.

## Important

The inner source ZIP contains the full PWA source, Supabase SQL and Edge Functions. The build wrapper publishes only the public PWA assets to Vercel `dist/`. Fiuu merchant credentials, payment callback registration, VAPID private keys and end-to-end payment tests remain separate launch requirements.
