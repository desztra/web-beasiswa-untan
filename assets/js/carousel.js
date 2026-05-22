// =====================================================
// carousel.js — Swiper.js Carousel Testimoni
// Touch-friendly, auto-play, responsive breakpoints
// =====================================================

let testimoniSwiper = null;

/** Render slide testimoni ke dalam swiper-wrapper */
function renderTestimoniSlides(data) {
  const wrapper = document.getElementById('testimonial-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = data.map(t => `
    <div class="swiper-slide" style="height:auto;">
      <div class="testimonial-card">
        <img
          src="${t.foto}"
          alt="Foto ${t.nama}"
          class="testimonial-avatar"
          loading="lazy"
          onerror="
            this.style.display='none';
            this.nextElementSibling.style.display='flex';
          "
        >
        <div
          class="testimonial-avatar"
          style="
            display:none;
            background:linear-gradient(135deg,#003150,#4a6bc5);
            align-items:center;
            justify-content:center;
            color:white;
            font-size:22px;
            font-weight:700;
          "
        >
          ${t.nama.charAt(0).toUpperCase()}
        </div>

        <div class="testimonial-name">${t.nama}</div>
        <div class="testimonial-beasiswa">${t.nama_beasiswa}</div>
        <p class="testimonial-quote">"${t.kutipan}"</p>
      </div>
    </div>
  `).join('');
}

/** Inisialisasi Swiper setelah slide di-render */
function initSwiper(count) {
  if (testimoniSwiper) {
    testimoniSwiper.destroy(true, true);
    testimoniSwiper = null;
  }

  testimoniSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: count > 3,
    centerInsufficientSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.testimonial-pagination',
      clickable: true,
    },
    grabCursor: true,
    breakpoints: {
      640:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    a11y: {
      prevSlideMessage: 'Slide sebelumnya',
      nextSlideMessage: 'Slide berikutnya',
    },
  });
}

/** Fetch data testimoni dan render */
async function initCarousel() {
  const section = document.getElementById('testimonial');

  try {
    const res = await fetch('data/testimoni.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (!data || data.length === 0) {
      // Sembunyikan seksi testimoni jika data kosong (sesuai UC-07 Alt Flow)
      section?.classList.add('hidden');
      return;
    }

    renderTestimoniSlides(data);

    // Init Swiper setelah DOM di-render
    requestAnimationFrame(() => initSwiper(data.length));

  } catch {
    // Jika gagal fetch, sembunyikan seksi (graceful degradation)
    section?.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', initCarousel);
