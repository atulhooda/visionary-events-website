/* =========================================================
   Visionary Events — interactions & motion
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const WA_NUMBER = '918530722768';
  const EMAIL = 'info@visionaryevents.in';

  /* ---------------- HERO DATA ---------------- */
  const slides = [
    { word: 'Stages', title: 'Concerts & live shows', text: 'Truss, line arrays and a lighting rig built for the drop. Stages that hold a crowd from the first beat to the encore.' },
    { word: 'Weddings', title: 'Destination weddings', text: 'Floral mandaps, glowing stages and every ritual in its place, from the first venue visit to the last dance.' },
    { word: 'Summits', title: 'Corporate events', text: 'Conferences, award nights and launches with LED stages, show control and run of show handled for you.' },
    { word: 'Nights', title: 'Festivals & celebrations', text: 'Cultural festivals and private parties lit, staged and produced so your guests remember the night.' },
  ];

  /* ---------------- PRELOADER ---------------- */
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  const count = $('#preloaderCount');
  const heroImgs = preloader ? ['social/image53', 'wedding/image18', 'corporate/image26', 'social/image46'].map(p => `assets/img/gallery/${p}.jpeg`) : [];
  let loaded = 0, shown = 0;
  const target = () => Math.min(100, (loaded / heroImgs.length) * 100);
  heroImgs.forEach(src => { const i = new Image(); i.onload = i.onerror = () => loaded++; i.src = src; });
  const start = performance.now();
  const MIN = reduceMotion ? 0 : 1500;
  // dev helper: ?static skips the preloader and shows all reveals (used for screenshots)
  const STATIC = location.search.includes('static');

  if (STATIC) body.classList.add('is-static');
  if (STATIC || !preloader) setTimeout(finishLoading, 0); else (function tick(now) {
    const timeCap = Math.min(100, ((now - start) / MIN) * 100);
    shown += (Math.min(target(), timeCap) - shown) * 0.12;
    if (target() >= 100 && timeCap >= 100 && shown > 99.4) shown = 100;
    const v = Math.round(shown);
    bar.style.width = v + '%';
    count.textContent = String(v).padStart(2, '0');
    if (v >= 100 || now - start > 6000) return finishLoading();
    requestAnimationFrame(tick);
  })(start);

  function finishLoading() {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    if (preloader) { preloader.classList.add('is-done'); setTimeout(() => preloader.remove(), 1300); }
    if (titleEl) setTimeout(() => setTitle(slides[0].word, true), STATIC ? 0 : 250);
    if (STATIC) setTimeout(() => {
      $$('.reveal, .words-reveal, .reveal-img, .m-item').forEach(el => el.classList.add('is-in'));
      const at = new URLSearchParams(location.search).get('at');
      const sl = new URLSearchParams(location.search).get('slide');
      if (sl) goTo(+sl);
      document.documentElement.style.scrollBehavior = 'auto';
      if (at) {
        const els = [...$('main').children, $('.footer')];
        const t = document.getElementById(at) || $('.' + at);
        for (const el of els) { if (el === t) break; el.style.display = 'none'; }
        if (work) sizeWork();
      }
      window.dispatchEvent(new Event('scroll'));
    }, 50);
    startAutoplay();
  }

  /* ---------------- HERO SLIDER ---------------- */
  const slideEls = $$('.hero__slide');
  const titleEl = $('#heroTitle');
  const capEl = $('#heroCaption');
  const capTitle = $('#heroCapTitle');
  const capText = $('#heroCapText');
  const counter = $('#heroCounter');
  const dots = $$('.orbit__dot');
  let current = 0, autoplay, busy = false;
  const pad = n => String(n + 1).padStart(2, '0');

  function setTitle(word, animateIn) {
    titleEl.classList.remove('is-in', 'is-out');
    titleEl.setAttribute('aria-label', word);
    titleEl.style.setProperty('--len', word.length);
    titleEl.innerHTML = [...word].map((c, i) =>
      `<span class="ch-mask" aria-hidden="true"><span class="ch" style="transition-delay:${i * 45}ms">${c}</span></span>`).join('');
    if (animateIn) requestAnimationFrame(() => requestAnimationFrame(() => titleEl.classList.add('is-in')));
  }

  function placeDots() {
    const n = dots.length, R = 148;
    dots.forEach((d, i) => {
      let k = (i - current + n) % n;
      if (k > n / 2) k -= n;
      const a = Math.PI + k * (Math.PI / 4.2);
      d.style.transform = `translate(${Math.cos(a) * R}px, ${Math.sin(a) * R}px)`;
      d.classList.toggle('is-active', k === 0);
    });
  }
  placeDots();

  function goTo(next) {
    if (busy || next === current) return;
    busy = true;
    const prev = current;
    current = (next + slides.length) % slides.length;
    const s = slides[current];

    slideEls[prev].classList.remove('is-active');
    slideEls[prev].classList.add('is-leaving');
    slideEls[current].classList.add('is-active');
    setTimeout(() => { slideEls[prev].classList.remove('is-leaving'); busy = false; }, 1400);

    // title out → in
    titleEl.classList.add('is-out');
    capEl.classList.add('is-out');
    counter.classList.add('is-tick');
    setTimeout(() => {
      setTitle(s.word, true);
      capTitle.textContent = s.title;
      capText.textContent = s.text;
      capEl.classList.remove('is-out');
      const n = slides.length;
      counter.querySelector('.c-prev').textContent = pad((current - 1 + n) % n);
      counter.querySelector('.c-cur').textContent = pad(current);
      counter.querySelector('.c-next').textContent = pad((current + 1) % n);
      counter.classList.remove('is-tick');
    }, 600);
    placeDots();
  }

  function startAutoplay() {
    clearInterval(autoplay);
    if (reduceMotion || !slideEls.length) return;
    autoplay = setInterval(() => goTo(current + 1), 6500);
  }
  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.i); startAutoplay(); }));

  // swipe on touch
  let tx = null;
  if (slideEls.length) $('#hero').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  if (slideEls.length) $('#hero').addEventListener('touchend', e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) { goTo(current + (dx < 0 ? 1 : -1)); startAutoplay(); }
    tx = null;
  });

  /* ---------------- NAV ---------------- */
  const nav = $('#nav');
  const progress = $('#scrollProgress');
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (!body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > 700 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }

  const sectionLinks = $$('.nav__links a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      sectionLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'services', 'production', 'gallery', 'founder', 'contact', 'values', 'work', 'hero'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });

  // mobile menu
  const burger = $('#burger');
  const menu = $('#menu');
  const toggleMenu = force => {
    const open = force ?? !body.classList.contains('menu-open');
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => toggleMenu());
  $$('.menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------------- SPLIT WORDS ---------------- */
  $$('.words-reveal').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
            w.appendChild(inner); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  });

  /* ---------------- REVEAL ON SCROLL ---------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, .words-reveal, .reveal-img').forEach(el => io.observe(el));

  /* ---------------- PARALLAX ---------------- */
  const parallaxEls = $$('.parallax');
  function parallax() {
    if (reduceMotion) return;
    parallaxEls.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const offset = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed || 0.1);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  }

  /* ---------------- HORIZONTAL WORK ---------------- */
  const work = $('#work');
  const track = $('#workTrack');
  // A normal carousel: page scroll stays vertical; cards move with the
  // arrow buttons, swipe/trackpad, or click-and-drag on desktop.
  function sizeWork() { if (work) updateWork(); }
  function scrollWork() {}
  function updateWork() {
    const cards = $$('.work-card', track);
    const max = track.scrollWidth - track.clientWidth;
    const p = max > 0 ? track.scrollLeft / max : 0;
    const visible = Math.max(1, Math.round(track.clientWidth / (cards[0].offsetWidth + 24)));
    $('#workBar').style.transform = `scaleX(${Math.min(1, visible / cards.length + p * (1 - visible / cards.length))})`;
    const idx = Math.min(cards.length, Math.round(p * (cards.length - visible)) + 1);
    $('#workCount').textContent = `${String(idx).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    $('#workPrev').disabled = track.scrollLeft < 4;
    $('#workNext').disabled = track.scrollLeft > max - 4;
  }
  if (work) {
    const step = () => { const c = $('.work-card', track); return c.offsetWidth + 24; };
    $('#workPrev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('#workNext').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', () => requestAnimationFrame(updateWork), { passive: true });
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') track.scrollBy({ left: step(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    track.tabIndex = 0;

    // click-and-drag with a mouse (touch devices already swipe natively)
    let down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (moved) {
        // snap to the nearest card after the drag
        const s = step();
        const target = Math.round(track.scrollLeft / s) * s;
        track.classList.remove('is-dragging');
        track.scrollTo({ left: target, behavior: 'smooth' });
      }
    });
    updateWork();
  }

  /* ---------------- RAF SCROLL LOOP ---------------- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); parallax(); scrollWork(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', () => { sizeWork(); scrollWork(); });
  window.addEventListener('load', () => { sizeWork(); scrollWork(); });
  sizeWork(); onScroll(); parallax();

  /* ---------------- SERVICE PANELS ---------------- */
  const panels = $$('.panel');
  const openPanel = p => panels.forEach(x => x.classList.toggle('is-open', x === p));
  panels.forEach(p => {
    p.addEventListener('click', () => openPanel(p));
    if (finePointer) p.addEventListener('mouseenter', () => openPanel(p));
  });

  /* ---------------- PRODUCTION LIST ---------------- */
  const prodItems = $$('.prod__item');
  const prodImg = $('#prodImg');
  let prodIdx = 0, prodTimer;
  prodItems.forEach(it => { const i = new Image(); i.src = it.dataset.img; });
  function setProd(i) {
    if (i === prodIdx) return;
    prodIdx = i;
    prodItems.forEach((it, k) => it.classList.toggle('is-active', k === i));
    prodImg.classList.add('is-swap');
    setTimeout(() => {
      prodImg.src = prodItems[i].dataset.img;
      prodImg.alt = prodItems[i].querySelector('h3').textContent;
      prodImg.classList.remove('is-swap');
    }, 380);
  }
  prodItems.forEach((it, i) => {
    it.addEventListener('click', () => { clearInterval(prodTimer); setProd(i); });
    if (finePointer) it.addEventListener('mouseenter', () => { clearInterval(prodTimer); setProd(i); });
  });
  const prodIO = new IntersectionObserver(([e]) => {
    clearInterval(prodTimer);
    if (e.isIntersecting && !reduceMotion) prodTimer = setInterval(() => setProd((prodIdx + 1) % prodItems.length), 3800);
  }, { threshold: .4 });
  if (prodItems.length) prodIO.observe($('.prod'));

  /* ---------------- GALLERY ---------------- */
  const counts = { corporate: 51, wedding: 38, social: 56, audiovisual: 50 };
  const skip = { social: [55] };
  const labels = { corporate: 'Corporate', wedding: 'Wedding', social: 'Social', audiovisual: 'Audio visual' };
  const data = {};
  Object.keys(counts).forEach(c => {
    data[c] = [];
    for (let i = 1; i <= counts[c]; i++) if (!(skip[c] || []).includes(i)) data[c].push({ src: `assets/img/gallery/${c}/image${i}.jpeg`, cat: c });
  });
  const masonry = $('#masonry');
  // a page can show a fixed subset: data-set="wedding/1,social/14,..."
  if (masonry && masonry.dataset.set) data.set = masonry.dataset.set.split(',').map(t => { const [c, n] = t.trim().split('/'); return { src: `assets/img/gallery/${c}/image${n}.jpeg`, cat: c }; });
  // "All": deterministic shuffle so similar consecutive shots don't cluster
  data.all = [...data.wedding, ...data.corporate, ...data.social, ...data.audiovisual];
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = data.all.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [data.all[i], data.all[j]] = [data.all[j], data.all[i]]; }

  const loadMoreBtn = $('#loadMore');
  const PAGE = 16;
  let activeCat = masonry && masonry.dataset.set ? 'set' : 'all', shownCount = 0;
  const galIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); galIO.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -5% 0px' });

  function renderMore() {
    const list = data[activeCat];
    const slice = list.slice(shownCount, shownCount + PAGE);
    slice.forEach((item, k) => {
      const idx = shownCount + k;
      const fig = document.createElement('figure');
      fig.className = 'm-item';
      fig.dataset.label = labels[item.cat];
      fig.dataset.idx = idx;
      fig.style.transitionDelay = (k % 4) * 70 + 'ms';
      fig.innerHTML = `<img src="${item.src}" alt="${labels[item.cat]} event by Visionary Events" loading="lazy" />`;
      fig.addEventListener('click', () => openLb(idx));
      masonry.appendChild(fig);
      galIO.observe(fig);
      bindCursor(fig, 'view');
    });
    shownCount += slice.length;
    loadMoreBtn.parentElement.classList.toggle('is-hidden', shownCount >= list.length);
  }
  function setCat(cat) {
    activeCat = cat; shownCount = 0;
    masonry.style.transition = 'opacity .35s'; masonry.style.opacity = 0;
    setTimeout(() => { masonry.innerHTML = ''; renderMore(); masonry.style.opacity = 1; }, 350);
  }
  $$('.filter').forEach(b => b.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.toggle('is-active', x === b));
    setCat(b.dataset.cat);
  }));
  if (masonry) { loadMoreBtn.addEventListener('click', renderMore); renderMore(); }

  // lightbox
  const lb = $('#lightbox') || document.createElement('div'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let lbIdx = 0;
  function showLb(i) {
    const list = data[activeCat];
    lbIdx = (i + list.length) % list.length;
    lbImg.style.opacity = 0;
    setTimeout(() => {
      lbImg.src = list[lbIdx].src;
      lbImg.alt = labels[list[lbIdx].cat] + ' event';
      lbCap.textContent = `${labels[list[lbIdx].cat]} · ${lbIdx + 1} / ${list.length}`;
      lbImg.onload = () => { lbImg.style.opacity = 1; };
    }, 150);
  }
  function openLb(i) { showLb(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); body.classList.add('lb-open'); }
  function closeLb() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); body.classList.remove('lb-open'); }
  if (lbImg) {
    $('.lb__close').addEventListener('click', closeLb);
    $('.lb__prev').addEventListener('click', () => showLb(lbIdx - 1));
    $('.lb__next').addEventListener('click', () => showLb(lbIdx + 1));
  }
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLb(); toggleMenu(false); }
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'ArrowRight') showLb(lbIdx + 1);
    if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
  });
  let lbx = null;
  lb.addEventListener('touchstart', e => { lbx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (lbx === null) return; const dx = e.changedTouches[0].clientX - lbx; if (Math.abs(dx) > 40) showLb(lbIdx + (dx < 0 ? 1 : -1)); lbx = null; });

  /* ---------------- CONTACT FORM ---------------- */
  const form = $('#contactForm');
  const err = $('#formError');
  const success = $('#formSuccess');
  // pre-select event type from the page (body data-service) or ?type= in the URL
  const preType = new URLSearchParams(location.search).get('type') || body.dataset.service;
  if (form && preType) { const r = form.querySelector(`input[data-key="${preType}"]`); if (r) r.checked = true; }
  $$('.panel__go').forEach(a => a.addEventListener('click', e => e.stopPropagation()));

  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const via = e.submitter?.dataset.via || 'email';
    const fd = new FormData(form);
    const d = Object.fromEntries(fd.entries());
    $$('.field', form).forEach(f => f.classList.remove('is-invalid'));
    $('#typeChips').classList.remove('is-invalid');
    const bad = [];
    ['name', 'phone', 'email', 'message'].forEach(k => { if (!String(d[k] || '').trim()) bad.push(k); });
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) bad.push('email');
    if (d.phone && !/^[+]?[\d\s-]{8,16}$/.test(d.phone)) bad.push('phone');
    if (!d.eventType) $('#typeChips').classList.add('is-invalid');
    bad.forEach(k => form.querySelector(`[name="${k}"]`).closest('.field').classList.add('is-invalid'));
    if (bad.length || !d.eventType) { err.textContent = 'Please complete the highlighted fields.'; return; }
    err.textContent = '';

    const lines = [
      `Hi Visionary Events, I'd like to plan an event.`,
      ``,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      `Event type: ${d.eventType}`,
      d.date ? `Date: ${d.date}` : null,
      d.guests ? `Guests: ${d.guests}` : null,
      d.city ? `City / venue: ${d.city}` : null,
      ``,
      `Details: ${d.message}`,
    ].filter(l => l !== null);
    const text = lines.join('\n');

    if (via === 'whatsapp') {
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      // Prototype: opens the visitor's mail app. Swap for a form backend (Formspree, Web3Forms, etc.) in production.
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Event enquiry — ' + d.eventType)}&body=${encodeURIComponent(text)}`;
    }
    success.classList.add('is-on');
    setTimeout(() => { success.classList.remove('is-on'); form.reset(); }, 6000);
  });

  /* ---------------- CURSOR + MAGNETIC ---------------- */
  const cursor = $('#cursor');
  function bindCursor(el, mode) {
    if (!finePointer) return;
    el.addEventListener('mouseenter', () => {
      cursor.classList.add(mode === 'hover' ? 'is-hover' : 'is-view');
      cursor.firstElementChild.textContent = mode === 'drag' ? 'Drag' : 'View';
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-view', 'is-hover'));
  }
  if (finePointer && !reduceMotion) {
    const dot = cursor.firstElementChild;
    dot.textContent = 'View';
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();
    $$('a, button, .panel, .prod__item, label').forEach(el => bindCursor(el, 'hover'));
    $$('.intro__img').forEach(el => bindCursor(el, 'view'));
    $$('.work-card').forEach(el => bindCursor(el, 'drag'));

    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  if ($('#year')) $('#year').textContent = new Date().getFullYear();
})();
