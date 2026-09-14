import Link from "next/link"

export type TierType = "partner" | "sponsor" | "exhibitor"

export interface BrandItem {
  name: string
  tier: TierType
  tierLabel: string
  category: string
  initials: string
  /** Optional image URL (e.g. /logos/smx.webp). If omitted, stylized brand emblem is rendered */
  logoUrl?: string
}

const BRANDS: BrandItem[] = [
  /* ---------------- 1. PARTNERS (Highest Prestige & Stature) ---------------- */
  {
    name: "SMX Convention Center",
    tier: "partner",
    tierLabel: "Official Venue Host",
    category: "Clark Freeport Zone",
    initials: "SMX",
  },
  {
    name: "Clark Development Corp",
    tier: "partner",
    tierLabel: "Host City Partner",
    category: "Government & Tourism",
    initials: "CDC",
  },
  {
    name: "Central Luzon Culinary Guild",
    tier: "partner",
    tierLabel: "Institutional Partner",
    category: "Culinary Heritage",
    initials: "CLC",
  },

  /* ---------------- 2. SPONSORS (Major Commercial Backers) ---------------- */
  {
    name: "San Miguel Foods",
    tier: "sponsor",
    tierLabel: "Presenting Sponsor",
    category: "Beverage & Food Processing",
    initials: "SMF",
  },
  {
    name: "Pampanga's Best",
    tier: "sponsor",
    tierLabel: "Major Sponsor",
    category: "Processed Meats",
    initials: "PB",
  },
  {
    name: "Nestlé Professional",
    tier: "sponsor",
    tierLabel: "Stage & Lab Sponsor",
    category: "Culinary Solutions",
    initials: "NP",
  },
  {
    name: "CDO Foodsphere",
    tier: "sponsor",
    tierLabel: "Major Sponsor",
    category: "Food Manufacturing",
    initials: "CDO",
  },

  /* ---------------- 3. EXHIBITORS (Booths, Artisans & Vendors) ---------------- */
  {
    name: "Kapampangan Kitchen",
    tier: "exhibitor",
    tierLabel: "Exhibitor",
    category: "Heritage Cuisine",
    initials: "KK",
  },
  {
    name: "Brew & Co. Roasters",
    tier: "exhibitor",
    tierLabel: "Exhibitor",
    category: "Artisan Coffee",
    initials: "BC",
  },
  {
    name: "Sweet Escape Pastries",
    tier: "exhibitor",
    tierLabel: "Exhibitor",
    category: "Bakery & Desserts",
    initials: "SE",
  },
  {
    name: "Cocoa Republic",
    tier: "exhibitor",
    tierLabel: "Exhibitor",
    category: "Single-Origin Cacao",
    initials: "CR",
  },
  {
    name: "Farm Fresh PH",
    tier: "exhibitor",
    tierLabel: "Exhibitor",
    category: "Organic Produce",
    initials: "FF",
  },
  {
    name: "The Pasta Bar",
    tier: "exhibitor",
    tierLabel: "Exhibitor",
    category: "Handmade Pasta",
    initials: "PB",
  },
]

