/* =============================================================
   layout.js — Inject shared header + footer, mobile nav, reveal
   Coral Resort Management
   ============================================================= */

/* ── Asset paths ──────────────────────────────────────────── */
const ASSETS = {
  logoHeader:   '../assets/images/logo-header.png',
  logoFooter:   '../assets/images/logo-footer.png',
  iconArrow:    '../assets/icons/arrow-right.svg',
  iconScrollUp: '../assets/icons/arrow-up.svg',
};

/* Root-relative paths used when layout.js is loaded from index.html */
const ASSETS_ROOT = {
  logoHeader:   'assets/images/logo-header.png',
  logoFooter:   'assets/images/logo-footer.png',
  iconArrow:    'assets/icons/arrow-right.svg',
  iconScrollUp: 'assets/icons/arrow-up.svg',
};

/* Detect whether we're at root or inside /pages/ */
const isRoot  = !window.location.pathname.includes('/pages/');
const A       = isRoot ? ASSETS_ROOT : ASSETS;
const rootHref = isRoot ? '' : '../';

/* ── NAV LINKS ────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'ホーム',   href: `${rootHref}index.html` },
  { label: 'ビジネス', href: `${rootHref}pages/business.html` },
  { label: '仕事',     href: `${rootHref}pages/work.html` },
  { label: '会社',     href: `${rootHref}index.html#company` },
];
const contactHref = `${rootHref}pages/contact.html`;

/* Mark active link */
function buildNavLinks(wrapperClass) {
  return NAV_ITEMS.map(item => {
    const current = window.location.pathname.endsWith(item.href.split('/').pop());
    const aria    = current ? ' aria-current="page"' : '';
    return `<li><a href="${item.href}" class="${wrapperClass}"${aria}>${item.label}</a></li>`;
  }).join('');
}

/* ── HEADER ───────────────────────────────────────────────── */
function injectHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.setAttribute('role', 'banner');
  header.innerHTML = `
    <div class="site-header__inner">
      <a href="${rootHref}index.html" class="logo logo--dark" aria-label="ホームへ">
        <img src="${A.logoHeader}" alt="Coral Resort Management" width="147" height="49" />
      </a>

      <nav class="site-header__nav" aria-label="メインナビゲーション">
        <ul class="nav-links">${buildNavLinks('nav-link')}</ul>
        <a href="${contactHref}" class="btn-pill">お問い合わせ</a>
      </nav>

      <button
        class="nav-toggle"
        id="nav-toggle"
        aria-controls="mobile-nav"
        aria-expanded="false"
        aria-label="メニューを開く"
      >
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
      </button>
    </div>

    <nav
      class="mobile-nav"
      id="mobile-nav"
      aria-label="モバイルナビゲーション"
      aria-hidden="true"
      hidden
    >
      <ul>${buildNavLinks('mobile-nav-link')}</ul>
      <a href="${contactHref}" class="btn-pill">お問い合わせ</a>
    </nav>
  `;
  document.body.prepend(header);
  initMobileNav();
}

/* ── FOOTER ───────────────────────────────────────────────── */
function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.setAttribute('role', 'contentinfo');
  footer.innerHTML = `
    <div class="site-footer__inner">

      <!-- Row 1: logo + scroll-up -->
      <div class="footer-top">
        <a href="${rootHref}index.html" class="logo logo--dark" aria-label="ホームへ">
          <img src="${A.logoFooter}" alt="Coral Resort Management" width="272" height="91" />
        </a>
        <button
          class="btn-circle"
          onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
          aria-label="ページトップへ戻る"
        >
          <img src="${A.iconScrollUp}" alt="" />
        </button>
      </div>

      <!-- Row 2: nav + privacy -->
      <div class="footer-nav-row">
        <div class="footer-nav-group">
          <p class="footer-nav-label">ナビゲーション</p>
          <ul class="footer-links">
            ${NAV_ITEMS.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('')}
          </ul>
        </div>
        <a href="${rootHref}pages/privacy.html" class="footer-privacy">プライバシーポリシー</a>
      </div>

      <!-- Row 3: contact btn + copyright -->
      <div class="footer-bottom">
        <a href="${contactHref}" class="btn-pill">連絡先</a>
        <p class="footer-copyright">©︎ コーラルリゾート管理　全著作権所有。</p>
      </div>

    </div>
  `;
  document.body.appendChild(footer);
}

/* ── MOBILE NAV TOGGLE ────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('mobile-nav');
  if (!toggle || !menu) return;

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('hidden');
    menu.style.display = 'flex';
    menu.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', onEsc);
    document.addEventListener('click', onOutside);
  };

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.style.display = 'none';
    menu.setAttribute('hidden', '');
    menu.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onOutside);
  };

  const onEsc     = e => { if (e.key === 'Escape') close(); };
  const onOutside = e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) close();
  };

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  /* Close when any link inside mobile menu is clicked */
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ── SCROLL REVEAL ────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -28px 0px' }
  );
  els.forEach(el => io.observe(el));
}

/* ── SMOOTH ANCHOR SCROLL ─────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ── PARALLAX SCROLL EFFECT ───────────────────────────────── */
function initParallax() {
  const heroBand = document.querySelector('.hero__band-img');
  if (!heroBand) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBandTop = heroBand.closest('.hero__band').offsetTop;
    const distance = scrollY - (heroBandTop - window.innerHeight);

    if (distance > -window.innerHeight && distance < window.innerHeight * 2) {
      const scale = 1 + (distance * 0.0005);
      heroBand.style.transform = `scale(${scale})`;
    }
  });
}

/* ── CONTACT FORM ─────────────────────────────────────────── */
function initContactForm() {
  const form = document.querySelector('.js-contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;

    /* Basic validation */
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(f => {
      f.classList.remove('field-error');
      if (!f.value.trim()) { f.classList.add('field-error'); valid = false; }
    });
    if (!valid) return;

    btn.textContent = '送信中…';
    btn.disabled = true;

    /* Simulate async send */
    setTimeout(() => {
      btn.textContent = '送信完了 ✓';
      setTimeout(() => {
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  initReveal();
  initSmoothScroll();
  initParallax();
  initContactForm();
});
