/* Ana Dental Care — demo site script (no dependencies) */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CLINIC DETAILS — fill these in once confirmed by the clinic.
     Empty values keep the visible [PLACEHOLDER] text on the page.
     ------------------------------------------------------------------ */
  var SITE = {
    whatsapp: '',      // [WHATSAPP] international format, digits only, e.g. '383XXXXXXXX'
    phone: '',         // [TELEFONI] for tel: links, e.g. '+383XXXXXXXX'
    phoneDisplay: '',  // [TELEFONI] as shown on the page, e.g. '+383 XX XXX XXX'
    address: '',       // [ADRESA]
    hours: { sq: '', en: '' }, // [ORARI] e.g. 'E hënë – E shtunë, 09:00 – 19:00'
    mapsQuery: ''      // [GOOGLE_MAPS] exact clinic name + address for the map embed
  };

  var WA_MESSAGE = {
    sq: 'Përshëndetje, dua të rezervoj një termin.',
    en: 'Hello, I would like to book an appointment.'
  };

  /* ------------------------------------------------------------------
     English translations (Albanian lives in the HTML)
     ------------------------------------------------------------------ */
  var EN = {
    'skip': 'Skip to content',
    'nav.results': 'Results',
    'nav.services': 'Services',
    'nav.why': 'Why us',
    'nav.how': 'How it works',
    'nav.contact': 'Contact',
    'nav.book': 'Book',
    'nav.menu': 'Menu',
    'cta.book': 'Book an appointment',
    'cta.results': 'See the results',
    'hero.eyebrow': 'Aesthetic dentistry',
    'hero.title': 'A healthy smile. <em>Confidence</em> that shows.',
    'hero.lead': 'Aesthetic dentistry and personalised dental care, for a smile that looks natural and feels healthy.',
    'hero.alt': 'Close-up of a healthy, natural smile',
    'tag.whitening': 'Whitening',
    'tag.veneers': 'Veneers',
    'tag.implants': 'Implants',
    'tag.ortho': 'Orthodontics',
    'results.eyebrow': 'Results',
    'results.title': 'The difference you can see.',
    'results.lead': 'Drag the handle left and right to compare the smile before and after treatment.',
    'results.tabs': 'Cases',
    'ba.before': 'Before',
    'ba.after': 'After',
    'ba.aria': 'Compare before and after',
    'ba.prev': 'Previous case',
    'ba.next': 'Next case',
    'ba.note': 'Illustrative images',
    'case0.before': 'Before: yellowed, stained teeth',
    'case0.after': 'After: clean teeth in a natural white shade',
    'services.eyebrow': 'Services',
    'services.title': 'Everything for your smile, in one place.',
    'services.lead': 'From professional cleaning to aesthetic transformations — carefully planned treatment for every patient.',
    's1.title': 'Professional whitening',
    's1.text': 'A brighter shade through a safe, controlled procedure.',
    's2.title': 'Veneers',
    's2.text': 'Refine the shape, colour and harmony of your smile.',
    's3.title': 'Implants',
    's3.text': 'A lasting solution for missing teeth.',
    's4.title': 'Orthodontics',
    's4.text': 'Straighter teeth and a corrected bite.',
    's5.title': 'Dental hygiene',
    's5.text': 'Professional removal of tartar and stains for a healthy mouth.',
    's6.title': 'Children’s dentistry',
    's6.text': 'Gentle, friendly care for the littlest smiles.',
    'why.eyebrow': 'Why us',
    'why.title': 'Why choose Ana Dental Care?',
    'why.lead': 'Every visit is planned with calm, precision and attention to detail.',
    'w1.title': 'Modern technology',
    'w1.text': 'Up-to-date equipment for accurate diagnosis and precise treatment.',
    'w2.title': 'Experienced team',
    'w2.text': 'Dedicated professionals who guide you at every step.',
    'w3.title': 'Painless treatments',
    'w3.text': 'A gentle approach and careful anaesthesia for a calm visit.',
    'w4.title': 'Personalised care',
    'w4.text': 'A treatment plan tailored to your needs and wishes.',
    'how.eyebrow': 'How it works',
    'how.title': 'Three steps to your new smile.',
    'h1.title': 'Book',
    'h1.text': 'Message us on WhatsApp or give us a call, and choose a time that suits you.',
    'h2.title': 'Consultation',
    'h2.text': 'We listen, examine your teeth and clearly explain your options.',
    'h3.title': 'Your new smile',
    'h3.text': 'We begin treatment as planned and stay with you until the final result.',
    'cta.eyebrow': 'Booking',
    'cta.title': 'Book your appointment online',
    'cta.lead': 'Message us on WhatsApp or give us a call — our team will get back to you to arrange your appointment.',
    'cta.whatsapp': 'Message on WhatsApp',
    'cta.call': 'Call us',
    'footer.tagline': 'Aesthetic dentistry and dedicated dental care.',
    'footer.contact': 'Contact',
    'footer.phone': 'Phone',
    'footer.address': 'Address',
    'footer.hours': 'Opening hours',
    'footer.map': 'Clinic map',
    'footer.mapNote': 'The clinic map will appear here once the address is confirmed.',
    'footer.rights': 'All rights reserved.',
    'footer.credit': 'Design & development: EB Services'
  };

  var META = {
    sq: {
      title: 'Ana Dental Care — Stomatologji estetike dhe kujdes dentar',
      description: 'Ana Dental Care: zbardhim profesional, faseta, implante, ortodonci, higjienë dentare dhe stomatologji për fëmijë. Rezervoni terminin tuaj online përmes WhatsApp.'
    },
    en: {
      title: 'Ana Dental Care — Aesthetic dentistry & dental care',
      description: 'Ana Dental Care: professional whitening, veneers, implants, orthodontics, dental hygiene and children’s dentistry. Book your appointment online via WhatsApp.'
    }
  };

  /* Before/after cases (images are illustrative; replace with real patient cases) */
  var CASES = [
    {
      key: 'zbardhim',
      caption: { sq: 'Njollat dhe ngjyra e verdhë largohen, për një nuancë më të çelët e natyrale.', en: 'Stains and yellowing removed for a lighter, natural shade.' },
      altBefore: { sq: 'Para: dhëmbë të verdhë me njolla', en: 'Before: yellowed, stained teeth' },
      altAfter: { sq: 'Pas: dhëmbë të pastër me ngjyrë natyrale të bardhë', en: 'After: clean teeth in a natural white shade' }
    },
    {
      key: 'faseta',
      caption: { sq: 'Hapësira mbyllet, majat e thyera rregullohen dhe forma harmonizohet.', en: 'The gap is closed, chipped edges are restored and the shape is brought into harmony.' },
      altBefore: { sq: 'Para: dhëmbë të thyer, me gjatësi të ndryshme dhe hapësirë mes tyre', en: 'Before: chipped, uneven teeth with a gap' },
      altAfter: { sq: 'Pas: faseta natyrale me formë të harmonizuar', en: 'After: natural-looking veneers with a harmonious shape' }
    },
    {
      key: 'ortodonci',
      caption: { sq: 'Dhëmbët rreshtohen në një hark të rregullt dhe kafshimi balancohet.', en: 'Teeth aligned into an even arch with a balanced bite.' },
      altBefore: { sq: 'Para: dhëmbë të shtrembër dhe të mbivendosur', en: 'Before: crooked, crowded teeth' },
      altAfter: { sq: 'Pas: dhëmbë të rreshtuar në një hark të rregullt', en: 'After: teeth aligned in an even arch' }
    }
  ];

  var doc = document.documentElement;
  doc.classList.add('js');
  var lang = 'sq';

  /* ---------------- helpers ---------------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- i18n ---------------- */
  var SQ = {};
  $$('[data-i18n]').forEach(function (el) { SQ[el.getAttribute('data-i18n')] = el.innerHTML; });
  $$('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var p = pair.split(':'); SQ[p[1]] = el.getAttribute(p[0]);
    });
  });

  function t(key) { return lang === 'en' ? (EN[key] != null ? EN[key] : SQ[key]) : SQ[key]; }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'sq';
    doc.lang = lang;
    $$('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n')); if (v != null) el.innerHTML = v;
    });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); var v = t(p[1]); if (v != null) el.setAttribute(p[0], v);
      });
    });
    $$('[data-lang-opt]').forEach(function (o) { o.classList.toggle('is-active', o.getAttribute('data-lang-opt') === lang); });
    var toggle = $('[data-lang-toggle]');
    if (toggle) toggle.setAttribute('aria-label', lang === 'en' ? 'Kalo në shqip' : 'Switch to English');
    document.title = META[lang].title;
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', META[lang].description);
    var nav = $('[data-nav]'); if (nav) nav.setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Navigimi kryesor');
    applySite();
    if (slider) slider.refreshText();
    try { localStorage.setItem('ana-lang', lang); } catch (e) {}
  }

  /* ---------------- clinic details ---------------- */
  function waHref() {
    var base = 'https://wa.me/' + (SITE.whatsapp || '');
    return base + '?text=' + encodeURIComponent(WA_MESSAGE[lang]);
  }
  function applySite() {
    $$('[data-wa]').forEach(function (a) { a.href = waHref(); });
    $$('[data-tel]').forEach(function (a) { a.href = 'tel:' + (SITE.phone || ''); });
    var vals = {
      phone: SITE.phoneDisplay || SITE.phone,
      address: SITE.address,
      hours: SITE.hours[lang] || SITE.hours.sq
    };
    var ph = { phone: '[TELEFONI]', address: '[ADRESA]', hours: '[ORARI]' };
    $$('[data-site]').forEach(function (el) {
      var k = el.getAttribute('data-site');
      el.textContent = vals[k] || ph[k];
      el.classList.toggle('is-placeholder', !vals[k]);
    });
    var map = $('[data-map]');
    if (SITE.mapsQuery && map && !$('iframe', map)) {
      var f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(SITE.mapsQuery) + '&output=embed';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.title = map.getAttribute('title') || 'Map';
      map.innerHTML = '';
      map.appendChild(f);
    }
  }

  /* ---------------- header + menu ---------------- */
  var header = $('[data-header]');
  var nav = $('[data-nav]');
  var menuBtn = $('[data-menu-btn]');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  var langBtn = $('[data-lang-toggle]');
  if (langBtn) langBtn.addEventListener('click', function () { setLang(lang === 'sq' ? 'en' : 'sq'); });

  /* ---------------- sticky mobile bar ---------------- */
  var bar = $('[data-mobile-bar]');
  var heroActions = $('.hero__actions');
  var ctaSection = $('#rezervo');
  var footer = $('#kontakti');
  var pastHero = false, nearEnd = false;
  function updateBar() {
    if (!bar) return;
    var show = pastHero && !nearEnd;
    bar.classList.toggle('is-visible', show);
    document.body.classList.toggle('has-mobile-bar', show);
  }

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    if (heroActions) new IntersectionObserver(function (es) {
      es.forEach(function (e) { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; }); updateBar();
    }).observe(heroActions);
    var endIO = new IntersectionObserver(function (es) {
      nearEnd = es.some(function (e) { return e.isIntersecting; }) ||
        [ctaSection, footer].some(function (el) { return el && el.getBoundingClientRect().top < window.innerHeight; });
      updateBar();
    }, { threshold: 0 });
    if (ctaSection) endIO.observe(ctaSection);
    if (footer) endIO.observe(footer);
  }

  /* ---------------- reveal on scroll ---------------- */
  var reveals = $$('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { rio.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- before/after slider ---------------- */
  var slider = (function () {
    var root = $('[data-ba]');
    if (!root) return null;
    var handle = $('[data-ba-handle]', root);
    var imgBefore = $('[data-ba-before]', root);
    var imgAfter = $('[data-ba-after]', root);
    var caption = $('[data-ba-caption]');
    var count = $('[data-ba-count]');
    var tabs = $$('[data-case]');
    var current = 0, pos = 50, dragging = false, startX = 0, startY = 0, decided = false, hinted = false;

    function set(p) {
      pos = Math.max(0, Math.min(100, p));
      root.style.setProperty('--pos', pos + '%');
      handle.setAttribute('aria-valuenow', String(Math.round(pos)));
      handle.setAttribute('aria-valuetext', (lang === 'en' ? 'Before ' : 'Para ') + Math.round(pos) + '%');
      root.classList.toggle('hide-before', pos < 14);
      root.classList.toggle('hide-after', pos > 86);
    }
    function pct(clientX) {
      var r = root.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    }

    root.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true; decided = e.pointerType === 'mouse';
      startX = e.clientX; startY = e.clientY;
      root.classList.add('is-dragging');
      try { root.setPointerCapture(e.pointerId); } catch (err) {}
      if (e.pointerType === 'mouse') { set(pct(e.clientX)); e.preventDefault(); }
    });
    root.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      if (!decided) {
        // touch: only take over once the gesture is clearly horizontal
        var dx = Math.abs(e.clientX - startX), dy = Math.abs(e.clientY - startY);
        if (dx < 4 && dy < 4) return;
        if (dy > dx) { end(); return; }
        decided = true;
      }
      set(pct(e.clientX));
    });
    function end() { dragging = false; root.classList.remove('is-dragging'); }
    root.addEventListener('pointerup', function (e) {
      // a simple tap (touch) moves the handle to that point
      if (dragging && !decided && e.pointerType !== 'mouse') set(pct(e.clientX));
      end();
    });
    root.addEventListener('pointercancel', end);
    root.addEventListener('lostpointercapture', end);

    handle.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 10 : 4;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(pos - step); e.preventDefault(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(pos + step); e.preventDefault(); }
      else if (e.key === 'Home') { set(0); e.preventDefault(); }
      else if (e.key === 'End') { set(100); e.preventDefault(); }
    });

    function srcFor(key, which) {
      var b = 'assets/img/cases/' + key + '-' + which;
      return { src: b + '-1600.webp', srcset: b + '-900.webp 900w, ' + b + '-1600.webp 1600w' };
    }

    function refreshText() {
      var c = CASES[current];
      caption.textContent = c.caption[lang];
      imgBefore.alt = c.altBefore[lang];
      imgAfter.alt = c.altAfter[lang];
      count.textContent = (current + 1) + ' / ' + CASES.length;
      set(pos);
    }

    function show(i) {
      i = (i + CASES.length) % CASES.length;
      if (i === current) return;
      current = i;
      tabs.forEach(function (tb) { tb.setAttribute('aria-selected', String(+tb.getAttribute('data-case') === i)); });
      var c = CASES[i];
      var b = srcFor(c.key, 'para'), a = srcFor(c.key, 'pas');
      root.classList.add('is-switching');
      var pending = 2;
      function done() { if (--pending === 0) { requestAnimationFrame(function () { root.classList.remove('is-switching'); }); } }
      setTimeout(function () {
        [[imgBefore, b], [imgAfter, a]].forEach(function (pair) {
          var img = pair[0], s = pair[1];
          img.onload = done; img.onerror = done;
          img.srcset = s.srcset; img.src = s.src;
          if (img.complete) { img.onload = null; done(); }
        });
        set(50);
        refreshText();
      }, reduceMotion ? 0 : 220);
    }

    tabs.forEach(function (tb) {
      tb.addEventListener('click', function () { show(+tb.getAttribute('data-case')); });
      tb.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var n = (current + (e.key === 'ArrowRight' ? 1 : -1) + CASES.length) % CASES.length;
          show(n); tabs[n].focus(); e.preventDefault();
        }
      });
    });
    $('[data-ba-prev]').addEventListener('click', function () { show(current - 1); });
    $('[data-ba-next]').addEventListener('click', function () { show(current + 1); });

    // gentle one-time hint that the image is interactive
    function hint() {
      if (hinted || reduceMotion) return; hinted = true;
      var seq = [[50, 34], [34, 66], [66, 50]], k = 0;
      function run() {
        if (k >= seq.length || dragging) return;
        var from = seq[k][0], to = seq[k][1], t0 = null, dur = 650;
        function frame(ts) {
          if (dragging) return;
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          set(from + (to - from) * e);
          if (p < 1) requestAnimationFrame(frame); else { k++; run(); }
        }
        requestAnimationFrame(frame);
      }
      setTimeout(run, 500);
    }
    if ('IntersectionObserver' in window) {
      var hio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { hint(); hio.disconnect(); } });
      }, { threshold: 0.6 });
      hio.observe(root);
    }

    // warm the cache for the other cases once the first is shown
    window.addEventListener('load', function () {
      setTimeout(function () {
        var w = window.innerWidth * (window.devicePixelRatio || 1) > 1100 ? '1600' : '900';
        CASES.slice(1).forEach(function (c) {
          ['para', 'pas'].forEach(function (s) { var im = new Image(); im.src = 'assets/img/cases/' + c.key + '-' + s + '-' + w + '.webp'; });
        });
      }, 1500);
    });

    set(50);
    return { refreshText: refreshText };
  })();

  /* ---------------- init ---------------- */
  var yr = $('[data-year]'); if (yr) yr.textContent = String(new Date().getFullYear());
  var initial = 'sq';
  try {
    var q = new URLSearchParams(location.search).get('lang');
    initial = q || localStorage.getItem('ana-lang') || 'sq';
  } catch (e) {}
  setLang(initial);
})();
