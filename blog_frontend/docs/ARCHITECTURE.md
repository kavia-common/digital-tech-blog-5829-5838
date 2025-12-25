# Architecture Document: Digital Tech Static Blog Application

## 1. System Overview & Context

The Digital Tech Blog is a **fully static**, single-page React web application intended for static site hosting. It delivers curated digital tech blog content with instant navigation and a mobile-first, accessible, and visually modern interface. 

> **No backend/server, database, or API:**  
All content is statically declared in frontend code (`samplePosts.js`) and distributed as pre-built static assets via any compatible host (Netlify, Vercel, GitHub Pages, S3).

---

## 2. Container and Component Model

- **Container:**  
  - React SPA (blog_frontend), runs on port 3000 (development), deploys as pure static assets in production.
- **Core Pages:**  
  - **Home** (`/`): Post listing (all posts from samplePosts.js)
  - **Post Detail** (`/posts/:postId`): Single post view
  - **About** (`/about`): Static site info
- **Core Components:**  
  - **NavBar:** Header with site title and SPA links
  - **Footer:** Persistent at bottom
  - **Theme Toggle:** Button to switch light/dark mode
- **Routing:**  
  - Via `react-router-dom`; no page reloads; 404/unknown route fallback to Home.
- **Static Data Source:**  
  - `src/samplePosts.js` — JS array with all post metadata/content.

---

## 3. System Architecture (Textual Diagram)

**High-Level Component Structure:**

- `App.js` (Root Application)
  - ├── `<Router>` (react-router-dom)
  - │   ├── `<NavBar />`
  - │   ├── `<ThemeToggle />`
  - │   ├── `<Routes>`
  - │   │     ├── `/` → `<Home />` (Post listings)
  - │   │     ├── `/posts/:postId` → `<PostDetail />`
  - │   │     ├── `/about` → `<About />`
  - │   │     ├── `*` (fallback) → `<Home />`
  - │   └── `<Footer />`

**Textual Component/Container Diagram:**
```
[App.js]
  ├─> [NavBar.js]
  ├─> [Theme Toggle Button (inline)]
  ├─> [Routes]
        ├─> [Home.js]          (uses samplePosts.js)
        ├─> [PostDetail.js]    (uses samplePosts.js, match by id)
        ├─> [About.js]
        └─> [Fallback] → Home
  └─> [Footer.js]
```

---

## 4. Routing Structure

| Path                   | Rendered Component | Notes                                  |
|------------------------|-------------------|----------------------------------------|
| `/`                    | `Home`            | Blog post listing                      |
| `/posts/:postId`       | `PostDetail`      | Individual blog post, by ID            |
| `/about`               | `About`           | Static About page                      |
| `*` (unmatched route)  | `Home`            | Fallback, loads post list              |

- Navigation is SPA-only (using React Router 6).
- Route links use `<Link>`/`<NavLink>` for instant native-feeling switching.
- On refresh or direct navigation, all routes remain accessible due to static asset hosting (if host is configured correctly).

---

## 5. Data Flow

- **Blog Content:**  
  - Imported once from `samplePosts.js`
  - `Home.js` maps through `samplePosts`
  - `PostDetail.js` finds and displays one post (by `postId` param)
- **Static data approach:**  
  - No network fetch, no runtime dynamic content.
  - To add/edit posts: modify the JS array in `samplePosts.js`.
- **Component State:**  
  - Only global React state: theme (light/dark).
  - No Redux, context, or complex state handlers.

---

## 6. Theming & Style System

- **App-wide style guide:**  
  - Light theme is default, with primary color `#3b82f6` and accent `#06b6d4`, background `#f9fafb`, surface `#fff`, text `#111827`.
- **Theme Toggle:**  
  - React `useState` in `App.js`
  - Alters `data-theme` attribute on `<html>` for CSS variable switching (`src/App.css`)
  - Applies modern, easily maintained CSS custom property design
- **Responsiveness:**  
  - CSS media queries in `App.css` for breakpoints and scaling
  - Layouts adapt between desktop/tablet/mobile sizes
- **Branding:**  
  - NavBar and buttons styled with brand colors and highlight states

---

## 7. Build & Deployment Assumptions

- **Build:**  
  - Uses `react-scripts` (from CRA) for development, testing, build.
  - `npm run build` produces pure static assets in `/build`
- **Deployment:**  
  - **Any static file host** supporting SPAs
  - Fallback routing needed: all non-asset paths route to `index.html`
- **Environment Variables:**  
  - Many defined in `.env` (from container template), but unused at runtime by the app
  - Only relevant for possible future enhancements, or ignored

---

## 8. Error Handling

- **Bad Route:**  
  - Fallback route (`*`) loads Home page by default
- **Post Not Found:**  
  - Invalid post IDs show “Post not found” and return link/button
- **Missing Static Data:**  
  - If `samplePosts.js` is empty/malformed, Home shows no posts gracefully

---

## 9. Logging & Diagnostics

- No application-level logging or error reporting implemented, as site is static.
- Browser and build system logs provide developer feedback (lint/build warnings).

---

## 10. i18n & Accessibility

- **i18n:**  
  - Single language (English) by default; no translation/internationalization framework.
  - Page/component structure is ready for future i18n insertion.

- **Accessibility (a11y):**  
  - Semantic landmarks: `<main>`, `<nav>`, `<footer>`, headings
  - Theme toggle uses `aria-label`
  - Color palette designed for readable contrast in both themes
  - Keyboard navigation supported for all major actions
  - No auto-playing content or keyboard traps

---

## 11. SEO Strategy

- Semantic HTML elements and correct heading hierarchy
- Basic metadata (`<title>`, description) in `index.html`
- No runtime per-route meta (e.g. `react-helmet`); recommend as future ext.
- SPA SEO is limited; not suitable for mission-critical Google visibility

---

## 12. Extensibility Options

- **Post Search/Filter:**  
  Add search box or tag/category system with additional static fields.
- **Markdown or CMS:**  
  Add a build step to fetch/import posts from Markdown or a headless CMS for richer authoring.
- **Dynamic Theming:**  
  Persist user theme in localStorage, add more palettes
- **Analytics:**  
  Add telemetry if needed (document privacy, follow opt-in best practices)
- **Language Support:**  
  Integrate i18n library if required for future audiences

---

## 13. Constraints

- **No Backend:**  
  App cannot fetch or mutate data at runtime.
- **All content updates require code changes and redeploy.**
- **Dependent on correct static hosting for SPA routing.**

---

## 14. References & Source Files

- `src/App.js` — root application/routing/theme logic
- `src/components/NavBar.js`, `Footer.js`
- `src/pages/Home.js`, `PostDetail.js`, `About.js`
- `src/samplePosts.js` — post content model
- `src/App.css` — styling, theme, media queries
- `.env` (for documentation; not consumed at runtime)
- `package.json`, `README.md`

---

_Last updated: 2024-06_

