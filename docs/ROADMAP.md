# OPFBEX 2026 Ticketing System — Feature Roadmap & Architecture Guide

This document outlines the operational workflows, technical architecture, and implementation tasks for the OPFBEX 2026 Ticketing & On-Site Event Management System.

---

## 📋 Table of Contents
1. [Current Milestone Status](#1-current-milestone-status)
2. [Core Operational Lifecycle](#2-core-operational-lifecycle)
3. [Feature Specifications & Architecture](#3-feature-specifications--architecture)
   - [Completed Features](#completed-features)
     - [F1: Same-Day Visitor Registration](#f1-same-day-visitor-registration)
     - [F2: Print Pass & PDF Badge Export](#f2-print-pass--pdf-badge-export)
     - [F3: Admin Panel & On-Site Booth Operations](#f3-admin-panel--on-site-booth-operations)
     - [F4: Camera-Based QR Code Scanner & Check-in](#f4-camera-based-qr-code-scanner--check-in)
     - [F5: Google Forms Ingestion & Dual-Persona Claiming](#f5-google-forms-ingestion--dual-persona-claiming)
     - [F6: Public Authentication & Route Refactor](#f6-public-authentication--route-refactor)
     - [F7: Ambient Video Showcase & Recap Reel](#f7-ambient-video-showcase--recap-reel)
     - [F8: 3-Tier Sponsor & Partner Logo Belt](#f8-3-tier-sponsor--partner-logo-belt)
     - [F9: Landing Page Modularization & Sub-Event Identities](#f9-landing-page-modularization--sub-event-identities)
   - [In-Progress & Pinned Features (`feature/ui-enhancements`)](#in-progress--pinned-features-featureui-enhancements)
     - [F10: Food Forward Forum Dedicated Sub-Portal & Speaker Carousel](#f10-food-forward-forum-dedicated-sub-portal--speaker-carousel)
     - [F11: Shuttle Bus Transit Schedule & Route Maps](#f11-shuttle-bus-transit-schedule--route-maps)
   - [Phase 3 (E-Commerce)](#phase-3-e-commerce)
     - [F12: PayMongo Payment Gateway Integration](#f12-paymongo-payment-gateway-integration)
4. [Database Schema Enhancements (Supabase)](#4-database-schema-enhancements-supabase)
5. [Implementation Phases & Priority Matrix](#5-implementation-phases--priority-matrix)

---

## 1. Current Milestone Status

| Feature / Phase | Status | Summary |
| :--- | :--- | :--- |
| **F1: Same-Day Registration** | ✅ **Completed** | Dynamic cutoffs configured in `lib/form-constants.ts`; visitor registrations open through event close. |
| **F2: Print Pass & PDF Export** | ✅ **Completed** | Lanyard-sized badge generator with `@media print` styling, crisp QR code, and dark purple theme preservation. |
| **F3: Admin Directory & Ops** | ✅ **Completed** | Real-time pass search, status filtering, attendee stats, and commercial pass approvals in `/admin`. |
| **F4: QR Scanner & Check-in** | ✅ **Completed** | Camera scanning with `@zxing`/`html5-qrcode`, audio chime, and duplicate scan alerts in `/admin/scan`. |
| **F5: Google Forms Migration** | ✅ **Completed** | 394 registrants ingested; zero-login email lookup & atomic claim stored procedure in Postgres. |
| **F6: Dedicated Auth & Routes** | ✅ **Completed** | Clean separation of `/register-visitor`, `/register-exhibitor`, `/register-sponsor`, `/signin`, and `/signup`. |
| **F7: Ambient Video Showcase** | ✅ **Completed** | Cinematic ambient video background in Hero (`HeroVideoBackground.tsx`) with modal recap trigger (`WatchReelButton.tsx`). |
| **F8: Sponsor Logo Belt** | ✅ **Completed** | 3-tier responsive marquee (`SponsorMarquee.tsx`) featuring 128 brands on marigold surface with gold vignette and borderless logos. |
| **F9: Landing Page Modularization** | ✅ **Completed** | Modularized `app/page.tsx` into 10 reusable components under `components/home/*` with elevated OPCC and Exhibitor showcases. |
| **F10: Food Forward Forum Portal** | 📌 **Pinned / Next** | Dedicated sub-route (`/food-forward-forum`) with forest green & gold branding, interactive speaker carousel (`←`/`→`), and agenda deep-dive. |
| **F11: Shuttle Bus Transit** | ⏳ **Upcoming** | Key pickup hubs (Dau, Clark Airport, SM Clark) with timetable schedule on homepage. |
| **F12: PayMongo E-Commerce** | ⏳ **Upcoming** | Paid ticket checkout session API & webhook verification at `/tickets`. |

---

## 2. Core Operational Lifecycle

```mermaid
graph TD
    A[Visitor / Exhibitor Registers Online OR Google Forms Pre-Reg] --> B[Pass Created in Supabase]
    B -->|Visitor Pass / Pre-Registered| C[Status: Active]
    B -->|Exhibitor / Sponsor| D[Status: Pending Verification]
    D -->|Admin Reviews & Approves| C
    C --> E[Attendee Receives Ticket & QR Code]
    E --> F[Print Lanyard Badge or Show on Mobile]
    F --> G[On-Site Arrival at SMX Clark]
    G --> H[Secretariat Scans QR via /admin/scan]
    H --> I[Status: Checked-In + Timestamp Recorded]
    I --> J[Physical Badge / Wristband Issued]
```

---

## 3. Feature Specifications & Architecture

### Completed Features

#### F1: Same-Day Visitor Registration
* Dynamic registration cutoff timestamps in `lib/form-constants.ts`.
* Visitor passes remain available throughout the expo (Sept 19–20, 2026), while exhibitor/sponsor registrations close 7 days prior.

#### F2: Print Pass & PDF Badge Export
* Dedicated print view at `/passes/[id]/print` with lanyard badge styling and `print-color-adjust: exact`.

#### F3: Admin Panel & On-Site Booth Operations
* Full attendee directory at `/admin` with search by name/email/company, filter by status, and commercial verification tools.

#### F4: Camera-Based QR Code Scanner & Check-in
* Web scanner at `/admin/scan` with instant audio feedback and duplicate pass warnings.

#### F5: Google Forms Ingestion & Dual-Persona Claiming
* 394 Google Forms responses ingested to `public.google_forms_registrants`.
* Public claim widget (`ClaimGoogleFormsPass.tsx`) allows pre-registered attendees to claim their official ticket code and print without prior sign-in.
* Robust Postgres stored procedure `claim_google_forms_pass` cleanly parses attendee preferences (`daysAttending`, `purposes`).

#### F6: Public Authentication & Route Refactor
* Independent, SEO-optimized landing routes for `/register-visitor`, `/register-exhibitor`, `/register-sponsor`, `/signin`, and `/signup`.

#### F7: Ambient Video Showcase & Recap Reel
* **Hero Background:** `HeroVideoBackground.tsx` provides high-definition ambient video loop (`.webm` + `.mp4`) behind the Hero section with asymmetric brand grape gradients to preserve text legibility.
* **Modal Trigger:** `WatchReelButton.tsx` provides an understated ghost link trigger opening a responsive 16:9 modal player with full audio, controls, and `ESC` dismissal.

#### F8: 3-Tier Sponsor & Partner Logo Belt
* **Brand Ingestion:** 128 participating brands (35 Partners, 13 Sponsors, 80 Exhibitors) parsed from `lib/OPFBEX2026 - Brand List.csv` into typed data structure `lib/brand-data.ts`.
* **Design & Motion:** `SponsorMarquee.tsx` renders borderless floating logos directly on the OPFBEX `marigold` surface with amber-gold vignette depth, fluid responsive sizing, and organic motion hierarchy.

#### F9: Landing Page Modularization & Sub-Event Identities
* **Modular Architecture:** Refactored monolithic 1,000+ line `app/page.tsx` into single-responsibility components in `components/home/`:
  * `HeroSection.tsx`, `SponsorMarquee.tsx`, `AboutSection.tsx`, `HighlightsSection.tsx`, `CulinaryCupSection.tsx`, `FoodForwardForumSection.tsx`, `ExhibitorsSection.tsx`, `ScheduleSection.tsx`, `VenueSection.tsx`, `FooterSection.tsx`.
* **One Pampanga Culinary Cup (OPCC):** High-resolution transparent emblem (`/opcc-logo.webp`), full-width hero presentation, 8 live battle categories, and SM City Clark Event Centre free public spectator guide.
* **Exhibitor Showcase:** Elevated studio canvas grid with 100% logo contrast, normalized brand typography (e.g. `BCMM`), subtle hover depth, and direct directory stats (80+ enterprises).

---

### In-Progress & Pinned Features

#### F10: Food Forward Forum Dedicated Sub-Portal & Speaker Carousel
* **Objective:** Give the executive summit co-presented by the Pampanga Business Circle its own distinct brand universe without disrupting OPFBEX's dark brutalist homepage.
* **Route:** `/food-forward-forum` (with homepage teaser in `FoodForwardForumSection.tsx`).
* **Visual Identity:** Deep Forest Green (`#064e3b`), Warm Ivory/Cream, and Gold ribbon detailing.
* **Key Features:**
  * **Interactive Speaker Carousel:** Dedicated speaker card with high-resolution portraits, keynote topics, executive bios/backgrounds, and `←` / `→` arrow pagination.
  * **5 Core Framework Pillars:** Deep-dive into Food Security, Sustainability, AgTech, Investment, and Tourism.
  * **Executive Schedule & Panels:** Detailed afternoon breakdown for Sept 19 at SMX Clark Meeting Room 1.
  * **Direct VIP & Delegate Registration:** Dedicated registration pathway for forum delegates.

#### F11: Shuttle Bus Transit Schedule & Route Maps
* **Objective:** Provide clear transit information and pickup points to SMX Convention Center Clark.
* **Features:**
  * Key pickup points: Dau Bus Terminal, Clark International Airport (CRK), SM City Clark, Angeles City Heritage District.
  * Timetable intervals with interactive schedule tabs.

---

### Phase 3 (E-Commerce)

#### F12: PayMongo Payment Gateway Integration
* **Objective:** Collect payments for paid ticket tiers (Day Pass ₱250, Weekend Pass ₱400, VIP Foodie ₱900) at `/tickets`.
* **Payment Methods:** GCash, Maya, GrabPay, Credit/Debit Card via PayMongo Checkout Session API and Webhook listener.

---

## 4. Implementation Phases & Priority Matrix

| Phase | Feature | Complexity | Target Branch |
| :--- | :--- | :--- | :--- |
| **Phase 1 (Complete)** | **Same-Day Reg, Print Badges, Admin Directory, QR Scanner** | Medium | `main` |
| **Phase 1.5 (Complete)**| **Google Forms 394 Migration & Public Claim Flow** | High | `main` |
| **Phase 2 (Complete)** | **Modular Landing Page, OPCC & Exhibitors Elevation, Video & Marquee** | Medium | `feature/ui-enhancements` |
| **Phase 2.5 (Pinned)** | **Food Forward Forum Sub-Portal & Speaker Carousel** | Medium | `feature/ui-enhancements` |
| **Phase 2.6 (Upcoming)**| **Transit & Shuttle Bus Timetable Section** | Low | `feature/ui-enhancements` |
| **Phase 3 (Upcoming)** | **PayMongo Payment Integration & Webhook Sync** | High | `feature/paymongo-ecommerce` |