import Link from "next/link"

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerPassesSection />
      <Marquee />
      <About />
      <Highlights />
      <Exhibitors />
      <Schedule />
      <Venue />
      <CtaBanner />
    </>
  )
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="border-b border-white/12 bg-grape-900">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid border-x border-white/12 md:grid-cols-12">
          {/* Left: type */}
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
              Central Luzon&apos;s premier culinary expo returns — two days of
              tastings, live cooking, and the region&apos;s best food &amp;
              beverage brands under one roof.
            </p>

            {/* Visitor CTA Prioritized */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register/visitor"
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
            </div>
          </div>

          {/* Right: fact stack */}
          <div className="flex flex-col md:col-span-4">
            <Fact label="Dates" value="19–20" sub="September 2026" accent="text-basil" />
            <Fact label="Venue" value="SMX" sub="Clark, Pampanga" accent="text-tangerine" border />
            <Fact label="Pass Types" value="3" sub="Visitor · Exhibitor · Sponsor" accent="text-marigold" border />
          </div>
        </div>
      </div>
    </section>
  )
}

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

/* ---------------- EXHIBITOR & SPONSOR SECTION ---------------- */
function PartnerPassesSection() {
  return (
    <section id="partner-passes" className="border-b border-white/12 bg-grape-950">
      <div className="mx-auto max-w-6xl border-x border-white/12 px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-6">
          <div>
            <div className="eyebrow text-marigold">Partner Opportunities</div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Join as an Exhibitor or Sponsor
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60">
            Showcase your culinary brand or partner with Central Luzon&apos;s fastest-growing food &amp; beverage expo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Exhibitor Card */}
          <div className="flex flex-col justify-between border border-white/12 bg-grape-900/60 p-8 transition-all hover:border-basil/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-basil">Exhibitor Registration</span>
                <span className="border border-basil/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-basil">
                  Booths Available
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">Exhibit Your Brand</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Put your products directly in front of 10,000+ hungry foodies, restaurateurs, distributors, and buyers.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <span className="text-basil">✓</span> Prime floor booth placement
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-basil">✓</span> Official OPFBEX directory listing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-basil">✓</span> Exhibitor pass badges for staff
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/register/exhibitor"
                className="inline-block w-full border border-basil bg-basil py-3 text-center text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-basil"
              >
                Register as Exhibitor →
              </Link>
            </div>
          </div>

          {/* Sponsor Card */}
          <div className="flex flex-col justify-between border border-white/12 bg-grape-900/60 p-8 transition-all hover:border-tangerine/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-tangerine">Sponsorship Program</span>
                <span className="border border-tangerine/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tangerine">
                  Custom Packages
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">Become an Official Sponsor</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Elevate your brand presence across main stage activations, digital banners, VIP lounges, and media coverage.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <span className="text-tangerine">✓</span> Premium stage &amp; hall branding
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-tangerine">✓</span> VIP access passes &amp; lounge privileges
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-tangerine">✓</span> Co-branded marketing campaigns
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/register/sponsor"
                className="inline-block w-full border border-tangerine bg-tangerine py-3 text-center text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-tangerine"
              >
                Register as Sponsor →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "LIVE COOKING", "ARTISAN COFFEE", "STREET EATS", "CRAFT DRINKS",
    "PASTRY LAB", "CHEF TALKS", "FARM TO TABLE", "SWEET TREATS",
  ]
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-b border-white/12 bg-marigold py-3">
      <div className="animate-marquee flex w-max gap-6 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-sm font-black uppercase tracking-[0.2em] text-grape-950"
          >
            {t} <span className="mx-2 text-grape-950/40">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- section shell ---------------- */
function Section({
  id,
  index,
  label,
  title,
  children,
  action,
}: {
  id?: string
  index: string
  label: string
  title: React.ReactNode
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section id={id} className="border-b border-white/12">
      <div className="mx-auto max-w-6xl border-x border-white/12 px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-6">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-white/30">{index}</span>
            <div>
              <div className="eyebrow text-marigold">{label}</div>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {title}
              </h2>
            </div>
          </div>
          {action}
        </div>
        <div className="pt-10">{children}</div>
      </div>
    </section>
  )
}

