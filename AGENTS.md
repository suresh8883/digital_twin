# Digital Twin Technologies website (digitaltwintec.com)

Four-page marketing site for Digital Twin Technologies, a BIM / shop-drawing / facilities-
management consultancy in Dubai. Static React SPA (Create React App), served by GitHub Pages
from the `gh-pages` branch at https://digitaltwintec.com. Its job: present the services and
turn visitors into enquiries (contact form opens a `mailto:` to Enquiry@digitaltwintec.com; there
is no backend). Built 2021 by Karthik (upstream `thirumalai77/digital_twins`); this fork
(`suresh8883/digital_twin`) is the maintained, live copy, redesigned March 2026.

**Read this file first. It replaces exploring the project.**

## Orientation

| | |
|---|---|
| Stack | Create React App `react-scripts 4.0.2` (webpack 4), React 17, `react-router-dom` 5 (BrowserRouter), `react-bootstrap` 1.6 on Bootstrap **4.6** CSS, `react-slick`, Font Awesome 5 (`@fortawesome/*-svg-icons`), plain CSS |
| Entry points | `public/index.html` (shell, fonts, meta) → `src/index.js` → `src/App.js` → `src/components/Route.js` (routes) |
| Node | 24 via mise (`eval "$(mise activate zsh --shims)"`); every webpack command below needs `NODE_OPTIONS=--openssl-legacy-provider` |
| Install | `npm install --legacy-peer-deps` (`npm ci` fails: lockfile out of sync with npm 11 peer resolution) |
| Run locally | `NODE_OPTIONS=--openssl-legacy-provider npm start` → http://localhost:3000 |
| Build | `NODE_OPTIONS=--openssl-legacy-provider npm run build` → `build/` (verified 2026-10-18, ~3 s) |
| Test | `CI=true npm test -- --watchAll=false` — **broken** (see Environment quirks); not a gate |
| Deploy | `NODE_OPTIONS=--openssl-legacy-provider npm run deploy` = build + `gh-pages -d build` → pushes to `origin/gh-pages` = production. No CI, no staging |

Exact versions live in `package.json` / `package-lock.json`; read them, never recall them.

## Hard rules (all advisory; nothing is enforced by CI or hooks)

1. **Default branch is `digital_twin`, not `main`.** Branch from it, open PRs against it.
   `gh-pages` is build output: never edit, merge or rebase it.
2. **`npm run deploy` is a production release.** Only run it when asked. Before it: build green,
   walk all four pages locally at desktop and phone width.
3. **Keep `public/CNAME` = `digitaltwintec.com` and `"homepage"` in `package.json`.** The
   build copies CNAME into `build/`; losing it detaches the custom domain on the next deploy.
4. **Bootstrap is 4.6, but the March 2026 redesign used v5 class names** (`ms-auto`, `g-4`,
   `g-5`, `text-start`). They are no-ops here; layout comes from `src/index.css`. Do not rely
   on Bootstrap utilities without checking they exist in 4.6, and do not "fix" by upgrading
   Bootstrap casually (react-bootstrap 1.x is tied to Bootstrap 4).
5. **Business copy is the customer's** (service texts, team blurbs, address, email, hours,
   slide titles). Change it only when the task says so; never invent claims or contact details.
6. **Do not modernise the toolchain unless asked** (CRA 4 → Vite, React 17 → 18, router 5 → 6).
   It is a 4-page brochure site; the owner deploys it a few times a year.

## Architecture map

- `src/components/Route.js` — BrowserRouter, the 4 routes (`/`, `/about`, `/services`,
  `/contactUs`), NavBar/Footer/ScrollTop wrappers, scroll-to-top on route change.
- `src/components/NavBar.js` — react-bootstrap Navbar; `scrolled` state toggles a CSS class.
- `src/components/Home/` — `index.js` composes `HomeSlider` (hand-rolled hero, 5 s interval,
  `slides` array), `ContentIcon` (services grid, `services` array, IntersectionObserver
  reveal), `BackgroundImageText` (CTA), `Homecontentslider` (react-slick portfolio).
- `src/components/About/index.js` — intro + team cards (`team` array).
- `src/components/Services/index.js` — banner + custom tab switcher (`tabs` array).
- `src/components/ContactUS/index.js` — Google Maps iframe, contact details, validated form;
  submit builds a `mailto:` URL. `validate()` at the top is the only form logic.
- `src/index.css` — all styling (~1200 lines). Design tokens in `:root` at the top; one
  banner-commented block per page section. `src/App.css` is 3 lines.
- `src/usePageTitle.js` — per-page `document.title`; call it first in every page component.
- `src/assets/images/` — the 5 hero slides are reused as About/Services imagery.

Patterns: a new page = `src/components/<Name>/index.js` + a `<Route>` in `Route.js` + a
`NavLink` in `NavBar.js` + `usePageTitle('<Name>')`. Page content is a data array at the top of
the component, rendered by `.map`. Scroll-reveal: copy `useScrollReveal` from `ContentIcon.js`
(a near-duplicate `useReveal` sits in `About/index.js`; consolidate if you touch both).

Dead code was removed in PR # (2026-10-27): root `index.html`/`CNAME`, `src/ContactForm.php`,
`src/logo.svg`, `src/App.test.js`, and the unused deps `framer-motion`, `aos`, `jquery`,
`popper.js`. There are now no tests at all; `npm test` stays documented as not a gate.

## Environment quirks

- webpack 4 + Node ≥ 17 → `ERR_OSSL_EVP_UNSUPPORTED` without `NODE_OPTIONS=--openssl-legacy-provider`.
- `npm test` dies before running: a newer `@babel/plugin-syntax-import-attributes` in the tree
  demands Babel ≥ 7.22 while CRA 4 ships `@babel/core` 7.12.3. Fixing it means fixing the
  toolchain (rule 6). Verify changes by building and clicking through instead.
- **Deep links 404 in production** (checked 2026-10-18: `/` → 200, `/about` → 404). GitHub
  Pages has no `404.html` fallback, so BrowserRouter routes only work via in-app navigation.
  Known gap; options are the `public/404.html` redirect trick or HashRouter. Decide with Suresh.
- `www.digitaltwintec.com` 301s to the apex; HTTPS is available but not enforced in Pages settings.
- `/Users/sureshkumar/Developer/test` is a stale 2021 clone of this repo (at `81254f0`). Work here.

## Workflow

- Agents may commit on feature branches off `digital_twin` and open PRs; never push to
  `gh-pages` or run `npm run deploy` unprompted. Suresh deploys.
- Definition of done: build succeeds with the flag; `npm start`, walk Home / About / Services /
  Contact Us at desktop and ~375 px width; nav active state follows the route; contact form
  validation and the `mailto:` fire; no new console warnings. Only observed behaviour counts.

## Decisions

- 2021-02 — CRA bootstrap by Karthik; 2021-07 hosting moved to GitHub Pages + custom domain,
  deploy via the `gh-pages` npm package (that is why it is a runtime dependency).
- 2021-08 — contact form originally posted to `src/ContactForm.php` on a PHP host. Replaced
  by `mailto:` in 2026; the PHP file was removed in PR #.
- 2024-02 — this fork became the maintained copy (upstream last touched 2021-08).
- 2026-03-27 — "Premium redesign": light theme, design tokens in `index.css`, hand-rolled hero
  slider, validated contact form, `usePageTitle`, `ScrollTop`. Deployed to `gh-pages` same day.

## Further reading

- `README.md` — stock CRA text; only the scripts section applies (and it omits the Node flag).
