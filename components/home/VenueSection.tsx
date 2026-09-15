import { Section } from "./Section"

export function VenueSection() {
  return (
    <Section id="venue" index="07" label="The Venues" title="Two World-Class Clark Destinations">
      <div className="grid border border-white/12 md:grid-cols-2">
        {/* Venue 1: SMX Clark */}
        <div className="border-b border-white/12 bg-grape-900/60 p-8 md:border-b-0 md:border-r md:p-10">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-basil">Main Expo &amp; Forum Venue</span>
            <span className="text-xs text-white/45 font-mono">Sept 19–20</span>
          </div>
          <div className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white">
            SMX Convention Center
          </div>
          <div className="mt-1 text-sm text-white/55">Clark Freeport Zone, Pampanga</div>
          <div className="mt-6 h-px w-full bg-white/12" />
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Host to the OPFBEX 2026 Exhibition Halls, tasting pavilions, chef stages,
            and the prestigious <strong className="text-white">Food Forward Forum</strong> in Meeting Room 1.
          </p>
          <ul className="mt-6 space-y-2 text-xs text-white/60">
            <li className="flex items-center gap-2">
              <span className="text-basil">✓</span> 5 minutes from Clark International Airport
            </li>
            <li className="flex items-center gap-2">
              <span className="text-basil">✓</span> Ample dedicated attendee parking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-basil">✓</span> Fully air-conditioned world-class convention halls
            </li>
          </ul>
        </div>

        {/* Venue 2: SM City Clark Event Centre */}
        <div className="bg-grape-900/40 p-8 md:p-10">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-marigold">Culinary Cup Arena</span>
            <span className="text-xs text-white/45 font-mono">Sept 16–17</span>
          </div>
          <div className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white">
            SM City Clark
          </div>
          <div className="mt-1 text-sm text-white/55">The Event Centre · Ground Level, Angeles City</div>
          <div className="mt-6 h-px w-full bg-white/12" />
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            The vibrant stage for the <strong className="text-white">One Pampanga Culinary Cup (OPCC)</strong>.
            Open 360-degree viewing arena allowing mall shoppers and spectators to witness the live chef battles.
          </p>
          <ul className="mt-6 space-y-2 text-xs text-white/60">
            <li className="flex items-center gap-2">
              <span className="text-marigold">✓</span> Free admission &amp; open public viewing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-marigold">✓</span> Direct mall connectivity &amp; transportation hub
            </li>
            <li className="flex items-center gap-2">
              <span className="text-marigold">✓</span> Live multi-angle broadcast and spectator bleachers
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}