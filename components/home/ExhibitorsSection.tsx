import Link from "next/link"
import { Section } from "./Section"
import { EXHIBITORS } from "@/lib/brand-data"

export function ExhibitorsSection() {
  // 16 Verified Exhibitors
  const featured = EXHIBITORS.slice(0, 16)

  const formatBrandName = (name: string) => {
    if (name.toLowerCase() === "bcmm") return "BCMM"
    return name
  }

  return (
    <Section
      id="exhibitors"
      index="05"
      label="Exhibitors & Brands"
      title="Brands you'll love at the expo"
      action={
        <Link
          href="/register-exhibitor"
          className="eyebrow border border-white/25 px-5 py-2.5 text-white transition-colors hover:border-white"
        >
          Become an Exhibitor →
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/50 pb-2">
          <span>Explore 80+ leaders across foodservice, culinary equipment, hospitality, and native specialties.</span>
          <span className="font-mono text-marigold/80">Showing 16 Featured Brands</span>
        </div>

        {/* Elevated Exhibition Grid */}
        <div className="grid border-t border-l border-white/12 grid-cols-2 sm:grid-cols-4 lg:grid-cols-4">
          {featured.map((b) => (
            <div
              key={b.name}
              className="group relative flex flex-col justify-between border-b border-r border-white/12 bg-grape-950/40 p-5 transition-all duration-300 hover:bg-grape-900/60 hover:border-marigold/40"
            >
              {/* Studio Canvas for 100% Logo Contrast & Depth */}
              <div className="relative flex h-24 w-full items-center justify-center rounded-sm bg-linear-to-b from-white via-white to-neutral-100 p-3.5 shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_8px_20px_rgba(255,200,80,0.15)] group-hover:ring-marigold/40">
                <img
                  src={encodeURI(b.logo)}
                  alt={b.name}
                  className="max-h-12 sm:max-h-14 w-auto max-w-[85%] object-contain filter transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Brand Label & Metadata */}
              <div className="mt-4 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="block truncate text-xs font-bold text-white/90 group-hover:text-marigold transition-colors">
                    {formatBrandName(b.name)}
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Official Exhibitor
                  </span>
                </div>
                <span className="shrink-0 text-white/20 group-hover:text-marigold transition-colors text-xs font-mono">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border border-white/12 bg-grape-900/50 px-6 py-4">
          <span className="text-xs text-white/70">
            Over <strong className="text-white">80+ food &amp; beverage enterprises</strong> exhibiting live this September.
          </span>
          <Link
            href="/feedback"
            className="text-xs font-bold text-marigold uppercase tracking-wider hover:underline"
          >
            Share Exhibitor &amp; Brand Feedback →
          </Link>
        </div>
      </div>
    </Section>
  )
}