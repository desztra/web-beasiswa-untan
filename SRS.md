# Software Requirements Specification (SRS)
## Pengembangan Website Statis Halaman Beasiswa
### Program Studi Informatika — Universitas Tanjungpura

| Field | Detail |
|---|---|
| Nama Proyek | Pengembangan Website Statis Halaman Beasiswa |
| Kelompok | Ape Nama Team E |
| Versi | 1.1 |
| Tanggal | 01/05/2026 |
| Dosen | Izuardo Zulkarnain, S.Pd., M.T |
| Mata Kuliah | Proyek Perangkat Lunak — Semester Genap 2025/2026 |

**Anggota Tim:**
- Djapianus Thebrianto — Project Manager
- Derangga Aray Abimanyu — Backend Developer
- Destra Aulia Faza Ananda Putra — Frontend Developer
- Dian Satrio Prayogo — UI/UX Designer
- Jonathan Geral Nababan — Quality Assurance

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen

SRS ini memberikan spesifikasi teknis dan fungsional untuk pengembangan Website Statis Beasiswa Informatika Universitas Tanjungpura. Dokumen ini memastikan:

- Pengembang membangun sistem dengan kode sederhana yang mudah di-maintain melalui mekanisme push-to-repo ke dedicated server prodi.
- Penyajian data beasiswa (nama & syarat umum) dilakukan melalui fitur **Pop-up** dengan akses langsung ke admin via WhatsApp dan Instagram kemahasiswaan UNTAN.
- Proyek mengalihkan alur data dari portal universitas/survei admin ke static page dengan **availability 24 jam**.

**Ditujukan kepada:** Tim Ape Nama Team E, Product Owner (dosen), dan Administrator Prodi.

### 1.2 Ruang Lingkup

Website statis single-page yang menjadi pusat informasi beasiswa, riset, dan pengembangan karir — terintegrasi dengan infrastruktur server Prodi Informatika UNTAN.

**Fitur yang dicakup:**
- Direktori beasiswa (mahasiswa aktif, alumni, S2 luar negeri, magang)
- Detail beasiswa via popup (nama + syarat umum)
- Data beasiswa dari web scraping sumber resmi
- Seksi testimoni penerima beasiswa (foto, profil, kutipan)
- Toggle bahasa Indonesia / Inggris (bilingual)
- CTA ke WhatsApp admin & Instagram kemahasiswaan UNTAN

**Yang TIDAK dicakup:**
- Formulir pendaftaran (diarahkan ke URL asli penyedia)
- Halaman admin berbasis web (update via push-to-repo)
- Database — data bersifat statis (JSON/JS di repositori)

### 1.3 Definisi & Akronim

| Istilah | Definisi |
|---|---|
| Native Website | Web dengan HTML, CSS, JS murni tanpa framework kompleks |
| Scraping | Pengambilan data otomatis dari website eksternal |
| Dedicated Server | Server milik Prodi Informatika UNTAN (Dev & Production) |
| Pop-up / Modal | Jendela overlay di atas halaman tanpa reload |
| CTA | Call-to-Action — tombol ajakan ke WhatsApp/Instagram |
| Availability | Kemampuan sistem beroperasi 24 jam |
| Puify | Platform SaaS otomatisasi deployment dari repo ke server |

### 1.4 Referensi
- IEEE Std 830-1998 — Software Requirements Specifications
- UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)

---

## 2. Deskripsi Umum Sistem

### 2.1 Perspektif Produk

Produk baru berdiri sendiri sebagai **single static landing page** — bukan pengganti sistem lama. Website ini hadir sebagai transformasi digital dari penyebaran info beasiswa yang sebelumnya manual (portal, surat kabar mahasiswa, grup medsos) ke satu platform terpusat.

**Integrasi eksternal (satu arah):**
- Website resmi penyedia beasiswa (data via scraping)
- API Website Informatika UNTAN (konten artikel/berita)
- WhatsApp & Instagram Kemahasiswaan UNTAN (CTA)

Tidak ada antarmuka admin berbasis web. Semua update konten via **push ke GitHub → auto-deploy ke server** melalui Puify.

