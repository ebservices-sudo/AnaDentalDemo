/* Ana Dental Care demo. Vanilla JS, no dependencies. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');

  var WA = 'https://wa.me/38345520121?text=';
  var WA_MSG = { sq: 'Përshëndetje, dua të rezervoj një termin.', en: 'Hello, I would like to book an appointment.' };

  /* Real cases, published by the clinic on Instagram. */
  /* cap = the clinic's own caption on that post, only where it was published */
  var CASES = [
    { key: 'c1', label: { sq: 'Rasti 1', en: 'Case 1' } },
    { key: 'c3', label: { sq: 'Rasti 2', en: 'Case 2' }, cap: { sq: 'Restaurime zirkoni multilayer', en: 'Multilayer zirconia restorations' } },
    { key: 'c4', label: { sq: 'Rasti 3', en: 'Case 3' }, cap: { sq: 'Rregullimi i kafshimit të kundërt me kurora zirkoni', en: 'Crossbite correction with zirconia crowns' } },
    { key: 'c5', label: { sq: 'Rasti 4', en: 'Case 4' } }
  ];
  /* Instagram strip: local copies of their posts, each linking to the original post. */
  var IG = [
    { img: 'assets/img/ig/1.webp', href: 'https://www.instagram.com/p/C-auFfiqU7O/' },
    { img: 'assets/img/ig/2.webp', href: 'https://www.instagram.com/p/DVHFcX9jPwu/' },
    { img: 'assets/img/ig/3.webp', href: 'https://www.instagram.com/p/C6rEbA0K6qU/' },
    { img: 'assets/img/ig/4.webp', href: 'https://www.instagram.com/p/DEkaPWetQ1R/' },
    { img: 'assets/img/ig/5.webp', href: 'https://www.instagram.com/p/DadRuhysU2m/' },
    { img: 'assets/img/ig/6.webp', href: 'https://www.instagram.com/p/C-DMLBNqkuj/' }
  ];

  var EN = {
    'skip': 'Skip to content',
    'nav.results': 'Results', 'nav.services': 'Services', 'nav.clinic': 'Clinic', 'nav.locations': 'Locations',
    'nav.book': 'Book', 'nav.menu': 'Menu',
    'cta.book': 'Book an appointment', 'cta.results': 'See the results',
    'hero.kicker': 'Podujevë · Fushë Kosovë',
    'hero.title': 'A healthy smile, <em>confidence</em> in full.',
    'hero.lead': 'Implants, orthodontics and aesthetic dentistry, with results that speak for themselves.',
    'hero.alt': 'The Ana Dental Care team at the clinic',
    'res.kicker': 'Before and after', 'res.title': 'Real results from our patients',
    'res.more': 'More cases', 'res.moreSub': 'Tap a case and drag the handle.', 'res.cases': 'Cases',
    'res.note': 'Photos of Ana Dental Care patients, published by the clinic.',
    'ba.before': 'Before', 'ba.after': 'After', 'ba.aria': 'Compare before and after',
    'srv.kicker': 'Services', 'srv.title': 'Three specialities. One standard.',
    's1.t': 'Implantology', 's1.d': 'New, fixed teeth that look and feel natural.', 's1.alt': 'Implant treatment at Ana Dental Care',
    's2.t': 'Orthodontics', 's2.d': 'Straight teeth and an even bite, step by step.', 's2.alt': 'Orthodontic treatment at Ana Dental Care',
    's3.t': 'Aesthetic dentistry', 's3.d': 'Veneers and whitening for a bright, natural smile.', 's3.alt': 'Aesthetic dentistry at Ana Dental Care',
    'cl.kicker': 'The clinic', 'cl.title': 'A calm space, built for precise care.',
    'cl.docLabel': 'and the Ana Dental Care team', 'cl.alt': 'Ana Dental Care clinic',
    'loc.kicker': 'Locations', 'loc.title': 'Two clinics, one number.', 'loc.dir': 'Get directions',
    'ig.follow': 'Follow us',
    'fin.title': 'Book your appointment online', 'fin.lead': 'Message us on WhatsApp or give us a call. We reply quickly.', 'fin.call': 'Call us',
    'foot.credit': 'Design & development: EB Services'
  };
  var META = {
    sq: { t: document.title, d: $('meta[name=description]').content },
    en: { t: 'Ana Dental Care | Implants, Orthodontics, Aesthetic Dentistry', d: 'Ana Dental Care in Podujevë and Fushë Kosovë: implants, orthodontics and aesthetic dentistry. See real results and book on WhatsApp.' }
  };
  var lang = 'sq';

  /* ---------- i18n ---------- */
  var SQ = {};
  $$('[data-i18n]').forEach(function (el) { SQ[el.dataset.i18n] = el.innerHTML; });
  $$('[data-i18n-attr]').forEach(function (el) {
    el.dataset.i18nAttr.split(';').forEach(function (p) { p = p.split(':'); SQ[p[1]] = el.getAttribute(p[0]); });
  });
  function t(k) { return lang === 'en' && EN[k] != null ? EN[k] : SQ[k]; }
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'sq';
    doc.lang = lang;
    $$('[data-i18n]').forEach(function (el) { var v = t(el.dataset.i18n); if (v != null) el.innerHTML = v; });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.dataset.i18nAttr.split(';').forEach(function (p) { p = p.split(':'); var v = t(p[1]); if (v != null) el.setAttribute(p[0], v); });
    });
    $$('[data-l]').forEach(function (s) { s.classList.toggle('on', s.dataset.l === lang); });
    $('[data-lang]').setAttribute('aria-label', lang === 'en' ? 'Kalo në shqip' : 'Switch to English');
    document.title = META[lang].t;
    $('meta[name=description]').content = META[lang].d;
    $$('[data-wa]').forEach(function (a) { a.href = WA + encodeURIComponent(WA_MSG[lang]); });
    renderTabs();
    try { localStorage.setItem('ana-lang', lang); } catch (e) {}
  }
  $('[data-lang]').addEventListener('click', function () { setLang(lang === 'sq' ? 'en' : 'sq'); });

  /* ---------- header, menu, sticky bar ---------- */
  var header = $('[data-header]'), nav = $('[data-nav]'), burger = $('[data-burger]');
  function closeMenu() { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var o = !nav.classList.contains('open'); nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o));
  });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', closeMenu); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  var mbar = $('[data-mbar]'), heroBtns = $('.hero__btns'), finalSec = $('#rezervo');
  var pastHero = false, atEnd = false, solid = null, barOn = null;
  function chrome() {
    var s = scrollY > 10; if (s !== solid) { solid = s; header.classList.toggle('solid', s); }
    var b = pastHero && !atEnd; if (b !== barOn) { barOn = b; mbar.classList.toggle('on', b); document.body.classList.toggle('mbar-on', b); }
  }
  new IntersectionObserver(function (es) { es.forEach(function (e) { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; }); chrome(); }).observe(heroBtns);
  new IntersectionObserver(function (es) { es.forEach(function (e) { atEnd = e.isIntersecting || e.boundingClientRect.top < 0; }); chrome(); }).observe(finalSec);

  addEventListener('scroll', chrome, { passive: true });

  /* ---------- calm entrances ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('[data-in]').forEach(function (el) { io.observe(el); });

  /* ---------- before/after component ---------- */
  function src(key, side) { return 'assets/img/cases/' + key + '-' + side; }
  function setCase(ba, c) {
    var b = $('[data-before]', ba), a = $('[data-after]', ba);
    b.srcset = src(c.key, 'para') + '-700.webp 700w, ' + src(c.key, 'para') + '-1200.webp 1200w';
    a.srcset = src(c.key, 'pas') + '-700.webp 700w, ' + src(c.key, 'pas') + '-1200.webp 1200w';
    b.sizes = a.sizes = '(min-width: 1040px) 1000px, 100vw';
    b.src = src(c.key, 'para') + '-1200.webp';
    a.src = src(c.key, 'pas') + '-1200.webp';
  }
  function Slider(ba, start) {
    var self = this, handle = $('.ba__handle', ba), tags = $$('.ba__tag', ba);
    this.p = start; this.dragging = false; this.onDrag = null;
    this.set = function (p) {
      p = Math.max(0, Math.min(100, p));
      if (Math.abs(p - self.shown) < 0.02) return;   // write only on change
      self.p = self.shown = p;
      ba.style.setProperty('--p', p.toFixed(2));
      handle.setAttribute('aria-valuenow', String(Math.round(100 - p)));
      tags[0].style.opacity = p < 12 ? 0 : 1;
      tags[1].style.opacity = p > 88 ? 0 : 1;
    };
    this.shown = -1; this.set(start);
    function pct(x) { var r = ba.getBoundingClientRect(); return (x - r.left) / r.width * 100; }
    var sx = 0, sy = 0, decided = false;
    ba.addEventListener('pointerdown', function (e) {
      self.dragging = true; decided = e.pointerType === 'mouse'; sx = e.clientX; sy = e.clientY;
      try { ba.setPointerCapture(e.pointerId); } catch (err) {}
      if (decided) { ba.classList.add('drag'); self.set(pct(e.clientX)); self.onDrag && self.onDrag(); e.preventDefault(); }
    });
    ba.addEventListener('pointermove', function (e) {
      if (!self.dragging) return;
      if (!decided) {
        var dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
        if (dx < 5 && dy < 5) return;
        if (dy > dx) { end(); return; }
        decided = true; ba.classList.add('drag');
      }
      self.set(pct(e.clientX)); self.onDrag && self.onDrag();
    });
    function end() { self.dragging = false; ba.classList.remove('drag'); }
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { ba.addEventListener(ev, end); });
    handle.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowLeft' ? 5 : e.key === 'ArrowRight' ? -5 : 0;
      if (d) { self.set(self.p + d); self.onDrag && self.onDrag(); e.preventDefault(); }
    });
  }

  /* ---------- more cases ---------- */
  var smallBa = $('[data-small]'), small = new Slider(smallBa, 50), tabsEl = $('[data-case-tabs]'), cur = 0;
  function renderTabs() {
    tabsEl.innerHTML = '';
    CASES.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = c.label[lang];
      b.setAttribute('aria-selected', String(i === cur));
      b.addEventListener('click', function () { showCase(i); });
      tabsEl.appendChild(b);
    });
    var c = CASES[cur];
    $('[data-before]', smallBa).alt = (lang === 'en' ? 'Before: ' : 'Para: ') + c.label[lang];
    $('[data-after]', smallBa).alt = (lang === 'en' ? 'After: ' : 'Pas: ') + c.label[lang];
    $('[data-case-cap]').textContent = c.cap ? c.cap[lang] : '';
  }
  function showCase(i) {
    if (i === cur) return; cur = i;
    smallBa.classList.add('swap');
    setTimeout(function () {
      setCase(smallBa, CASES[i]); small.set(50);
      var a = $('[data-after]', smallBa);
      var fin = function () { smallBa.classList.remove('swap'); };
      if (a.complete) requestAnimationFrame(fin); else { a.onload = fin; a.onerror = fin; }
      renderTabs();
    }, reduce.matches ? 0 : 250);
  }
  setCase(smallBa, CASES[0]);

  /* ---------- Instagram strip ---------- */
  var igRow = $('[data-ig]');
  IG.forEach(function (p) {
    var a = document.createElement('a');
    a.href = p.href; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = '<img src="' + p.img + '" width="400" height="400" loading="lazy" alt="">';
    a.setAttribute('aria-label', 'Instagram: @anadentalcare');
    igRow.appendChild(a);
  });

  /* ---------- lazy maps ---------- */
  var mio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(e.target.dataset.map) + '&z=16&output=embed';
      f.loading = 'lazy'; f.title = e.target.dataset.map; f.referrerPolicy = 'no-referrer-when-downgrade';
      e.target.appendChild(f); mio.unobserve(e.target);
    });
  }, { rootMargin: '400px' });
  $$('[data-map]').forEach(function (m) { mio.observe(m); });

  /* ---------- init ---------- */
  $('[data-year]').textContent = new Date().getFullYear();
  var init = 'sq';
  try { init = new URLSearchParams(location.search).get('lang') || localStorage.getItem('ana-lang') || 'sq'; } catch (e) {}
  setLang(init);
  chrome();
})();
