import { Section } from "./Section"

export function FoodForwardForumSection() {
  const pillars = [
    {
      no: "01",
      name: "Food Security",
      question: "Can we feed our people?",
      accent: "text-basil",
      desc: "Strengthening food security, resilient local supply chains, and localized farm-to-kitchen continuity.",
    },
    {
      no: "02",
      name: "Food Sustainability",
      question: "Can we sustain our food systems for generations?",
      accent: "text-lime",
      desc: "Advancing zero-waste practices, eco-packaging, and regenerative agriculture across the foodservice sector.",
    },
    {
      no: "03",
      name: "Food Technology",
      question: "Can we innovate how food is produced, moved, and consumed?",
      accent: "text-tangerine",
      desc: "Harnessing smart kitchen automation, AgTech, cold-chain modernization, and digitized operations.",
    },
    {
      no: "04",
      name: "Food Investment",
      question: "Can we build businesses and attract capital to make it all happen?",
      accent: "text-marigold",
      desc: "Unlocking culinary capital, MSME enterprise incubation, and investment infrastructure for food brands.",
    },
    {
      no: "05",
      name: "Food Tourism",
      question: "Can food become a driver of destination, culture, and growth?",
      accent: "text-chili",
      desc: "Expanding gastro-tourism, preserving culinary heritage, and cementing Pampanga as a culinary beacon.",
    },
  ]

  const speakers = [
    {
      name: "Pruds Garcia",
      role: "President",
      organization: "Mekeni Food Corporation",
      topic: "Building Filipino Food Brands for the Future",
      accent: "border-tangerine/40 text-tangerine",
    },
    {
      name: "Jun Sy",
      role: "President",
      organization: "TAO Corporation",
      topic: "Scaling Filipino Businesses: From Local to Bigger Markets",
      accent: "border-marigold/40 text-marigold",
    },
    {
      name: "Mark Villaflor",
      role: "President",
      organization: "DARA Consulting",
      topic: "Innovation, Technology & the Future of Business",
      accent: "border-basil/40 text-basil",
    },
    {
      name: "Dr. Richard Daenos",
      role: "Regional Director",
      organization: "Department of Tourism — Region III",
      topic: "Food, Destinations & the Tourism Economy",
      accent: "border-lime/40 text-lime",
    },
    {
      name: "Usec. Arrey Perez",
      role: "Undersecretary",
      organization: "Department of Agriculture",
      topic: "Agriculture, Food Security & Future of Philippine Food",
      accent: "border-chili/40 text-chili",
    },
    {
      name: "Felix Niño Asuncion",
      role: "President & Fellowship Director",
      organization: "AF Ventures Inc. · Pampanga Business Circle",
      topic: "The Entrepreneur’s Role in Building What’s Next",
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
                {/* Executive Summit Spotlight (Harmonized Dark Brutalist Showcase) */}
        <div className="border border-white/15 bg-linear-to-br from-grape-900 via-grape-950 to-grape-900 p-8 sm:p-12 relative overflow-hidden text-white">
          {/* Subtle Ambient Brand Glows (Emerald & Marigold) */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-600/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-marigold/15 blur-3xl" />

          {/* Header Row */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="eyebrow text-white font-black tracking-wider">
                Co-Presented by Pampanga Business Circle
              </span>
            </div>
            <div className="text-xs uppercase tracking-widest text-marigold/80 font-mono font-bold">
              Theme: &ldquo;From Farm to Business to Community&rdquo;
            </div>
          </div>

          <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left: Architectural White Canvas for Logo Legibility + Badges */}
            <div className="lg:col-span-5 flex flex-col items-start space-y-6">
              <div className="relative w-full rounded-sm bg-linear-to-b from-white via-white to-neutral-50 p-6 sm:p-8 shadow-2xl ring-1 ring-white/30 flex items-center justify-center overflow-hidden group">
                {/* Emerald/Gold Top Accent Ribbon */}
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-emerald-600 via-marigold to-emerald-600" />
                
                <img
                  src="/food-forward-forum-logo.webp"
                  alt="Food Forward Forum 2026"
                  className="h-28 sm:h-36 md:h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Badges just below the logo canvas */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Thought Leadership
                </span>
                <span className="border border-marigold/40 bg-marigold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-marigold">
                  AgTech &amp; Gastro-Tourism
                </span>
                <span className="border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/70">
                  Executive Summit
                </span>
              </div>
            </div>

            {/* Right: Overview, Narrative & Delegates */}
            <div className="lg:col-span-7 lg:border-l lg:border-white/15 lg:pl-10 space-y-5">
              <div className="eyebrow text-emerald-400">The Premier Industry Dialogue</div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight">
                Shaping the Future of Food &amp; Beverage
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/75 font-normal">
                The Food Forward Forum convenes leading industrialists, policy makers, agricultural innovators,
                and restaurateurs. Together, we analyze high-impact strategies across supply security,
                sustainable gastronomy, food-tech infrastructure, and Pampanga&apos;s global positioning.
              </p>

              <div className="pt-3 border-t border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold">
                <div>
                  <span className="block text-white font-bold text-sm">Saturday, Sept 19, 2026 · 2:00 PM – 5:00 PM</span>
                  <span className="text-white/60">Meeting Room 1, SMX Convention Center Clark</span>
                </div>
                <div className="border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 px-3.5 py-1.5 font-bold uppercase tracking-wider text-xs">
                  VIP, Sponsor &amp; Forum Delegates
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Framework Pillars */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                Food Forward Framework
              </h4>
              <p className="text-xs text-white/50">
                Farm → Food → Business → Innovation → Destination → Community
              </p>
            </div>
            <span className="eyebrow text-white/40">5 Pillars</span>
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
                <div className="mt-1 text-[11px] italic text-marigold/80 font-medium">
                  {p.question}
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-white/60">
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
                  <div className="eyebrow text-[9px] text-white/40">Program Topic</div>
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