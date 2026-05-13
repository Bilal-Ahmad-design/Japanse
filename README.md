# Coral Resort Management — Frontend

Static HTML/CSS/JS website. No build tools, no frameworks.

## Project Structure

```
crm/
├── index.html                  ← Home page
├── pages/
│   ├── about.html              ← 会社 (About)
│   ├── services.html           ← サービス (Services)
│   ├── work.html               ← 仕事 (Work / Portfolio)
│   ├── news.html               ← ニュース (News)
│   ├── contact.html            ← お問い合わせ (Contact)
│   └── privacy.html            ← プライバシーポリシー
├── assets/
│   ├── ASSETS.md               ← Full image/icon manifest with specs
│   ├── images/                 ← Drop your images here (see ASSETS.md)
│   ├── icons/                  ← arrow-right.svg, arrow-up.svg
│   └── fonts/                  ← (optional, fonts load from Google CDN)
├── css/
│   ├── tokens.css              ← Design tokens (colors, spacing, type)
│   ├── base.css                ← CSS reset + body defaults
│   ├── components.css          ← Reusable components (buttons, links…)
│   ├── layout.css              ← Header + Footer styles
│   ├── home.css                ← Home page section styles
│   ├── pages.css               ← Inner page section styles
│   └── responsive.css          ← Breakpoints (1200 / 900 / 600 px)
└── js/
    ├── layout.js               ← Header/footer injection, mobile nav,
    │                             scroll reveal, form handling
    └── head-template.js        ← (reference only — not executed)
```

## Adding Images

See `assets/ASSETS.md` for every required image with:
- Exact file path
- Pixel dimensions
- Description of what the Figma image shows

Drop your images into `assets/images/` and `assets/icons/`
matching the filenames in ASSETS.md. No code changes needed.

## CSS Architecture

| File | Purpose |
|------|---------|
| `tokens.css` | Single source of truth for all design values |
| `base.css` | Reset, body, utilities |
| `components.css` | `.btn-pill`, `.text-link`, `.section-title`, `.reveal`, etc. |
| `layout.css` | `.site-header`, `.site-footer`, nav, mobile drawer |
| `home.css` | `.hero`, `.about`, `.services`, `.work`, `.news`, `.contact` |
| `pages.css` | Inner page heroes, about/services/work/news/contact page layouts |
| `responsive.css` | Mobile-first overrides at 1200 / 900 / 600 px |

## JavaScript

`layout.js` is the only JS file. It:
1. Injects the shared `<header>` and `<footer>` into every page
2. Handles mobile nav toggle (hamburger)
3. Runs IntersectionObserver scroll-reveal on `.reveal` elements
4. Handles contact form validation and submit feedback
5. Detects root vs. `pages/` to resolve relative asset paths

## Breakpoints

| Breakpoint | Width |
|------------|-------|
| Desktop | > 1200px |
| Laptop | ≤ 1200px |
| Tablet | ≤ 900px |
| Mobile | ≤ 600px |

## Design Source

Figma: Aleatorio — Coral Resort Management
Node: 64-35 (Home page Japanese)
Colors: background `#e3e3e3`, text `#24252c`
