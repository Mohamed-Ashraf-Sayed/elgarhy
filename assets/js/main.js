(function () {
  'use strict';

  var root = document.documentElement;
  var EN = window.I18N_EN || {};

  /* ---------- Language (Arabic default, English from dictionary) ---------- */
  var textNodes = document.querySelectorAll('[data-i18n]');
  var attrNodes = document.querySelectorAll('[data-i18n-attr]');
  var arabic = { text: new Map(), attr: new Map() };

  textNodes.forEach(function (el) { arabic.text.set(el, el.innerHTML); });
  attrNodes.forEach(function (el) {
    var saved = {};
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var attr = pair.split(':')[0].trim();
      saved[attr] = el.getAttribute(attr);
    });
    arabic.attr.set(el, saved);
  });

  var langToggle = document.getElementById('lang-toggle');

  function setLanguage(lang) {
    var isEn = lang === 'en';
    root.lang = isEn ? 'en' : 'ar';
    root.dir = isEn ? 'ltr' : 'rtl';

    textNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = isEn && EN[key] !== undefined ? EN[key] : arabic.text.get(el);
    });
    attrNodes.forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = parts[0].trim();
        var key = parts[1].trim();
        var value = isEn && EN[key] !== undefined ? decode(EN[key]) : arabic.attr.get(el)[attr];
        el.setAttribute(attr, value);
      });
    });

    langToggle.textContent = isEn ? 'ع' : 'EN';
    langToggle.lang = isEn ? 'ar' : 'en';
    langToggle.setAttribute('aria-label', isEn ? 'التبديل إلى العربية' : 'Switch to English');

    try { localStorage.setItem('elgarhy-lang', root.lang); } catch (e) { /* storage unavailable */ }
  }

  function decode(html) {
    var t = document.createElement('textarea');
    t.innerHTML = html;
    return t.value;
  }

  var initial = new URLSearchParams(location.search).get('lang');
  if (!initial) {
    try { initial = localStorage.getItem('elgarhy-lang'); } catch (e) { /* storage unavailable */ }
  }
  if (initial === 'en') setLanguage('en');

  langToggle.addEventListener('click', function () {
    setLanguage(root.lang === 'en' ? 'ar' : 'en');
  });

  /* ---------- Nav: scrolled state, mobile menu, active link ---------- */
  var nav = document.getElementById('globalnav');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuToggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  mobileMenu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  var navLinks = document.querySelectorAll('.globalnav__links a');
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var section = document.querySelector(a.getAttribute('href'));
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Scroll reveal + counters ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion || !target) return;
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Company filters ---------- */
  var filters = document.querySelectorAll('.filter');
  var companies = document.querySelectorAll('.company');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      companies.forEach(function (card) {
        card.hidden = value !== 'all' && card.getAttribute('data-category') !== value;
      });
    });
  });

  /* ---------- Certificate lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('img');
  document.querySelectorAll('.cert').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lightboxImg.src = btn.getAttribute('data-full');
      lightboxImg.alt = btn.getAttribute('aria-label') || '';
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
      else window.open(lightboxImg.src, '_blank');
    });
  });
  lightbox.querySelector('.lightbox__close').addEventListener('click', function () { lightbox.close(); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });

  /* ---------- Contact form → mailto (static site, no backend) ---------- */
  var form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    var topic = form.querySelector('#f-topic');
    var subject = topic.options[topic.selectedIndex].text + ' — ' + data.get('name');
    var body = [
      data.get('message'),
      '',
      '—',
      data.get('name'),
      data.get('company'),
      data.get('phone')
    ].filter(function (line) { return line !== null; }).join('\n');
    window.location.href = 'mailto:info@elgarhysteel.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