### 2.2 Fungsi Utama Sistem

| Kode | Fungsi | Deskripsi |
|---|---|---|
| F01 | Direktori Beasiswa | Grid kartu beasiswa aktif, S2, magang, penelitian dari berbagai sumber resmi |
| F02 | Filter & Pencarian | Saring berdasarkan kategori (Semua/Buka/Ditutup/Pemerintah/Swasta) + real-time search |
| F03 | Detail via Pop-up | Modal berisi nama, syarat umum, kontak, tautan sumber resmi |
| F04 | Testimoni | Foto, nama, nama beasiswa, kutipan dari penerima beasiswa |
| F05 | CTA Hubungi Admin | Tombol cepat ke WhatsApp admin & Instagram kemahasiswaan |
| F06 | Bilingual ID/EN | Toggle bahasa Indonesia ↔ Inggris tanpa reload |
| F07 | Update via Repository | Admin edit file data + push → halaman publik auto-update |

### 2.3 Kelas Pengguna

| Kelas | Karakteristik | Hak Akses |
|---|---|---|
| Pengunjung Umum | Mahasiswa aktif, alumni, masyarakat — tanpa login | Lihat konten, filter, search, buka popup, akses link eksternal |
| Admin Prodi | Staf/mahasiswa dengan kemampuan Git dasar | Edit file data di GitHub → push → deploy otomatis |

### 2.4 Lingkungan Operasional

| Komponen | Spesifikasi |
|---|---|
| Platform | Browser modern: Chrome ≥v100, Firefox ≥v100, Edge ≥v100, Safari ≥v15 |
| Server/Hosting | Dedicated server Prodi Informatika UNTAN (Dev & Production) via Puify |
| Database | Tidak ada — data di file statis JSON/JS di repositori |
| Bahasa Pemrograman | HTML5, CSS3 + Tailwind CSS, JavaScript ES6+ |
| Version Control | Git / GitHub |
| Koneksi | Min 1 Mbps (dasar), 10 Mbps (optimal) |

### 2.5 Asumsi & Ketergantungan

**Asumsi:**
- Pengunjung menggunakan browser modern dengan JS ES6+ dan CSS3 aktif
- Data beasiswa sudah diverifikasi admin sebelum dipublikasikan
- Perangkat pengunjung mendukung akses WhatsApp (app atau web)

**Ketergantungan:**
- Dedicated server Prodi UNTAN harus aktif untuk availability 24 jam
- Update data bergantung pada keaktifan admin melakukan push secara berkala
- Fitur berita bergantung pada stabilitas API Website Informatika UNTAN
- CTA bergantung pada keaktifan nomor WhatsApp & akun Instagram kemahasiswaan

---

## 3. Kebutuhan Fungsional

### 3.1 Daftar Use Case

| UC ID | Nama Use Case | Aktor | Prioritas (MoSCoW) |
|---|---|---|---|
| UC-01 | Melihat Daftar Beasiswa | Pengunjung Umum | Must Have |
| UC-02 | Memfilter Beasiswa Berdasarkan Kategori | Pengunjung Umum | Must Have |
| UC-03 | Mencari Beasiswa | Pengunjung Umum | Must Have |
| UC-04 | Melihat Detail Beasiswa (Popup) | Pengunjung Umum | Must Have |
| UC-05 | Mengakses Sumber Informasi Beasiswa | Pengunjung Umum | Must Have |
| UC-06 | Menghubungi Admin via CTA | Pengunjung Umum | Must Have |
| UC-07 | Melihat Testimoni Penerima Beasiswa | Pengunjung Umum | Should Have |
| UC-08 | Mengganti Bahasa Tampilan (ID/EN) | Pengunjung Umum | Should Have |
| UC-09 | Memperbarui Data Beasiswa | Admin Prodi | Must Have |

### 3.2 Detail Use Case

