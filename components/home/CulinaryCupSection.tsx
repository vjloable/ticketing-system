import { Section } from "./Section"

export function CulinaryCupSection() {
  const categories = [
    {
      id: "01",
      name: "Modern Kapampangan Cuisine",
      desc: "Reimagining traditional culinary heritage through contemporary techniques, balanced flavor profiles, and refined regional presentation.",
      tag: "Savory Live",
      accent: "text-marigold",
      border: "hover:border-marigold/50",
    },
    {
      id: "02",
      name: "Creative Breakfast",
      desc: "Inventive morning culinary concepts celebrating regional farm harvest, native sausages, artisanal doughs, and local breakfast aromatics.",
      tag: "Culinary Challenge",
      accent: "text-tangerine",
      border: "hover:border-tangerine/50",
    },
    {
      id: "03",
      name: "Young Chef Challenge",
      desc: "The premier competitive crucible spotlighting Central Luzon’s brightest rising student and junior culinary talents under real kitchen pressure.",
      tag: "Youth Arena",
      accent: "text-basil",
      border: "hover:border-basil/50",
    },
    {
      id: "04",
      name: "Quick Fire Pasta",
      desc: "High-intensity live showdown testing sauce emulsification, timing precision, and rapid-fire craftsmanship under the ticking clock.",
      tag: "Speed & Skill",
      accent: "text-chili",
      border: "hover:border-chili/50",
    },
    {
      id: "05",
      name: "Modern Filipino Kakanin",
      desc: "Elevating ancestral glutinous rice, coconut, and root crop delicacies into contemporary fine-dining plated native confections.",
      tag: "Native Delicacy",
      accent: "text-marigold",
      border: "hover:border-marigold/50",
    },
    {
      id: "06",
      name: "Dress the Cake",
      desc: "Live, real-time pastry challenge evaluating precision piping, buttercream stability, artistic rhythm, and clean structural execution.",
      tag: "Live Pastry",
      accent: "text-lime",
      border: "hover:border-lime/50",
    },
    {
      id: "07",
      name: "Celebration Cakes",
      desc: "Architectural multi-tiered centerpiece cakes judged on structural integrity, intricate sugarcraft detailing, and thematic artistry.",
      tag: "Showpiece",
      accent: "text-tangerine",
      border: "hover:border-tangerine/50",
    },
    {
      id: "08",
      name: "Modern Kapampangan Plated Dessert",
      desc: "Exquisite restaurant-grade plated desserts incorporating native citrus, carabao dairy, pastillas, and regional fruits with modern flair.",
      tag: "Plated Pastry",
      accent: "text-basil",
      border: "hover:border-basil/50",
    },
  ]

  return (
    <Section
      id="culinary-cup"
      index="03"
      label="Premier Regional Championship"
      title="One Pampanga Culinary Cup"
      action={
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow border border-marigold/40 bg-marigold/10 px-3.5 py-1.5 text-marigold">
            Sept 16–17, 2026
          </span>
          <span className="eyebrow border border-white/20 bg-white/5 px-3.5 py-1.5 text-white/80">
            SM City Clark The Event Centre
          </span>
        </div>
      }
    >
      <div className="space-y-10">
        {/* OPCC Hero Identity Showcase */}
        <div className="border border-white/15 bg-linear-to-br from-grape-900 via-grape-950 to-grape-900 p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow behind the Logo */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-tangerine/15 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left: Full-Space Hero Logo & Badges */}
            <div className="flex flex-col items-start lg:col-span-5 space-y-6">
              <div className="w-full flex items-center justify-start py-2">
                <img
                  src="/opcc-logo.webp"
                  alt="One Pampanga Culinary Cup (OPCC)"
                  className="h-46 sm:h-58 md:h-66 w-auto max-w-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-102"
                />
              </div>

              {/* Badges positioned neatly below */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="border border-chili/40 bg-chili/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-chili">
                  Official Battle Arena
                </span>
                <span className="border border-basil/40 bg-basil/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-basil">
                  8 Live Categories
                </span>
                <span className="border border-marigold/40 bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-marigold">
                  Mall Public Viewing
                </span>
              </div>
            </div>

            {/* Right: Narrative & Venue Spotlight */}
            <div className="space-y-5 lg:col-span-7 lg:border-l lg:border-white/15 lg:pl-10">
              <div className="eyebrow text-tangerine">The Inaugural Showdown</div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight">
                &ldquo;Make your mark at the first-ever One Pampanga Culinary Cup.&rdquo;
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/75">
                Central Luzon&apos;s ultimate culinary tournament brings together professional master chefs,
                hoteliers, and rising student culinary artists in live kitchen arenas.
                Experience real-time culinary battles, sensory judging, and the ceremonial unveiling of the Giant Ube Kakanin.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/12 text-xs">
                <div>
                  <div className="font-bold text-white">SM City Clark · The Event Centre</div>
                  <div className="text-white/50">Ground Level (In front of Food Court)</div>
                </div>
                <div className="flex items-center gap-2 font-bold text-basil">
                  <span className="h-2.5 w-2.5 rounded-full bg-basil animate-pulse" />
                  Free Public Spectator Admission
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Competition Categories Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-display text-lg font-bold text-white/90">
              8 Official Competition Categories
            </h4>
            <span className="eyebrow text-white/40">Live Arenas &amp; Showpieces</span>
          </div>

          <div className="grid border-t border-l border-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <div
                key={c.id}
                className={`group flex flex-col justify-between border-b border-r border-white/12 bg-grape-950/40 p-6 transition-all duration-200 hover:bg-white/3 ${c.border}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-2xl font-black ${c.accent}`}>
                      {c.id}
                    </span>
                    <span className="border border-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                      {c.tag}
                    </span>
                  </div>
                  <h5 className="mt-4 font-display text-base font-bold leading-snug text-white">
                    {c.name}
                  </h5>
                  <p className="mt-2.5 text-xs leading-relaxed text-white/60">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                  <span>Official Category</span>
                  <span className="text-white/25 font-mono">OPCC · 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}