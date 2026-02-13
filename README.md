# Hoshi-Day.IO

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Hoshi-Day.IO** adalah aplikasi web interaktif yang dirancang untuk para penggemar anime dan pop-culture. Aplikasi ini menyediakan hitung mundur (countdown) *real-time* menuju ulang tahun karakter favorit Anda, dilengkapi dengan fitur pencarian dan berbagi via QR Code.

## 📌 Deskripsi Project
Aplikasi ini berfungsi sebagai "kalender hidup" untuk merayakan hari spesial karakter fiksi.
* **Character Roster:** Menampilkan daftar karakter dari berbagai seri (seperti *Attack on Titan*, *Jujutsu Kaisen*, *Resident Evil*).
* **Precision Countdown:** Menghitung sisa hari, jam, menit, dan detik menuju tanggal ulang tahun karakter.
* **Shareable Moments:** Memungkinkan pengguna membagikan hitung mundur karakter tertentu kepada teman melalui QR Code.

## 🛠️ Tech Stack
Dibangun dengan teknologi modern untuk performa cepat dan tampilan responsif:

* **Frontend Framework:** React.js
* **Styling:** Tailwind CSS (Utility-first CSS framework)
* **Routing:** React Router DOM
* **Utilities:**
    * `qrcode.react` (Generator QR Code)
    * Custom Hooks (`useCountdown`) untuk logika waktu

## 🚀 Fitur Utama

### 📅 Character Roster & Search
* **Jelajahi Karakter**: Tampilan grid yang rapi menampilkan avatar dan nama karakter.
* **Pencarian Cepat**: Fitur search bar untuk menemukan karakter favorit secara instan.

### ⏱️ Interactive Countdown
* **Timer Real-time**: Hitung mundur presisi yang diperbarui setiap detik.
* **Visual Menarik**: Tampilan halaman countdown yang disesuaikan dengan tema karakter.

### 📱 Sharing & Connectivity
* **QR Code Generator**: Buat QR Code unik untuk setiap karakter yang bisa di-scan oleh orang lain untuk melihat countdown yang sama.

## 📁 Struktur Folder
Gambaran struktur direktori utama project ini:

```text
hoshi-day.io/
├── public/
│   ├── avatar/            # Aset gambar karakter (Eren, Gojo, Leon, dll)
│   ├── comicpanel.webp    # Aset grafis UI
│   └── index.html         # HTML entry point
├── src/
│   ├── components/
│   │   ├── features/      # Komponen fitur spesifik (QRCodeModal)
│   │   ├── layout/        # Layout utama aplikasi
│   │   └── ui/            # Komponen UI reusable (Button, SearchBar, Loader)
│   ├── data/
│   │   └── characters.js  # Database lokal data karakter
│   ├── hooks/             # Custom hooks (useCountdown)
│   ├── pages/             # Halaman aplikasi (Home, Roster, Countdown)
│   ├── services/          # Logika bisnis (CountdownService)
│   ├── utils/             # Fungsi bantuan (dateHelpers)
│   ├── App.js             # Konfigurasi routing utama
│   └── index.css          # Import Tailwind CSS
└── package.json           # Dependensi project

```

## ⚙️ Instalasi & Setup

Ikuti langkah berikut untuk menjalankan project di komputer lokal:

### Prasyarat

* Node.js & NPM/PNPM terinstall.

### Langkah Instalasi

1. **Clone Repository**
```bash
git clone [https://github.com/username/hoshi-day.io.git](https://github.com/username/hoshi-day.io.git)
cd hoshi-day.io

```


2. **Instal Dependensi**
```bash
npm install
# atau
pnpm install

```


3. **Jalankan Mode Development**
```bash
npm start

```


Aplikasi akan berjalan di `http://localhost:3000`.

## 🤝 Kontribusi

Tertarik menambahkan karakter baru atau fitur notifikasi?

1. Fork repository ini.
2. Tambahkan data karakter baru di `src/data/characters.js` dan upload gambarnya di `public/avatar/`.
3. Buat Pull Request.

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License**.

---

*Dibuat oleh [Raditt10]*
