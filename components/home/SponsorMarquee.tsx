"use client"

import { PARTNERS, SPONSORS, EXHIBITORS } from "@/lib/brand-data"

export function SponsorMarquee() {
  const partnerList = [...PARTNERS, ...PARTNERS]
  const sponsorList = [...SPONSORS, ...SPONSORS, ...SPONSORS]
  const exhibitorList = [...EXHIBITORS, ...EXHIBITORS]

  return (
    <section
      id="partners-network"
      className="relative overflow-hidden border-y-4 border-grape-950 bg-linear-to-b from-[#e29307] via-marigold to-[#cf8200] py-10 sm:py-14 md:py-18 shadow-[inset_0_20px_40px_rgba(120,53,15,0.4),inset_0_-20px_40px_rgba(120,53,15,0.4)]"
    >
      {/* Heavy Radial Darker-Yellow / Deep Amber Vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(180,83,9,0.35)_75%,rgba(120,53,15,0.6)_100%)]" />

      {/* Brand Header with Grape Hairline Accents */}
      <div className="relative z-15 mx-auto max-w-6xl px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="h-0.5 w-8 sm:w-16 bg-grape-950/40" />
          <p className="eyebrow text-grape-950 font-black tracking-[0.2em] sm:tracking-[0.28em] text-[10px] sm:text-xs">
            Backed by Central Luzon&apos;s culinary leaders, partners &amp; exhibitors
          </p>
          <span className="h-0.5 w-8 sm:w-16 bg-grape-950/40" />
        </div>
      </div>

      {/* Responsive Deep Amber Edge Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 md:w-36 lg:w-48 bg-linear-to-r from-[#b45309] via-[#d97706]/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 md:w-36 lg:w-48 bg-linear-to-l from-[#b45309] via-[#d97706]/85 to-transparent" />

      <div className="relative z-15 flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* 1. PARTNERS */}
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
                  className="h-11 sm:h-14 md:h-16 lg:h-20 w-auto max-w-32.5 sm:max-w-42.5 md:max-w-52.5 lg:max-w-60 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_6px_16px_rgba(30,15,58,0.45)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2. SPONSORS */}
        <div className="group flex overflow-hidden select-none py-1">
          <div
            className="animate-marquee-reverse flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "50s" }}
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
                  className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto max-w-27.5 sm:max-w-37.5 md:max-w-45 lg:max-w-52.5 object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_6px_16px_rgba(30,15,58,0.45)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. EXHIBITORS */}
        <div className="group flex overflow-hidden select-none py-1">
          <div
            className="animate-marquee flex items-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "60s" }}
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
                  className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-22.5 sm:max-w-30 md:max-w-37.5 lg:max-w-45 object-contain opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_4px_12px_rgba(30,15,58,0.45)]"
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