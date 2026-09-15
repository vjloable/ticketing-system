import { Section } from "./Section"

export function FoodForwardForumSection() {
  const pillars = [
    {
      no: "01",
      name: "Security",
      accent: "text-basil",
      desc: "Strengthening food security, resilient local supply chains, and localized farm-to-kitchen continuity.",
    },
    {
      no: "02",
      name: "Sustainability",
      accent: "text-lime",
      desc: "Advancing zero-waste practices, eco-packaging, and regenerative agriculture across the foodservice sector.",
    },
    {
      no: "03",
      name: "Technology",
      accent: "text-tangerine",
      desc: "Harnessing smart kitchen automation, AgTech, cold-chain modernization, and digitized operations.",
    },
    {
      no: "04",
      name: "Investment",
      accent: "text-marigold",
      desc: "Unlocking culinary capital, MSME enterprise incubation, and investment infrastructure for food brands.",
    },
    {
      no: "05",
      name: "Tourism",
      accent: "text-chili",
      desc: "Expanding gastro-tourism, preserving culinary heritage, and cementing Pampanga as the Culinary Capital of the Philippines.",
    },
  ]

  const speakers = [
    {
      name: "Pruds Garcia",
      role: "President & CEO",
      organization: "Mekeni Food Corporation",
      topic: "Pioneering Philippine Meat Processing & Global Scale",
      accent: "border-tangerine/40 text-tangerine",
    },
    {
      name: "Jun Sy",
      role: "President & CEO",
      organization: "Tao Corporation",
      topic: "Supply Chain Resilience & National Food Distribution",
      accent: "border-marigold/40 text-marigold",
    },
    {
      name: "Mark Villaflor",
      role: "Founding Partner & Restaurateur",
      organization: "Villaflor Hospitality Group",
      topic: "Next-Generation Culinary Branding & Hospitality Innovation",
      accent: "border-basil/40 text-basil",
    },
    {
      name: "Dr. Richard Daenos",
      role: "Regional Director",
      organization: "Department of Tourism — Region III",
      topic: "Central Luzon Gastro-Tourism & Cultural Heritage Integration",
      accent: "border-lime/40 text-lime",
    },
    {
      name: "Usec. Arrey Perez",
      role: "President & CEO / Undersecretary",
      organization: "Clark International Airport Corp (CIAC)",
      topic: "Clark Food Hub & World-Class Regional Logistics Infrastructure",
      accent: "border-chili/40 text-chili",
    },
    {
      name: "Felix Niño Asuncion",
      role: "Executive Director",
      organization: "Heritage & Agricultural Development Initiative",
      topic: "From Soil to Community: Empowering Agrarian Producers",
      accent: "border-marigold/40 text-marigold",
    },
  ]

  return (
    <Section
      id="food-forward-forum"
      index="04"
      label="Leadership Conference"
      title="Food Forward Forum 2026"
      action={
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow border border-tangerine/30 bg-tangerine/10 px-3.5 py-1.5 text-tangerine">
            Sept 19 · 2:00 PM – 5:00 PM
          </span>
          <span className="eyebrow border border-white/20 bg-white/5 px-3.5 py-1.5 text-white/70">
            Meeting Room 1, SMX Clark
          </span>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Summit Intro Banner */}
        <div className="border border-white/12 bg-grape-900/50 p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-tangerine animate-ping" />
              <span className="eyebrow text-tangerine">
                Co-Presented by Pampanga Business Circle
              </span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white/50 font-mono">
              Theme: &ldquo;From Farm to Business to Community&rdquo;
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
                Shaping the Next Decade of Philippine Food &amp; Beverage
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                The Food Forward Forum convenes leading industrialists, policy makers, agricultural innovators,
                and creative restaurateurs. Together, we analyze high-impact opportunities across supply security,
                sustainable gastronomy, food-tech infrastructure, and Pampanga&apos;s positioning as a global culinary beacon.
              </p>
            </div>
            <div className="flex flex-col justify-center border-t border-white/12 pt-4 md:col-span-4 md:border-t-0 md:border-l md:pl-8 md:pt-0">
              <div className="eyebrow text-marigold">Summit Logistics</div>
              <div className="mt-1 text-sm font-bold text-white">Saturday, September 19, 2026</div>
              <div className="mt-0.5 text-xs text-white/60">2:00 PM – 5:00 PM PST</div>
              <div className="mt-2 text-xs text-white/80">Meeting Room 1 · SMX Clark</div>
              <div className="mt-3 inline-block">
                <span className="inline-block border border-basil/40 bg-basil/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-basil">
                  Access: VIP, Sponsor &amp; Forum Delegates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Framework Pillars */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-display text-lg font-bold text-white">
              The 5 Core Framework Pillars
            </h4>
            <span className="eyebrow text-white/40">Strategic Blueprint</span>
          </div>

          <div className="grid border-t border-l border-white/12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p) => (
              <div
                key={p.no}
                className="border-b border-r border-white/12 bg-grape-950/60 p-5 transition-colors hover:bg-white/3"
              >
                <div className={`font-display text-xl font-black ${p.accent}`}>
                  {p.no}
                </div>
                <div className="mt-2 font-display text-base font-bold text-white">
                  {p.name}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Keynote Speakers */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                Distinguished Keynote Speakers &amp; Panelists
              </h4>
              <p className="text-xs text-white/50">
                Industry titans, government leaders, and transformative culinary pioneers
              </p>
            </div>
            <span className="eyebrow text-marigold hidden sm:inline-block">6 Visionary Voices</span>
          </div>

          <div className="grid border-t border-l border-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((s) => (
              <div
                key={s.name}
                className="group border-b border-r border-white/12 bg-grape-900/40 p-6 transition-all hover:bg-grape-900/80"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center border font-display text-xs font-black ${s.accent} bg-white/5`}>
                    {s.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h5 className="font-display text-base font-bold text-white group-hover:text-marigold transition-colors">
                      {s.name}
                    </h5>
                    <div className="text-[11px] font-semibold text-white/70">
                      {s.role}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs font-medium text-marigold/90">
                  {s.organization}
                </div>

                <div className="mt-4 border-t border-white/8 pt-3">
                  <div className="eyebrow text-[9px] text-white/40">Session Topic</div>
                  <p className="mt-1 text-xs italic text-white/65 leading-snug">
                    &ldquo;{s.topic}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}