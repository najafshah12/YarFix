# YarFix — Ghar Ka Har Masla, Hal! 🇵🇰

A modern, responsive landing page for **YarFix**, a Pakistan-focused startup combining reliable home services with a verified used-products marketplace. Initially launching in **Karachi**, with nationwide expansion planned.

Recreated to match the reference design with high fidelity, rich dark forest green and metallic gold aesthetics, Pakistani landmark line-art motifs, and an early access lead capture system with dual-engine server persistence.

---

## 🌟 Key Features

1. **Brand Identity & Reference Design Fidelity**:
   - Official YarFix logo with house cutout in "YAR", wrench cutout in "FIX", and Urdu calligraphy: `اب گھر کا ہر مسئلہ حل`.
   - Rich brand colors: Deep forest green (`#061a13`, `#09221a`), warm metallic gold (`#e5b758`, `#f7d983`, `#c69634`), and crisp white.
   - Handcrafted SVG vector silhouettes: Minar-e-Pakistan, Karachi skyline, suburban home, and mosque domes.
   - Elegant golden chevron corner borders (`<<<` / `>>>`) and frames.

2. **Hero Section**:
   - Prominently centered official YarFix logo badge.
   - "Ghar ke har maslay ka solution aa raha hai" headline.
   - Massive golden `COMING SOON` title with subtle metallic glow.
   - Dual action CTAs: `Stay Tuned` & `Join Early Access`.
   - Localized Pakistan & Karachi focus.

3. **Home Services Section**:
   - `UPCOMING FEATURES` badge.
   - Heading: "Your Home, Our Responsibility".
   - 8 Service Cards in a responsive grid:
     1. **Plumbing** — Tap repairs, leak fixes, and plumbing maintenance.
     2. **Electrical Services** — Switches, wiring, and electrical repairs.
     3. **AC Services** — AC installation, servicing, and maintenance.
     4. **Appliance Repair** — Washing machines, refrigerators, and household appliances.
     5. **Carpentry** — Furniture repairs, doors, and fittings.
     6. **Cleaning Services** — Home cleaning and general maintenance.
     7. **Painting & Maintenance** — Painting and minor home improvements.
     8. **Trusted Professionals** — Planned professional profiles, verification, and customer feedback.
   - Interactive hover elevation, golden glowing borders, and custom icons.

4. **Used Products Marketplace**:
   - High-fidelity product showcase featuring pre-loved tech on an emerald pedestal (iPhone, MacBook, Apple Watch, PS5 controller, over-ear headphones, sneakers, and celestial gold arch).
   - 4 Categories: **Phones & Tablets**, **Laptops & Computers**, **Gaming Gear**, and **Fashion & More**.
   - CTA: `Join the Marketplace Waitlist` (automatically pre-selects the marketplace interest in the lead form).

5. **How YarFix Will Work**:
   - Simple 3-step workflow:
     - `01 — Choose a Service`
     - `02 — Connect with a Professional`
     - `03 — Get the Job Done`
   - Circular golden badges connected with clean direction indicators.

6. **Early Access & Lead Collection System**:
   - Dual interface: An embedded lead capture form directly on the page AND an interactive floating modal triggered by any CTA button.
   - Field validation:
     - Full Name (required, sanitized).
     - Either **Email Address OR WhatsApp Number** (Pakistani mobile format `03xx-xxxxxxx` / `+923xxxxxxxxx` normalized automatically).
     - City selection (Karachi launch focus, Lahore, Islamabad, Rawalpindi, etc.).
     - Primary Interest: Home Services, Buying Used Products, Selling Used Products, or Both.
     - Optional notes/message field.
     - Explicit consent agreement.
   - Prevents accidental duplicates and handles re-submissions gracefully.

7. **Server-Side Lead Management & Persistence**:
   - **Dual Storage Engine**:
     - **Neon Postgres / PostgreSQL**: When `DATABASE_URL` is set, saves directly into Neon Postgres with automatic table creation and indexing.
     - **Local Server File Storage**: When `DATABASE_URL` is not yet configured, leads are persisted securely on the server in `data/leads.json`. Leads are **never lost** and survive restarts.
   - Rate limiting & abuse prevention (maximum submissions per IP window).
   - **Admin Portal (`/admin`)**: Real-time stats dashboard, city & interest analytics, search filter, and 1-click **Export to CSV**.
   - API endpoints:
     - `POST /api/leads` — Public submission endpoint.
     - `GET /api/admin/leads` — Secure admin querying and CSV download.

---

## 🚀 Getting Started

### 1. Workspace Recommendation
Set your active workspace directory in your editor to:
```bash
C:\Users\New Rohaan Computers\.gemini\antigravity\scratch\yarfix
```

### 2. Run the Development Server
```bash
cd "C:\Users\New Rohaan Computers\.gemini\antigravity\scratch\yarfix"
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm start
```

---

## 🗄️ Database & Environment Setup

Copy `.env.example` to `.env.local`:
```env
# Database: Neon Postgres connection string (Optional)
# If left empty, YarFix persists to local server disk at data/leads.json
DATABASE_URL=postgresql://user:password@ep-sample-12345.us-east-2.aws.neon.tech/neondb?sslmode=require

# Administrator Secret Key (used for /admin and CSV export)
ADMIN_SECRET=yarfix_admin_secret_2026
```

### Deploying on Vercel with Neon Postgres
1. Create a free serverless Postgres database on [Neon.tech](https://neon.tech).
2. Run the included `schema.sql` script in the Neon SQL Editor.
3. In your Vercel Project Settings, add:
   - `DATABASE_URL`: Your Neon pooled connection string.
   - `ADMIN_SECRET`: A secure key of your choice.
4. Deploy! All waitlist leads will stream directly into your Neon Postgres database.

---

## 📊 Administrator Portal

Access the admin dashboard at:
```
http://localhost:3000/admin
```
Enter your configured `ADMIN_SECRET` (`yarfix_admin_secret_2026` by default) to:
- Monitor live subscriber counts.
- View breakdown by city and interest.
- Filter and search submissions in real time.
- Download a full CSV file (`/api/admin/leads?format=csv`).
