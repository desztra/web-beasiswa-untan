# Software Design Document (SDD)
## Website Statis Halaman Beasiswa — One-Page HTML
### Program Studi Informatika — Universitas Tanjungpura

| Field | Detail |
|---|---|
| Nama Proyek | Pengembangan Website Statis Halaman Beasiswa |
| Kelompok | Ape Nama Team E |
| Versi | 1.0 |
| Fase SDLC | Design (aktif) |
| Dosen | Izuardo Zulkarnain, S.Pd., M.T |
| Semester | Genap 2025/2026 |

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
SDD ini mendeskripsikan perancangan teknis website beasiswa Informatika UNTAN sebagai one-page HTML native. Dokumen ini menjadi panduan tim dalam mengimplementasikan:
- Fitur popup detail beasiswa
- Integrasi data hasil scraping & survei admin
- Otomatisasi deployment via Puify (push-to-deploy)

### 1.2 Stack Teknologi

| Layer | Teknologi | Keterangan |
|---|---|---|
| Markup | HTML5 | Struktur konten |
| Styling | CSS3 / Tailwind CSS | Layout responsif |
| Interaktivitas | JavaScript (Vanilla / Alpine.js) | Animasi, scroll, toggle |
| Font & Ikon | Google Fonts / Font Awesome | Tipografi & ikon |
| Hosting | Puify (SaaS) | Auto-deploy dari repo ke server |
| Server | Dedicated Server Prodi | Dev & Production |
| Version Control | Git + GitHub | Kolaborasi & push-to-deploy |

### 1.3 Posisi dalam SDLC

| Fase | Status |
|---|---|
| Requirement | ✅ Selesai |
| Design | 🔄 Aktif |
| Implementation | ⏳ Belum |
| Testing | ⏳ Belum |
| Deployment | ⏳ Belum |

---

## 2. Arsitektur Halaman (Site Architecture)

### 2.1 Konsep One-Page Website
Single-page statis — semua konten dalam satu file HTML utama. Navigasi menggunakan **smooth scroll**. Detail beasiswa (syarat umum) ditampilkan via **popup modal** agar halaman tetap bersih.

### 2.2 Struktur Seksi (Vertikal, Atas → Bawah)

| No | ID | Nama Seksi | Konten Utama |
|---|---|---|---|
| 1 | `#hero` | Hero / Landing | Judul "Beasiswa Studi & Penelitian", deskripsi, CTA "Lihat Daftar Beasiswa", foto ilustrasi mahasiswa |
| 2 | `#statistics` | Statistik Counter | 3 angka animasi: Total Penerima Semester Ini, Total Pemerintah, Total Swasta |
| 3 | `#directory` | Direktori Beasiswa | Grid kartu (3 kolom desktop, 2 tablet, 1 mobile), tab filter, real-time search, popup detail |
| 4 | `#testimonial` | Testimoni | Carousel/grid testimoni: foto, nama, beasiswa, kutipan singkat |
| 5 | `#cta` | Call-to-Action | Banner ajakan + tombol WhatsApp admin + Instagram kemahasiswaan |
| 6 | `#footer` | Footer | Logo prodi, alamat, email, telepon, WA, ikon sosmed, dekorasi ilustrasi Pontianak |

### 2.3 Navigasi
**Sticky navbar** yang selalu terlihat saat scroll.

| Perangkat | Perilaku Navbar |
|---|---|
| Desktop/Laptop | Horizontal, semua item terlihat |
| Tablet | Horizontal, item muat; sisanya dropdown |
| Mobile | Hamburger menu (≡) — tap untuk expand vertikal |

---

## 3. Desain Visual & Identitas

### 3.1 Color Palette

| Peran | Nama | Hex | Digunakan Untuk |
|---|---|---|---|
| Primary | Biru Informatika | `#2B4590` | Navbar, heading, tombol primary, border aktif |
| Secondary | Kuning/Oranye | `#F5A623` | CTA button, aksen, badge |
| Background | White | `#FFFFFF` | Latar halaman utama |
| Text | Dark Gray | `#1A1A1A` | Body text, paragraf |
| Accent | Abu-abu | `#6B7280` | Caption, label, border |
| Success | Hijau | `#10B981` | Badge status "Buka" |
| Danger | Merah | `#EF4444` | Badge status "Ditutup" |
| Overlay | Hitam + Transparansi | `#00000080` | Background popup modal |

