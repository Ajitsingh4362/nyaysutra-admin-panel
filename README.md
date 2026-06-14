# NyayaSutra — Legal Intelligence
### Complete Website by Adv. A.K. Tripathi

---

## 🆕 Latest Update — Bug Fixes & New Features

### Bug Fixes
- **"Title is required" error** — Title field is now clearly visible (gold border, labeled "Article Title *"). On error, it auto-scrolls and focuses the field.
- **Server crash on DB errors** — All API routes now catch MongoDB connection failures gracefully and return a clean 503 JSON response instead of crashing the entire dev/production server.
- **Admin credentials no longer shown publicly** — Removed default email/password hints from the login screen.
- **Experience changed from 15+ years → 2+ years** across Home and About pages.

### New Features
1. **Gallery Manager (Admin)** — full upload (multi-image via Cloudinary), album categorization, captions, tags, featured toggle, edit/delete, status (draft/published). Public `/gallery` page now fetches real items with a lightbox viewer.
2. **Course Manager (Admin)** — full course builder: title, summary, level, duration, pricing (free/paid), certificate toggle, learning outcomes, prerequisites, and a **module builder** (each module can have PDF/Video/Audio links). Public `/students` page shows a "Courses & Resources" section pulling live data, with a dedicated `/students/[slug]` detail page (accordion modules).
3. **Practice Area sub-points are now clickable** — every "What We Handle" bullet across all 15 practice areas expands with detailed, research-based content (smooth Framer Motion accordion).
4. **3D / Interactive Design (Framer Motion)**
   - `Scales3D` — animated 3D scales of justice (mouse-tilt) on the homepage "Why Choose" section.
   - `LawCube3D` — auto-rotating interactive cube (6 practice pillars) on the About page.
   - `TiltCard` — 3D hover-tilt wrapper used on Practice Area cards.
   - `GoldParticles` — ambient floating particles in the hero.
   - `AnimatedCounter` — animated count-up for stat numbers.
   - `FadeInSection` / `StaggerGroup` — scroll-triggered reveal animations site-wide.
   - All motion respects `prefers-reduced-motion`.
5. **Premium light section variant** (`.section-light`) — a warm cream/gold alternate theme used for the homepage "Why Choose" section, breaking up the dark palette for a more premium feel.
6. **Accessibility** — visible keyboard focus states added globally.

---

## 🚀 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS (dark gold + premium light variant)
- **Animation:** Framer Motion (3D tilt, scroll reveals, particles)
- **Database:** MongoDB (mongoose)
- **Auth:** JWT + bcrypt
- **Images:** Cloudinary
- **Fonts:** Cormorant Garamond + DM Sans + Cinzel

---

## 🌐 Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero (3D particles), stats, practice areas, "Why Choose" (Scales3D, light section), courts, media, blog feed |
| About | `/about` | Platform info, founder bio, LawCube3D, 6 pillars, Why Choose, Timeline |
| Practice Areas | `/practice-areas` | 15 practice areas with categories, tilt cards |
| Practice Detail | `/practice-areas/[slug]` | Full article + **clickable expandable sub-points** |
| Courts | `/courts` | Supreme Court, High Courts, District Courts, Tribunals |
| Students | `/students` | Internship, moot court, bare acts, career guidance + **live Courses section** |
| Course Detail | `/students/[slug]` | Module accordion with PDF/Video/Audio links |
| Gallery | `/gallery` | **Live photo albums** with lightbox, media highlights |
| Blog | `/blog` | Articles with search + category filter |
| Blog Detail | `/blog/[slug]` | Full article with sidebar |
| Services | `/services` | All service offerings |
| Contact | `/contact` | Form → MongoDB, WhatsApp link, office info |
| **Admin** | `/admin` | Full LMS/CMS dashboard |

---

## 🔐 Admin Panel (`/admin`)
**Default Login** (set in `.env.local`, never shown in UI):
- Email: value of `ADMIN_EMAIL`
- Password: value of `ADMIN_PASSWORD`

**Features:**
- Dashboard with live stats
- **Blog management** — rich text editor (Word-like), SEO per post, draft/publish
- **Gallery management** — multi-image upload, albums, captions, tags, featured
- **Course management** — modules with PDF/Video/Audio, pricing, certificates
- Inquiry management (view/status/delete/WhatsApp)
- SEO global settings
- ⚠️ Change `ADMIN_PASSWORD` in `.env.local` before deploying to production!

---

## 🗄️ MongoDB Models
- `Blog` — blog posts with SEO fields
- `Inquiry` — contact form submissions
- `Admin` — admin user (bcrypt hashed)
- `Course` — student courses with modules
- `Gallery` — photo albums with images

---

## 🔧 Local Setup
```bash
npm install
# .env.local is already included with your MongoDB/Cloudinary credentials
npm run dev
# Open http://localhost:3000
# Admin: http://localhost:3000/admin
```

> **Note:** If you see "Database temporarily unavailable" on Gallery/Courses/Inquiries,
> check that your machine has internet access to reach MongoDB Atlas
> (`*.mongodb.net`) and that the IP is whitelisted in Atlas Network Access.

---

## 📦 Production Deploy (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Add all `.env.local` variables to Vercel Environment Variables
4. **Change `ADMIN_PASSWORD`** to something strong
5. Deploy!

---

## 🌍 Environment Variables
```
MONGODB_URI=...
JWT_SECRET=...
ADMIN_EMAIL=admin@nyayasutra.org
ADMIN_PASSWORD=admin123        # ⚠️ CHANGE THIS BEFORE PRODUCTION
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_SITE_URL=https://nyayasutra.com
```

---

## 📱 Mobile Responsive
- All pages mobile-first, no horizontal scrolling
- Hamburger menu on mobile
- Touch-friendly buttons
- Gallery: 1 column on mobile, lightbox works on touch
- 3D/motion effects degrade gracefully on touch devices and respect `prefers-reduced-motion`

---

## ✅ Features Implemented
- [x] Premium dark gold design + premium light section variant
- [x] Transparent logo
- [x] Mobile responsive (no horizontal scroll)
- [x] Language switcher (18 languages + Google Translate)
- [x] WhatsApp float button
- [x] 15 Practice areas with full articles + **clickable expandable sub-points**
- [x] Clickable court categories
- [x] Blog with search + filter
- [x] Contact form → MongoDB
- [x] Admin panel (LMS/CMS style)
- [x] Rich text blog editor
- [x] **Gallery upload & management (Cloudinary)**
- [x] **Course/module management with PDF/Video/Audio**
- [x] SEO per blog post
- [x] Inquiry management
- [x] JWT auth for admin (credentials hidden from UI)
- [x] Sitemap.xml + robots.txt
- [x] Social media links
- [x] Students/Internship section + live courses
- [x] Gallery with lightbox + media highlights
- [x] Courts & Jurisdictions page
- [x] Visitor popup
- [x] Google Translate suppression
- [x] **3D interactive elements (Framer Motion)** — Scales of Justice, Law Cube, tilt cards, particles, animated counters
- [x] **Crash-resistant API routes** — DB outages return clean errors, server stays up
- [x] Accessibility — reduced motion + visible focus states

---

**NyayaSutra — Legal Intelligence**
*Strategic Litigation · Legal Research · Drafting · Constitutional Practice · Corporate Advisory*
