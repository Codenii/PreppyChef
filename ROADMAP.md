# 🗺️ PreppyChef Roadmap

Each version in this roadmap is a **vertical slice** — a fully working application from the database to the UI. You can run the app at the end of every version and use the features that have been built so far.

Development for each version happens on a dedicated `v0.x.0-dev` branch. CI runs on every push to that branch and on all pull requests targeting `main`.

> **Versioning philosophy:**
> - `v0.1.0`–`v0.9.0` — Iterative feature slices. Each one is a shippable increment.
> - `v1.0.0` — Production hardening only. No new features. This is the bar for a real public release.

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔲 | Planned |
| 🔄 | In Progress |
| ✅ | Complete |

---

## v0.1.0 — Project Foundation & Infrastructure
**Branch:** `v0.1.0-dev`
**Goal:** A running full-stack skeleton. No application features — just infrastructure you can build on with confidence.

### Backend
- 🔲 Initialize pnpm monorepo with workspace structure (`apps/api`, `apps/web`, `packages/db`)
- 🔲 Scaffold Fastify API (`apps/api`) with TypeScript, Zod, plugin folder structure, and `GET /health`
- 🔲 Set up `packages/db` with Drizzle ORM, drizzle-kit, and baseline migration

### Frontend
- 🔲 Scaffold Vue 3 + PrimeVue app (`apps/web`) with Pinia, Vue Router, and base layout (nav + mobile bottom bar)

### Infrastructure
- 🔲 Docker Compose for local development (API + Web + Postgres with hot-reload volumes)
- 🔲 `docker-compose.prod.yml` skeleton
- 🔲 `.nvmrc` and `engines` field pinned to Node 24
- 🔲 `.env.example` files for all apps

### CI / Testing
- 🔲 GitHub Actions CI: lint → test → build, triggered on push to `main`, `v*-dev` branches, and PRs to `main`
- 🔲 Vitest configured in `apps/api` and `apps/web`
- 🔲 Smoke test: `GET /health` returns 200
- 🔲 Smoke test: Vue app root component mounts without errors

---

## v0.2.0 — Recipe Browsing
**Branch:** `v0.2.0-dev`
**Goal:** A user can open the app, search for recipes, and view a full recipe detail page. No login required.

### Backend
- 🔲 Design and implement `RecipeProvider` adapter interface (pluggable — swap APIs by changing config)
- 🔲 Implement `TheMealDBAdapter` (default provider — free, no API key required)
- 🔲 Drizzle schema + migration: `recipes`, `ingredients`, `recipe_ingredients`
- 🔲 API routes: `GET /recipes/search`, `GET /recipes/:id`, `GET /recipes/categories`

### Frontend
- 🔲 Recipe search page: debounced search bar, responsive results grid, loading skeletons, empty state
- 🔲 Recipe detail page: title, image, metadata, ingredients list, step-by-step instructions

### CI / Testing
- 🔲 Unit: `TheMealDBAdapter` with mocked HTTP — assert correct mapping to internal types
- 🔲 Unit: edge cases (empty search, missing fields in API response)
- 🔲 Integration: all three recipe API routes
- 🔲 Component: recipe card renders correctly
- 🔲 Component: recipe detail page renders ingredients and instructions

---

## v0.3.0 — User Accounts & Favorites
**Branch:** `v0.3.0-dev`
**Goal:** Users can register, log in, and save recipes as favorites. Introduces the authenticated layer.

### Backend
- 🔲 Drizzle schema + migration: `users`, `sessions`, `favorites`
- 🔲 Better Auth integration: register, login, logout, `/auth/me`, JWT + refresh, Fastify auth hook
- 🔲 Favorites API routes (auth required): `POST /favorites`, `DELETE /favorites/:recipeId`, `GET /favorites`

### Frontend
- 🔲 Register page and login page with form validation and error handling
- 🔲 Auth state in Pinia (`useAuthStore`), session persistence, route guards
- 🔲 Logged-in user shown in nav; logout button
- 🔲 Favorite toggle on recipe cards and detail page (optimistic UI)
- 🔲 `/favorites` page: grid of favorited recipes

### CI / Testing
- 🔲 Unit: auth middleware rejects unauthenticated requests with 401
- 🔲 Unit: password hashing and comparison
- 🔲 Integration: register → login → logout → `/auth/me` flow
- 🔲 Integration: favorites add/remove/list (with and without auth)
- 🔲 Component: login form validation states
- 🔲 Component: favorite toggle reflects correct state

---

## v0.4.0 — Custom Recipes
**Branch:** `v0.4.0-dev`
**Goal:** Users can create, edit, and delete their own recipes using the same ingredient model as external ones.