#### UC-01: Melihat Daftar Beasiswa
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Halaman berhasil dimuat di browser |
| Trigger | Pengunjung membuka URL atau scroll ke seksi Daftar Beasiswa |
| Main Flow | 1. Pengunjung buka URL halaman<br>2. Sistem tampilkan hero, statistik, daftar beasiswa<br>3. Kartu ditampilkan grid: 3 kolom desktop / 2 tablet / 1 mobile<br>4. Tiap kartu: thumbnail, badge status, nama, deskripsi singkat, tanggal, tombol "Selengkapnya"<br>5. Paginasi tampil di bawah grid jika beasiswa > 1 halaman |
| Alt Flow | 3a. Koneksi lambat → skeleton loading<br>3b. Tidak ada data → tampil "Belum ada beasiswa tersedia saat ini." |
| Postcondition | Pengunjung dapat melihat seluruh daftar beasiswa |

#### UC-02: Memfilter Beasiswa Berdasarkan Kategori
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Halaman dimuat, daftar beasiswa tampil |
| Trigger | Pengunjung klik salah satu tab filter |
| Main Flow | 1. Tampil tab: Semua \| Sedang Buka \| Ditutup \| Pemerintah \| Swasta<br>2. Pengunjung klik tab<br>3. Sistem real-time filter beasiswa sesuai kategori<br>4. Tab aktif ditandai bold/underline/warna<br>5. Jumlah hasil diperbarui |
| Alt Flow | 3a. Tidak ada hasil → "Tidak ada beasiswa pada kategori ini."<br>3b. Klik "Semua" → tampil semua beasiswa |
| Postcondition | Daftar beasiswa sesuai filter yang dipilih |

#### UC-03: Mencari Beasiswa
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Halaman dimuat, kolom pencarian tersedia |
| Trigger | Pengunjung mengetik di kolom pencarian |
| Main Flow | 1. Pengunjung klik kolom pencarian<br>2. Ketik kata kunci (misal: "Pertamina", "KIP", "luar negeri")<br>3. Sistem real-time filter kartu yang nama/deskripsinya cocok<br>4. Hapus kata kunci → kembali ke tampilan penuh<br>5. Filter dan pencarian dapat aktif bersamaan (kumulatif) |
| Alt Flow | 3a. Tidak ada hasil → "Tidak ditemukan beasiswa yang sesuai pencarian Anda." |
| Postcondition | Daftar beasiswa sesuai kata kunci |

#### UC-04: Melihat Detail Beasiswa (Popup)
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Kartu beasiswa tampil, pengunjung menemukan beasiswa yang diinginkan |
| Trigger | Klik tombol "Selengkapnya →" pada kartu |
| Main Flow | 1. Klik "Selengkapnya →"<br>2. Sistem tampilkan modal popup berisi: nama + thumbnail, badge status, syarat umum ringkasan, kontak, tombol "Info Lebih Lanjut" (→ URL sumber resmi di tab baru)<br>3. Background di-overlay gelap<br>4. Tutup via: tombol ×, klik di luar area, atau tekan Escape |
| Alt Flow | 4a. Klik "Info Lebih Lanjut" → jalankan UC-05 |
| Postcondition | Pengunjung mendapat info ringkas dan dapat lanjut ke sumber resmi |

#### UC-05: Mengakses Sumber Informasi Beasiswa
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Popup detail terbuka, tombol "Info Lebih Lanjut" tersedia |
| Trigger | Klik tombol "Info Lebih Lanjut" di popup |
| Main Flow | 1. Klik tombol<br>2. Sistem buka URL sumber resmi di tab baru<br>3. Popup di tab asal tetap terbuka |
| Alt Flow | 3a. URL tidak tersedia → "Tautan tidak tersedia. Silakan hubungi admin prodi." |
| Postcondition | Pengunjung diarahkan ke sumber resmi beasiswa |

#### UC-06: Menghubungi Admin via CTA
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Pengunjung ingin info lebih lanjut |
| Trigger | Scroll ke seksi CTA, klik salah satu tombol |
| Main Flow | 1. Scroll ke CTA ("Ingin Tahu Lebih Banyak tentang Beasiswa?")<br>2. Tampil dua tombol: "Hubungi Admin" (WhatsApp) + "Instagram Beasiswa" (IG kemahasiswaan)<br>3. Klik tombol → buka platform di tab baru |
| Alt Flow | 4a. Tanpa WhatsApp terinstall → buka WhatsApp Web |
| Postcondition | Pengunjung terhubung dengan admin atau follow Instagram |

