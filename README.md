# 🍳 PreppyChef

> A modern, mobile-first meal prep planner for people who cook for the whole week — not just tonight.

PreppyChef helps you plan weekly and monthly menus, scale recipes to any number of servings, auto-generate consolidated shopping lists, and track nutritional data — all from a fast, installable web app that works great on your phone.

[![CI](https://github.com/Codenii/PreppyChef/actions/workflows/ci.yml/badge.svg)](https://github.com/Codenii/PreppyChef/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ Features

- 🔍 **Recipe Search** — Browse thousands of recipes via external API (default: TheMealDB — free, no key required)
- 📅 **Menu Planning** — Build weekly or monthly menus by scheduling recipes into meal slots
- ⚖️ **Serving Scaling** — Change servings on any recipe and watch every ingredient quantity update in real time
- 🛒 **Shopping Lists** — Auto-generate a consolidated, deduplicated list from any menu, with one-tap retailer search links (Walmart, Meijer, Kroger, Instacart, Amazon Fresh)
- 📝 **Custom Recipes** — Create and manage your own recipes using the same ingredient model as external ones
- ❤️ **Favorites** — Save recipes you love for quick access when building menus
- 🥗 **Nutritional Data** — View macros (calories, protein, carbs, fat) per recipe and per day across your menu
- 📱 **PWA** — Install on your phone like a native app; works offline for previously loaded content

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vue 3, PrimeVue, Pinia, Vite |
| **Backend** | Fastify, TypeScript, Zod |
| **Database** | PostgreSQL, Drizzle ORM, drizzle-kit |
| **Auth** | Better Auth (free, open-source, self-hosted) |
| **Recipe API** | TheMealDB (pluggable adapter — swap providers via config) |
| **Nutrition API** | USDA FoodData Central (free) |
| **Testing** | Vitest, Playwright |
| **Infrastructure** | pnpm workspaces, Docker, GitHub Actions CI |

---

## 🏗️ Project Structure

```
preppychef/
├── apps/
│   ├── api/          # Fastify backend
│   └── web/          # Vue 3 frontend
├── packages/
│   └── db/           # Drizzle schema, migrations, DB client
├── docker/
├── docker-compose.yml          # Local development
├── docker-compose.prod.yml     # Production skeleton
├── ROADMAP.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 24+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [Docker](https://www.docker.com/) and Docker Compose

### Local Development (Docker)

```bash
# Clone the repo
git clone https://github.com/Codenii/PreppyChef.git
cd PreppyChef

# Copy environment variable files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Start all services (API + Web + Postgres) with hot-reload
docker compose up
```

The API will be available at `http://localhost:3000` and the frontend at `http://localhost:5173`.

### Local Development (without Docker)

```bash
# Install all workspace dependencies
pnpm install

# Run database migrations
pnpm --filter @preppychef/db migrate

# Start API and Web dev servers concurrently
pnpm dev
```

### Running Tests

```bash
# Run all tests across all workspace packages
pnpm test

# Run tests for a specific package
pnpm --filter @preppychef/api test
pnpm --filter @preppychef/web test
```

---

## 🗺️ Roadmap

Development is organized as **vertical slices** — each version (`v0.x.0`) is a fully working application with its own branch (`v0.x.0-dev`), issues, and milestone.

See **[ROADMAP.md](./ROADMAP.md)** for the full breakdown.

| Version | Focus | Status |
|---|---|---|
| v0.1.0 | Project Foundation & Infrastructure | [ ] Planned |
| v0.2.0 | Recipe Browsing | [ ] Planned |
| v0.3.0 | User Accounts & Favorites | [ ] Planned |
| v0.4.0 | Custom Recipes | [ ] Planned |
| v0.5.0 | Menu Planning | [ ] Planned |
| v0.6.0 | Serving Size Scaling | [ ] Planned |
| v0.7.0 | Shopping Lists | [ ] Planned |
| v0.8.0 | Nutritional Data | [ ] Planned |
| v0.9.0 | PWA & Mobile Polish | [ ] Planned |
| v1.0.0 | Release Ready | [ ] Planned |

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) *(added in v1.0.0)* for local setup, coding conventions, and the PR process.

---

## 📄 License

[MIT](./LICENSE) — free to use, modify, and distribute.
