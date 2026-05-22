// =====================================================
// main.js — Inisialisasi Utama
// Sticky Navbar, Hamburger Menu, Smooth Scroll, AOS, Active Nav
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── AOS (Animate on Scroll) ────────────────────────
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  });


  // ─── Sticky Navbar ──────────────────────────────────
  // Navbar sudah fixed di CSS; tidak perlu mengubah warna karena
  // warna primary sudah menjadi identitas halaman ini.
  // Namun kita tambahkan shadow saat scroll untuk depth effect.
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial call


  // ─── Ticker Visibility (Muncul setelah Hero & Stats) ─
  const ticker = document.querySelector('.ticker-wrapper');
  const statsSection = document.getElementById('statistics');
  
  const handleTickerVisibility = () => {
    if (!ticker || !statsSection) return;
    
    // Ticker muncul setelah melewati batas bawah elemen statistik
    const statsBottom = statsSection.offsetTop + statsSection.offsetHeight;
    
    if (window.scrollY > statsBottom) {
      ticker.classList.add('show-ticker');
    } else {
      ticker.classList.remove('show-ticker');
    }
  };
  
  window.addEventListener('scroll', handleTickerVisibility, { passive: true });
  // Call once on load with a slight delay to ensure layout is ready
  setTimeout(handleTickerVisibility, 100);


  // ─── Hamburger Menu (Mobile) ─────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');

    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (isOpen) {
      icon.className = 'fas fa-bars text-lg';
    } else {
      icon.className = 'fas fa-times text-lg';
    }

    // Aksesibilitas
    hamburger.setAttribute('aria-expanded', String(!isOpen));
  });


  // ─── Smooth Scroll untuk anchor links ──────────────
  // Sesuai SDD: CSS scroll-behavior + JS fallback dengan offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href   = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = navbar.offsetHeight || 110;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 4;
      window.scrollTo({ top, behavior: 'smooth' });

      // Tutup mobile menu jika sedang terbuka
      mobileMenu?.classList.add('hidden');
      const icon = hamburger?.querySelector('i');
      if (icon) icon.className = 'fas fa-bars text-lg';
    });
  });


  // ─── Active Nav Link via IntersectionObserver ──────
  // Sesuai SDD fitur #4: highlight menu sesuai seksi yang terlihat
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('a.nav-link');

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -65% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));


  // ─── Back to Top visibility ────────────────────────
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Contact Us Modal (Hubungi Kami) ────────────────
  const btnOpenContact = document.getElementById('btn-open-contact');
  const contactOverlay = document.getElementById('contact-overlay');
  const contactModal = document.getElementById('contact-modal');
  const contactClose = document.getElementById('contact-close');
  const contactBackdrop = document.getElementById('contact-backdrop');

  const openContactModal = () => {
    if (!contactOverlay) return;
    contactOverlay.classList.remove('hidden');
    contactOverlay.classList.add('flex');
    // Animasi muncul
    setTimeout(() => {
      contactOverlay.classList.remove('opacity-0');
      contactModal.classList.remove('scale-95');
      contactModal.classList.add('scale-100');
    }, 10);
  };

  const closeContactModal = () => {
    if (!contactOverlay) return;
    contactOverlay.classList.add('opacity-0');
    contactModal.classList.remove('scale-100');
    contactModal.classList.add('scale-95');
    // Tunggu animasi selesai baru di-hide
    setTimeout(() => {
      contactOverlay.classList.remove('flex');
      contactOverlay.classList.add('hidden');
    }, 300);
  };

  if (btnOpenContact) btnOpenContact.addEventListener('click', openContactModal);
  if (contactClose) contactClose.addEventListener('click', closeContactModal);
  if (contactBackdrop) contactBackdrop.addEventListener('click', closeContactModal);

}); // end DOMContentLoaded
