# Class 5.1 Website

Website sederhana, cute, minimalis, dan responsive untuk kelas 5.1 (19 anggota).

**Tema warna:** Baby Blue • Putih • Navy  
**Fitur:** Home, Profil Anggota, Jadwal Piket, Jadwal Pelajaran, Memories, Birthday Corner, Guestbook, Mood Tracker, Live Clock, Countdown, Random Quote, Background Music.

## Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misal: `class-5-1`).
2. Upload semua file di folder ini ke root repository (atau folder `docs` jika mau).
3. Pastikan struktur:
   ```
   ├── index.html
   ├── style.css
   ├── script.js
   ├── data.json
   ├── README.md
   └── assets/
       └── kita.mp3   ← (tambahkan sendiri)
   ```
4. Di repository Settings → Pages → Source: Deploy from branch `main` (root).
5. Tunggu beberapa menit, website akan live di `https://username.github.io/class-5-1/`.

## Musik Latar ("Kita" — Sheila On 7)

- Lagu **tidak** autoplay saat dibuka (sesuai kebijakan browser).
- Ada overlay "ENTER CLASS 5.1 🎵" yang harus diklik dulu.
- Setelah itu musik bisa di-play / pause / mute lewat kontrol di kanan bawah.
- Musik loop dan tetap berjalan saat pindah section.

**Penting – Hak Cipta:**
Kamu harus menyediakan file audio sendiri secara legal.
1. Beli / stream resmi lagu "Kita" Sheila On 7 (Spotify, Apple Music, dll).
2. Atau download dari sumber resmi yang mengizinkan personal use.
3. Simpan sebagai `assets/kita.mp3`.
4. Jangan upload file hasil rip ilegal ke repository publik.

Jika file `kita.mp3` belum ada, player tetap berfungsi tapi tidak ada suara sampai file ditambahkan.

## Favicon & OG Image

- Favicon sudah pakai emoji 🩵 (SVG data URI).
- Untuk OG Image yang lebih bagus:
  - Buat gambar 1200×630 (bisa pakai Canva) dengan teks "Class 5.1" + slogan.
  - Simpan sebagai `assets/og-image.png`.
  - Sudah ada meta tag yang mengarah ke situ.

## Kustomisasi

- **Data anggota, jadwal, quote:** edit `data.json`.
- **Warna:** ubah variabel CSS di `style.css` (`:root`).
- **Countdown:** ubah tanggal target di `script.js` (saat ini menuju 31 Des 2026).

## Teknologi

- Pure HTML + CSS + Vanilla JS
- Tidak ada framework / library berat
- Lightweight & mobile-friendly
- LocalStorage untuk Guestbook & Mood

Made with 🩵 for Class 5.1  
One Class • One Story • Nineteen Memories