### 3.2 Tipografi

| Elemen | Font Family | Ukuran | Weight |
|---|---|---|---|
| Heading H1 | Poppins / Inter | 48–64px | 700 (Bold) |
| Heading H2 | Poppins / Inter | 32–40px | 600 (SemiBold) |
| Heading H3 | Poppins / Inter | 24–28px | 600 (SemiBold) |
| Body Text | Inter / Poppins | 16–18px | 400 (Regular) |
| Caption/Label | Inter / Poppins | 12–14px | 400–500 |
| Navbar | Inter | 14–16px | 500 (Medium) |
| Button | Inter | 14–16px | 600 (SemiBold) |

### 3.3 Komponen UI

| Komponen | Spesifikasi |
|---|---|
| Navbar | Sticky; transparent di atas hero → solid biru `#2B4590` saat scroll; toggle ID/EN di kanan |
| Hero Section | Full-height, overlay gradient gelap, judul besar, deskripsi, CTA kuning kontras |
| Card Beasiswa | Border subtle, shadow ringan; hover: scale sedikit + shadow lebih dalam; thumbnail 100% lebar |
| Button Primary | Solid biru, teks putih |
| Button Secondary | Outline biru |
| Button Ghost | Tanpa border |
| Badge Status | Rounded pill; Hijau "Buka", Merah "Ditutup" |
| Tab Filter | Underline active state, smooth transition, teks hitam, garis bawah aktif biru |
| Popup Modal | Center screen, dark overlay, border-radius 12px, close button (×) kanan atas |
| Footer | Background `#1A1A1A`, teks putih, 3–4 kolom desktop |

---

## 4. Desain Mockup (UI/UX)

### 4.1 Alat Desain
**Figma** — kolaborasi realtime, wireframe + hi-fidelity prototype.

- **Figma Project:** https://www.figma.com/design/rG6JYG19CWziaPMhbJ2NPL/PPL-FIGMA?node-id=0-1
- **Prototype Interaktif:** https://www.figma.com/proto/rG6JYG19CWziaPMhbJ2NPL/PPL-FIGMA?node-id=120-1247

### 4.2 Tahapan Desain
1. **Wireframe (Lo-Fi)** — sketsa hitam-putih, fokus layout & posisi elemen
2. **Mockup (Hi-Fi)** — desain lengkap dengan warna, font, dan aset visual
3. **Prototype** — mockup yang bisa diklik untuk simulasi navigasi antar seksi
4. **User Testing** — validasi desain bersama calon pengguna

### 4.3 Breakpoint & Resolusi

| Perangkat | Resolusi Mockup |
|---|---|
| Desktop Monitor | 1920 × 1080 |
| Laptop | 1366 × 768 |
| Tablet Portrait | 768 × 1024 |
| Tablet Landscape | 1024 × 768 |
| Mobile / HP | 390 × 844 |

---

## 5. Desain Responsif

### 5.1 Strategi: Mobile-First
Desain dimulai dari layar terkecil → diperluas ke layar lebih besar via CSS media query. Memastikan performa optimal di koneksi lambat.

### 5.2 Breakpoint

| Perangkat | Breakpoint | Resolusi Umum |
|---|---|---|
| Desktop Monitor | `>= 1280px` | 1920×1080, 2560×1440 |
| Laptop | `>= 1024px` | 1366×768, 1440×900 |
| Tablet | `>= 768px` | 768×1024, 820×1180 |
| Mobile | `< 768px` | 360×800, 390×844, 414×896 |

### 5.3 Perubahan Layout per Breakpoint