#### UC-07: Melihat Testimoni Penerima Beasiswa
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Halaman dimuat, data testimoni tersedia di source code |
| Trigger | Scroll ke seksi Testimoni |
| Main Flow | 1. Scroll ke seksi Testimoni<br>2. Tampil kartu testimoni: foto, nama, nama beasiswa, kutipan singkat<br>3. Jika > 3 testimoni → navigasi carousel/tombol selanjutnya |
| Alt Flow | 2a. Belum ada data → seksi tidak ditampilkan atau tampil placeholder |
| Postcondition | Pengunjung mendapat gambaran pengalaman penerima beasiswa |

#### UC-08: Mengganti Bahasa Tampilan (ID/EN)
| Field | Detail |
|---|---|
| Aktor | Pengunjung Umum |
| Precondition | Toggle ID\|EN tersedia di header navigasi |
| Trigger | Klik toggle bahasa di pojok kanan header |
| Main Flow | 1. Pengunjung lihat toggle ID \| EN di kanan atas<br>2. Klik bahasa yang diinginkan<br>3. Seluruh teks berubah tanpa reload<br>4. Pilihan tersimpan di session (tidak reset saat scroll/filter) |
| Alt Flow | 3a. Konten hanya tersedia 1 bahasa → tetap tampil bahasa aslinya |
| Postcondition | Halaman tampil dalam bahasa yang dipilih |

#### UC-09: Memperbarui Data Beasiswa
| Field | Detail |
|---|---|
| Aktor | Admin Prodi |
| Precondition | Admin punya akses repo, ada info beasiswa baru/perubahan status |
| Trigger | Admin mendapat informasi update dari survei/portal/sumber lain |
| Main Flow | 1. Admin dapat info baru/perubahan status<br>2. Edit file data beasiswa (nama, kategori, status, syarat, kontak, URL)<br>3. Simpan dan push ke GitHub<br>4. Halaman publik auto-update dalam waktu singkat via Puify |
| Alt Flow | 3a. Error saat deploy → halaman publik tidak berubah, admin perbaiki dan push ulang |
| Postcondition | Info beasiswa terbaru tersedia di halaman publik 24/7 |

---

## 4. Kebutuhan Antarmuka Eksternal

### 4.1 Antarmuka Pengguna (UI)

- Responsive design: breakpoint 320px (mobile), 768px (tablet), 1280px (desktop)
- Warna utama: Biru Informatika `#2B4590` dan Kuning `#F5A623` (branding UNTAN)
- Font: Inter atau Poppins, minimal 14px untuk body text
- Waktu respons antarmuka ≤ 3 detik pada koneksi 10 Mbps
- Aksesibilitas WCAG 2.1 level AA (kontras warna, ARIA label, navigasi keyboard)
- Semua elemen interaktif memiliki feedback visual saat hover/klik

**Halaman / Seksi:**

| Seksi | ID | Konten Utama |
|---|---|---|
| Header & Navigasi | — | Navbar sticky, logo UNTAN, toggle ID/EN, info ticker |
| Hero | `#hero` | Judul "Beasiswa Studi & Penelitian", deskripsi, CTA kuning, foto mahasiswa |
| Statistik Counter | `#statistics` | 3 angka animasi: Total Penerima, Pemerintah, Swasta |
| Direktori Beasiswa | `#directory` | Grid kartu, tab filter, real-time search, popup detail |
| Testimoni | `#testimonial` | Carousel foto+nama+kutipan penerima beasiswa |
| CTA | `#cta` | Banner ajakan + tombol WhatsApp & Instagram |
| Footer | `#footer` | Logo, alamat, kontak, sosial media, ilustrasi Pontianak |

### 4.2 Antarmuka Hardware
- Browser modern: Chrome/Firefox/Edge ≥v100, Safari ≥v15
- Koneksi minimal 1 Mbps; optimal 10 Mbps
- Resolusi minimal 320px lebar
- Tidak butuh hardware khusus (kamera, printer, sensor, dll.)

