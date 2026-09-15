"use client"

import { useState } from "react"
import { Section } from "./Section"

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<"all" | "opcc" | "tour" | "day1" | "day2">("all")

  const scheduleData = [
    {
      id: "opcc",
      dayTag: "Sept 16–17",
      weekday: "Wednesday – Thursday",
      title: "One Pampanga Culinary Cup (OPCC)",
      venue: "The Event Centre, SM City Clark",
      badge: "Culinary Cup",
      accent: "text-marigold",
      border: "border-marigold",
      badgeClass: "border-marigold/40 bg-marigold/10 text-marigold",
      items: [
        { time: "08:00 AM", title: "Competitor Stations Briefing & Kitchen Setup", highlight: false },
        { time: "09:00 AM", title: "Grand Opening Ceremony & Judges' Swearing-In", highlight: true },
        { time: "10:00 AM", title: "Morning Arena: Modern Kapampangan Cuisine & Creative Breakfast", highlight: false },
        { time: "11:30 AM", title: "Young Chef Challenge & Quick Fire Pasta Arena", highlight: true },
        { time: "01:30 PM", title: "Afternoon Arena: Modern Filipino Kakanin & Dress the Cake", highlight: false },
        { time: "03:30 PM", title: "Celebration Cakes Showpieces & Modern Plated Desserts", highlight: true },
        { time: "05:30 PM", title: "Live Sensory Tasting & Daily Judges' Deliberation", highlight: false },
      ],
    },
    {
      id: "tour",
      dayTag: "Sept 18",
      weekday: "Friday",
      title: "OPFBEX Culinary & Familiarization Tour",
      venue: "Angeles Heritage District & Clark Freeport Zone",
      badge: "Culinary Tour",
      accent: "text-tangerine",
      border: "border-tangerine",
      badgeClass: "border-tangerine/40 bg-tangerine/10 text-tangerine",
      items: [
        { time: "08:00 AM", title: "Delegates Assembly & Tour Briefing", highlight: false },
        { time: "10:00 AM", title: "Angeles Heritage Walking Tour: Plaza Angel, Pamintuan Mansion, Holy Rosary Parish & Museu Ning Angeles", highlight: true },
        { time: "12:00 PM", title: "The Culinarium: Traditional Kapampangan Cooking Demo, Lunch & Kulitan", highlight: true },
        { time: "02:00 PM", title: "Clark Freeport Zone Welcome & Photo Opportunity at Clark Visitor’s Center", highlight: false },
        { time: "02:15 PM", title: "Clark Museum Tour & Immersive 4D Theater Experience", highlight: false },
        { time: "03:00 PM", title: "Clark Rolling Tour: Historic Barn Houses, Centennial Mansions, Sun Valley & Aqua Planet", highlight: false },
        { time: "03:30 PM", title: "Clark International Airport & Deco Central Design Showroom Visit", highlight: false },
        { time: "04:30 PM", title: "Official Delegation Drop-off at SMX Convention Center Clark", highlight: false },
      ]
    },
    {
      id: "day1",
      dayTag: "Sept 19",
      weekday: "Saturday",
      title: "OPFBEX 2026 Day 1 & Food Forward Forum",
      venue: "SMX Convention Center, Clark",
      badge: "Expo Day 1 + Forum",
      accent: "text-basil",
      border: "border-basil",
      badgeClass: "border-basil/40 bg-basil/10 text-basil",
      items: [
        { time: "08:30 AM", title: "VIP Ribbon Cutting Ceremony & Executive Welcome", highlight: true },
        { time: "10:00 AM", title: "Public Expo Opens: 100+ Booths, Tastings & Brand Activations", highlight: false },
        { time: "11:30 AM", title: "Live Cooking Stage: Master Chef Demonstrations", highlight: false },
        { time: "02:00 PM", title: "Food Forward Forum 2026: 'From Farm to Business to Community' (Meeting Room 1)", highlight: true },
        { time: "04:00 PM", title: "Craft Beverage & Artisan Coffee Cupping Sessions", highlight: false },
        { time: "05:30 PM", title: "Sunset Networking Lounge & Producer Tastings", highlight: false },
        { time: "07:00 PM", title: "Expo Hall Day 1 Closes", highlight: false },
      ],
    },
    {
      id: "day2",
      dayTag: "Sept 20",
      weekday: "Sunday",
      title: "OPFBEX Day 2: BNI Business Talks & Awards",
      venue: "SMX Convention Center, Clark",
      badge: "Expo Day 2 + Talks",
      accent: "text-tangerine",
      border: "border-tangerine",
      badgeClass: "border-tangerine/40 bg-tangerine/10 text-tangerine",
      items: [
        { time: "10:00 AM", title: "Expo Doors Open: Artisan Marketplace, Gourmet Hall & Live Chef Showcases", highlight: false },
        { time: "01:00 PM", title: "BNI Business Talk 1: 'Your Money has an Expiration Date' — Mr. Paolo Alcera (FWD)", highlight: true },
        { time: "02:15 PM", title: "BNI Business Talk 2: 'Recipe for Compliance: Environmental Risks' — Engr. Joanna Marie Martinez", highlight: true },
        { time: "03:30 PM", title: "BNI Business Talk 3: 'From Kitchen to Cash: 7 Hidden Profit Leaks' — Mr. John Arthur Barrera", highlight: true },
        { time: "04:30 PM", title: "Official OPFBEX & OPCC 2026 Grand Awards Ceremony", highlight: true },
        { time: "06:30 PM", title: "Closing Grand Tasting, Fellowship & Celebration", highlight: false },
        { time: "07:00 PM", title: "OPFBEX 2026 Grand Finale Conclusion", highlight: false },
      ],
    },
  ]

  const displayedDays =
    activeDay === "all"
      ? scheduleData
      : scheduleData.filter((d) => d.id === activeDay)

  return (
    <Section
      id="schedule"
      index="06"
      label="Official Program"
      title="The Official 5-Day Timeline"
      action={
        <span className="eyebrow text-white/50">
          Sept 16–17 (SM City Clark) · Sept 18 (Culinary Tour) · Sept 19–20 (SMX Clark)
        </span>
      }
    >
      <div className="space-y-8">
        {/* Interactive Tabbed Day Selector */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/12 pb-6">
          <button
            type="button"
            onClick={() => setActiveDay("all")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "all"
                ? "border border-marigold bg-marigold text-grape-950 font-extrabold shadow-sm"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            All Days Timeline
          </button>
          <button
            type="button"
            onClick={() => setActiveDay("opcc")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "opcc"
                ? "border border-marigold bg-marigold text-grape-950 font-extrabold shadow-sm"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            Sept 16–17 · OPCC (SM City Clark)
          </button>
          <button
            type="button"
            onClick={() => setActiveDay("tour")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "tour"
                ? "border border-tangerine bg-tangerine text-grape-950 font-extrabold shadow-sm"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            Sept 18 (Fri) · Culinary Tour
          </button>
          <button
            type="button"
            onClick={() => setActiveDay("day1")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "day1"
                ? "border border-basil bg-basil text-grape-950 font-extrabold shadow-sm"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            Sept 19 (Sat) · Day 1 &amp; Forum (SMX)
          </button>
          <button
            type="button"
            onClick={() => setActiveDay("day2")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "day2"
                ? "border border-tangerine bg-tangerine text-grape-950 font-extrabold shadow-sm"
                : "border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            Sept 20 (Sun) · Day 2 &amp; Awards (SMX)
          </button>
        </div>

        {/* Schedule Cards Grid */}
        <div
          className={`grid gap-6 ${
            activeDay === "all" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {displayedDays.map((d) => (
            <div
              key={d.id}
              className={`flex flex-col border border-white/12 bg-grape-950 p-6 md:p-8 transition-colors ${
                activeDay !== "all" ? "mx-auto w-full max-w-3xl" : ""
              }`}
            >
              {/* Card Header */}
              <div className="border-b border-white/12 pb-5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`eyebrow border px-2 py-0.5 ${d.badgeClass}`}>
                    {d.badge}
                  </span>
                  <span className="eyebrow text-white/40">{d.weekday}</span>
                </div>
                <h3 className={`mt-3 font-display text-3xl font-black tracking-tight ${d.accent}`}>
                  {d.dayTag}
                </h3>
                <div className="mt-1 font-display text-base font-bold text-white">
                  {d.title}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
                  <span className="text-marigold">📍</span>
                  <span>{d.venue}</span>
                </div>
              </div>

              {/* Card Timeline Items */}
              <ul className="mt-4 divide-y divide-white/10">
                {d.items.map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex gap-4 py-3.5 transition-colors ${
                      item.highlight ? "bg-white/3 -mx-2 px-2 border-l-2 " + d.border : ""
                    }`}
                  >
                    <span className="font-display text-xs font-bold tabular-nums text-white/45 w-20 shrink-0 pt-0.5">
                      {item.time}
                    </span>
                    <span
                      className={`text-xs leading-relaxed ${
                        item.highlight ? "text-white font-semibold" : "text-white/80"
                      }`}
                    >
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}