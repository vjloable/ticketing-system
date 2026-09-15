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
      label="Premier Regional Showdown"
      title="One Pampanga Culinary Cup (OPCC)"
      action={
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow border border-marigold/30 bg-marigold/10 px-3.5 py-1.5 text-marigold">
            Sept 16–17, 2026
          </span>
          <span className="eyebrow border border-white/20 bg-white/5 px-3.5 py-1.5 text-white/70">
            SM City Clark The Event Centre
          </span>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Intro & Venue Banner */}
        <div className="grid gap-6 border border-white/12 bg-grape-900/60 p-6 md:grid-cols-12 md:p-8">
          <div className="space-y-3 md:col-span-8">
            <div className="eyebrow text-marigold">The Stage Is Set</div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Central Luzon&apos;s Highest Culinary Honor
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/75">
              The One Pampanga Culinary Cup (OPCC) gathers top professional chefs, hoteliers,
              and junior culinary students in an intense, live two-day gastronomic championship.
              Witness kitchen arena battles, sensory judging, and cutting-edge regional mastery.
            </p>
          </div>
          <div className="flex flex-col justify-between border-t border-white/12 pt-4 md:col-span-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
            <div>
              <div className="eyebrow text-white/45">Venue Spotlight</div>
              <div className="mt-1 font-display text-lg font-bold text-white">SM City Clark</div>
              <div className="text-xs text-marigold">The Event Centre · Mall Ground Level</div>
              <p className="mt-2 text-xs text-white/60 leading-normal">
                360-degree open viewing layout for mallgoers, cheering squads, and food aficionados.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-basil">
              <span className="h-2 w-2 rounded-full bg-basil animate-pulse" />
              Free Public Spectator Viewing
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