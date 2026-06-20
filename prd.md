# Product Requirements Document (PRD)

## ALS Mortgage Solutions — Next.js + Express + MongoDB

**Version:** 1.0  
**Status:** Draft  
**Replaces:** Payload CMS + PostgreSQL architecture

---

## 1. Executive Summary

Rebuild **ALS Mortgage Solutions** as a three-tier application:

| Layer | Technology | Role |
|-------|------------|------|
| **Frontend** | Next.js 15 (App Router) | Public marketing website + **native custom admin dashboard** |
| **Backend** | Express.js (Node.js) | REST API, auth, business logic, file uploads |
| **Database** | MongoDB | All content, users, leads, and applications |

**Key decision:** Remove Payload CMS entirely. The admin panel is a **first-party React UI** built inside Next.js (or a dedicated admin app) that talks to the Express API. Editors get a tailored dashboard designed for ALS workflows — not a generic CMS.

### Business goals (unchanged)

- Attract mortgage leads (first-home buyers, investors, refinancers, commercial/SMSF)
- Educate visitors with guides, calculators, and FAQs
- Convert visitors via contact forms and consultation bookings
- Let staff manage content, review leads, and handle job applications without developer help

---

## 2. Scope

### In scope

- Public website (all existing pages and features)
- Custom admin dashboard (content + operations)
- Express REST API with JWT auth
- MongoDB data models and seed scripts
- Media upload (images → local disk or S3)
- Migration path from current Payload/PostgreSQL data

### Out of scope (v1)

- GraphQL API
- Multi-tenant / multi-broker support
- Payment processing
- Live chat / CRM integrations (future phase)
- Mobile native apps

---

