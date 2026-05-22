# PROJECT CONTEXT
## Website Statis Halaman Beasiswa — Informatika UNTAN

> File ini adalah konteks utama proyek untuk AI assistant (Antigravity).
> Baca file ini setiap kali kamu membantu pengerjaan proyek ini.

---

## 🎯 Apa yang Dibangun?

**Single static landing page** berbasis HTML/CSS/JS murni (native web) untuk menampilkan informasi beasiswa bagi mahasiswa aktif, alumni, dan masyarakat umum Program Studi Informatika, Universitas Tanjungpura (UNTAN), Pontianak.

Website ini bukan aplikasi web dinamis. Tidak ada backend, tidak ada database, tidak ada login. Update konten dilakukan dengan mengedit file JSON dan push ke GitHub → auto-deploy via Puify ke server prodi.

---

## 🏗️ Tech Stack

| Layer | Teknologi |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + Tailwind CSS |
| Interaktivitas | Vanilla JavaScript (ES6+) |
| Font | Google Fonts (Inter / Poppins) |
| Ikon | Font Awesome |
| Animasi | AOS.js (Animate on Scroll) |
| Carousel | Swiper.js |
| Hosting | Dedicated Server Prodi UNTAN via Puify |
| Version Control | Git + GitHub |

**Tidak boleh menggunakan:** Framework berat (React, Vue, Angular), backend (Node.js, PHP, Python), database (MySQL, MongoDB).

---

## 📐 Desain

- **Figma Project:** https://www.figma.com/design/rG6JYG19CWziaPMhbJ2NPL/PPL-FIGMA?node-id=0-1
- **Prototype:** https://www.figma.com/proto/rG6JYG19CWziaPMhbJ2NPL/PPL-FIGMA?node-id=120-1247

### Warna Utama

| Variabel | Hex | Penggunaan |
|---|---|---|
| Primary (Biru) | `#2B4590` | Navbar, heading, tombol, border aktif |
| Secondary (Kuning) | `#F5A623` | CTA, aksen, badge |
| Background | `#FFFFFF` | Latar halaman |
| Text | `#1A1A1A` | Body text |
| Accent | `#6B7280` | Caption, label, border |
| Success | `#10B981` | Badge "Buka" |
| Danger | `#EF4444` | Badge "Ditutup" |
| Overlay | `#00000080` | Background popup |

### Tipografi
- **Font:** Inter (utama) / Poppins (heading)
- H1: 48–64px bold | H2: 32–40px semibold | H3: 24–28px semibold
- Body: 16–18px regular | Caption: 12–14px

---

## 📄 Struktur Halaman (Top → Bottom)

```
[NAVBAR - Sticky]
  Logo UNTAN | Menu: Beranda, Beasiswa, Testimoni, Kontak | Toggle ID/EN

[#hero - Hero Section]
  Judul: "Beasiswa Studi & Penelitian"
  Sub: Teknik Informatika Universitas Tanjungpura
  Deskripsi singkat tentang beasiswa
  CTA Button (kuning): "Lihat Daftar Beasiswa →"
  Foto ilustrasi mahasiswa (kanan)

[#statistics - Statistik Counter]
  3 angka dengan animasi scroll:
  - Total Mahasiswa Penerima Beasiswa Semester Ini
  - Total Penerima Beasiswa Pembiayaan Pemerintah
  - Total Penerima Beasiswa Pembiayaan Swasta

[#directory - Direktori Beasiswa]
  - Tab filter: Semua | Sedang Buka | Ditutup | Pemerintah | Swasta
  - Search bar (real-time)
  - Grid kartu beasiswa:
    * Desktop: 3 kolom
    * Tablet: 2 kolom
    * Mobile: 1 kolom
  - Tiap kartu: thumbnail, badge status, nama, deskripsi singkat, tanggal, tombol "Selengkapnya →"
  - Klik "Selengkapnya →" → buka POPUP MODAL

[POPUP MODAL - Detail Beasiswa]
  - Nama + thumbnail/logo beasiswa
  - Badge status (Buka / Ditutup)
  - Syarat umum (ringkasan/bullet)
  - Kontak yang bisa dihubungi
  - Tombol "Info Lebih Lanjut" → buka URL sumber resmi (tab baru)
  - Tutup: tombol ×, klik luar area, tekan Escape

[#testimonial - Testimoni Penerima Beasiswa]
  - Carousel / grid kartu
  - Tiap kartu: foto, nama, nama beasiswa yang diterima, kutipan singkat
  - Navigasi carousel jika > 3 testimoni

[#cta - Call to Action]
  - Judul: "Ingin Mengetahui Info Lebih Lanjut?"
  - Dua tombol:
    * "Daftar Beasiswa" (scroll ke #directory)
    * "Hubungi Kami" (WhatsApp admin)

[#footer - Footer]
  - Logo Informatika UNTAN
  - Alamat prodi, email, telepon, WhatsApp
  - Ikon media sosial
  - Ilustrasi khas Pontianak (dekorasi bawah)
```

---

## 📁 Struktur File Proyek

```
project-root/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js          # Init AOS, smooth scroll, sticky navbar
│   │   ├── filter.js        # Filter tab + real-time search
│   │   ├── popup.js         # Modal detail beasiswa
│   │   ├── counter.js       # Animasi counter statistik
│   │   ├── carousel.js      # Carousel testimoni (Swiper.js)
│   │   └── i18n.js          # Toggle bahasa ID/EN
│   └── images/
│       ├── hero/
│       ├── beasiswa/        # Logo/thumbnail beasiswa
│       └── testimoni/       # Foto penerima
├── data/
│   ├── beasiswa.json
│   └── testimoni.json
└── README.md
```

