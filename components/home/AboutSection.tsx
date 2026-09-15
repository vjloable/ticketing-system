import { Section } from "./Section"

export function AboutSection() {
  return (
    <Section id="about" index="01" label="About the Expo" title="A celebration of flavor & community">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-white/70">
          <p className="text-lg leading-relaxed text-white/85">
            OPFBEX is where Central Luzon&apos;s culinary scene comes alive — from
            homegrown startups to established restaurateurs, a gathering of makers,
            tasters, and dreamers.
          </p>
          <p className="leading-relaxed">
            In its second year, we&apos;re doubling the scope: 5 dynamic days across premier venues and tasting trails,
            incorporating the official <strong className="text-marigold">One Pampanga Culinary Cup (OPCC)</strong> at SM City Clark,
            the <strong className="text-marigold">OPFBEX Culinary Tour</strong> across Angeles &amp; Clark,
            and the grand <strong className="text-marigold">Food &amp; Beverage Expo and Food Forward Forum</strong> at SMX Convention Center Clark.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <span className="border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70">
              Sept 16–17 · SM City Clark
            </span>
            <span className="border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70">
              Sept 18 · Culinary Tour
            </span>
            <span className="border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70">
              Sept 19–20 · SMX Clark
            </span>
          </div>
        </div>
        <dl className="divide-y divide-white/12 border-y border-white/12">
          {[
            ["10K+", "Expected Visitors & Trade Buyers"],
            ["100+", "Regional Food Brands & Exhibitors"],
            ["8", "Official OPCC Culinary Categories"],
            ["5", "Days Across 10+ Venues & Landmarks"],
          ].map(([n, l]) => (
            <div key={l} className="flex items-center justify-between py-4">
              <dt className="text-sm text-white/60">{l}</dt>
              <dd className="font-display text-2xl font-extrabold tracking-tight text-white">{n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}