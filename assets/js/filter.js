// =====================================================
// filter.js — Fetch JSON, Render Kartu, Filter Tab, Pencarian, Paginasi
// Filter dan search berjalan KUMULATIF (sesuai PROJECT_CONTEXT rule #6)
// =====================================================

const ITEMS_PER_PAGE = 6; // 2 baris × 3 kolom desktop

let allData       = [];   // Semua data beasiswa dari JSON
let activeFilter  = 'semua';
let searchKeyword = '';
let currentPage   = 1;

// Format tanggal
function formatDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  if (isNaN(d.getTime())) return str;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// Sanitasi string untuk mencegah XSS pada search
function sanitize(str) {
  return str.replace(/[<>&"']/g, c =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

/**
 * Buat elemen kartu beasiswa
 * Gunakan textContent/setAttribute — hindari langsung innerHTML dari user input
 */
function createCard(bsw) {
  const isBuka = bsw.status === 'Buka';

  const article = document.createElement('article');
  article.className = 'scholarship-card fade-in-up';
  article.setAttribute('role', 'listitem');
  article.setAttribute('data-id', bsw.id);

  article.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="${bsw.thumbnail}"
        alt="${bsw.nama}"
        class="card-img"
        loading="lazy"
        onerror="this.style.display='none';this.parentElement.style.background='#eef2ff';this.parentElement.innerHTML+='<i class=\\'fas fa-graduation-cap\\' style=\\'font-size:40px;color:#c7d2fe;\\'></i>'"
      >
    </div>
    <div class="card-body">
      <span class="badge-status ${isBuka ? 'badge-buka' : 'badge-ditutup'}">
        ${bsw.status}
      </span>
      <h3 class="card-title">${bsw.nama}</h3>
      <p class="card-desc">${bsw.deskripsi_singkat}</p>
      <div class="card-date">
        <i class="fas fa-calendar-alt"></i>
        <span>${formatDate(bsw.tanggal_tutup)}</span>
      </div>
    </div>
    <div class="card-footer">
      <button
        class="btn-selengkapnya"
        onclick="openPopup('${bsw.id}')"
        aria-label="Lihat detail beasiswa ${bsw.nama}"
      >
        Selengkapnya <i class="fas fa-arrow-right" style="font-size:10px;"></i>
      </button>
    </div>
  `;

  return article;
}

/**
 * Filter data KUMULATIF: filter tab DAN search harus terpenuhi keduanya
 */
function getFiltered() {
  const kw = searchKeyword.toLowerCase();

  return allData.filter(bsw => {
    // Cocok dengan filter tab
    const matchFilter =
      activeFilter === 'semua' ||
      bsw.status    === activeFilter ||
      bsw.kategori  === activeFilter;

    // Cocok dengan pencarian (nama atau deskripsi atau tags)
    const matchSearch =
      !kw ||
      bsw.nama.toLowerCase().includes(kw) ||
      bsw.deskripsi_singkat.toLowerCase().includes(kw) ||
      (bsw.tags || []).some(t => t.toLowerCase().includes(kw));

    return matchFilter && matchSearch;
  });
}

/** Render kartu + paginasi ke DOM */
function renderCards() {
  const grid      = document.getElementById('beasiswa-grid');
  const pagCont   = document.getElementById('pagination');
  const filtered  = getFiltered();

  // Bersihkan grid
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <i class="fas fa-search-minus"></i>
        <p style="font-size:15px;font-weight:700;color:#94a3b8;margin-bottom:6px;">
          Tidak ada beasiswa ditemukan
        </p>
        <p style="font-size:13px;color:#cbd5e1;">
          Coba ubah filter atau kata kunci pencarian Anda
        </p>
      </div>`;
    pagCont.innerHTML = '';
    return;
  }

  // Hitung paginasi
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const items = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Render kartu dengan delay animasi berurutan
  items.forEach((bsw, i) => {
    const card = createCard(bsw);
    card.style.animationDelay = `${i * 55}ms`;
    grid.appendChild(card);
  });

  renderPagination(totalPages, pagCont);
}

/** Render tombol-tombol paginasi */
function renderPagination(total, container) {
  container.innerHTML = '';
  if (total <= 1) return;

  const make = (content, page, disabled = false, isActive = false) => {
    const btn = document.createElement('button');
    btn.className = `page-btn${isActive ? ' active' : ''}`;
    btn.innerHTML = content;
    btn.disabled  = disabled;
    btn.setAttribute('aria-label', typeof page === 'number' ? `Halaman ${page}` : content);
    if (!disabled) {
      btn.addEventListener('click', () => {
        currentPage = page;
        renderCards();
        // Scroll halus ke atas direktori
        const dir = document.getElementById('directory');
        if (dir) {
          const top = dir.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
    return btn;
  };

  // Prev
  container.appendChild(make('<i class="fas fa-chevron-left" style="font-size:11px;"></i>', currentPage - 1, currentPage === 1));

  // Halaman
  for (let i = 1; i <= total; i++) {
    container.appendChild(make(i, i, false, i === currentPage));
  }

  // Next
  container.appendChild(make('<i class="fas fa-chevron-right" style="font-size:11px;"></i>', currentPage + 1, currentPage === total));
}

/** Inisialisasi tab filter */
function initFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.filter;
      currentPage  = 1;
      renderCards();
    });
  });
}

/** Inisialisasi real-time search */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    // Sanitasi input sebelum digunakan (cegah XSS)
    searchKeyword = sanitize(input.value).trim();
    currentPage   = 1;
    renderCards();
  });
}

/** Fetch data JSON dan render */
async function initDirectory() {
  const grid = document.getElementById('beasiswa-grid');

  try {
    const res = await fetch('data/beasiswa.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    allData = await res.json();

    // Simpan ke window agar popup.js bisa akses
    window.beasiswaData = allData;

    renderCards();
  } catch (err) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <i class="fas fa-exclamation-triangle" style="color:#fca5a5;"></i>
        <p style="font-size:15px;font-weight:700;color:#94a3b8;margin-bottom:6px;">
          Gagal memuat data beasiswa
        </p>
        <p style="font-size:13px;color:#cbd5e1;">
          Pastikan menggunakan live server. Silakan refresh atau hubungi admin.
        </p>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initFilterTabs();
  initSearch();
  initDirectory();
});