## 3. Target Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                   │
├──────────────────────────┬──────────────────────────────────────┤
│   Public Website         │   Native Admin Dashboard              │
│   Next.js (port 3000)    │   Next.js /admin/* (same or separate)│
│   SSR / SSG / CSR        │   Protected routes, role-based UI     │
└────────────┬─────────────┴──────────────────┬───────────────────┘
             │                                 │
             │         HTTPS / REST            │
             └─────────────┬───────────────────┘
                           ▼
             ┌─────────────────────────────┐
             │   Express API Server         │
             │   (port 4000)                │
             │   - Auth (JWT)               │
             │   - CRUD endpoints           │
             │   - File uploads (multer)    │
             │   - Validation (zod)         │
             └─────────────┬───────────────┘
                           │
                           ▼
             ┌─────────────────────────────┐
             │   MongoDB                  │
             │   (Atlas or self-hosted)   │
             └─────────────────────────────┘
```

### Repository structure (recommended monorepo)

```
als-mortgage/
├── apps/
│   ├── web/                    # Next.js — public site + admin UI
│   │   ├── src/app/            # Public routes (existing pages)
│   │   ├── src/app/admin/      # Native admin dashboard
│   │   └── src/lib/api.ts      # API client for Express
│   └── api/                    # Express backend
│       ├── src/
│       │   ├── index.ts
│       │   ├── routes/
│       │   ├── models/         # Mongoose schemas
│       │   ├── middleware/
│       │   └── services/
│       └── package.json
├── packages/
│   └── shared/                 # Shared TypeScript types & validators
├── scripts/
│   ├── seed.ts
│   └── migrate-from-payload.ts
├── docker-compose.yml          # MongoDB + api + web
└── PRD.md
```

---

## 4. Technology Stack

| Category | Choice | Notes |
|----------|--------|-------|
| Frontend framework | Next.js 15 | App Router, Server Components for public pages |
| Admin UI | Next.js + React | Custom pages under `/admin`; Tailwind + shadcn/ui or similar |
| Backend | Express 4.x | TypeScript, modular routers |
| ODM | Mongoose | MongoDB schemas, validation, indexes |
| Database | MongoDB 7+ | MongoDB Atlas for production |
| Auth | JWT + httpOnly cookies | `bcrypt` for password hashing |
| File uploads | Multer | Store in `uploads/` or AWS S3 |
| Validation | Zod | Request body + env validation |
| Email | Nodemailer / Resend | Contact & consultation notifications |
| Dev tooling | Biome, tsx, Docker | Match current project conventions |

### What gets removed

| Removed | Replaced by |
|---------|-------------|
| Payload CMS | Express API + Mongoose models |
| `@payloadcms/*` packages | Custom admin UI |
| PostgreSQL | MongoDB |
| `payload.config.ts`, `collections/` | `apps/api/src/models/` |
| Payload `/admin` | `apps/web/src/app/admin/` |

---

## 5. User Roles & Admin Dashboard

### Roles

| Role | Access |
|------|--------|
| **Super Admin** | Full access: users, settings, all content, leads |
| **Editor** | Content only: homepage, loans, FAQs, team, media |
| **HR** | Job postings + job applications |
| **Viewer** | Read-only dashboards and exports |

### Native admin modules

The admin dashboard is **not** a generic CMS. It is organized around ALS business workflows:

| Module | Route | Features |
|--------|-------|----------|
| **Dashboard** | `/admin` | Stats: new leads, applications, recent edits |
| **Homepage** | `/admin/homepage` | Edit hero, services, why-choose-us, property showcase, awards |
| **Loans** | `/admin/loans` | CRUD loan products; slug, features, rates, eligibility |
| **Testimonials** | `/admin/testimonials` | Client reviews; drag-to-reorder |
| **Team** | `/admin/team` | Broker profiles; toggle `showOnHomepage` |
| **FAQs** | `/admin/faqs` | Rich-text answers; category filter |
| **Documents** | `/admin/documents` | Resource links; category + order |
| **Navigation** | `/admin/navigation` | Menu items + dropdown children |
| **Footer** | `/admin/footer` | Links, contact info, social URLs |
| **Popup** | `/admin/popup` | Site-wide promo modal on/off + content |
| **Media library** | `/admin/media` | Upload, crop preview, alt text |
| **Leads** | `/admin/leads` | Contact + consultation submissions; status workflow |
| **Careers** | `/admin/careers/postings` | Job listings |
| | `/admin/careers/applications` | Review applications; status notes |
| **Users** | `/admin/users` | Admin accounts (Super Admin only) |
| **Settings** | `/admin/settings` | Site metadata, email templates |

### Admin UX requirements

- Login page at `/admin/login` (no public nav/footer)
- Sidebar navigation matching modules above
- WYSIWYG or block editor for rich text (TipTap or Lexical — **not** Payload)
- Image picker integrated with media library
- Toast notifications on save/error
- Draft vs published state for content (`isPublished` flag)
- Audit fields: `createdBy`, `updatedBy`, `updatedAt`

---

## 6. Public Website (Next.js)

Reuse and refactor existing pages from `src/app/(my-app)/`. Public site **only** reads data via Express API — no direct MongoDB access from the browser.

### Page inventory

| Section | Routes |
|---------|--------|
| Home | `/` |
| Services | `/services`, `/home-loans`, `/investment-loans`, `/commercial-loans`, `/smsf-loans`, `/car-financing`, `/refinancing` |
| Dynamic loans | `/loans`, `/loans/[slug]` |
| Calculators | `/calculator`, `/calculator/borrowing-capacity`, `/calculator/extra-repayments`, `/calculator/property-fees`, `/calculator/loan-repayment` |
| Resources | `/resources/faq`, `/resources/documents`, guides under `/resources/*` |
| Company | `/about`, `/why-als`, `/how-it-works` |
| Careers | `/why-als/careers/*` |
| Lead capture | `/contact`, `/book-consultation` |

### Data fetching pattern

```typescript
// Server Component — apps/web
const loans = await fetch(`${process.env.API_URL}/api/v1/loans?published=true`, {
  next: { revalidate: 60 },
}).then((r) => r.json())
```

### Forms (new behavior)

Contact and consultation forms **POST to Express** (not simulated client-side):

```
POST /api/v1/leads/contact
POST /api/v1/leads/consultation
POST /api/v1/careers/apply
```

---

## 7. Express API Specification

Base URL: `http://localhost:4000/api/v1`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Email + password → JWT cookie |
| POST | `/auth/logout` | Clear session |
| GET | `/auth/me` | Current admin user |

### Public read endpoints (no auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/homepage` | Published homepage document |
| GET | `/loans` | List active loans |
| GET | `/loans/:slug` | Single loan by slug |
| GET | `/testimonials` | Ordered testimonials |
| GET | `/team` | Team members (`?homepage=true`) |
| GET | `/faqs` | FAQs by category |
| GET | `/documents` | Published documents |
| GET | `/footer` | Footer config |
| GET | `/navigation` | Nav tree |
| GET | `/popup` | Active popup |
| GET | `/careers/postings` | Open job listings |

### Public write endpoints (no auth, rate-limited)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/leads/contact` | Contact form submission |
| POST | `/leads/consultation` | Book consultation |
| POST | `/careers/apply` | Job application + resume upload |

### Protected admin endpoints (JWT required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/PUT | `/admin/homepage` | Get/update homepage |
| CRUD | `/admin/loans` | Manage loans |
| CRUD | `/admin/testimonials` | Manage testimonials |
| CRUD | `/admin/team` | Manage team |
| CRUD | `/admin/faqs` | Manage FAQs |
| CRUD | `/admin/documents` | Manage documents |
| CRUD | `/admin/navigation` | Manage nav |
| GET/PUT | `/admin/footer` | Footer config |
| GET/PUT | `/admin/popup` | Popup config |
| CRUD | `/admin/media` | Upload/list/delete media |
| GET/PATCH | `/admin/leads` | View/update lead status |
| CRUD | `/admin/careers/postings` | Job postings |
| GET/PATCH | `/admin/careers/applications` | Applications |
| CRUD | `/admin/users` | Admin users (Super Admin) |

### Standard API response shape

```json
{
  "success": true,
  "data": { },
  "meta": { "page": 1, "total": 42 }
}
```

```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "Email is required" }
}
```

---

## 8. MongoDB Data Models

### `users`

```typescript
{
  _id: ObjectId,
  email: string,          // unique
  passwordHash: string,
  firstName: string,
  lastName: string,
  role: 'super_admin' | 'editor' | 'hr' | 'viewer',
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### `homepage` (singleton)

```typescript
{
  _id: ObjectId,
  hero: { title, titleHighlight, subtitle, backgroundImageId, ctaPrimary, ctaSecondary },
  services: { sectionTitle, sectionSubtitle, services: [{ title, description, icon, link, color }] },
  whyChooseUs: { sectionTitle, sectionSubtitle, backgroundImageId, features[], stats[] },
  propertyShowcase: { sectionTitle, sectionSubtitle, properties[] },
  teamSection: { sectionTitle, sectionSubtitle },
  awards: { sectionTitle, description, founderName, founderTitle, founderImageId },
  isPublished: boolean,
  updatedAt: Date
}
```

### `loans`

```typescript
{
  _id: ObjectId,
  title: string,
  slug: string,           // unique index
  subtitle: string,
  heroImage: string,
  description: string,
  features: [{ title, description, benefits: string[] }],
  benefits: [{ title, description, icon }],
  eligibility: string[],
  interestRateFrom?: string,
  minimumDeposit?: string,
  maxLoanAmount?: string,
  loanTerm?: string,
  whyChooseUs: { sectionTitle, sectionSubtitle, backgroundImage, features[] },
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### `testimonials`

```typescript
{
  _id: ObjectId,
  clientName: string,
  clientTitle: string,
  testimonial: string,
  rating: number,           // 1-5
  clientImageId?: ObjectId,
  order: number,
  isPublished: boolean
}
```

### `team`

```typescript
{
  _id: ObjectId,
  name: string,
  title: string,
  bio: string,
  phone: string,
  email: string,
  imageId?: ObjectId,
  showOnHomepage: boolean,
  order: number,
  isPublished: boolean
}
```

### `faqs`

```typescript
{
  _id: ObjectId,
  question: string,
  answer: object,           // TipTap/Lexical JSON or HTML
  category: string,
  order: number,
  isPublished: boolean
}
```

### `documents`

```typescript
{
  _id: ObjectId,
  title: string,
  description?: string,
  link: string,
  category: string,
  order: number,
  isPublished: boolean
}
```

### `navigation`

```typescript
{
  _id: ObjectId,
  label: string,
  url: string,
  order: number,
  children: [{ label, url, order }],
  isPublished: boolean
}
```

### `footer` (singleton)

```typescript
{
  _id: ObjectId,
  columns: [{ title, links: [{ label, url }] }],
  contact: { phone, email, address },
  social: [{ platform, url }],
  copyright: string
}
```

### `popup` (singleton)

```typescript
{
  _id: ObjectId,
  isEnabled: boolean,
  title: string,
  body: string,
  ctaText?: string,
  ctaUrl?: string,
  imageId?: ObjectId
}
```

### `media`

```typescript
{
  _id: ObjectId,
  filename: string,
  mimeType: string,
  url: string,
  alt: string,
  sizes: { thumbnail?, card?, tablet?, desktop? },
  createdAt: Date
}
```

### `leads`

```typescript
{
  _id: ObjectId,
  type: 'contact' | 'consultation',
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  subject?: string,
  message?: string,
  consultationType?: string,
  preferredTime?: string,
  status: 'new' | 'contacted' | 'qualified' | 'closed',
  notes?: string,
  createdAt: Date
}
```

### `job_postings`

```typescript
{
  _id: ObjectId,
  title: string,
  slug: string,
  location: string,
  employmentType: string,
  description: object,
  requirements: string[],
  isOpen: boolean,
  postedAt: Date
}
```

### `job_applications`

```typescript
{
  _id: ObjectId,
  jobPostingId: ObjectId,   // ref job_postings
  applicantName: string,
  email: string,
  phone: string,
  resumeUrl: string,
  coverLetter?: string,
  linkedIn?: string,
  status: 'new' | 'under-review' | 'interview-scheduled' | 'rejected' | 'accepted',
  notes?: string,
  appliedAt: Date
}
```

---

## 9. Security Requirements

| Area | Requirement |
|------|-------------|
| Passwords | `bcrypt` with cost factor ≥ 12 |
| Sessions | JWT in `httpOnly`, `secure`, `sameSite=strict` cookie |
| CORS | Allow only `NEXT_PUBLIC_SITE_URL` and admin origin |
| Rate limiting | `express-rate-limit` on public POST endpoints |
| File uploads | Whitelist MIME types; max 10 MB; scan filename |
| Input validation | Zod on every request body |
| Admin routes | Middleware `requireAuth` + `requireRole` |
| Secrets | `JWT_SECRET`, `MONGODB_URI` in env only — never committed |

---

## 10. Environment Variables

### Express API (`apps/api/.env`)

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/als_mortgage
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
UPLOAD_DIR=./uploads
# Optional S3
AWS_S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

### Next.js Web (`apps/web/.env`)

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
API_URL=http://localhost:4000
```

---

## 11. Migration from Current Project (Payload + PostgreSQL)

### Phase A — Export from Payload

1. Export each collection via REST: `GET /api/<collection>?limit=1000&depth=0`
2. Copy `public/media/` directory
3. Save JSON files to `scripts/exports/`

### Phase B — Transform & import to MongoDB

1. Run `scripts/migrate-from-payload.ts`
2. Map Payload numeric IDs → MongoDB ObjectIds (relationship map)
3. Import in order: `media` → `users` → content → `job_postings` → `job_applications`
4. Verify with seed comparison script

### Phase C — Cutover

1. Point Next.js public pages at Express API
2. Decommission Payload routes and `collections/`
3. Remove `@payloadcms/*` dependencies

---

## 12. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Public page TTFB | < 500 ms (cached) |
| API response (read) | < 200 ms p95 |
| Uptime | 99.5% (production) |
| SEO | SSR/ISR for all public content pages |
| Accessibility | WCAG 2.1 AA for public site |
| Browser support | Last 2 versions Chrome, Firefox, Safari, Edge |

---

## 13. Implementation Phases

### Phase 1 — Foundation (Week 1–2)

- [ ] Monorepo setup: `apps/web`, `apps/api`, `packages/shared`
- [ ] Express server + MongoDB connection + health check
- [ ] Mongoose models for `users`, `homepage`, `loans`
- [ ] JWT auth (login/logout/me)
- [ ] Admin login page + protected layout shell

### Phase 2 — Content API + Admin (Week 3–4)

- [ ] CRUD APIs for homepage, loans, testimonials, team, FAQs
- [ ] Media upload endpoint + admin media library UI
- [ ] Admin forms for homepage and loans
- [ ] Wire public homepage and `/loans/[slug]` to Express API

### Phase 3 — Site-wide config + leads (Week 5)

- [ ] Navigation, footer, popup APIs + admin UI
- [ ] Contact and consultation forms → `leads` collection
- [ ] Admin leads inbox with status updates
- [ ] Email notifications on new lead

### Phase 4 — Careers + polish (Week 6)

- [ ] Job postings and applications APIs
- [ ] Careers admin module
- [ ] Migrate remaining static guide pages (or make CMS-driven later)
- [ ] Seed script + Payload migration script

### Phase 5 — Production (Week 7)

- [ ] Docker Compose (web + api + mongo)
- [ ] MongoDB Atlas setup
- [ ] Remove Payload CMS code and dependencies
- [ ] QA, load test, deploy

---

## 14. Success Criteria

- [ ] No Payload CMS dependency in `package.json`
- [ ] All CMS-managed content editable via native `/admin` UI
- [ ] Public site renders correctly from Express + MongoDB
- [ ] Contact/consultation forms persist to database and appear in admin
- [ ] Job applications workflow functional end-to-end
- [ ] Existing seed content reproducible via `npm run seed`
- [ ] Payload/PostgreSQL data migratable without manual SQL

---

## 15. Open Questions

| # | Question | Default if unresolved |
|---|----------|----------------------|
| 1 | Admin in same Next.js app or separate deploy? | Same app under `/admin` |
| 2 | Rich text editor: TipTap or Lexical? | TipTap |
| 3 | File storage: local disk or S3? | Local dev, S3 production |
| 4 | Keep calculators client-only? | Yes — no backend needed |
| 5 | Make guide pages CMS-driven in v1? | No — static in v1, CMS in v2 |

---

## 16. Appendix — Payload → Native mapping

| Current (Payload) | New (Express + MongoDB) |
|-----------------|-------------------------|
| `collections/homepage.ts` | `models/Homepage.ts` + `/admin/homepage` |
| `collections/loans.ts` | `models/Loan.ts` + `/admin/loans` |
| `collections/users.ts` | `models/User.ts` + `/admin/users` |
| `collections/media.ts` | `models/Media.ts` + Multer upload |
| `payload.config.ts` | `apps/api/src/index.ts` |
| `/admin` (Payload UI) | `/admin/*` (custom Next.js pages) |
| `getPayload()` in pages | `fetch(API_URL + '/api/v1/...')` |
| `seed.ts` | `scripts/seed.ts` (Mongoose) |

---

*This document defines the target architecture for ALS Mortgage Solutions without Payload CMS. Use it as the single source of truth for implementation, estimation, and migration planning.*