---

## 🗃️ Format Data

### `data/beasiswa.json`
```json
[
  {
    "id": "bsw-001",
    "nama": "Beasiswa Adaro Foundation 2026",
    "kategori": "Swasta",
    "status": "Ditutup",
    "thumbnail": "assets/images/beasiswa/adaro.jpg",
    "deskripsi_singkat": "Beasiswa untuk mahasiswa S1 & D4 dengan IPK minimal 3.00...",
    "syarat_umum": [
      "Mahasiswa aktif S1/D4",
      "IPK minimal 3.00",
      "Berasal dari keluarga kurang mampu"
    ],
    "kontak": "Admin Prodi / Kemahasiswaan UNTAN",
    "tanggal_buka": "2026-01-01",
    "tanggal_tutup": "2026-04-09",
    "url_sumber": "https://...",
    "tags": ["S1", "Swasta"]
  }
]
```

### `data/testimoni.json`
```json
[
  {
    "id": "tsm-001",
    "nama": "Aulia Rahman",
    "foto": "assets/images/testimoni/aulia.jpg",
    "nama_beasiswa": "Beasiswa Prestasi",
    "kutipan": "Beasiswa ini benar-benar membuka jalan bagi saya untuk fokus sepenuhnya pada pendidikan..."
  }
]
```

---

## ⚙️ Fitur Interaktif yang Harus Diimplementasikan

| Fitur | Status | File |
|---|---|---|
| Sticky Navbar (transparent → solid saat scroll) | ⏳ | `main.js` |
| Hamburger Menu | ⏳ | `main.js` |
| Smooth Scroll ke seksi | ⏳ | `main.js` |
| Active State Navbar (IntersectionObserver) | ⏳ | `main.js` |
| Animasi AOS (elemen muncul saat scroll) | ⏳ | `main.js` |
| Counter Animasi Statistik | ⏳ | `counter.js` |
| Render kartu beasiswa dari JSON | ⏳ | `filter.js` |
| Filter tab (Semua/Buka/Ditutup/Pemerintah/Swasta) | ⏳ | `filter.js` |
| Real-time search | ⏳ | `filter.js` |
| Popup Modal detail beasiswa | ⏳ | `popup.js` |
| Tutup popup (×, klik luar, Escape) | ⏳ | `popup.js` |
| Carousel testimoni (Swiper.js) | ⏳ | `carousel.js` |
| Toggle bahasa ID/EN | ⏳ | `i18n.js` |

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
/* Default: mobile < 768px */
/* Tablet: */  @media (min-width: 768px) { ... }
/* Laptop: */  @media (min-width: 1024px) { ... }
/* Desktop: */ @media (min-width: 1280px) { ... }
```

---

## 🔒 Aturan Keamanan Kode

- Semua link eksternal: `target="_blank" rel="noopener noreferrer"`
- Tidak ada hardcoded data sensitif di source code
- Input search di-sanitasi sebelum digunakan untuk filter DOM
- Tidak menggunakan `innerHTML` dengan input pengguna langsung (cegah XSS)

---

## 👥 Tim & Peran

| Nama | Peran |
|---|---|
| Djapianus Thebrianto | Project Manager |
| Derangga Aray Abimanyu | Backend Developer (data, scraping, JSON) |
| Destra Aulia Faza Ananda Putra | Frontend Developer (HTML, CSS, JS) |
| Dian Satrio Prayogo | UI/UX Designer (Figma) |
| Jonathan Geral Nababan | Quality Assurance (testing) |

---

## 📋 Hal Penting untuk AI Assistant

1. **Ini bukan React/Vue/Angular.** Semua harus ditulis dalam HTML/CSS/Tailwind/Vanilla JS.
2. **Data beasiswa dibaca dari `data/beasiswa.json`** — bukan hardcoded di HTML.
3. **Warna wajib sesuai palet resmi** — jangan gunakan warna lain sembarangan.
4. **Mobile-first** — tulis CSS dari ukuran kecil dulu, baru ke besar.
5. **Popup harus bisa ditutup 3 cara:** tombol ×, klik overlay, tekan Escape.
6. **Filter dan search bisa aktif bersamaan** (kumulatif, bukan saling menggantikan).
7. **Navbar berubah warna saat scroll** — transparent di atas hero, solid biru setelah scroll turun.
8. **Semua animasi pakai AOS.js** — inisialisasi di `main.js` dengan `AOS.init()`.
9. **Carousel testimoni pakai Swiper.js** — touch-friendly untuk mobile.
10. **Tidak ada `alert()`, `console.log()` di production code.**

---

## 🚀 Cara Kerja Deployment

```
Developer push ke GitHub
         ↓
    Puify detects push
         ↓
  Auto-deploy ke server
         ↓
   Website live (Dev)
         ↓
   Approved → Production
```

---

## 📎 Dokumen Terkait

- `SRS.md` — Spesifikasi kebutuhan lengkap (use case, NFR, batasan)
- `SDD.md` — Desain teknis lengkap (arsitektur, komponen, schema data)
- Figma: https://www.figma.com/design/rG6JYG19CWziaPMhbJ2NPL/PPL-FIGMA?node-id=0-1
