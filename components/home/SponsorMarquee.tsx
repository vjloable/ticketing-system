"use client"

import { PARTNERS, SPONSORS, EXHIBITORS } from "@/lib/brand-data"

export function SponsorMarquee() {
  const partnerList = [...PARTNERS, ...PARTNERS]
  const sponsorList = [...SPONSORS, ...SPONSORS, ...SPONSORS]
  const exhibitorList = [...EXHIBITORS, ...EXHIBITORS]

  return (
    <section
      id="partners-network"
      className="relative overflow-hidden border-y-2 border-grape-950/20 bg-marigold py-10 sm:py-14 md:py-18"
    >
      {/* Brutalist Corner Crosshairs in Grape */}
      <div className="pointer-events-none absolute top-3 left-4 font-mono text-xs font-black text-grape-950/25 select-none">
        +
      </div>
      <div className="pointer-events-none absolute top-3 right-4 font-mono text-xs font-black text-grape-950/25 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-xs font-black text-grape-950/25 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-xs font-black text-grape-950/25 select-none">
        +
      </div>

      {/* Brand Header with Grape Hairline Accents */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="h-px w-6 sm:w-12 bg-grape-950/25" />
          <p className="eyebrow text-grape-950 font-black tracking-[0.2em] sm:tracking-[0.28em] text-[10px] sm:text-xs">
            Backed by Central Luzon&apos;s culinary leaders, partners &amp; exhibitors
          </p>
          <span className="h-px w-6 sm:w-12 bg-grape-950/25" />
        </div>
      </div>

      {/* Responsive Edge Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 md:w-36 lg:w-48 bg-linear-to-r from-marigold via-marigold/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 md:w-36 lg:w-48 bg-linear-to-l from-marigold via-marigold/85 to-transparent" />

      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* ============================================================ */}
        {/* 1. PARTNERS: Hero scale, generous spacing, smooth glide */}
        {/* ============================================================ */}
        <div className="group flex overflow-hidden select-none py-1">
          <div
            className="animate-marquee flex items-center gap-10 sm:gap-14 md:gap-18 lg:gap-22 whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "55s" }}
          >
            {partnerList.map((item, idx) => (
              <div
                key={`partner-${item.name}-${idx}`}
                className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
                title={item.name}
              >
                <img
                  src={encodeURI(item.logo)}
                  alt={item.name}
                  className="h-11 sm:h-14 md:h-16 lg:h-20 w-auto max-w-32.5 sm:max-w-42.5 md:max-w-52.5 lg:max-w-60 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_6px_16px_rgba(30,15,58,0.35)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. SPONSORS: Medium scale, balanced spacing, reverse glide */}
        {/* ============================================================ */}
        <div className="group flex overflow-hidden select-none py-1">
          <div
            className="animate-marquee-reverse flex items-center gap-8 sm:gap-10 md:gap-13 lg:gap-16 whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "40s" }}
          >
            {sponsorList.map((item, idx) => (
              <div
                key={`sponsor-${item.name}-${idx}`}
                className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
                title={item.name}
              >
                <img
                  src={encodeURI(item.logo)}
                  alt={item.name}
                  className="h-8 sm:h-9 md:h-11 lg:h-13 w-auto max-w-23.75 sm:max-w-31.25 md:max-w-37.5 lg:max-w-43.75 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_4px_12px_rgba(30,15,58,0.25)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. EXHIBITORS: Compact scale, tight rhythm, ambient ribbon */}
        {/* ============================================================ */}
        <div className="group flex overflow-hidden select-none py-1">
          <div
            className="animate-marquee flex items-center gap-5 sm:gap-7 md:gap-8 lg:gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "65s" }}
          >
            {exhibitorList.map((item, idx) => (
              <div
                key={`exhibitor-${item.name}-${idx}`}
                className="flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
                title={item.name}
              >
                <img
                  src={encodeURI(item.logo)}
                  alt={item.name}
                  className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto max-w-16.25 sm:max-w-21.25 md:max-w-26.25 lg:max-w-30 object-contain opacity-85 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_2px_8px_rgba(30,15,58,0.2)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}