document.addEventListener('DOMContentLoaded', () => {

  // ===== DEVICE DETECTION =====
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  document.body.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
  document.body.classList.add(isTouch ? 'is-touch' : 'is-no-touch');

  // ===== CURSOR GLOW (desktop only) =====
  if (!isMobile && !isTouch) {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
      document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
      });
    }
  } else {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) cursorGlow.style.display = 'none';
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // ===== NAV SCROLL =====
  const navBar = document.querySelector('.nav-bar');
  window.addEventListener('scroll', () => {
    navBar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ===== NAV BUTTONS =====
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== HERO CTA =====
  document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== SCROLL TOP =====
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== INTERSECTION OBSERVER =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== ROTATING WORDS =====
  const words = document.querySelectorAll('.rotating-word');
  let current = 0;

  function showWord() {
    words.forEach(w => w.classList.remove('active'));
    if (words[current]) words[current].classList.add('active');
    current = (current + 1) % words.length;
  }

  if (words.length > 0) {
    showWord();
    setInterval(showWord, 2200);
  }

  // ===== COUNTER ANIMATION =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const text = entry.target.textContent;
        if (text === '∞') return;
        const target = parseInt(text);
        if (isNaN(target)) return;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 20));
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(interval);
          }
          entry.target.textContent = count;
        }, 40);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(c => counterObserver.observe(c));

  // ===== RESPONSIVE RESIZE =====
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-check mobile state
      const nowMobile = window.innerWidth < 1024;
      document.body.classList.toggle('is-mobile', nowMobile);

      // Close mobile menu on resize to desktop
      if (!nowMobile && hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    }, 150);
  });

});