### Backend
- 🔲 Extend `recipes` schema: `source` enum (`external` | `custom`), `user_id` FK, `is_public` flag; migration
- 🔲 Custom recipe CRUD routes (auth required): `POST`, `PUT`, `DELETE /recipes/:id`, `GET /recipes/mine`
- 🔲 Image upload endpoint (`POST /uploads/recipe-image`): local volume in dev, Cloudflare R2 in prod

### Frontend
- 🔲 Create/Edit recipe form: title, description, times, servings, image upload, ingredient builder, instructions editor
- 🔲 `/my-recipes` page: grid of user's custom recipes with edit/delete actions
- 🔲 Custom recipes appear in search results with a visual badge

### CI / Testing
- 🔲 Unit: recipe validation (missing fields, invalid quantities, bad image type)
- 🔲 Unit: ingredient list normalization
- 🔲 Integration: full CRUD for custom recipes
- 🔲 Integration: ownership enforcement (403 when editing another user's recipe)
- 🔲 Component: recipe form validation errors render correctly
- 🔲 Component: ingredient builder add/remove behavior

---

## v0.5.0 — Menu Planning
**Branch:** `v0.5.0-dev`
**Goal:** Users can create weekly or monthly menus and schedule recipes onto specific days and meal slots. This is the core meal prep experience.

### Backend
- 🔲 Drizzle schema + migration: `menus`, `menu_items`
- 🔲 Menu CRUD routes (auth required): create, list, get (with full items), update, delete
- 🔲 Menu item routes: add, update (date/meal type/servings), remove; duplicate slot prevention

### Frontend
- 🔲 `/menus` page: list of menus with create dialog and delete confirmation
- 🔲 Menu builder (`/menus/:id`): calendar grid (weekly) / scrollable list (monthly), meal slots per day
- 🔲 Recipe picker modal: search bar, tabs (All / Favorites / My Recipes), assigns recipe to slot
- 🔲 Mobile menu builder: single-day scrollable view with swipe between days

### CI / Testing
- 🔲 Unit: menu date range validation
- 🔲 Unit: duplicate slot detection
- 🔲 Integration: menu CRUD endpoints
- 🔲 Integration: menu item add/update/delete
- 🔲 Component: menu builder grid renders slots correctly
- 🔲 Component: recipe picker modal search and selection

---

## v0.6.0 — Serving Size Scaling
**Branch:** `v0.6.0-dev`
**Goal:** Users can override servings on any recipe and all ingredient quantities update in real time.

### Backend
- 🔲 `scaleIngredients(ingredients, originalServings, targetServings)` utility (handles fractions cleanly)
- 🔲 `GET /recipes/:id?servings=N` returns recipe with scaled ingredients
- 🔲 `servings_override` update wired into menu item update endpoint

### Frontend
- 🔲 Serving stepper on recipe detail page: ingredients update reactively; fractional display (e.g., `1 1/2 cups`); reset to default button
- 🔲 Per-menu-item serving override in menu builder: inline edit, visual badge when overridden

### CI / Testing
- 🔲 Unit: `scaleIngredients` — whole numbers, fractions, large multipliers, edge cases
- 🔲 Unit: fraction formatting utility
- 🔲 Integration: `GET /recipes/:id?servings=N` returns correctly scaled ingredients
- 🔲 Component: serving stepper updates ingredient quantities reactively
- 🔲 Component: menu builder shows correct serving overrides

---

## v0.7.0 — Shopping Lists
**Branch:** `v0.7.0-dev`
**Goal:** Auto-generate a consolidated, deduplicated shopping list from any menu, with per-item retailer search links and export.

### Backend
- 🔲 Drizzle schema + migration: `shopping_lists`, `shopping_list_items`
- 🔲 Shopping list generation service: aggregate ingredients, respect serving overrides, deduplicate, normalize units, categorize
- 🔲 Retailer URL builder: configurable per-item search links for Walmart, Meijer, Kroger, Instacart, Amazon Fresh
- 🔲 Shopping list routes: generate, get (with retailer URLs), check/uncheck item, delete, export (CSV / plain text)

### Frontend
- 🔲 'Generate Shopping List' button on menu detail page
- 🔲 Shopping list page (`/shopping-lists/:id`): items grouped by category, check-off with strikethrough, per-item retailer icons
- 🔲 Export: copy to clipboard, download CSV, native share API on mobile

### CI / Testing
- 🔲 Unit: ingredient aggregation across multiple recipes
- 🔲 Unit: deduplication and quantity combination
- 🔲 Unit: unit normalization
- 🔲 Unit: retailer URL builder for each supported store
- 🔲 Integration: generate → check/uncheck → export endpoints
- 🔲 Component: shopping list renders grouped items correctly
- 🔲 Component: check-off updates visual state

---

## v0.8.0 — Nutritional Data
**Branch:** `v0.8.0-dev`
**Goal:** Per-recipe and per-day nutritional summaries powered by USDA FoodData Central.

### Backend
- 🔲 Extend `ingredients` schema: add macro columns (`calories`, `protein_g`, `carbs_g`, `fat_g`, `fiber_g`, `sugar_g`, `sodium_mg`, `usda_fdc_id`); migration
- 🔲 `NutritionProvider` adapter for USDA FoodData Central (same pluggable pattern as `RecipeProvider`)
- 🔲 Nutrition calculation service: per-recipe (scaled by servings), per-day (summed across menu items)
- 🔲 Routes: `GET /recipes/:id/nutrition?servings=N`, `GET /menus/:id/nutrition` (per-day breakdown)

### Frontend
- 🔲 Recipe detail: macros panel (calories, protein, carbs, fat, fiber) per serving and total; visual macro bar
- 🔲 Menu builder: per-day nutrition summary row at bottom of each day
- 🔲 Graceful handling of missing nutrition data (`N/A`, no broken layouts)

### CI / Testing
- 🔲 Unit: nutrition scaling (per-serving, per-recipe)
- 🔲 Unit: per-day aggregation with serving overrides
- 🔲 Unit: handling null/missing nutrition values
- 🔲 Integration: nutrition endpoints
- 🔲 Component: nutrition panel renders correct macro values

---

## v0.9.0 — PWA & Mobile Polish
**Branch:** `v0.9.0-dev`
**Goal:** The app is installable as a PWA, performs excellently on mobile, and has a polished UI at every screen size.

### Frontend
- 🔲 `vite-plugin-pwa`: web app manifest, service worker (cache-first for recipes, network-first for API)
- 🔲 'Add to Home Screen' prompt; tested on iOS Safari and Android Chrome
- 🔲 Mobile UI audit: every page at 320px / 375px / 430px; ≥44px tap targets; swipe-to-remove on shopping list
- 🔲 Bottom navigation bar on mobile; sidebar navigation on desktop
- 🔲 Desktop polish: multi-column layouts, horizontal week view, keyboard navigation, hover states

### CI / Testing
- 🔲 Lighthouse CI: PWA score ≥ 90, mobile performance ≥ 85
- 🔲 Accessibility audit: WCAG AA; fix identified issues
- 🔲 Cross-browser smoke tests: Chrome, Firefox, Safari
- 🔲 Offline behavior: previously visited recipes and menus load without network
- 🔲 Tested on real iOS Safari and Android Chrome

---

## v1.0.0 — Release Ready
**Branch:** `v1.0.0-dev`
**Goal:** No new features. Hardening, observability, documentation, and E2E tests. This is the bar for a real public release.

### Backend
- 🔲 API hardening: rate limiting, input sanitization audit, CORS tightening, error response review, dependency audit
- 🔲 Resilience: graceful fallback when external recipe provider is unavailable (serve cached data)
- 🔲 Structured logging via Pino; Sentry integration for error tracking
- 🔲 OpenAPI / Swagger docs via `@fastify/swagger` (available at `/docs` in dev)
- 🔲 Production Docker Compose: hardened config, health checks, proper restart policies, multi-stage Dockerfiles

### Frontend
- 🔲 Vue error boundaries on all major page sections (no white screens of death)
- 🔲 Consistent error toast / notification system
- 🔲 Expired session handling: auto-redirect to login

### Documentation
- 🔲 `CONTRIBUTING.md`: local setup, coding conventions, PR process, branch naming
- 🔲 `DEPLOYMENT.md`: step-by-step production deploy guide, environment variable reference, DB backup strategy
- 🔲 `.github/` issue and PR templates
- 🔲 Final README and ROADMAP review

### CI / Testing
- 🔲 Playwright E2E — Path 1: Register → search → add to menu → generate shopping list
- 🔲 Playwright E2E — Path 2: Login → create custom recipe → add to menu → view nutrition
- 🔲 Playwright E2E — Path 3: Login → favorites → build weekly menu → check off shopping list
- 🔲 Full CI pipeline: lint → type-check → unit → integration → E2E → Docker build
- 🔲 All checks required before merge to `main`

---

## Post-v1.0.0 (Future)

These are explicitly out of scope for v1.0.0 but are planned future additions:

- 🔁 **Rolling / repeating menus** — weekly or monthly menus that auto-advance on a schedule
- 🔗 **Menu & recipe sharing** — share via public link or user invite
- 🔎 **Advanced recipe search filters** — meal type, cuisine, dietary restrictions, cook time, air fryer, quick meals, etc.