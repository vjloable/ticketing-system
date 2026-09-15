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
            In its second year, we&apos;re doubling the flavor: more exhibitors,
            more live demos, and more reasons to come hungry. It is equal parts
            marketplace, stage, and meeting ground for the people shaping how the
            region eats.
          </p>
        </div>
        <dl className="divide-y divide-white/12 border-y border-white/12">
          {[
            ["10K+", "Expected Guests"],
            ["30+", "Live Demos"],
            ["4", "Culinary Days"],
          ].map(([n, l]) => (
            <div key={l} className="flex items-center justify-between py-5">
              <dt className="text-white/60">{l}</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight">{n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}