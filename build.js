const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const root = __dirname;
const archivePath = path.join(root, 'Puteri-Photo-Studio-GitHub-Upload-v1.7.7.zip');
const outputDir = path.join(root, 'dist');

const supabaseUrl = (process.env.SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.SUPABASE_ANON_KEY || '').trim();
const pushVapidPublicKey = (process.env.VAPID_PUBLIC_KEY || '').trim();

if (!supabaseUrl || !/^https:\/\/[a-zA-Z0-9-]+\.supabase\.co$/.test(supabaseUrl)) {
  console.error('BUILD STOPPED: Set SUPABASE_URL in Vercel Environment Variables to the real HTTPS Supabase project URL.');
  process.exit(1);
}
if (!supabaseAnonKey) {
  console.error('BUILD STOPPED: Set SUPABASE_ANON_KEY in Vercel Environment Variables to the public anon/publishable key.');
  process.exit(1);
}
if (!fs.existsSync(archivePath)) {
  console.error('BUILD STOPPED: The v1.7.7 source ZIP is missing from the GitHub repository root.');
  process.exit(1);
}

const allowed = new Set([
  'index.html', 'manifest.webmanifest', 'sw.js', 'icon.svg',
  'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'logo-puteri-suhaimi.png', 'robots.txt'
]);

function writeEntry(entry, destination) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destination);
    entry.stream().pipe(output);
    output.on('finish', resolve);
    output.on('error', reject);
  });
}

async function main() {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const archive = await unzipper.Open.file(archivePath);
  const extracted = new Set();
  for (const entry of archive.files) {
    const name = entry.path.replace(/\\/g, '/');
    if (entry.type !== 'File' || !allowed.has(name)) continue;
    const destination = path.join(outputDir, name);
    await writeEntry(entry, destination);
    extracted.add(name);
  }

  for (const required of ['index.html', 'manifest.webmanifest', 'sw.js']) {
    if (!extracted.has(required)) throw new Error(`Required app file missing from source ZIP: ${required}`);
  }

  const browserConfig = { supabaseUrl, supabaseAnonKey, pushVapidPublicKey, demoMode: false };
  fs.writeFileSync(
    path.join(outputDir, 'config.js'),
    `// Generated during Vercel build. Public anon key only; never place server secrets here.\nwindow.STUDIO_CONFIG = ${JSON.stringify(browserConfig, null, 2)};\n`,
    'utf8'
  );
  console.log(`Build v1.7.7 complete. Published ${extracted.size + 1} web assets to dist/.`);
  console.log('Supabase URL and public anon key were injected from Vercel environment variables.');
  console.log('Checkout: manual Maybank only. Expired bookings can submit a late receipt only if the future slot is still free; accepted receipts keep the slot blocked until admin verification. Admin push is sent when a receipt is accepted.');
  console.log('Cancellation policy remains visible at booking, payment and receipt stages. Booking time windows are locked for full selected durations; admin can extend paid bookings after validating free time and any extra bank payment.');
}

main().catch((error) => {
  console.error('BUILD FAILED:', error.message || error);
  process.exit(1);
});
