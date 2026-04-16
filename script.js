/* ====================================================
   BEEJET v2 — JAVASCRIPT
==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateBackToTop();
    updateActiveNavLink();
  });

  // ── Hamburger ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ── Active nav link ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }

  // ── Back to top ───────────────────────────────────
  const backTop = document.getElementById('backToTop');
  function updateBackToTop() { backTop.classList.toggle('visible', window.scrollY > 400); }
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Scroll reveal ─────────────────────────────────
  const revealEls = document.querySelectorAll('.svc-card, .gal-item, .testi-card, .cinfo-card, .about-text, .about-images, .hero-svc-card');
  revealEls.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // ── Counter animation ─────────────────────────────
  function animateCounter(el, target) {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 24);
  }
  const counterEls = document.querySelectorAll('.hsb-num[data-target]');
  let counted = false;
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        counterEls.forEach(el => animateCounter(el, parseInt(el.dataset.target)));
        heroObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const heroSection = document.getElementById('home');
  if (heroSection) heroObs.observe(heroSection);

  // ── Gallery filter ────────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.gal-item').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
        if (show) item.style.animation = 'fadeUp 0.4s ease both';
      });
    });
  });

  // ── Service Modal ─────────────────────────────────
  const modalData = {
    souvenirs: {
      icon: 'https://cdn-icons-png.flaticon.com/512/3082/3082044.png',
      title: 'Custom Souvenirs',
      desc: 'We create personalised, high-quality souvenirs that carry your brand\'s identity on every item. Perfect for corporate giveaways, events, birthdays, weddings and more.',
      items: ['Custom branded mugs & cups','Personalised T-shirts & polo shirts','Branded pens & stationery','Keychains, lanyards & badges','Gift sets & hampers','Phone cases & accessories','Branded water bottles & flasks','Notebooks & diaries']
    },
    corporate: {
      icon: 'https://cdn-icons-png.flaticon.com/512/3774/3774278.png',
      title: 'Corporate Branding',
      desc: 'We help businesses build a strong, consistent brand identity through quality printed merchandise and branded materials that leave a lasting impression.',
      items: ['Branded stationery packages','Corporate gift sets','Staff uniforms & branded apparel','Office branding materials','Business cards & letterheads','Branded packaging solutions','Promotional merchandise','Annual report printing']
    },
    uv: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991100.png',
      title: 'UV Direct & UV-DTF Printing',
      desc: 'Using the latest UV direct and UV-DTF printing technology, we print vibrant, durable designs on virtually any surface — rigid or flexible — with stunning detail.',
      items: ['Phone cases & covers','Bottles, flasks & tumblers','Wooden & bamboo items','Diary & notebook covers','Acrylic & glass surfaces','Metal & aluminium items','Leather goods','UV-DTF transfer stickers']
    },
    largeformat: {
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      title: 'Large Format Printing',
      desc: 'From bold event backdrops to eye-catching street banners, our large format printing delivers crisp, vibrant results at any scale.',
      items: ['Roll-up & retractable banners','Event backdrops & step-and-repeat','Outdoor & indoor banners','Vinyl & mesh signage','Window graphics & decals','Floor graphics','Exhibition displays','Vehicle wraps & branding']
    },
    events: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2838/2838779.png',
      title: 'Event Branding & Merchandise',
      desc: 'We turn events into unforgettable brand experiences — from weddings to corporate summits, full event branding packages included.',
      items: ['Acrylic & printed invitations','Event branded merchandise','Table centrepieces & décor','Branded gift bags & packaging','Photo booth props & backdrops','Event programmes & menus','Branded wristbands & lanyards','Memorial & funeral cards']
    },
    packaging: {
      icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
      title: 'Packaging & Promotional Products',
      desc: 'Great packaging is the first touchpoint between your brand and your customer. We create custom packaging and promotional products that make your brand stand out.',
      items: ['Custom product boxes & cartons','Branded paper & plastic bags','Stickers & label printing','Hang tags & swing tags','Tissue paper & wrapping','Promotional tote bags','Custom ribbon & seals','Thank you cards & inserts']
    }
  };

  window.openModal = function(key) {
    const data = modalData[key];
    if (!data) return;
    document.getElementById('modalIcon').innerHTML = `<img src="${data.icon}" alt="${data.title}" />`;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent  = data.desc;
    document.getElementById('modalList').innerHTML = data.items.map(i => `<li>${i}</li>`).join('');
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Contact form ──────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('name').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const email   = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      const subject = `New Enquiry from ${name}${service ? ' — ' + service : ''}`;
      let body = `Hello Beejet,\n\nYou have a new message from your website.\n\nName: ${name}`;
      if (phone)   body += `\nPhone: ${phone}`;
      if (email)   body += `\nEmail: ${email}`;
      if (service) body += `\nService: ${service}`;
      if (message) body += `\n\nMessage:\n${message}`;

      window.location.href = `mailto:beejetevents@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast('Opening your email client... 📧');
      form.reset();
    });
  }

  // ── Toast ─────────────────────────────────────────
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    t.style.cssText = `position:fixed;bottom:86px;left:50%;transform:translateX(-50%) translateY(16px);background:#0F1623;color:#fff;padding:11px 24px;border-radius:999px;font-size:0.86rem;font-weight:600;border:1px solid rgba(233,30,140,0.35);z-index:9999;opacity:0;transition:all 0.35s ease;white-space:nowrap;`;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(16px)'; setTimeout(() => t.remove(), 350); }, 3000);
  }

});
