# Buku Kotak: versi demo (tanpa server dan database)

Versi ini hanya berisi file statis (HTML, CSS, JavaScript), jadi bisa di-hosting gratis di Vercel, Netlify, GitHub Pages, atau hosting biasa. Data contoh tersimpan di browser setiap pengunjung.

## Isi folder

- `index.html`: halaman depan untuk memilih peran (Admin, Guru, Siswa).
- `app.html`: aplikasi Buku Kotak.
- `js/demo-adapter.js`: pengganti server dan database (data contoh, login tiruan).
- `vercel.json`: pengaturan opsional untuk Vercel.

## Cara hosting

**Netlify (paling cepat, tanpa akun GitHub):** buka https://app.netlify.com/drop, lalu seret folder `buku-kotak-demo` ke halaman itu. Tautan langsung jadi.

**Vercel lewat GitHub:** unggah isi folder ini (bukan foldernya) ke root repository GitHub, lalu import repository itu di Vercel. Pada *Framework Preset* pilih **Other**, kosongkan *Build Command* dan *Output Directory*, lalu tekan **Deploy**.

**Vercel lewat terminal:** di dalam folder ini jalankan `npx vercel --prod`.

**Mencoba di laptop:** klik dua kali `index.html`, atau jalankan `npx serve` di folder ini.

## Catatan

- Data kembali ke kondisi awal setiap 24 jam, atau saat menekan **Reset** di pojok kiri bawah.
- Unggah file dan tutor AI yang sesungguhnya hanya ada di versi lengkap (folder `buku-kotak-server`).
