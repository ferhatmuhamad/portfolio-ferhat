# Portfolio — Ferhat Muhamad Yasin

A modern personal portfolio with an integrated admin dashboard. Built with Laravel 12, Inertia.js, React 18 + TypeScript, and Tailwind CSS. Liquid Glass aesthetic, GSAP scroll animations, smooth scroll via Lenis, and full bilingual (EN/ID) UI.

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2, SQLite/MySQL
- **Frontend**: Inertia.js, React 18, TypeScript, Vite 7
- **Styling**: Tailwind CSS v3 (custom palette: `ink`, `brand` orange `#ff7a1a`, `sun` yellow, `cream`)
- **Animation**: Framer Motion, GSAP + ScrollTrigger, Lenis smooth scroll
- **i18n**: i18next + react-i18next (EN / ID, cookie-driven)
- **Auth**: Laravel Breeze (single admin)
- **Routing**: Ziggy

## Features

### Public Site

- Liquid Glass hero with split gradient name & "available" pulse
- About with animated CountUp stats, light section
- Services, Skills (marquee + categories), Experience (GSAP horizontal pin on desktop)
- Projects with filters and detail pages
- Education + Certifications, Testimonials, Pricing, Blog preview & full blog
- Contact form, floating WhatsApp button, EN/ID switcher

### Admin Dashboard (`/admin-ferhat`)

- Profile editor (avatar, CV, stats, social links, bilingual summary)
- Full CRUD: Services, Skills, Experience, Education, Certifications, Projects (with cover + gallery), Testimonials, Pricing Plans, Blog Posts
- Messages inbox (auto read marking)
- Site settings (SEO, section toggles, default locale)

## Getting Started

```bash
git clone <repo>
cd portfolio-ferhat

composer install
npm install
cp .env.example .env
php artisan key:generate

# SQLite default (or set DB_* in .env for MySQL)
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link

# Dev
composer run dev   # runs server + queue + vite concurrently
# or separately:
php artisan serve
npm run dev
```

Default admin credentials are created by the seeder — see `database/seeders/`.

## Build

```bash
npm run build
php artisan optimize
```

## Project Structure

```
app/
  Http/Controllers/       # PublicController + Admin\* controllers
  Models/                 # Profile, Service, Skill, Experience, Education,
                          # Certification, Project, Testimonial, PricingPlan,
                          # Post, ContactMessage, Setting
resources/
  js/
    Components/
      Public/             # Navbar, Footer, FloatingWhatsApp, sections/*
      admin/              # Form, ImageUpload, StringListInput, DataTable
      ui/                 # Glass, Button, Section
    Layouts/              # PublicLayout, AdminLayout
    Pages/
      Public/             # Home, ProjectShow, BlogIndex, BlogShow
      Admin/              # Dashboard + resource folders (Index, Form, etc.)
      Auth/               # Login
    i18n/                 # en.json, id.json
    lib/                  # cn, format, useLenis
  css/app.css             # Tailwind layers + glass utilities
routes/
  web.php                 # public + auth + admin routes (prefix `admin-ferhat`)
```

## Deployment — Railway

The repo includes both `nixpacks.toml` and a `Procfile`.

1. Create a new project on Railway, connect the repo
2. Add a database (MySQL or PostgreSQL) and link it
3. Set required environment variables:

```
APP_NAME="Ferhat Portfolio"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.up.railway.app
APP_KEY=base64:...   # run `php artisan key:generate --show` locally

DB_CONNECTION=mysql      # or pgsql
DB_HOST=...
DB_PORT=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public

LOG_CHANNEL=stderr
```

4. Deploy. The build phase runs `composer install`, `npm ci`, `npm run build`, and Laravel cache commands. The start command runs migrations, links storage, then boots `php artisan serve` on `$PORT`.

> **Note**: For better performance in production, replace `php artisan serve` with FrankenPHP or an nginx + php-fpm Docker setup.

## Localization

UI copy lives in `resources/js/i18n/{en,id}.json`. Bilingual database content uses paired columns (`title` / `title_id`, `summary` / `summary_id`, etc.) — the public components prefer the `_id` variant when the active locale is `id`, falling back to English.

The locale is stored in a `locale` cookie and updated via `GET /lang/{locale}`.

## License

Proprietary — © Ferhat Muhamad Yasin