/* ---------------- ABOUT ---------------- */
function About() {
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
            ["2", "Flavor-Packed Days"],
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

/* ---------------- HIGHLIGHTS ---------------- */
function Highlights() {
  const cards = [
    { no: "A", title: "Live Cooking Stage", desc: "Celebrity chefs and rising talents battle in real time." },
    { no: "B", title: "Craft Beverage Hall", desc: "Local coffee, tea, and artisan drinks by the pour." },
    { no: "C", title: "Marketplace", desc: "Buy direct from producers — sauces, snacks, specialty goods." },
    { no: "D", title: "Chef Talks", desc: "Sessions on food trends, business, and craft." },
    { no: "E", title: "Culinary Awards", desc: "Celebrating the best flavors and vendors of the region." },
    { no: "F", title: "Food & Music", desc: "Good eats paired with live performances all weekend." },
  ]
  return (
    <Section id="highlights" index="02" label="The Program" title="Two days, endless flavor">
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

/* ---------------- EXHIBITORS ---------------- */
function Exhibitors() {
  const brands = [
    "Miguelito's Ice Cream", "Kapampangan Kitchen", "Brew & Co.", "Sizzle House",
    "Sweet Escape", "Farm Fresh PH", "The Pasta Bar", "Golden Crust",
    "Herb & Spice", "Cocoa Republic", "Street Feast", "Zesty Bites",
  ]
  return (
    <Section
      id="exhibitors"
      index="03"
      label="Exhibitors"
      title="Brands you'll love"
      action={
        <Link
          href="/register/exhibitor"
          className="eyebrow border border-white/25 px-5 py-2.5 text-white transition-colors hover:border-white"
        >
          Become an Exhibitor →
        </Link>
      }
    >
      <div className="grid border-t border-l border-white/12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (
          <div
            key={b}
            className="grid h-28 place-items-center border-b border-r border-white/12 p-4 text-center transition-colors hover:bg-white/4"
          >
            <span className="font-display text-base font-bold text-white/70">{b}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- SCHEDULE ---------------- */
function Schedule() {
  const days = [
    {
      day: "Day 01", date: "Fri · Sept 19", accent: "text-basil",
      items: [
        ["10:00", "Grand Opening & Ribbon Cutting"],
        ["12:00", "Live Cooking Showdown — Round 1"],
        ["15:00", "Chef Talk: The Future of Filipino Food"],
        ["18:00", "Sunset Sessions — Food & Music"],
      ],
    },
    {
      day: "Day 02", date: "Sat · Sept 20", accent: "text-tangerine",
      items: [
        ["10:00", "Artisan Market Opens"],
        ["13:00", "Pastry Lab Masterclass"],
        ["16:00", "Culinary Awards Ceremony"],
        ["19:00", "Closing Feast & Celebration"],
      ],
    },
  ]
  return (
    <Section id="schedule" index="04" label="Schedule" title="Plan your two days">
      <div className="grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">
        {days.map((d) => (
          <div key={d.day} className="bg-grape-950 p-8">
            <div className="flex items-baseline justify-between border-b border-white/12 pb-4">
              <h3 className={`font-display text-2xl font-extrabold tracking-tight ${d.accent}`}>
                {d.day}
              </h3>
              <span className="eyebrow text-white/45">{d.date}</span>
            </div>
            <ul className="mt-2 divide-y divide-white/10">
              {d.items.map(([time, title]) => (
                <li key={title} className="flex gap-6 py-4">
                  <span className="font-display text-sm font-bold tabular-nums text-white/45">
                    {time}
                  </span>
                  <span className="text-sm text-white/85">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- VENUE ---------------- */
function Venue() {
  return (
    <Section id="venue" index="05" label="The Venue" title="SMX Convention Center, Clark">
      <div className="grid border border-white/12 md:grid-cols-2">
        <div className="border-b border-white/12 bg-grape-900 p-10 md:border-b-0 md:border-r">
          <div className="eyebrow text-white/40">Location</div>
          <div className="mt-4 font-display text-3xl font-extrabold tracking-tight">SMX Clark</div>
          <div className="mt-1 text-white/55">Clark Freeport Zone, Pampanga</div>
          <div className="mt-8 h-px w-full bg-white/12" />
          <p className="mt-8 max-w-md leading-relaxed text-white/70">
            A world-class venue at the heart of Central Luzon — spacious,
            accessible, and built for an unforgettable expo experience.
          </p>
        </div>
        <ul className="divide-y divide-white/12">
          {[
            ["Parking", "Free parking for all attendees"],
            ["Comfort", "Fully air-conditioned exhibition halls"],
            ["Access", "Minutes from Clark International Airport"],
            ["Inclusive", "Accessible facilities throughout"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center gap-6 px-8 py-6">
              <span className="w-20 shrink-0 eyebrow text-basil">{k}</span>
              <span className="text-white/75">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* ---------------- CTA BANNER ---------------- */
function CtaBanner() {
  return (
    <section className="border-b border-white/12 bg-chili">
      <div className="mx-auto max-w-6xl border-x border-grape-950/20 px-6 py-20 text-center">
        <div className="eyebrow text-grape-950/60">Two days only</div>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-black tracking-tight text-grape-950 sm:text-6xl">
          Come hungry. Leave inspired.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-grape-950/70">
          Secure your visitor pass for Central Luzon&apos;s tastiest weekend of the year.
        </p>
        <Link
          href="/register/visitor"
          className="mt-9 inline-block border border-grape-950 bg-grape-950 px-9 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-transparent hover:text-grape-950"
        >
          Register as Visitor →
        </Link>
      </div>
    </section>
  )
}