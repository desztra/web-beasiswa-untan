// =====================================================
// popup.js — Modal Detail Beasiswa
// Tutup via: tombol ×, klik overlay, tekan Escape
// =====================================================

const overlay   = document.getElementById('popup-overlay');
const modal     = document.getElementById('popup-modal');
const closeBtn  = document.getElementById('popup-close');
const popupBody = document.getElementById('popup-content');

// Format tanggal ke format Indonesia
function fmtDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  if (isNaN(d.getTime())) return str;
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Buka popup modal untuk beasiswa dengan ID tertentu
 * Data diambil dari window.beasiswaData yang diset oleh filter.js
 */
function openPopup(id) {
  const data = window.beasiswaData || [];
  const bsw  = data.find(b => b.id === id);
  if (!bsw) return;

  const isBuka = bsw.status === 'Buka';
  const badgeClass = isBuka ? 'badge-buka' : 'badge-ditutup';

  // Bangun list syarat umum
  const syaratItems = (bsw.syarat_umum || [])
    .map(s => `
      <li>
        <i class="fas fa-check-circle"></i>
        <span>${s}</span>
      </li>`)
    .join('');

  const syaratHTML = syaratItems
    ? `<ul class="syarat-list">${syaratItems}</ul>`
    : `<p style="font-size:13px;color:#94a3b8;font-style:italic;">
        Syarat belum tersedia. Kunjungi sumber resmi.
       </p>`;

  const hasUrl = bsw.url_sumber && bsw.url_sumber !== '#';

  // Render konten popup
  popupBody.innerHTML = `
    <!-- Thumbnail / Hero gambar -->
    <img
      src="${bsw.thumbnail || ''}"
      alt="${bsw.nama}"
      class="popup-hero"
      onerror="this.style.display='none'"
    >

    <div class="popup-body">
      <!-- Badge status + kategori -->
      <div class="popup-kategori-row">
        <span class="badge-status ${badgeClass}">${bsw.status}</span>
        <span class="popup-kategori">${bsw.kategori}</span>
      </div>

      <!-- Judul -->
      <h2 id="popup-title" class="popup-title">${bsw.nama}</h2>

      <!-- Deskripsi singkat -->
      <p class="popup-desc">${bsw.deskripsi_singkat}</p>

      <!-- Syarat Umum -->
      <div class="popup-section-title">
        <i class="fas fa-list-check"></i>
        Syarat Umum
      </div>
      ${syaratHTML}

      <!-- Periode Pendaftaran -->
      <div class="popup-periode">
        <div class="popup-periode-item">
          <label>Tanggal Buka</label>
          <span>${fmtDate(bsw.tanggal_buka)}</span>
        </div>
        <div class="popup-periode-item">
          <label>Tanggal Tutup</label>
          <span style="${!isBuka ? 'color:#EF4444;' : ''}">${fmtDate(bsw.tanggal_tutup)}</span>
        </div>
      </div>

      <!-- Kontak -->
      ${bsw.kontak ? `
      <div class="popup-kontak">
        <i class="fas fa-phone-alt"></i>
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px;">Kontak</div>
          ${bsw.kontak}
        </div>
      </div>` : ''}

      <!-- Tombol Info Lebih Lanjut (UC-05) -->
      ${hasUrl
        ? `<a
            href="${bsw.url_sumber}"
            target="_blank"
            rel="noopener noreferrer"
            class="popup-cta"
            aria-label="Info lebih lanjut tentang ${bsw.nama}"
          >
            Info Lebih Lanjut
            <i class="fas fa-external-link-alt" style="font-size:12px;"></i>
          </a>`
        : `<button class="popup-cta disabled" disabled aria-disabled="true">
            Info Lebih Lanjut
            <i class="fas fa-external-link-alt" style="font-size:12px;"></i>
          </button>
          <p style="text-align:center;font-size:11px;color:#94a3b8;margin-top:8px;">
            Tautan tidak tersedia. Silakan hubungi admin prodi.
          </p>`
      }
    </div>
  `;

  // Tampilkan overlay
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Set focus ke modal untuk aksesibilitas
  setTimeout(() => modal.focus(), 50);
}

/** Tutup popup modal */
function closePopup() {
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

// === Event Listeners untuk menutup popup ===

// 1. Tombol × close
closeBtn?.addEventListener('click', closePopup);

// 2. Klik di luar area modal (backdrop)
document.getElementById('popup-backdrop')?.addEventListener('click', closePopup);

// 3. Tekan Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('show')) {
    closePopup();
  }
});

// Expose ke global (dipanggil dari onclick di kartu)
window.openPopup  = openPopup;
window.closePopup = closePopup;