### 4.3 Antarmuka Software

| Layanan | Tujuan | Protokol |
|---|---|---|
| Dedicated Server + Puify | Hosting dev & production, auto-deploy dari GitHub | HTTPS |
| GitHub | Version control, kolaborasi, deliverable akhir | HTTPS/SSH |
| Sumber Resmi Beasiswa | Link eksternal di popup (dibuka tab baru) | HTTPS |
| WhatsApp / Instagram UNTAN | Tombol CTA | HTTPS / wa.me |
| Figma | Desain mockup & wireframe acuan implementasi | HTTPS |
| Web Scraper | Ambil data beasiswa dari sumber resmi | HTTPS |

### 4.4 Antarmuka Komunikasi
- Semua file dikirim via HTTPS dengan sertifikat SSL/TLS valid
- Fitur interaktif (filter, search, toggle bahasa, popup, counter) berjalan client-side (JS) — tanpa request ke server
- Semua link eksternal: `target="_blank"` + `rel="noopener noreferrer"`
- Tidak menggunakan cookie, session storage, atau autentikasi pengguna (v1.0)

---

## 5. Kebutuhan Non-Fungsional

### NFR-01: Performa
- **P-01** Loading halaman ≤ 3 detik pada koneksi 10 Mbps
- **P-02** Filter beasiswa merespons < 0,5 detik setelah klik
- **P-03** Tetap responsif dan optimal di desktop, tablet, dan smartphone

### NFR-02: Keamanan
- **S-01** Semua komunikasi via HTTPS dengan SSL/TLS
- **S-02** Source code bersih dari script berbahaya, bebas celah XSS
- **S-03** Semua link CTA dan pendaftaran mengarah ke sumber resmi tervalidasi

### NFR-03: Skalabilitas
- **SC-01** Mampu menampilkan minimal 100 data beasiswa tanpa penurunan performa
- **SC-02** Struktur kode memungkinkan penambahan kategori baru tanpa perubahan besar
- **SC-03** Sistem bilingual mendukung penambahan bahasa baru di masa depan

### NFR-04: Ketersediaan & Reliabilitas
- **R-01** Uptime minimal 99% selama masa operasional
- **R-02** Dapat diakses 24 jam selama server aktif
- **R-03** Backup source code via Git/GitHub untuk pemulihan data

### NFR-05: Usability
- **U-01** Antarmuka bilingual ID/EN
- **U-02** Pengguna menemukan info beasiswa dalam < 2 menit via navigasi & filter
- **U-03** Tombol CTA di Hero kontras dan posisinya jelas

### NFR-06: Maintainability
- **M-01** Tech stack: HTML5, CSS3 + Tailwind CSS, JavaScript ES6+ — kode rapi dan mudah dipelihara
- **M-02** Semua perubahan dikelola via Git/GitHub (version control)
- **M-03** Dokumentasi teknis & panduan deployment disertakan saat penyerahan akhir

---

## 6. Batasan & Kendala

### 6.1 Batasan Implementasi
- Tech stack terkunci: HTML5, CSS3, Tailwind CSS, JavaScript ES6+, Figma, Git/GitHub
- Single static landing page — tidak ada backend, database, atau login
- Harus berjalan optimal di Chrome, Firefox, Edge versi terbaru
- Wajib responsif: desktop, tablet, smartphone

### 6.2 Batasan Proyek
- Durasi: 10 hari kerja (1 Mei – 11 Mei 2026)
- Tim: 5 orang dengan peran tetap (PM, Backend, Frontend, UI/UX, QA)
- Revisi antarmuka/konten sesuai batas yang disepakati
- Penambahan fitur baru saat development = di luar ruang lingkup utama

### 6.3 Regulasi & Standar
- UU PDP No. 27/2022 untuk pengelolaan data testimoni mahasiswa
- Visual harus selaras branding resmi Informatika UNTAN
- Memenuhi prinsip aksesibilitas dasar (navigasi jelas, tampilan informatif)
