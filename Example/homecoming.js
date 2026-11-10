/* ================================================================
   homecoming.js — Velvet Night Homecoming Template
   Pure vanilla JS, no dependencies.

   1. Hero entrance — staggered text reveal
   2. Scroll reveal — IntersectionObserver
   3. Timeline stagger — alternating slide-in
   4. Gallery stagger
   5. Countdown timer
   6. RSVP form — WhatsApp + confirmation
   7. Smooth scroll
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HERO ENTRANCE ─────────────────────────────────────────
     Each child of .hero-text gets class .in with a staggered delay.
  ──────────────────────────────────────────────────────────────── */
  const heroChildren = document.querySelectorAll('.hero-text > *');
  heroChildren.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('in');
    }, 180 + i * 130);
  });


  /* ── 2. SCROLL REVEAL — general sections ─────────────────────
     Watches .hc-reveal and .hc-scale, adds .in on viewport entry.
  ──────────────────────────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Respect data-delay attribute (seconds)
        const delay = parseFloat(e.target.dataset.delay || 0) * 1000;
        setTimeout(() => e.target.classList.add('in'), delay);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.hc-reveal, .hc-scale').forEach(el => revealObs.observe(el));


  /* ── 3. TIMELINE — staggered alternating slide-in ─────────────
  ──────────────────────────────────────────────────────────────── */
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const items = document.querySelectorAll('.tl-item');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('in'), i * 140);
        });
        tlObs.disconnect();
      }
    });
  }, { threshold: 0.06 });

  const tlWrap = document.querySelector('.tl-wrap');
  if (tlWrap) tlObs.observe(tlWrap);


  /* ── 4. GALLERY STAGGER ───────────────────────────────────────
  ──────────────────────────────────────────────────────────────── */
  const galObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const items = document.querySelectorAll('.hc-gal-ani');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('in'), i * 70);
        });
        galObs.disconnect();
      }
    });
  }, { threshold: 0.05 });

  const galGrid = document.querySelector('.hc-gal-grid');
  if (galGrid) galObs.observe(galGrid);


  /* ── 5. COUNTDOWN TIMER ───────────────────────────────────────
     ↓ EDIT this per client
  ──────────────────────────────────────────────────────────────── */
  const WEDDING_DATE = new Date('2026-05-20T18:30:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      const el = document.getElementById('countdown');
      if (el) el.innerHTML = '<p class="hc-heading light" style="margin:0">Today is the day! ✦</p>';
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);

    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = pad(v); };
    set('cd-days', d); set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
  }
  tick();
  setInterval(tick, 1000);


  /* ── 6. RSVP FORM ────────────────────────────────────────────
     Sends via WhatsApp. Replace number per client.
  ──────────────────────────────────────────────────────────────── */
  const form = document.querySelector('.rsvp-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name      = (this.querySelector('input[type="text"]')?.value || '').trim();
      const phone     = (this.querySelector('input[type="tel"]')?.value  || '').trim();
      const guests    = (this.querySelector('select')?.value || '');
      const attending = this.querySelector('input[name="attending"]:checked');

      if (!name || !attending) {
        // Subtle shake
        let i = 0;
        const shake = setInterval(() => {
          this.style.transform = i % 2 === 0 ? 'translateX(-5px)' : 'translateX(5px)';
          if (++i >= 6) { clearInterval(shake); this.style.transform = ''; }
        }, 70);
        return;
      }

      /* ── WhatsApp — replace number ───────────────────────── */
      const msg = [
        '✦ RSVP — Homecoming Celebration',
        `Name: ${name}`,
        phone    ? `Phone: ${phone}` : '',
        guests   ? `Guests: ${guests}` : '',
        `Attending: ${attending.value === 'yes' ? 'Joyfully Accepts ✓' : 'Regretfully Declines'}`
      ].filter(Boolean).join('\n');

      window.open(`https://wa.me/94712623041?text=${encodeURIComponent(msg)}`, '_blank');

      /* ── Formspree alternative ── uncomment + set your ID ──
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, guests, attending: attending.value })
      });
      */

      // Fade out → thank-you message
      this.style.transition = 'opacity 0.35s, transform 0.35s';
      this.style.opacity    = '0';
      this.style.transform  = 'translateY(-12px)';
      setTimeout(() => {
        this.innerHTML = `
          <div style="text-align:center;padding:3rem 0;">
            <p style="font-family:'Parisienne',cursive;font-size:2.8rem;color:var(--clr-gold-light);line-height:1.2;margin-bottom:0.6rem;">
              Thank you, ${name}!
            </p>
            <p style="font-family:'Raleway',sans-serif;font-size:0.82rem;color:rgba(255,255,255,0.4);letter-spacing:0.08em;">
              We look forward to celebrating with you.
            </p>
          </div>`;
        this.style.opacity   = '1';
        this.style.transform = 'none';
      }, 380);
    });
  }


  /* ── 7. SMOOTH ANCHOR SCROLL ─────────────────────────────────
  ──────────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
