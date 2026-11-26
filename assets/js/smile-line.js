/* "The Smile Line": one fine line that draws itself down the page as you scroll,
   shapes a tooth beside the services, frames the results, adds a sparkle by the
   clinic and finishes as a smile under the final headline.
   SVG path + stroke-dashoffset, scrubbed by GSAP ScrollTrigger.
   The path is rebuilt from the real layout, so it always stays in the side margin. */
(function () {
  'use strict';
  var main = document.getElementById('main');
  var box = document.querySelector('.final__box');
  if (!main || !box || !document.createElementNS) return;

  var NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var $ = function (s, c) { return (c || document).querySelector(s); };

  function el(tag, cls, parent) {
    var n = document.createElementNS(NS, tag);
    if (cls) n.setAttribute('class', cls);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ---------- SVG layers ---------- */
  var svg = el('svg', 'smile-line');
  svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
  main.insertBefore(svg, main.firstChild);
  var mainPath = el('path', 'smile-line__path', svg);
  var nib = el('circle', 'smile-line__nib', svg); nib.setAttribute('r', '2.2');
  var meas = el('path', 'smile-line__meas', svg);   // measuring only, never painted

  var svgEnd = el('svg', 'smile-line smile-line--end');
  svgEnd.setAttribute('aria-hidden', 'true'); svgEnd.setAttribute('focusable', 'false');
  box.insertBefore(svgEnd, box.firstChild);
  var endPath = el('path', 'smile-line__path', svgEnd);
  var nibEnd = el('circle', 'smile-line__nib', svgEnd); nibEnd.setAttribute('r', '2.2');

  var branches = [];   // mirrored halves of the tooth and sparkle, drawn in sync with the main line
  var G = null;        // current geometry + lookup table

  /* position relative to an ancestor, ignoring transforms (fade-ins) */
  function off(n, root) {
    var x = 0, y = 0, e = n;
    while (e && e !== root) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
    return { x: x, y: y, w: n.offsetWidth, h: n.offsetHeight };
  }
  function f(n) { return Math.round(n * 10) / 10; }
  function lenOf(d) { meas.setAttribute('d', d); return meas.getTotalLength(); }

  /* ---------- build the path from the live layout ---------- */
  function build() {
    branches.forEach(function (b) { b.el.remove(); });
    branches = [];

    var W = main.clientWidth, H = main.offsetHeight, vh = innerHeight;
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var h1 = off($('.hero__title'), main), lead = off($('.hero__lead'), main);
    var cl = h1.x;                                   // content edge
    var gx = Math.max(cl / 2, cl - 90);              // the line's lane in the side margin
    var sway = Math.max(0, Math.min(gx - 4, cl - gx - 6, 16, gx * 0.35));

    var d = '', cx = 0, cy = 0, swaySign = 1;
    function M(x, y) { d += 'M' + f(x) + ' ' + f(y); cx = x; cy = y; }
    function C(a, b, c, e, x, y) { d += 'C' + f(a) + ' ' + f(b) + ' ' + f(c) + ' ' + f(e) + ' ' + f(x) + ' ' + f(y); cx = x; cy = y; }
    function V(x, y) { var h = (y - cy) * 0.5; C(cx, cy + h, x, y - h, x, y); }   // smooth vertical S-curve
    function go(y) {                                  // drift down the margin with a gentle sway
      var dist = y - cy; if (dist <= 0) return;
      var n = Math.floor(dist / 650), y0 = cy;
      for (var i = 1; i <= n; i++) { V(gx + sway * swaySign, y0 + dist * i / (n + 1)); swaySign *= -1; }
      V(gx, y);
    }
    function mark() { return lenOf(d); }
    function branch(dd, a, b) {
      var p = el('path', 'smile-line__path', svg); p.setAttribute('d', dd);
      svg.insertBefore(p, nib);
      branches.push({ el: p, len: p.getTotalLength(), a: a, b: b, shown: -1 });
    }

    /* 1. hero: starts small under the headline, then turns down into the margin */
    var sy = (h1.y + h1.h + lead.y) / 2, sx = cl + Math.min(56, W * 0.12);
    var rr = Math.max(6, Math.min(cl - gx, 70));     // the turn happens in the margin, clear of the text
    M(sx, sy);
    C(sx - (sx - cl) * 0.5, sy, cl + 4, sy, cl, sy);
    C(gx + rr * 0.45, sy, gx, sy + rr * 0.55, gx, sy + rr);

    /* 2. results: a soft bracket framing the before/after */
    var ba = off($('[data-small]'), main);
    var room = ba.x - gx;
    if (room >= 70) {
      var bx = ba.x - Math.min(30, room * 0.3), bulge = Math.min(22, (bx - gx) * 0.4);
      var by1 = ba.y + 24, by2 = ba.y + ba.h - 24, bh = by2 - by1;
      var tl = Math.hypot(bulge, bh * 0.3), tx = -bulge / tl, ty = bh * 0.3 / tl;
      go(ba.y - 90);
      C(gx, ba.y - 40, bx - tx * 34, by1 - ty * 34, bx, by1);
      C(bx - bulge, by1 + bh * 0.3, bx - bulge, by2 - bh * 0.3, bx, by2);
      C(bx - tx * 34, by2 + ty * 34, gx, by2 + 36, gx, by2 + 96);
    }

    /* 3. services: a fine-line tooth; the line opens into two halves and rejoins */
    var svc = off($('.svc'), main);
    var tw = Math.min(64, 2 * Math.min(gx - 6, cl - gx - 10));
    if (tw >= 40) {
      var k = tw / 100, ox = gx - 50 * k, oy = svc.y + Math.min(svc.h * 0.3, 170) - 60 * k;
      var T = function (x, y) { return [ox + x * k, oy + y * k]; };
      var CT = function (a, b, c) { var p = T(a[0], a[1]), q = T(b[0], b[1]), r = T(c[0], c[1]); C(p[0], p[1], q[0], q[1], r[0], r[1]); };
      var n0 = T(50, 14);
      go(n0[1]);
      var la = mark();
      CT([58, 4], [74, 0], [84, 6]);       // right cusp
      CT([96, 13], [98, 32], [94, 48]);    // crown
      CT([91, 62], [88, 70], [86, 84]);    // neck
      CT([84, 98], [80, 114], [72, 116]);  // right root
      var lb = mark();
      CT([66, 117], [64, 104], [62, 94]);
      CT([60, 86], [56, 80], [50, 80]);    // between the roots
      CT([44, 80], [40, 86], [38, 94]);
      CT([36, 104], [34, 117], [28, 116]); // left root tip, where the halves meet
      CT([22, 115], [18, 124], [18, 140]);
      var bd = '', seg = [[50, 14], [42, 4], [26, 0], [16, 6], [4, 13], [2, 32], [6, 48], [9, 62], [12, 70], [14, 84], [16, 98], [20, 114], [28, 116]];
      seg.forEach(function (pt, i) { var p = T(pt[0], pt[1]); bd += (i === 0 ? 'M' : (i % 3 === 1 ? 'C' : ' ')) + f(p[0]) + ' ' + f(p[1]); });
      branch(bd, la, lb);
    }

    /* 4. clinic: a small sparkle on the line */
    var ct = off($('.clinic__text'), main);
    var r = Math.min(14, gx - 5, cl - gx - 6);
    if (r >= 8) {
      var scy = ct.y + ct.h * 0.5;
      go(scy - r);
      var sa = mark();
      C(gx + r * 0.08, scy - r * 0.35, gx + r * 0.35, scy - r * 0.08, gx + r * 0.85, scy);
      C(gx + r * 0.35, scy + r * 0.08, gx + r * 0.08, scy + r * 0.35, gx, scy + r);
      var sb = mark();
      branch('M' + f(gx) + ' ' + f(scy - r) +
        'C' + f(gx - r * 0.08) + ' ' + f(scy - r * 0.35) + ' ' + f(gx - r * 0.35) + ' ' + f(scy - r * 0.08) + ' ' + f(gx - r * 0.85) + ' ' + f(scy) +
        'C' + f(gx - r * 0.35) + ' ' + f(scy + r * 0.08) + ' ' + f(gx - r * 0.08) + ' ' + f(scy + r * 0.35) + ' ' + f(gx) + ' ' + f(scy + r), sa, sb);
    }

    /* 5. final CTA: into the box, where it becomes a smile under the headline */
    var fb = off(box, main), h2 = $('h2', box), lp = $('p', box);
    var pad = parseFloat(getComputedStyle(h2).paddingBottom) || 0;
    var textBottom = h2.offsetTop + h2.offsetHeight - pad, avail = lp.offsetTop - textBottom;
    var rng = document.createRange(); rng.selectNodeContents(h2);
    var rects = Array.prototype.slice.call(rng.getClientRects()), l = 1e9, rr = -1e9;
    rects.forEach(function (q) { if (q.width > 1) { l = Math.min(l, q.left); rr = Math.max(rr, q.right); } });
    var lineW = rr > l ? rr - l : h2.offsetWidth * 0.8;   // width of the headline text
    var bw = box.clientWidth, bhh = box.clientHeight;
    var scx = h2.offsetLeft + h2.offsetWidth / 2;
    var hw = Math.max(70, Math.min(lineW * 0.34, 190)), dep = Math.min(hw * 0.24, avail * 0.42);
    var y0 = textBottom + avail * 0.1, ay = y0 + dep * 0.75, Lx = scx - hw, Rx = scx + hw;

    var ey = fb.y + y0, rf = Math.min(90, (ey - cy) * 0.5);
    go(ey - rf);
    C(gx, ey - rf * 0.45, gx + (fb.x - gx) * 0.45, ey, fb.x, ey);
    mainPath.setAttribute('d', d);

    var td = Math.hypot(0.45 * hw, 1.33 * dep), ux = 0.45 * hw / td, uy = 1.33 * dep / td, tk = Math.min(60, hw * 0.5);
    var ed = 'M0 ' + f(y0) +
      'C' + f(Lx * 0.55) + ' ' + f(y0) + ' ' + f(Lx - ux * tk) + ' ' + f(ay - uy * tk) + ' ' + f(Lx) + ' ' + f(ay) +
      'C' + f(Lx + hw * 0.45) + ' ' + f(ay + dep * 1.33) + ' ' + f(Rx - hw * 0.45) + ' ' + f(ay + dep * 1.33) + ' ' + f(Rx) + ' ' + f(ay) +
      'C' + f(Rx + hw * 0.06) + ' ' + f(ay - dep * 0.18) + ' ' + f(Rx + hw * 0.11) + ' ' + f(ay - dep * 0.5) + ' ' + f(Rx + hw * 0.12) + ' ' + f(ay - dep * 0.75);
    svgEnd.setAttribute('viewBox', '0 0 ' + bw + ' ' + bhh);
    endPath.setAttribute('d', ed);

    /* lookup table: drawn length <-> a scroll metric that follows the page downward */
    var Lm = mainPath.getTotalLength(), Le = endPath.getTotalLength();
    var Ls = [], Ms = [], Xs = [], Ys = [], step = 5, m = 0, py = 0;
    var betaEnd = (vh * 0.32) / Le;
    function sample(p, L, base, dx, dy, beta) {
      for (var s = 0; s <= L + 0.001; s += step) {
        var ll = Math.min(s, L), pt = p.getPointAtLength(ll), yy = pt.y + dy;
        if (!Ls.length) m = yy;
        else m = Math.max(m + beta * (base + ll - Ls[Ls.length - 1]), yy);
        Ls.push(base + ll); Ms.push(m); Xs.push(pt.x); Ys.push(pt.y);
        if (ll === L) break;
        if (s + step > L) s = L - step;
      }
    }
    sample(mainPath, Lm, 0, 0, 0, 0.35);
    var split = Ls.length;
    sample(endPath, Le, Lm, fb.x, fb.y, betaEnd);

    var mainTop = off(main, document.body).y;
    var arcDoc = mainTop + fb.y + ay;
    G = { Lm: Lm, Le: Le, Ls: Ls, Ms: Ms, Xs: Xs, Ys: Ys, split: split, m0: Ms[0], m1: Ms[Ms.length - 1], arcDoc: arcDoc, vh: vh, W: W, H: H };

    [mainPath, endPath].forEach(function (p, i) {
      var L = i ? Le : Lm; p.style.strokeDasharray = L + ' ' + (L + 2); p._L = L; p._shown = -1;
    });
    branches.forEach(function (b) { b.el.style.strokeDasharray = b.len + ' ' + (b.len + 2); });
  }

  /* ---------- draw ---------- */
  function setDash(p, drawn) {
    var o = p._L - drawn;
    if (Math.abs(o - p._shown) < 0.05) return;
    p._shown = o;
    p.style.strokeDashoffset = o;
    p.style.visibility = drawn <= 0.01 ? 'hidden' : 'visible';
  }
  var nibOn = null, nibEndOn = null;
  function showNib(n, on, x, y) {
    if (on) n.setAttribute('transform', 'translate(' + f(x) + ' ' + f(y) + ')');
    var flag = n === nib ? nibOn : nibEndOn;
    if (flag !== on) { n.style.opacity = on ? '' : '0'; if (n === nib) nibOn = on; else nibEndOn = on; }
  }

  function drawLength(total, withNib) {
    var mainDrawn = Math.min(total, G.Lm), endDrawn = Math.max(0, total - G.Lm);
    setDash(mainPath, mainDrawn);
    setDash(endPath, endDrawn);
    branches.forEach(function (b) {
      var t = Math.max(0, Math.min(1, (mainDrawn - b.a) / (b.b - b.a))), o = b.len * (1 - t);
      if (Math.abs(o - b.shown) < 0.05) return;
      b.shown = o; b.el.style.strokeDashoffset = o; b.el.style.visibility = t <= 0 ? 'hidden' : 'visible';
    });
    return { mainDrawn: mainDrawn, endDrawn: endDrawn };
  }

  function render(scroll) {
    if (!G) return;
    var e = Math.max(1, Math.min(G.arcDoc - G.vh * 0.55, maxScroll()));
    var pm = G.m0 + (G.m1 - G.m0) * Math.max(0, Math.min(1, scroll / e));
    var Ms = G.Ms, lo = 0, hi = Ms.length - 1;
    if (pm <= Ms[0]) hi = 0;
    else if (pm >= Ms[hi]) lo = hi;
    else { while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (Ms[mid] <= pm) lo = mid; else hi = mid; } }
    var t = hi > lo ? (pm - Ms[lo]) / (Ms[hi] - Ms[lo] || 1) : 0;
    var total = Math.max(SEED, G.Ls[lo] + (G.Ls[hi] - G.Ls[lo]) * t);   // a small start is always visible
    drawLength(total);
    /* nib = the pen tip, at the end of the drawn line */
    var Ls = G.Ls; lo = 0; hi = Ls.length - 1;
    while (hi - lo > 1) { var md = (lo + hi) >> 1; if (Ls[md] <= total) lo = md; else hi = md; }
    t = (total - Ls[lo]) / ((Ls[hi] - Ls[lo]) || 1);
    var inEnd = lo >= G.split, done = total >= G.Lm + G.Le - 0.5;
    var x, y;
    if (lo === G.split - 1) { x = G.Xs[lo]; y = G.Ys[lo]; }
    else { x = G.Xs[lo] + (G.Xs[hi] - G.Xs[lo]) * t; y = G.Ys[lo] + (G.Ys[hi] - G.Ys[lo]) * t; }
    showNib(nib, !inEnd, x, y);
    showNib(nibEnd, inEnd && !done, x, y);
  }
  var SEED = 26;
  function maxScroll() { return Math.max(1, document.documentElement.scrollHeight - innerHeight); }

  /* ---------- wiring ---------- */
  var state = { s: 0 }, tween = null, lastW = 0, lastH = 0, queued = false;

  function finished() {           // static, fully drawn (reduced motion / no GSAP)
    drawLength(G.Lm + G.Le);
    showNib(nib, false); showNib(nibEnd, false);
  }
  function update() { if (!G) return; if (!tween) finished(); else render(state.s * maxScroll()); }

  function setup() {
    if (tween) { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill(); tween = null; }
    document.documentElement.classList.toggle('smile-static', reduce.matches || !hasGsap);
    if (!reduce.matches && hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
      tween = gsap.to(state, {
        s: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.6, invalidateOnRefresh: true },
        onUpdate: update
      });
    }
    update();
  }

  function rebuild() {
    queued = false;
    var w = main.clientWidth, h = main.offsetHeight;
    if (G && w === lastW && h === lastH && Math.abs(innerHeight - G.vh) < 120) { update(); return; }
    var heightChanged = h !== lastH;
    lastW = w; lastH = h;
    build();
    if (heightChanged && tween && window.ScrollTrigger) ScrollTrigger.refresh();
    update();
  }
  function queue(force) {
    if (force) lastW = -1;
    if (queued) return; queued = true;
    requestAnimationFrame(rebuild);
  }

  build(); lastW = main.clientWidth; lastH = main.offsetHeight;
  setup();
  if (window.ResizeObserver) new ResizeObserver(function () { queue(); }).observe(main);
  else addEventListener('resize', function () { queue(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { queue(true); });
  addEventListener('load', function () { queue(true); });
  var langBtn = $('[data-lang]');
  if (langBtn) langBtn.addEventListener('click', function () { setTimeout(function () { queue(true); }, 30); });
  reduce.addEventListener && reduce.addEventListener('change', setup);
})();
