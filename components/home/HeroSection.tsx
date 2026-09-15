import Link from "next/link"
import { HeroVideoBackground } from "@/components/home/HeroVideoBackground"
import { WatchReelButton } from "@/components/home/WatchReelButton"
import { getAssetUrl } from "@/lib/assets"

function Fact({
  label,
  value,
  sub,
  accent,
  border,
}: {
  label: string
  value: string
  sub: string
  accent: string
  border?: boolean
}) {
  return (
    <div className={`flex-1 px-6 py-8 ${border ? "border-t border-white/12" : ""}`}>
      <div className="eyebrow text-white/40">{label}</div>
      <div className={`mt-2 font-display text-4xl font-extrabold tracking-tight ${accent}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-white/55">{sub}</div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/12 bg-grape-950">
      <HeroVideoBackground
        webmSrc={getAssetUrl("/opfbex25-highlights.webm")}
        mp4Src={getAssetUrl("/opfbex25-highlights.mp4")}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="grid border-x border-white/12 md:grid-cols-12">
          {/* Left: Headline & Actions */}
          <div className="border-b border-white/12 px-6 py-14 md:col-span-8 md:border-b-0 md:border-r md:py-20">
            <div className="flex items-center gap-4 eyebrow text-marigold">
              <span>Year 02</span>
              <span className="h-px w-8 bg-white/25" />
              <span className="text-white/50">Central Luzon Culinary Expo</span>
            </div>

            <h1 className="mt-8 font-display text-6xl font-black leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl">
              <span className="text-chili">O</span>
              <span className="text-tangerine">P</span>
              <span className="text-marigold">F</span>
              <span className="text-marigold">B</span>
              <span className="text-basil">E</span>
              <span className="text-lime">X</span>
              <br />
              <span className="text-white">2026</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              Central Luzon&apos;s premier culinary expo returns — four days of
              tastings, live competitions, and the region&apos;s top food &amp;
              beverage brands under one roof.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register-visitor"
                className="border border-marigold bg-marigold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-grape-950 transition-all hover:bg-transparent hover:text-marigold"
              >
                Register as Visitor →
              </Link>
              <Link
                href="#partner-passes"
                className="border border-white/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Exhibitor &amp; Sponsor Passes
              </Link>
              <WatchReelButton />
            </div>
          </div>

          {/* Right: Fact Stack */}
          <div className="flex flex-col md:col-span-4">
            <Fact label="Dates" value="16–20" sub="Sept 2026 · 4 Days" accent="text-basil" />
            <Fact label="Venues" value="SMX + SM" sub="Clark, Pampanga" accent="text-tangerine" border />
            <Fact label="Pass Types" value="3" sub="Visitor · Exhibitor · Sponsor" accent="text-marigold" border />
          </div>
        </div>
      </div>
    </section>
  )
}