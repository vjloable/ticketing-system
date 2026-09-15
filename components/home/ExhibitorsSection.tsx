import Link from "next/link"
import { Section } from "./Section"

export function ExhibitorsSection() {
  const brands = [
    "Miguelito's Ice Cream", "Kapampangan Kitchen", "Brew & Co.", "Sizzle House",
    "Sweet Escape", "Farm Fresh PH", "The Pasta Bar", "Golden Crust",
    "Herb & Spice", "Cocoa Republic", "Street Feast", "Zesty Bites",
  ]

  return (
    <Section
      id="exhibitors"
      index="05"
      label="Exhibitors"
      title="Brands you'll love"
      action={
        <Link
          href="/register-exhibitor"
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