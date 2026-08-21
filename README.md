# dentalimplantsinmexico.info — Static HTML Website

## Overview
Static HTML website for Dr. José Moguel's dental implant practice in Los Algodones, Mexico. Built for maximum SEO performance with server-side rendered content, proper meta tags, structured data, and fast page loading.

## SEO Features
- ✅ Real, crawlable HTML title on every page
- ✅ Unique meta descriptions on every page
- ✅ One clear H1 per page
- ✅ All content server-side rendered (static HTML — no JavaScript rendering needed)
- ✅ Crawlable internal links
- ✅ Correct canonical URLs
- ✅ Working robots.txt
- ✅ Working sitemap.xml (45 URLs)
- ✅ Proper 404 page
- ✅ No duplicate URLs for the same treatment
- ✅ LocalBusiness/Dentist structured data (JSON-LD)
- ✅ Fast page loading (static HTML, minimal external resources)
- ✅ Proper mobile performance (responsive CSS)
- ✅ BreadcrumbList structured data on sub-pages
- ✅ Article schema on blog posts
- ✅ MedicalProcedure schema on treatment pages

## Directory Structure
```
dentalimplantsinmexico/
├── index.html              # Homepage
├── cost-calculator.html    # Interactive cost calculator
├── treatment-comparison.html
├── border-crossing-checklist.html
├── insurance-claim-guide.html
├── treatments.html         # All treatments overview
├── about.html
├── contact.html
├── patient-stories.html
├── success-stories.html
├── dental-tourism.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── css/styles.css
├── js/main.js
├── treatments/             # Individual treatment pages
│   ├── allon4.html
│   ├── allon6.html
│   ├── 3on8.html
│   ├── single-tooth-implant.html
│   ├── full-mouth-reconstruction.html
│   ├── implant-supported-dentures.html
│   ├── teeth-in-a-day.html
│   ├── bone-grafting.html
│   ├── sinus-lift.html
│   ├── gum-disease-treatment.html
│   ├── zirconia-teeth.html
│   └── sedation-dentistry.html
├── dental-implants/         # Informational pages
│   ├── cost.html
│   ├── recovery.html
│   ├── healing-time.html
│   ├── before-and-after.html
│   ├── faqs.html
│   ├── travel-guide.html
│   ├── financing.html
│   ├── complications.html
│   └── success-rate.html
├── dental-implants-*.html   # City landing pages (7)
└── blog/                   # Blog
    ├── index.html
    ├── is-it-safe-to-get-dental-implants-in-mexico.html
    ├── how-much-do-dental-implants-cost-in-mexico.html
    └── molar-city-guide-los-algodones-dental-tourism.html
```

## Deployment

### Option 1: GitHub Pages (Free)
1. Create a new GitHub repository (e.g., `dentalimplantsinmexico`)
2. Upload all files from this directory
3. Go to Settings → Pages
4. Set Source to "main branch" / root
5. Your site will be live at `https://[username].github.io/dentalimplantsinmexico/`
6. Add a custom domain (dentalimplantsinmexico.info) in Pages settings
7. Update DNS: Add a CNAME record pointing to `[username].github.io`

### Option 2: Netlify (Free — Recommended)
1. Create a new GitHub repository and upload all files
2. Go to netlify.com → "Add new site" → "Import an existing project"
3. Select your GitHub repository
4. Build command: (none needed — it's static HTML)
5. Publish directory: `.` (root)
6. Add custom domain: dentalimplantsinmexico.info
7. Update DNS: Add an A record or CNAME as Netlify instructs

### Option 3: Vercel (Free)
1. Go to vercel.com → "Add New Project"
2. Import your GitHub repository
3. Framework: "Other" (static)
4. Deploy
5. Add custom domain in settings
6. Update DNS as Vercel instructs

## Lead Capture
## Lead Capture
The contact form on this site submits to:
`/api/lead`

The `/api/lead` Vercel serverless function securely sends new leads to HubSpot CRM.


This endpoint:
- Creates a CRM contact record
- Triggers automated welcome email
- Schedules follow-up tasks (Day 1, 3, 7)
- Logs the communication

No backend server needed — the form uses a public API endpoint.

This endpoint:
- Creates a CRM contact record
- Triggers automated welcome email
- Schedules follow-up tasks (Day 1, 3, 7)
- Logs the communication

No backend server needed — the form uses a public API endpoint.

## Phone & Contact
- Phone: 928-374-4575
- Email: irma@dentalimplantsinmexico.info
- WhatsApp: https://wa.me/19283744575
- Address: Av. Internacional S/N, Los Algodones, Baja California, Mexico 21970