| Elemen | Mobile (<768px) | Tablet (768–1279px) | Desktop (≥1280px) |
|---|---|---|---|
| Navbar | Hamburger menu | Hamburger / partial menu | Horizontal full menu |
| Hero Section | Teks atas, gambar bawah | Teks kiri, gambar kanan 50/50 | Teks kiri, gambar kanan lebar |
| Card Grid | 1 kolom | 2 kolom | 3–4 kolom |
| Teks Body | 16px | 16–17px | 17–18px |
| Padding Section | 24px 16px | 40px 32px | 80px 64px |
| Footer | Stack vertikal | 2 kolom | 3–4 kolom |

### 5.4 Hasil Uji Responsivitas

| No | Perangkat/Browser | Ukuran | Status | Catatan |
|---|---|---|---|---|
| 1 | Chrome Desktop | 1920×1080 | ✅ Lulus | Layout proporsional, spacing rapi |
| 2 | Chrome Mobile Sim. | 390×844 | ✅ Lulus | Card grid 1 kolom, teks 16px nyaman |
| 3 | Firefox Desktop | 1440×900 | ✅ Lulus | Konsisten dengan Chrome Desktop |
| 4 | iPhone (Safari) | 390×844 | ✅ Lulus | Hero stack sempurna, padding aman |
| 5 | Android Chrome | 360×800 | ✅ Lulus | Touch target ideal, gambar proporsional |
| 6 | iPad (Safari) | 768×1024 | ✅ Lulus | Hero 50/50, spasi sentuh lega |

---

## 6. Use Case Diagram

### 6.1 Aktor Sistem

| Aktor | Deskripsi |
|---|---|
| Pengunjung Umum | Mahasiswa aktif, alumni, calon mahasiswa, dosen, masyarakat — tanpa autentikasi |
| Admin Prodi | Pengelola konten: memperbarui data beasiswa, testimoni, statistik via push-to-repo |

### 6.2 Daftar Use Case & Skenario

Lihat detail lengkap di SRS.md. Ringkasan:

| Kode | Nama | Aktor |
|---|---|---|
| UC-01 | Melihat Daftar Beasiswa | Pengunjung Umum |
| UC-02 | Memfilter Beasiswa Berdasarkan Kategori | Pengunjung Umum |
| UC-03 | Mencari Beasiswa | Pengunjung Umum |
| UC-04 | Melihat Detail Beasiswa (Popup) | Pengunjung Umum |
| UC-05 | Mengakses Sumber Resmi Beasiswa | Pengunjung Umum |
| UC-06 | Menghubungi Admin via CTA | Pengunjung Umum |
| UC-07 | Melihat Testimoni Penerima Beasiswa | Pengunjung Umum |
| UC-08 | Mengganti Bahasa Tampilan (ID/EN) | Pengunjung Umum |
| UC-09 | Memperbarui Data Beasiswa | Admin Prodi |

**Relasi antar UC:** UC-04 `<<include>>` UC-05 (popup detail menyertakan akses sumber resmi)

---

## 7. Fitur Interaktif (Client-Side)

Tidak ada backend API. Semua interaktivitas dijalankan di sisi klien.

| No | Fitur | Teknologi | Keterangan |
|---|---|---|---|
| 1 | Smooth Scroll Navigasi | CSS `scroll-behavior` / JS | Scroll halus ke seksi saat klik menu |
| 2 | Sticky Navbar | CSS `position:sticky` / JS scroll | Navbar tetap di atas saat scroll |
| 3 | Hamburger Menu | JavaScript + CSS toggle | Menu responsif layar kecil |
| 4 | Active State Navbar | JS `IntersectionObserver` | Highlight menu sesuai seksi terlihat |
| 5 | Animasi Masuk (AOS) | AOS.js / CSS animation | Elemen muncul saat pertama kali di viewport |
| 6 | Counter Animasi | JavaScript | Angka statistik berjalan saat di-scroll |
| 7 | Filter Real-Time | Vanilla JavaScript | Filter kartu saat klik tab, tanpa reload |
| 8 | Pencarian Real-Time | Vanilla JavaScript | Cari beasiswa saat ketik di search bar |
| 9 | Popup Modal Detail | Vanilla JavaScript | Detail beasiswa dalam modal; tutup via ×, klik luar, atau Escape |
| 10 | Toggle Bahasa ID/EN | Vanilla JS + localStorage | Ubah teks tanpa reload, simpan preference di session |
| 11 | Carousel Testimoni | Vanilla JS / Swiper.js | Navigasi testimoni left/right; touch swipe di mobile |
| 12 | Form Kontak (Opsional) | Formspree / EmailJS / mailto | Kirim pesan tanpa backend |
| 13 | Lightbox Galeri (Opsional) | Fancybox / vanilla JS | Gambar fullscreen saat diklik |

