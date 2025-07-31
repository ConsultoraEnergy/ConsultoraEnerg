document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  const runCounter = counter => {
    const target = +counter.dataset.target;
    const increment = target / speed;
    const update = () => {
      const value = +counter.innerText;
      if (value < target) {
        counter.innerText = Math.ceil(value + increment);
        requestAnimationFrame(update);
      } else {
        const suffix = counter.dataset.suffix || '+';
        counter.innerText = target + suffix;
      }
    };
    update();
  };
  const statsSection = document.getElementById('stats');
  let statsPlayed = false;
  const observerCounters = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsPlayed) {
        counters.forEach(runCounter);
        statsPlayed = true;
        observerCounters.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observerCounters.observe(statsSection);

  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  revealEls.forEach(el => revealObserver.observe(el));

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


// Simple hero slider
// Simple hero slider con función showSlide
// Simple hero slider con función showSlide
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('#hero .hero-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  if (!slides.length) return;

  let current = 0;

  // Prepara cada slide
  slides.forEach((slide, idx) => {
    slide.style.position   = 'absolute';
    slide.style.top        = '0';
    slide.style.left       = '0';
    slide.style.width      = '100%';
    slide.style.height     = '100%';
    slide.style.display    = 'block';             // ✅ aseguramos que esté en bloque
    slide.style.transition = 'opacity .6s ease-in-out';
    slide.style.opacity    = idx === 0 ? '1' : '0'; // solo el primero visible
  });

  // Función que muestra el slide idx y oculta el anterior
  const showSlide = idx => {
    slides[current].style.opacity = '0'; // oculta el actual
    slides[idx].style.opacity     = '1'; // muestra el nuevo
    current = idx;                      // actualiza índice
  };

  // Cambia de slide cada 4 s
  setInterval(() => {
    const nextIdx = (current + 1) % slides.length;
    showSlide(nextIdx);
  }, 4000);
});

// Espera a que toda la página cargue (incluyendo imágenes)
window.addEventListener('load', () => {
  // Retraso extra de 2 segundos antes de animar la curva
  setTimeout(() => {
    const path = document.getElementById('curvePath');
    if (path) {
      path.classList.add('animate');
    }
  }, 2000);
});

// Feedback de envío de formulario
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault(); // detenemos el envío por defecto

    // mostramos el mensaje
    formMessage.textContent = 'Su información ha sido recibida con éxito.';
    formMessage.hidden = false;

    // tras 2s, enviamos realmente el form
    setTimeout(() => contactForm.submit(), 2000);
  });
}



