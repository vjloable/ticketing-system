import { Section } from "./Section"

export function HighlightsSection() {
  const cards = [
    {
      no: "01",
      title: "One Pampanga Culinary Cup",
      desc: "Central Luzon’s top chefs and student talents battle across 8 live culinary and pastry arenas at SM City Clark.",
      badge: "Sept 16–17",
      accent: "text-marigold",
    },
    {
      no: "02",
      title: "OPFBEX Culinary Tour",
      desc: "An exclusive culinary journey across Angeles City's heritage district and the vibrant Clark Freeport Zone tasting trail.",
      badge: "Sept 18 · Tour",
      accent: "text-tangerine",
    },
    {
      no: "03",
      title: "Food Forward Forum & BNI Talks",
      desc: "Back-to-back industry summits on food security, sustainability, and high-impact business growth strategies.",
      badge: "Sept 19–20 · SMX",
      accent: "text-basil",
    },
    {
      no: "04",
      title: "Exhibitor Tasting Pavilions",
      desc: "Explore 100+ booths featuring meat purveyors, coffee roasters, pastry labs, kitchen automation, and local goods.",
      badge: "Marketplace",
      accent: "text-lime",
    },
    {
      no: "05",
      title: "Live Chef Masterclasses",
      desc: "Interactive demonstrations and sensory tastings with celebrity master chefs and regional culinary legends.",
      badge: "Masterclasses",
      accent: "text-chili",
    },
    {
      no: "06",
      title: "Grand Awards & Fellowship",
      desc: "Recognizing outstanding exhibitors, culinary cup champions, and crowning Central Luzon’s best flavors.",
      badge: "Grand Finale",
      accent: "text-marigold",
    },
  ]

  return (
    <Section id="highlights" index="02" label="The Program" title="Five days, endless flavor">
      <div className="grid border-t border-l border-white/12 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="group flex flex-col justify-between border-b border-r border-white/12 p-7 transition-colors hover:bg-white/4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`font-display text-base font-black ${c.accent}`}>{c.no}</span>
                <span className="border border-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/50">
                  {c.badge}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white group-hover:text-marigold transition-colors">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{c.desc}</p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-white/30 font-mono">
              OPFBEX 2026 FEATURE
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}