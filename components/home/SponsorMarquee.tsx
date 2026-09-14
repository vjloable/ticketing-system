import Link from "next/link"

export interface SponsorItem {
  name: string
  tier: "Title Sponsor" | "Co-Presenter" | "Major Exhibitor" | "Media Partner"
  category: string
  initials: string
  accentColor: string
}

const SPONSORS: SponsorItem[] = [
  {
    name: "San Miguel Foods",
    tier: "Title Sponsor",
    category: "Beverage & Food Processing",
    initials: "SMF",
    accentColor: "border-marigold text-marigold bg-marigold/10",
  },
  {
    name: "Pampanga's Best",
    tier: "Co-Presenter",
    category: "Processed Meats & Heritage",
    initials: "PB",
    accentColor: "border-tangerine text-tangerine bg-tangerine/10",
  },
  {
    name: "Nestlé Professional",
    tier: "Co-Presenter",
    category: "Culinary Solutions",
    initials: "NP",
    accentColor: "border-tangerine text-tangerine bg-tangerine/10",
  },
  {
    name: "CDO Foodsphere",
    tier: "Major Exhibitor",
    category: "Food Retail & Innovation",
    initials: "CDO",
    accentColor: "border-basil text-basil bg-basil/10",
  },
  {
    name: "Universal Robina",
    tier: "Major Exhibitor",
    category: "Snacks & Refreshments",
    initials: "URC",
    accentColor: "border-basil text-basil bg-basil/10",
  },
  {
    name: "Mekeni Food Corp",
    tier: "Major Exhibitor",
    category: "Central Luzon Meats",
    initials: "MFC",
    accentColor: "border-basil text-basil bg-basil/10",
  },
  {
    name: "GrabFood PH",
    tier: "Major Exhibitor",
    category: "Official Logistics Partner",
    initials: "GF",
    accentColor: "border-lime text-lime bg-lime/10",
  },
  {
    name: "SunStar Pampanga",
    tier: "Media Partner",
    category: "Print & Digital Media",
    initials: "SSP",
    accentColor: "border-grape-400 text-grape-400 bg-grape-400/10",
  },
  {
    name: "CLTV 36",
    tier: "Media Partner",
    category: "Regional Broadcast",
    initials: "C36",
    accentColor: "border-grape-400 text-grape-400 bg-grape-400/10",
  },
  {
    name: "SMX Convention Center",
    tier: "Title Sponsor",
    category: "Official Venue Host",
    initials: "SMX",
    accentColor: "border-marigold text-marigold bg-marigold/10",
  },
]

export function SponsorMarquee() {
  // Duplicated set for uninterrupted, seamless infinite scrolling
  const marqueeList = [...SPONSORS, ...SPONSORS]

  return (
    <section className="relative overflow-hidden border-b border-white/12 bg-grape-950 py-10">
      <div className="mx-auto max-w-6xl px-5 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-4">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-marigold">Sponsors &amp; Partners</span>
            <span className="h-px w-6 bg-white/20" />
            <span className="text-xs uppercase tracking-wider text-white/50">
              Backing Central Luzon&apos;s Culinary Future
            </span>
          </div>
          <Link
            href="/register-sponsor"
            className="text-xs font-bold uppercase tracking-wider text-marigold hover:text-white transition-colors"
          >
            Become a Sponsor →
          </Link>
        </div>
      </div>

      {/* Edge Gradient Masks for Smooth Fading */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-grape-950 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-grape-950 to-transparent sm:w-28" />

      {/* Infinite Belt Container with Pause-on-Hover */}
      <div className="group flex overflow-hidden select-none">
        <div className="animate-marquee flex gap-5 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeList.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex w-64 sm:w-72 shrink-0 flex-col justify-between border border-white/12 bg-grape-900/70 p-5 transition-all duration-300 hover:border-marigold/80 hover:bg-grape-900 hover:shadow-[4px_4px_0px_0px_rgba(251,176,52,0.3)]"
            >
              {/* Top: Tier Pill */}
              <div className="flex items-center justify-between">
                <span
                  className={`border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest ${item.accentColor}`}
                >
                  {item.tier}
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  #{(idx % SPONSORS.length) + 1 < 10 ? `0${(idx % SPONSORS.length) + 1}` : (idx % SPONSORS.length) + 1}
                </span>
              </div>

              {/* Middle: Brand Emblem & Monogram */}
              <div className="my-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 bg-grape-950 font-display text-sm font-black tracking-wider text-white/80 transition-colors group-hover:border-marigold/50 group-hover:text-marigold">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-white transition-colors group-hover:text-marigold">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/50">{item.category}</p>
                </div>
              </div>

              {/* Bottom Hairline & Status */}
              <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
                <span>Official Partner</span>
                <span className="text-basil">● Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}