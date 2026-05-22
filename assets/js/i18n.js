// =====================================================
// i18n.js — Toggle Bahasa Indonesia / English
// Sesuai PROJECT_CONTEXT: tersimpan di sessionStorage
// =====================================================

const i18nData = {
  id: {
    'nav.tentang': 'TENTANG KAMI',
    'nav.program': 'PROGRAM',
    'nav.sdm': 'SDM',
    'nav.fasilitas': 'FASILITAS',
    'nav.agenda': 'KARYA & AGENDA',
    'nav.kontak': 'KONTAK',
    'breadcrumb.home': 'Beranda',
    'breadcrumb.profile': 'Profil',
    'breadcrumb.scholarship': 'Beasiswa',
    'hero.badge': 'Program Beasiswa',
    'hero.title': 'Beasiswa Studi &<br>Penelitian',
    'hero.subtitle': 'Teknik Informatika Universitas Tanjungpura',
    'hero.desc': 'Temukan berbagai peluang beasiswa untuk mendukung perjalanan akademik dan penelitian Anda. Program Studi Informatika UNTAN berkomitmen membantu mahasiswa meraih prestasi terbaik.',
    'hero.cta': 'Lihat Daftar Beasiswa',
    'stats.total': 'Total Mahasiswa Penerima<br>Beasiswa Semester Ini',
    'stats.gov': 'Total Penerima Beasiswa<br>Pembiayaan Pemerintah',
    'stats.private': 'Total Penerima Beasiswa<br>Pembiayaan Swasta',
    'dir.label': 'Daftar Beasiswa',
    'dir.title': 'Daftar Beasiswa',
    'dir.desc': 'Temukan beragam beasiswa dari berbagai sumber resmi yang tersedia untuk mahasiswa aktif, alumni, dan calon mahasiswa Program Studi Informatika UNTAN.',
    'dir.receive': 'Terima Bantuan Beasiswa?',
    'filter.all': 'SEMUA',
    'filter.open': 'Sedang Buka',
    'filter.closed': 'Ditutup',
    'filter.gov': 'Pemerintah',
    'filter.private': 'Swasta',
    'search.placeholder': 'Cari Nama Beasiswa...',
    'testimonial.title': 'Apa Kata Mereka?',
    'testimonial.desc': 'Cerita inspiratif dari para penerima beasiswa Program Studi Informatika UNTAN',
    'cta.title': 'Ingin Mengetahui Info Lebih Lanjut?',
    'cta.desc': 'Hubungi admin prodi atau ikuti Instagram kemahasiswaan UNTAN untuk informasi terbaru tentang beasiswa dan program akademik.',
    'cta.btn1': 'DAFTAR BEASISWA',
    'cta.btn2': 'Hubungi Kami',
    'ticker': 'Pendaftaran Beasiswa KIP Kuliah 2026 telah dibuka! &nbsp;—&nbsp; Beasiswa Pertamina Foundation open hingga Agustus 2026 &nbsp;—&nbsp; Daftarkan diri Anda sekarang! &nbsp;—&nbsp; Info lengkap tersedia di halaman direktori beasiswa &nbsp;—&nbsp; Beasiswa LPDP S2 masih tersedia hingga September 2026 &nbsp;—&nbsp;',
  },
  en: {
    'nav.tentang': 'ABOUT US',
    'nav.program': 'PROGRAMS',
    'nav.sdm': 'HUMAN RESOURCES',
    'nav.fasilitas': 'FACILITIES',
    'nav.agenda': 'WORKS & EVENTS',
    'nav.kontak': 'CONTACT',
    'breadcrumb.home': 'Home',
    'breadcrumb.profile': 'Profile',
    'breadcrumb.scholarship': 'Scholarship',
    'hero.badge': 'Scholarship Program',
    'hero.title': 'Study & Research<br>Scholarships',
    'hero.subtitle': 'Informatics Engineering, Tanjungpura University',
    'hero.desc': 'Discover various scholarship opportunities to support your academic and research journey. The Informatics Study Program at UNTAN is committed to helping students achieve excellence.',
    'hero.cta': 'View Scholarships',
    'stats.total': 'Total Scholarship<br>Recipients This Semester',
    'stats.gov': 'Total Government<br>Scholarship Recipients',
    'stats.private': 'Total Private<br>Scholarship Recipients',
    'dir.label': 'Scholarship Directory',
    'dir.title': 'Scholarship Directory',
    'dir.desc': 'Find various scholarships from official sources available for active students, alumni, and prospective students of the UNTAN Informatics Study Program.',
    'dir.receive': 'Need Scholarship Aid?',
    'filter.all': 'ALL',
    'filter.open': 'Open',
    'filter.closed': 'Closed',
    'filter.gov': 'Government',
    'filter.private': 'Private',
    'search.placeholder': 'Search Scholarship Name...',
    'testimonial.title': 'What They Say?',
    'testimonial.desc': 'Inspiring stories from scholarship recipients at UNTAN Informatics Study Program',
    'cta.title': 'Want to Know More?',
    'cta.desc': 'Contact the program admin or follow UNTAN student affairs Instagram for the latest scholarship and academic program information.',
    'cta.btn1': 'SCHOLARSHIP LIST',
    'cta.btn2': 'Contact Us',
    'ticker': 'KIP Kuliah Scholarship 2026 registration is now open! &nbsp;—&nbsp; Pertamina Foundation Scholarship open until August 2026 &nbsp;—&nbsp; Register now! &nbsp;—&nbsp; Full info available in the scholarship directory &nbsp;—&nbsp; LPDP S2 Scholarship available until September 2026 &nbsp;—&nbsp;',
  }
};

// Load saved language from session storage
let currentLang = sessionStorage.getItem('lang') || 'id';

function applyTranslations(lang) {
  const t = i18nData[lang];
  if (!t) return;

  // Apply data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Apply data-i18n-placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';
}

function setLanguage(lang) {
  if (lang !== 'id' && lang !== 'en') return;
  currentLang = lang;
  sessionStorage.setItem('lang', lang);

  // Update button visual states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
  });

  applyTranslations(lang);
}

// Expose globally so onclick in HTML works
window.setLanguage = setLanguage;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
