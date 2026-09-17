import { Section } from "./Section"

export function VenueSection() {
  return (
    <Section id="venue" index="07" label="The Venues" title="10+ Venues & Landmarks Across Angeles & Clark">
      <div className="grid border border-white/12 lg:grid-cols-3">
        {/* Hub 1: SM City Clark */}
        <div className="border-b border-white/12 bg-grape-900/40 p-7 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-marigold">Culinary Cup Arena</span>
            <span className="text-xs text-white/45 font-mono">Sept 16–17</span>
          </div>
          <div className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
            SM City Clark
          </div>
          <div className="mt-1 text-xs text-white/55">The Event Centre · Ground Level, Angeles City</div>
          <div className="mt-5 h-px w-full bg-white/12" />
          <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/70">
            The vibrant public arena for the <strong className="text-white">One Pampanga Culinary Cup (OPCC)</strong>.
            Open 360-degree viewing allows spectators to witness 8 live chef, barista, and pastry showdowns.
          </p>
          <ul className="mt-6 space-y-2 text-xs text-white/60">
            <li className="flex items-center gap-2">
              <span className="text-marigold">✓</span> Free public viewing &amp; open bleachers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-marigold">✓</span> Direct mall connectivity &amp; food court hub
            </li>
            <li className="flex items-center gap-2">
              <span className="text-marigold">✓</span> Multi-angle live video broadcast screens
            </li>
          </ul>
        </div>

        {/* Hub 2: Official Culinary Tour Trail (Sept 18) */}
        <div className="border-b border-white/12 bg-grape-950/70 p-7 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-tangerine">10+ Tour Stops &amp; Landmarks</span>
            <span className="text-xs text-white/45 font-mono">Sept 18</span>
          </div>
          <div className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
            Angeles &amp; Clark Trail
          </div>
          <div className="mt-1 text-xs text-white/55">Heritage District, Cultural Sites &amp; Freeport Zone</div>
          <div className="mt-5 h-px w-full bg-white/12" />
          <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/70">
            A curated culinary and familiarization expedition spanning ancestral Kapampangan landmarks and Clark’s premier modern corridor.
          </p>
          <ul className="mt-6 space-y-2 text-xs text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-tangerine mt-0.5">✓</span>
              <span><strong>Heritage Walk:</strong> Plaza Angel, Pamintuan Mansion, Holy Rosary Parish Church &amp; Museu Ning Angeles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tangerine mt-0.5">✓</span>
              <span><strong>The Culinarium:</strong> Traditional cooking demo, lunch &amp; Kulitan script workshop</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tangerine mt-0.5">✓</span>
              <span><strong>Clark Corridor:</strong> Clark Visitor&apos;s Center, Clark Museum &amp; 4D Theater, Deco Central Showroom &amp; CRK Airport</span>
            </li>
          </ul>
        </div>

        {/* Hub 3: SMX Clark */}
        <div className="bg-grape-900/60 p-7 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-basil">Main Expo &amp; Conference Wings</span>
            <span className="text-xs text-white/45 font-mono">Sept 19–20</span>
          </div>
          <div className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
            SMX Convention Center
          </div>
          <div className="mt-1 text-xs text-white/55">Clark Freeport Zone, Pampanga</div>
          <div className="mt-5 h-px w-full bg-white/12" />
          <p className="mt-5 text-xs sm:text-sm leading-relaxed text-white/70">
            Central Luzon&apos;s premier convention destination hosting 100+ exhibitor pavilions, dedicated conference suites, and industry summits.
          </p>
          <ul className="mt-6 space-y-2 text-xs text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-basil mt-0.5">✓</span>
              <span><strong>Ground Level Trade Halls:</strong> 100+ exhibitor booths &amp; masterclass stage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-basil mt-0.5">✓</span>
              <span><strong>Meeting Room 1:</strong> Food Forward Forum (Sept 19) &amp; BNI Business Talks (Sept 20)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-basil mt-0.5">✓</span>
              <span><strong>Meeting Room 2:</strong> ETCOR International Research &amp; Innovation Conference</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}