---

## 8. Layanan Pihak Ketiga

| Layanan | Kegunaan | Gratis? |
|---|---|---|
| Google Fonts | Tipografi (Inter/Poppins) | ✅ Ya |
| Font Awesome | Ikon UI | ✅ Ya (tier dasar) |
| Google Maps Embed | Peta lokasi di seksi kontak | ✅ Ya (basic embed) |
| Formspree | Form kontak tanpa backend | ✅ Ya (tier dasar) |
| AOS.js | Animasi scroll (Animate on Scroll) | ✅ Ya (open source) |
| Swiper.js | Carousel testimoni | ✅ Ya (open source) |

---

## 9. Desain Keamanan

### 9.1 Keamanan Form Kontak
- Validasi client-side: semua field wajib diisi, format email dicek sebelum submit
- Rate limiting: Formspree/EmailJS membatasi pengiriman untuk mencegah spam
- reCAPTCHA (Opsional): Google reCAPTCHA v3 untuk mencegah bot

### 9.2 Keamanan Konten
- **Tidak ada data sensitif** — website tidak menyimpan data pengguna (no login, no database)
- **HTTPS wajib** — sertifikat SSL/TLS pada server hosting prodi
- **Content Security Policy** — meta CSP header untuk mencegah XSS
- **External link** — semua link eksternal menggunakan `rel="noopener noreferrer"`

---

## 10. Struktur File yang Direkomendasikan

```
project-root/
├── index.html              # File HTML utama (one-page)
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS (jika tidak full Tailwind)
│   ├── js/
│   │   ├── main.js         # Logika utama: scroll, navbar, AOS init
│   │   ├── filter.js       # Filter & pencarian beasiswa
│   │   ├── popup.js        # Modal popup detail beasiswa
│   │   ├── counter.js      # Animasi counter statistik
│   │   ├── carousel.js     # Carousel testimoni
│   │   └── i18n.js         # Toggle bahasa ID/EN
│   └── images/
│       ├── hero/           # Foto hero section
│       ├── beasiswa/       # Thumbnail logo beasiswa
│       └── testimoni/      # Foto penerima beasiswa
├── data/
│   ├── beasiswa.json       # Data beasiswa (diupdate oleh admin)
│   └── testimoni.json      # Data testimoni
└── README.md               # Panduan setup & deployment
```

---

## 11. Data Schema

### 11.1 Schema Beasiswa (`beasiswa.json`)
```json
{
  "id": "string",
  "nama": "string",
  "kategori": "Pemerintah | Swasta",
  "status": "Buka | Ditutup",
  "thumbnail": "path/to/image.jpg",
  "deskripsi_singkat": "string (max 150 char)",
  "syarat_umum": ["string", "string"],
  "kontak": "string",
  "tanggal_buka": "YYYY-MM-DD",
  "tanggal_tutup": "YYYY-MM-DD",
  "url_sumber": "https://...",
  "tags": ["S1", "S2", "Magang", "Luar Negeri"]
}
```

### 11.2 Schema Testimoni (`testimoni.json`)
```json
{
  "id": "string",
  "nama": "string",
  "foto": "path/to/foto.jpg",
  "nama_beasiswa": "string",
  "kutipan": "string (max 200 char)"
}
```

---

## 12. Referensi

1. IEEE Standard 1016-2009 — Software Design Descriptions
2. W3C — HTML5 & CSS3 Specification (https://www.w3.org)
3. Google — Web Fundamentals: Responsive Web Design
4. MDN Web Docs — CSS Media Queries
5. Figma — Design Tool Documentation
6. Nurhikmat et al. (2024) — Optimasi Responsivitas Web dengan Mobile-First Design. JINTEKS.
