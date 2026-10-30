# Puteri Photo Studio - GitHub first commit and Vercel build

## Upload these files to the ROOT of the empty GitHub repository

- `Puteri-Photo-Studio-GitHub-Upload-v1.3.0.zip`
- `package.json`
- `build.js`
- `vercel.json`
- `README-GITHUB-VERCEL.md` (optional documentation)

Do not upload the outer ZIP that contains these five files. Extract it first, then upload the files listed above to the repository root.

## Vercel settings

Vercel reads `vercel.json` automatically:
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Required Vercel environment variables before deploying

- `SUPABASE_URL` - the real project URL, for example `https://<project-ref>.supabase.co`
- `SUPABASE_ANON_KEY` - the public anon/publishable key
- `VAPID_PUBLIC_KEY` - public VAPID key (required to enable web push after push setup; can be added later)

The build intentionally fails if `SUPABASE_URL` or `SUPABASE_ANON_KEY` is missing. This prevents publishing the app in demo mode with bookings stored only on one device.

Never add Supabase service-role keys, Fiuu Secret Key, Fiuu Verify Key, or VAPID private keys to GitHub or browser configuration. Store server-side secrets in Supabase Edge Function secrets.

## Important

The ZIP archive retains the complete project source, including Supabase SQL and Edge Functions. The build script publishes only the public PWA files to Vercel and does not copy the `supabase/` folder into the public website output.

The Supabase database schema/migrations and Edge Functions still need to be applied/deployed separately before real bookings, payment, and push notifications can be used.
