# Puteri Suhaimi Photo Studio - GitHub + Vercel Deployment (v1.7.0)

This repository deploys the customer/admin PWA from the versioned source archive. Checkout is manual Maybank transfer only.

## Upload these files to the repository root

- `Puteri-Photo-Studio-GitHub-Upload-v1.7.0.zip`
- `package.json`
- `build.js`
- `vercel.json`
- `README-GITHUB-VERCEL.md`

Commit the files directly to branch `main`. Vercel should detect the new commit and run the build.

## Vercel Project Environment Variables

Keep the existing values already configured in the Vercel project:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (public anon/publishable key)
- `VAPID_PUBLIC_KEY` (optional; admin push notifications only)

Do not overwrite these values with placeholders. Do not put the Supabase service-role key, database password, VAPID private key or Fiuu secrets in the repository.

## Deployment check

Open Vercel > Deployments. The newest deployment must show `Ready`. Then open the Production domain and test a customer booking and manual receipt upload.

## Android and iOS installation

- Android: Chrome > three-dot menu > Install app / Add to Home screen.
- iPhone/iPad: Safari > Share > Add to Home Screen.

This is an installable PWA, not a native Play Store/App Store package. Booking and receipt uploads require internet access.
