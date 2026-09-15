import { Section } from "./Section"

export function HighlightsSection() {
  const cards = [
    { no: "A", title: "Live Cooking Stage", desc: "Celebrity chefs and rising talents battle in real time." },
    { no: "B", title: "Craft Beverage Hall", desc: "Local coffee, tea, and artisan drinks by the pour." },
    { no: "C", title: "Marketplace", desc: "Buy direct from producers — sauces, snacks, specialty goods." },
    { no: "D", title: "Chef Talks", desc: "Sessions on food trends, business, and craft." },
    { no: "E", title: "Culinary Awards", desc: "Celebrating the best flavors and vendors of the region." },
    { no: "F", title: "Food & Music", desc: "Good eats paired with live performances all weekend." },
  ]

  return (
    <Section id="highlights" index="02" label="The Program" title="Four days, endless flavor">
      <div className="grid border-t border-l border-white/12 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="group border-b border-r border-white/12 p-7 transition-colors hover:bg-white/4"
          >
            <div className="font-display text-sm font-bold text-marigold">{c.no}</div>
            <h3 className="mt-6 font-display text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{c.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}