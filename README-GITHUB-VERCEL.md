# Puteri Suhaimi Photo Studio v1.7.2 - GitHub / Vercel

1. Upload the five files in this repository bundle to the root of the existing GitHub repository and replace matching files.
2. Keep the GitHub branch as `main`.
3. Vercel builds the app from `Puteri-Photo-Studio-GitHub-Upload-v1.7.2.zip` using `build.js`.
4. Required Vercel Production environment variables: `SUPABASE_URL` and `SUPABASE_ANON_KEY`. `VAPID_PUBLIC_KEY` is optional for push notifications.
5. After deployment, run `20261031_ios_receipt_heic_10mb.sql` once in Supabase SQL Editor to enable iPhone HEIC/HEIF receipt uploads up to 10 MB.
6. In Supabase Authentication > URL Configuration, add `https://puteri-photo-studio-dbdd.vercel.app/**` to Redirect URLs for admin password recovery.

Do not put Supabase service-role keys, Supabase secret keys, or Fiuu private credentials in GitHub or browser files. Fiuu is not used in this manual-payment version.
