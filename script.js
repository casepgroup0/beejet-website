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

  // ── Service Modal ─────────────────────────────────
  const modalData = {
    souvenirs: {
      icon: 'https://cdn-icons-png.flaticon.com/512/3082/3082044.png',
      title: 'Custom Souvenirs',
      desc: 'We create personalised, high-quality souvenirs that carry your brand\'s identity on every item. Perfect for corporate giveaways, events, birthdays, weddings, and more.',
      items: [
        'Custom branded mugs & cups',
        'Personalised T-shirts & polo shirts',
        'Branded pens & stationery',
        'Keychains, lanyards & badges',
        'Gift sets & hampers',
        'Phone cases & accessories',
        'Branded water bottles & flasks',
        'Notebooks & diaries'
      ]
    },
    corporate: {
      icon: 'https://cdn-icons-png.flaticon.com/512/3774/3774278.png',
      title: 'Corporate Branding',
      desc: 'We help businesses build a strong, consistent brand identity through quality printed merchandise and branded materials that leave a lasting impression on clients and staff.',
      items: [
        'Branded stationery packages',
        'Corporate gift sets',
        'Staff uniforms & branded apparel',
        'Office branding materials',
        'Business cards & letterheads',
        'Branded packaging solutions',
        'Promotional merchandise',
        'Annual report printing'
      ]
    },
    uv: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991100.png',
      title: 'UV Direct & UV-DTF Printing',
      desc: 'Using the latest UV direct and UV-DTF printing technology, we print vibrant, durable designs on virtually any surface — rigid or flexible — with stunning detail and colour accuracy.',
      items: [
        'Phone cases & covers',
        'Bottles, flasks & tumblers',
        'Wooden & bamboo items',
        'Diary & notebook covers',
        'Acrylic & glass surfaces',
        'Metal & aluminium items',
        'Leather goods',
        'UV-DTF transfer stickers'
      ]
    },
    largeformat: {
      icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      title: 'Large Format Printing',
      desc: 'From bold event backdrops to eye-catching street banners, our large format printing delivers crisp, vibrant results at any scale. Ideal for events, retail spaces, offices and outdoor advertising.',
      items: [
        'Roll-up & retractable banners',
        'Event backdrops & step-and-repeat',
        'Outdoor & indoor banners',
        'Vinyl & mesh signage',
        'Window graphics & decals',
        'Floor graphics',
        'Exhibition displays',
        'Vehicle wraps & branding'
      ]
    },
    events: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2838/2838779.png',
      title: 'Event Branding & Merchandise',
      desc: 'We turn events into unforgettable brand experiences. From weddings to corporate summits, we provide full event branding packages — including branded merchandise, signage, invitations, and giveaways.',
      items: [
        'Acrylic & printed invitations',
        'Event branded merchandise',
        'Table centrepieces & décor',
        'Branded gift bags & packaging',
        'Photo booth props & backdrops',
        'Event programmes & menus',
        'Branded wristbands & lanyards',
        'Memorial & funeral cards'
      ]
    },
    packaging: {
      icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
      title: 'Packaging & Promotional Products',
      desc: 'Great packaging is the first touchpoint between your brand and your customer. We create custom packaging and promotional products that elevate your brand and make your products stand out on the shelf.',
      items: [
        'Custom product boxes & cartons',
        'Branded paper & plastic bags',
        'Stickers & label printing',
        'Hang tags & swing tags',
        'Tissue paper & wrapping',
        'Promotional tote bags',
        'Custom ribbon & seals',
        'Thank you cards & inserts'
      ]
    }
  };

  window.openModal = function(key) {
    const data = modalData[key];
    if (!data) return;

    document.getElementById('modalIcon').innerHTML = `<img src="${data.icon}" alt="${data.title}" />`;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalList').innerHTML = data.items.map(i => `<li>${i}</li>`).join('');
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const email   = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      // Build email subject and body
      const subject = `New Enquiry from ${name}${service ? ' — ' + service : ''}`;
      let body = `Hello Beejet,\n\nYou have a new message from your website.\n\n`;
      body += `Name: ${name}\n`;
      if (phone) body += `Phone: ${phone}\n`;
      if (email) body += `Email: ${email}\n`;
      if (service) body += `Service: ${service}\n`;
      if (message) body += `\nMessage:\n${message}`;

      const mailtoURL = `mailto:beejetevents@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoURL;

      showToast('Opening your email client... 📧');
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
