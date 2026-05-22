// =====================================================
// counter.js — Animasi Counter Statistik
// Menggunakan IntersectionObserver + requestAnimationFrame
// =====================================================

/**
 * Animasi angka dari 0 ke nilai target
 * @param {HTMLElement} el - Elemen yang menampilkan angka
 * @param {number} target - Angka target
 * @param {number} duration - Durasi animasi dalam ms
 */
function animateCounter(el, target, duration = 1800) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic — percepat di awal, lambat di akhir
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = parseInt(entry.target.dataset.counter, 10) || 0;
          animateCounter(entry.target, target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initCounters);
