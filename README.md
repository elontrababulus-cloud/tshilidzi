# Tshilidzi Development Trust — Website

Official website for **Tshilidzi Development Trust (TDT)**, a non-profit organization empowering youth and women, reducing poverty, and building climate resilience in Zimbabwe — with a focus on Beitbridge and surrounding regions.

---

## Overview

This is a full-stack web application built with **Next.js** and **Firebase**, providing a public-facing website for TDT's programs and projects, alongside a protected admin panel for content management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| File Storage | Firebase Cloud Storage |
| Hosting | Firebase Hosting |
| Styling | CSS Modules + CSS Custom Properties |
| Fonts | Geist (Vercel), Inter (Google) |

---

## Features

### Public Website

| Page | Description |
|---|---|
| `/` | Home — hero, strategic pillars, impact statistics, flagship initiative |
| `/about` | Organization story, vision, mission, values, governance |
| `/programs` | Four core program areas in detail |
| `/projects` | Filterable project listing (by category and status) |
| `/news` | Published news articles |
| `/news/[id]` | Individual article detail |
| `/contact` | Contact form, address, phone, email |
| `/get-involved` | Volunteering, mentorship, partnerships, donations |

### Admin Panel (Authenticated)

| Route | Description |
|---|---|
| `/admin` | Dashboard with key statistics |
| `/admin/news` | List, create, edit, delete news articles |
| `/admin/projects` | Manage projects with image uploads |
| `/admin/settings` | Edit site-wide contact info and social media links |
| `/login` | Email/password authentication |

---

## Strategic Pillars

1. **Youth & Women Empowerment** — Leadership training, entrepreneurship, GBV prevention
2. **Climate Resilience** — Environmental stewardship, sustainable communities, climate action
3. **Education & Skills Development** — Vocational training, digital literacy, academic support
4. **Governance & Digital Transformation** — Civic tech, digital rights, open data advocacy

**Flagship Initiative (2025):** Youth Climate Action for Social Transformation (YCA4SOTRA) — EU-funded project mobilizing 5,000+ youth across 10 community hubs.

---

## Data Models

### NewsArticle (`news` collection)
```typescript
{
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: Date | Timestamp;
  imageUrl?: string;
  status: 'draft' | 'published';
}
```

### Project (`projects` collection)
```typescript
{
  id: string;
  title: string;
  category: 'youth' | 'climate' | 'education' | 'governance';
  status: 'active' | 'upcoming' | 'completed';
  summary: string;
  description: string;
  imageUrl?: string;
  dateCreated: Date;
}
```

### SiteSettings (`settings/general` document)
```typescript
{
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
}
```

---

## Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/
│   │   ├── programs/
│   │   ├── projects/
│   │   ├── news/
│   │   │   └── [id]/
│   │   ├── contact/
│   │   ├── get-involved/
│   │   ├── login/
│   │   ├── admin/
│   │   │   ├── news/
│   │   │   │   └── [id]/
│   │   │   ├── projects/
│   │   │   └── settings/
│   │   ├── layout.tsx          # Root layout with context providers
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── seo/
│   │       └── JsonLd.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx      # Firebase auth state
│   │   └── SettingsContext.tsx  # Real-time site settings
│   │
│   ├── lib/
│   │   ├── firebase.ts          # Firebase initialization
│   │   └── services/
│   │       └── news.ts          # News CRUD operations
│   │
│   └── types/
│       ├── news.ts
│       └── project.ts
│
├── public/
│   ├── branding.png
│   ├── logo.png
│   └── favicon.ico
│
├── firebase.json
├── storage.rules
├── .env.local                   # Firebase config (not committed)
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- A Firebase project with Firestore, Authentication, and Storage enabled

### Installation

```bash
cd web
npm install
```

### Environment Variables

Create a `.env.local` file in the `web/` directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Deploy

```bash
npm run build
firebase deploy
```

---

## Authentication

Admin access uses Firebase Authentication (email/password). Protected routes redirect unauthenticated users to `/login`. Auth state is managed globally via `AuthContext`.

---

## SEO

- Next.js metadata API with Open Graph and Twitter Card support
- Dynamic sitemap at `/sitemap.xml`
- Robots configuration at `/robots.txt`
- JSON-LD structured data
- Google Search Console verification configured

---

## Contact

- **Email:** info@tshilidzi.org
- **Phone:** +263 71 099 7996
- **Address:** Suite 6, The Triple K Building 528, Great North Road