export function SponsorMarquee() {
  // Seamless infinite loop by duplicating the ordered dataset
  const marqueeList = [...BRANDS, ...BRANDS]

  return (
    <section className="relative overflow-hidden border-b border-white/12 bg-grape-950 py-12">
      {/* Header bar with Tier Legend */}
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-5">
          <div>
            <div className="flex items-center gap-3 eyebrow text-marigold">
              <span>Event Network</span>
              <span className="h-px w-6 bg-white/20" />
              <span className="text-white/40">2026 Participants</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Partners, Sponsors &amp; Exhibitors
            </h3>
          </div>

          {/* Visual Legend confirming the hierarchy */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 border border-marigold bg-marigold" />
              <span className="font-bold text-marigold">Partners</span>
            </div>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 border border-tangerine bg-tangerine" />
              <span className="text-tangerine font-semibold">Sponsors</span>
            </div>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 border border-white/40 bg-white/20" />
              <span className="text-white/50">Exhibitors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edge Gradient Masks for Smooth Infinity Look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-grape-950 via-grape-950/90 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-grape-950 via-grape-950/90 to-transparent sm:w-32" />

      {/* Marquee Belt Container */}
      <div className="group flex overflow-hidden select-none items-center py-4">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeList.map((brand, index) => (
            <BrandCard key={`${brand.name}-${index}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-6 pt-4 text-xs">
        <span className="text-white/40">
          Hover over any brand card to pause the belt.
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/register-sponsor"
            className="font-bold text-marigold uppercase tracking-wider hover:text-white transition-colors"
          >
            Sponsorship Inquiries →
          </Link>
          <span className="text-white/20">|</span>
          <Link
            href="/register-exhibitor"
            className="font-bold text-basil uppercase tracking-wider hover:text-white transition-colors"
          >
            Book a Booth →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------------- TIER-DIFFERENTIATED CARD COMPONENT ---------------- */
function BrandCard({ brand }: { brand: BrandItem }) {
  /* 1. PARTNER CARD: Hero size, thick gold border, hard drop-shadow, gold aura */
  if (brand.tier === "partner") {
    return (
      <div className="relative flex h-36 w-80 shrink-0 flex-col justify-between border-2 border-marigold bg-grape-900 p-5 shadow-[6px_6px_0px_0px_rgba(251,176,52,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(251,176,52,0.7)]">
        {/* Top Badging */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 border border-marigold bg-marigold/15 px-2.5 py-0.5 font-display text-[10px] font-black uppercase tracking-widest text-marigold">
            ★ {brand.tierLabel}
          </span>
          <span className="font-mono text-[10px] font-bold text-marigold/70">
            HOST / TIER 01
          </span>
        </div>

        {/* Content & Logo */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-marigold bg-grape-950 font-display text-base font-black text-marigold shadow-inner">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain p-1" />
            ) : (
              brand.initials
            )}
          </div>
          <div className="truncate">
            <h4 className="truncate font-display text-base font-black text-white">
              {brand.name}
            </h4>
            <p className="truncate text-xs font-medium text-white/60">
              {brand.category}
            </p>
          </div>
        </div>

        {/* Bottom accent indicator */}
        <div className="flex items-center justify-between border-t border-marigold/30 pt-2 text-[10px] uppercase tracking-wider text-marigold/80 font-mono">
          <span>Official Event Anchor</span>
          <span className="font-bold">● Active</span>
        </div>
      </div>
    )
  }

  /* 2. SPONSOR CARD: Medium commercial size, warm tangerine border & accents */
  if (brand.tier === "sponsor") {
    return (
      <div className="relative flex h-28 w-64 shrink-0 flex-col justify-between border border-tangerine/70 bg-grape-900/80 p-4 shadow-[4px_4px_0px_0px_rgba(242,101,34,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-tangerine hover:shadow-[6px_6px_0px_0px_rgba(242,101,34,0.6)]">
        {/* Top Badging */}
        <div className="flex items-center justify-between">
          <span className="border border-tangerine/50 bg-tangerine/10 px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-tangerine">
            {brand.tierLabel}
          </span>
          <span className="font-mono text-[9px] text-white/40">SPONSOR</span>
        </div>

        {/* Content & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-tangerine/50 bg-grape-950 font-display text-xs font-bold text-tangerine">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain p-1" />
            ) : (
              brand.initials
            )}
          </div>
          <div className="truncate">
            <h4 className="truncate font-display text-sm font-bold text-white">
              {brand.name}
            </h4>
            <p className="truncate text-[11px] text-white/50">
              {brand.category}
            </p>
          </div>
        </div>

        {/* Bottom subtle status */}
        <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[9px] text-white/40 uppercase tracking-wider">
          <span>Commercial Partner</span>
          <span className="text-tangerine">Verified</span>
        </div>
      </div>
    )
  }

  /* 3. EXHIBITOR CARD: Streamlined compact size, hairline border, subtle basil accent */
  return (
    <div className="relative flex h-20 w-48 shrink-0 items-center gap-3 border border-white/15 bg-grape-900/40 px-3.5 py-2.5 transition-all duration-300 hover:border-basil/70 hover:bg-grape-900/80">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 bg-grape-950 font-mono text-xs font-bold text-white/70 group-hover:text-basil">
        {brand.logoUrl ? (
          <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain p-0.5" />
        ) : (
          brand.initials
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-basil" />
          <span className="font-mono text-[8px] uppercase tracking-wider text-basil">
            Exhibitor
          </span>
        </div>
        <h5 className="truncate font-display text-xs font-bold text-white/90">
          {brand.name}
        </h5>
        <p className="truncate text-[10px] text-white/45">{brand.category}</p>
      </div>
    </div>
  )
}