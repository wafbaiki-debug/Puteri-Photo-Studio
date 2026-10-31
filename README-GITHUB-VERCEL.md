# Puteri Photo Studio v1.7.7 — Perlindungan Slot Penuh & Sambung Masa

**Berdasarkan v1.7.6. Jangan buat database atau projek baharu.**

## Perubahan

1. Apabila pelanggan menempah PREMIUM (60 minit) bermula 9:00 pagi, seluruh masa 9:00–10:00 pagi dikunci oleh database. Masa mula 9:15, 9:30 dan 9:45 dipaparkan `PENUH` (disabled); slot 10:00 tersedia jika tiada tempahan lain. MARYAM (30 minit) dan PUTERI (15 minit) juga mengunci tempoh sebenar.
2. Paparan slot pelanggan kini menunjukkan julat mula–tamat (`09:00 – 10:00`), dan menyegarkan semakan apabila pelanggan kembali ke tab/aplikasi.
3. Pelanggan yang sudah membuat tempahan dan telah menghantar resit boleh cari kod tempahan, tekan **Mohon tambah masa (WhatsApp admin)** dan pilih tambahan 15/30/45/60 minit. Ini sekadar permintaan, **tidak** mengunci slot atau menukar tempahan.
4. Pada Dashboard Admin, selepas bayaran asal disahkan, tekan **+ Tambah masa**. Admin masukkan tambahan minit dan jumlah **bayaran tambahan yang benar-benar diterima** (boleh RM0 jika percuma). Supabase menyemak masa tambahan, waktu operasi dan pertindihan secara atomik. Jika masa sudah ditempah, operasi gagal tanpa mengubah rekod.
5. Kod tempahan asal, rekod resit dan status bayaran dikekalkan. Rekod perubahan dicatat dalam jadual `booking_extensions`.
6. Masa 10 minit hanya untuk *unpaid hold*; tempahan `pending_verification` dan `confirmed` terus menghalang tempahan bertindih seperti biasa.

## LANGKAH 1 — Supabase (wajib dahulu)

Supabase Dashboard > SQL Editor. **Gantikan query lama** dengan keseluruhan kandungan fail berikut, kemudian tekan RUN sekali:

`20261031_full_slot_lock_and_extension_v1_7_7.sql`

Jika berjaya: `Success. No rows returned` (hasil SELECT dalaman boleh dipaparkan). Jangan jalankan `schema.sql` atau migration lama lagi. Jika ralat, berhenti dan tangkap screenshot. Jadual dan tempahan sedia ada tidak dipadam.

Selepas itu, dalam SQL Editor, jalankan **fail bacaan sahaja** `verify-booking-windows-v1.7.7.sql`. Ia mencari tempahan lama dengan tempoh tidak konsisten. Jika ada `CHECK PACKAGE DURATION` atau `CHECK INTERVAL`, jangan ubah data secara rambang; semak tempahan tersebut satu demi satu dengan admin untuk elakkan pelanggan bertindih.

## LANGKAH 2 — GitHub

Buka pautan terus dalam Chrome / Desktop site:
https://github.com/wafbaiki-debug/Puteri-Photo-Studio/upload/main

Daripada ZIP luar, upload/replace **empat fail** di root branch `main`:

- `build.js`
- `package.json`
- `Puteri-Photo-Studio-GitHub-Upload-v1.7.7.zip` (jangan extract ZIP dalaman)
- `README-GITHUB-VERCEL.md`

Fail `.vercelignore`, `.gitignore` dan `vercel.json` asal tidak perlu diubah.

**Commit message untuk salin:**
`Release v1.7.7 - Full Slot Lock and Time Extension`

## LANGKAH 3 — Vercel

Gunakan projek sedia ada `puteri-photo-studio`, branch `main`. Build Command `npm run build`; Output `dist`. Pastikan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` Production masih ada. Tunggu `Ready` dan buka https://puteri-photo-studio.vercel.app .

Jika masih memaparkan versi lama: refresh; di Android PWA tutup dan buka semula, atau clear site cache kerana Service Worker versi baharu mempunyai cache `puteri-photo-studio-shell-v1-7-7`.

## LANGKAH 4 — Ujian sebelum pelanggan sebenar

- Ujian A: 60 minit 9:00–10:00, selepas resit diterima status pending_verification, semak pakej lain: 9:15,9:30,9:45 = PENUH. 10:00 = tersedia jika kosong.
- Ujian B: 15 minit 9:00–9:15, status confirmed, admin tambah 15 minit jika 9:15–9:30 kosong. Booking sama berubah ke 9:00–9:30.
- Ujian C: Pelanggan lain memegang 9:15–9:30. Admin cuba tambah 15 minit pada tempahan 9:00–9:15 — **mesti gagal** tanpa perubahan. Jika hold lain sudah tamat selepas 10 minit, sistem akan keluarkannya terlebih dahulu.
- Ujian D: Resit pending selepas 10 minit tidak boleh luput automatik; 10 minit hanya untuk tempahan tanpa resit.
- Ujian E: Sebarang bayaran tambahan mesti diperiksa melalui Maybank sebelum admin memasukkannya dan mengesahkan sambungan.

**Nota operasi**: Pelanggan hanya *memohon* masa tambahan; WhatsApp tidak menjamin ketersediaan. Jangan buat ujian menggunakan bayaran sebenar atau sesi pelanggan sebenar sebelum pengesahan.
