import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/12 bg-grape-950">
      {/* Big wordmark band */}
      <div className="border-b border-white/12">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="font-display text-5xl font-black leading-none tracking-tighter sm:text-7xl">
            <span className="text-chili">O</span>
            <span className="text-tangerine">P</span>
            <span className="text-marigold">F</span>
            <span className="text-marigold">B</span>
            <span className="text-basil">E</span>
            <span className="text-lime">X</span>
            <span className="text-white/25"> 2026</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            Central Luzon&apos;s premier culinary expo. Two days of chefs,
            producers, and food lovers under one roof.
          </p>
        </div>

        <FooterCol
          title="Event"
          links={[
            ["About", "/#about"],
            ["Program", "/#highlights"],
            ["Schedule", "/#schedule"],
            ["Venue", "/#venue"],
          ]}
        />
        <FooterCol
          title="Attend"
          links={[
            ["Tickets", "/tickets"],
            ["Exhibitors", "/#exhibitors"],
            ["Sponsorship", "/#exhibitors"],
          ]}
        />

        <div>
          <h4 className="eyebrow text-white/45">Contact</h4>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="text-basil">opfbexofficial@gmail.com</li>
            <li className="text-basil">+63 917 521 1106</li>
            <li className="text-white/55">SMX Convention Center, Clark</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/40 sm:flex-row">
          <p>© 2026 OPFBEX. All rights reserved.</p>
          <p className="eyebrow">Sept 19–20 · SMX Clark</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="eyebrow text-white/45">{title}</h4>
      <ul className="mt-5 space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-white/55 transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
