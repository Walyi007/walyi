/* =========================================================
   PORTFOLIO — interactions
   ========================================================= */

/* ===== LOADER ===== */
(function () {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  let p = 0;
  const timer = setInterval(() => {
    p = Math.min(100, p + Math.random() * 22 + 8);
    if (fill) fill.style.width = p + '%';
    if (p >= 100) {
      clearInterval(timer);
      setTimeout(() => loader && loader.classList.add('done'), 280);
    }
  }, 140);
  window.addEventListener('load', () => {
    if (fill) fill.style.width = '100%';
    clearInterval(timer);
    setTimeout(() => loader && loader.classList.add('done'), 380);
  });
})();

/* ===== ANNÉE ===== */
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ===== NAV : scroll + liens actifs ===== */
(function () {
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  const toTop = document.getElementById('toTop');
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('show', y > 500);

    let current = null;
    sections.forEach((s) => {
      if (s.offsetTop - 140 <= y) current = s;
    });
    links.forEach((a) =>
      a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id)
    );
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ===== MENU MOBILE ===== */
(function () {
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    links.classList.toggle('open');
    burger.innerHTML = links.classList.contains('open')
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
    burger.setAttribute('aria-expanded', links.classList.contains('open'));
  });

  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      burger.setAttribute('aria-expanded', 'false');
    })
  );

  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !burger.contains(e.target)) {
      links.classList.remove('open');
      burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ===== THÈME ===== */
(function () {
  const btn = document.getElementById('themeToggle');
  const icon = btn ? btn.querySelector('i') : null;
  const saved = localStorage.getItem('portfolio-theme');

  function apply(theme) {
    document.body.classList.toggle('light', theme === 'light');
    if (icon) {
      icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  apply(saved || 'dark');

  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.body.classList.contains('light') ? 'dark' : 'light';
      localStorage.setItem('portfolio-theme', next);
      apply(next);
    });
  }
})();

/* ===== REVEAL AU SCROLL ===== */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in'), i * 70);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  items.forEach((el) => io.observe(el));
})();

/* ===== COMPTEURS ===== */
(function () {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const dur = 1400;
        const start = performance.now();

        function step(now) {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + (t === 1 && target >= 10 ? '+' : '');
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((el) => io.observe(el));
})();

/* ===== BARRES DE COMPÉTENCES ===== */
(function () {
  const bars = document.querySelectorAll('.track i');
  if (!bars.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => {
          el.style.width = (el.dataset.w || '0') + '%';
        }, i * 120);
        io.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((el) => io.observe(el));
})();

/* ===== EFFET MACHINE À ÉCRIRE ===== */
(function () {
  const el = document.getElementById('typed');
  if (!el) return;

  const roles = [
    'Data Analyst Junior',
    'SQL • Python • Power BI',
    'Stagiaire Fullstack — Port Autonome',
    'Cotonou, Bénin'
  ];

  let r = 0, c = 0, deleting = false;

  function tick() {
    const word = roles[r];
    el.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);

    let delay = deleting ? 45 : 85;

    if (!deleting && c > word.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && c < 0) {
      deleting = false;
      r = (r + 1) % roles.length;
      c = 0;
      delay = 350;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ===== PARALLAX LÉGER SUR LA PHOTO ===== */
(function () {
  const frame = document.querySelector('.photo-frame');
  if (!frame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 1000) return;

  window.addEventListener(
    'mousemove',
    (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      frame.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    { passive: true }
  );
})();

/* ===== FORMULAIRE ===== */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    const btn = document.getElementById('submitBtn');

    if (!name || !email || !message) {
      note.textContent = 'Merci de remplir le nom, l\u2019email et le message.';
      note.className = 'form-note err';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = 'Adresse email invalide.';
      note.className = 'form-note err';
      return;
    }

    const original = btn.innerHTML;
    btn.innerHTML = '<span>Envoi en cours…</span><i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      form.reset();
      note.textContent = 'Message bien envoyé ! Walyi vous répondra très vite.';
      note.className = 'form-note ok';
    }, 900);
  });
})();
