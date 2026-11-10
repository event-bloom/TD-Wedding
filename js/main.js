/* ================================================================
   DINITHI & PASINDU — WEDDING INVITATION
   js/main.js — vanilla JavaScript, no libraries

   1.  SETTINGS you may edit (date + WhatsApp number)
   2.  Falling petals in the hero
   3.  Hero entrance animation
   4.  Scroll reveal (IntersectionObserver)
   5.  Gallery stagger + lightbox
   6.  Countdown timer
   7.  RSVP form (opens WhatsApp)
   8.  Scroll progress bar
   9.  Hero medallion parallax
   10. Smooth anchor scrolling
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SETTINGS ──────────────────────────────────────────────
     The only two values most people change.
     Full instructions are in README.md.
  ─────────────────────────────────────────────────────────────── */
  const CONFIG = {
    // Wedding start — ISO format, Sri Lanka time (+05:30).
    weddingDate: '2026-12-10T09:30:00+05:30',

    // WhatsApp number that receives RSVPs: country code + number,
    // no spaces, no leading zero. Example: 94771234567
    whatsappNumber: '94743045008'
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the footer WhatsApp link in sync with the number above
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = 'https://wa.me/' + CONFIG.whatsappNumber;
  });


  /* ── 2. FALLING PETALS ────────────────────────────────────────
     Creates the floating lotus petals in the hero.
  ─────────────────────────────────────────────────────────────── */
  const petalField = document.getElementById('petalField');

  if (petalField && !reducedMotion) {
    const colours = [
      'rgba(110, 27, 34, 0.14)',
      'rgba(200, 155, 74, 0.28)',
      'rgba(140, 42, 49, 0.12)',
      'rgba(200, 155, 74, 0.16)',
      'rgba(110, 27, 34, 0.2)'
    ];
    const total = window.innerWidth < 640 ? 10 : 20;

    for (let i = 0; i < total; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.setProperty('--s', (7 + Math.random() * 9).toFixed(1) + 'px');
      petal.style.setProperty('--dur', (12 + Math.random() * 12).toFixed(1) + 's');
      petal.style.setProperty('--delay', (-Math.random() * 22).toFixed(1) + 's');
      petal.style.setProperty('--drift', Math.round(Math.random() * 180 - 90) + 'px');
      petal.style.setProperty('--c', colours[i % colours.length]);
      petalField.appendChild(petal);
    }
  }


  /* ── 3. HERO ENTRANCE ─────────────────────────────────────────
     Staggers the hero text in on page load.
  ─────────────────────────────────────────────────────────────── */
  const heroItems = document.querySelectorAll('.hero-anim');
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 200 + i * 130);
  });


  /* ── 4. SCROLL REVEAL ─────────────────────────────────────────
     Adds .in to .reveal / .reveal-zoom elements as they appear.
     Optional data-delay="120" adds a delay in milliseconds.
  ─────────────────────────────────────────────────────────────── */
  const revealItems = document.querySelectorAll('.reveal, .reveal-zoom');

  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('in'), delay);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('in'));
  }


  /* ── 5. GALLERY + LIGHTBOX ─────────────────────────────────── */
  const galleryGrid = document.querySelector('.gallery-grid');
  const galleryItems = Array.from(document.querySelectorAll('.g-item'));

  if (galleryGrid && 'IntersectionObserver' in window && !reducedMotion) {
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        galleryItems.forEach((item, i) => {
          setTimeout(() => item.classList.add('in'), i * 75);
        });
        galleryObserver.disconnect();
      });
    }, { threshold: 0.08 });

    galleryObserver.observe(galleryGrid);
  } else {
    galleryItems.forEach((item) => item.classList.add('in'));
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentPhoto = 0;
  let lastTrigger = null;

  function showPhoto(index) {
    if (!galleryItems.length) return;

    currentPhoto = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentPhoto];
    const img = item.querySelector('img');

    lightboxImg.src = item.dataset.full || img.src;
    lightboxImg.alt = img.alt || 'Wedding photo';
  }

  function openLightbox(index, trigger) {
    lastTrigger = trigger || null;
    showPhoto(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');

    if (lastTrigger) lastTrigger.focus();
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i, item));
  });

  if (lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showPhoto(currentPhoto - 1));
    lightboxNext.addEventListener('click', () => showPhoto(currentPhoto + 1));

    // Click on the dark backdrop closes the lightbox
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
      if (e.key === 'ArrowRight') showPhoto(currentPhoto + 1);
    });
  }


  /* ── 6. COUNTDOWN ────────────────────────────────────────────
     Target date comes from CONFIG.weddingDate above.
  ─────────────────────────────────────────────────────────────── */
  const weddingDate = new Date(CONFIG.weddingDate);
  const countdownEl = document.getElementById('countdown');

  const pad = (n) => String(n).padStart(2, '0');

  function setNumber(id, value) {
    const el = document.getElementById(id);
    if (!el) return;

    const text = pad(value);
    if (el.textContent === text) return;

    el.textContent = text;

    if (reducedMotion) return;

    // Web Animations API — replays without forcing a layout reflow
    el.animate(
      [
        { transform: 'translateY(-8px) scale(0.94)', opacity: 0.35 },
        { transform: 'translateY(0) scale(1)', opacity: 1 }
      ],
      { duration: 500, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }
    );
  }

  function tick() {
    if (!countdownEl) return;

    const diff = weddingDate - new Date();

    if (diff <= 0) {
      countdownEl.innerHTML =
        '<p class="section-title" style="margin:0">Today is the day ✦</p>';
      return;
    }

    setNumber('cd-days', Math.floor(diff / 864e5));
    setNumber('cd-hours', Math.floor((diff % 864e5) / 36e5));
    setNumber('cd-mins', Math.floor((diff % 36e5) / 6e4));
    setNumber('cd-secs', Math.floor((diff % 6e4) / 1e3));
  }

  tick();
  setInterval(tick, 1000);


  /* ── 7. RSVP FORM ────────────────────────────────────────────
     Builds a WhatsApp message from the form and opens it.
  ─────────────────────────────────────────────────────────────── */
  const form = document.querySelector('.rsvp-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('#rsvpName');
      const phoneInput = form.querySelector('#rsvpPhone');
      const guestsInput = form.querySelector('#rsvpGuests');
      const attending = form.querySelector('input[name="attending"]:checked');

      const name = (nameInput.value || '').trim();
      const phone = (phoneInput.value || '').trim();
      const guests = guestsInput.value;

      // Name and attendance are required
      if (!name || !attending) {
        form.classList.remove('is-error');
        void form.offsetWidth;
        form.classList.add('is-error');

        if (!name) nameInput.focus();
        return;
      }

      const message = [
        '✦ RSVP — Dinithi & Pasindu Wedding',
        'Name: ' + name,
        phone ? 'Phone: ' + phone : '',
        guests ? 'Guests: ' + guests : '',
        'Attending: ' + (attending.value === 'yes' ? 'Joyfully Accepts ✓' : 'Regretfully Declines')
      ].filter(Boolean).join('\n');

      window.open(
        'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message),
        '_blank'
      );

      // Replace the form with a thank-you note
      form.style.transition = 'opacity 0.35s, transform 0.35s';
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        form.innerHTML =
          '<div class="rsvp-thanks">' +
            '<h3>Thank you, ' + name.split(' ')[0] + '!</h3>' +
            '<p>We look forward to celebrating with you.</p>' +
          '</div>';
        form.style.opacity = '1';
        form.style.transform = 'none';
      }, 380);
    });
  }


  /* ── 8. SCROLL PROGRESS BAR ────────────────────────────────── */
  const progressBar = document.getElementById('progressBar');

  function updateProgress() {
    if (!progressBar) return;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;

    progressBar.style.transform = 'scaleX(' + Math.min(Math.max(ratio, 0), 1) + ')';
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);


  /* ── 9. HERO MEDALLION PARALLAX ──────────────────────────────
     The lotus medallions drift slightly with the mouse and scroll.
  ─────────────────────────────────────────────────────────────── */
  const hero = document.querySelector('.hero');
  const medallions = Array.from(document.querySelectorAll('.hero-medallion'));

  if (hero && medallions.length && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let frame = null;

    function renderParallax() {
      frame = null;

      const scrollOffset = window.scrollY;

      medallions.forEach((el) => {
        const depth = Number(el.dataset.parallax || 0);
        const x = mouseX * (depth / 140);
        const y = mouseY * (depth / 140) - scrollOffset * (depth / 900);
        el.style.transform = 'translate3d(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px, 0)';
      });
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;

      if (!frame) frame = requestAnimationFrame(renderParallax);
    });

    window.addEventListener('scroll', () => {
      // Stop doing any work once the hero has left the viewport
      if (window.scrollY > hero.offsetHeight) return;
      if (!frame) frame = requestAnimationFrame(renderParallax);
    }, { passive: true });
  }


  /* ── 10. SMOOTH ANCHOR SCROLL ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

});
