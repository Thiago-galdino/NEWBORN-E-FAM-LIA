/* ── NAVBAR SCROLL ────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── HERO PARALLAX ────────────────────────────────────── */
const heroBg = document.getElementById('heroBg');
let ticking  = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (heroBg && scrollY < window.innerHeight * 1.5) {
        heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── REVEAL ON SCROLL ─────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── ANIMATED COUNTERS ────────────────────────────────── */
const counterEls = document.querySelectorAll('.counter-num');

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('pt-BR');
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

/* ── FAQ ACCORDION ────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── CONTACT FORM ─────────────────────────────────────── */
const form = document.getElementById('agendamentoForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-form');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    setTimeout(() => {
      form.innerHTML = `
        <div class="form-success">
          <p style="font-size:2.5rem;margin-bottom:.6rem">✦</p>
          <h3>Mensagem recebida com carinho!</h3>
          <p>Vou entrar em contato em breve pelo WhatsApp.<br/>Mal posso esperar para conhecer a sua história.</p>
        </div>`;
    }, 1200);
  });
}

/* ── SMOOTH ANCHOR SCROLL ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── LAZY LOAD FALLBACK (for browsers without native) ──── */
if ('loading' in HTMLImageElement.prototype === false) {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imgObserver.unobserve(img);
      }
    });
  });
  imgs.forEach(img => imgObserver.observe(img));
}
