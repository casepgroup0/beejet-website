/* ====================================================
   BEEJET SOUVENIRS & PRINTING — JAVASCRIPT
==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateBackToTop();
    updateActiveNavLink();
  });

  // ── Hamburger menu toggle ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)'  : '';
    spans[1].style.opacity   = isOpen ? '0'                               : '';
    spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  // ── Active nav link on scroll ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 100;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  // ── Back to top button ────────────────────────────
  const backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Scroll reveal animation ───────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .gallery-item, .testimonial-card, .contact-card, .about-text, .about-images'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ── Gallery filter ────────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        if (show) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeUp 0.4s ease both';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ── Contact form submission ───────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      // Build WhatsApp message
      let waMsg = `Hello Beejet! 👋\n\nMy name is *${name}*`;
      if (phone)   waMsg += `\nPhone: ${phone}`;
      if (service) waMsg += `\nService needed: *${service}*`;
      if (message) waMsg += `\n\nMessage: ${message}`;

      const waNumber = '233557079120';
      const waURL    = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

      // Open WhatsApp
      window.open(waURL, '_blank');

      // Show success feedback
      showToast('Message ready! Opening WhatsApp... 🚀');
      contactForm.reset();
    });
  }

  // ── Toast notification ────────────────────────────
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #1A1A2E;
      color: #fff;
      padding: 12px 28px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 500;
      border: 1px solid rgba(233,30,140,0.4);
      z-index: 9999;
      opacity: 0;
      transition: all 0.4s ease;
      white-space: nowrap;
    `;

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ── Animate counters in hero stats ───────────────
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // Trigger counters when hero is visible
  const heroStats = document.querySelectorAll('.stat-num');
  const targets = [500, 200, 5];
  const suffixes = ['+', '+', '+'];
  let counted = false;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        heroStats.forEach((el, i) => {
          animateCounter(el, targets[i], suffixes[i]);
        });
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);

});
