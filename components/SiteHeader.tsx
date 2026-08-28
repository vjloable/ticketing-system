"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { label: "About", href: "/#about" },
  { label: "Program", href: "/#highlights" },
  { label: "Exhibitors", href: "/#exhibitors" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Venue", href: "/#venue" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/12 bg-grape-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo compact />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="eyebrow text-white/55 transition-colors hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/tickets"
            className="hidden border border-marigold bg-marigold px-5 py-2 text-sm font-bold text-grape-950 transition-colors hover:bg-transparent hover:text-marigold sm:inline-block"
          >
            Tickets
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center border border-white/15 lg:hidden"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/12 bg-grape-900 px-5 py-2 lg:hidden">
          <nav className="flex flex-col divide-y divide-white/10">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-white/75 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/tickets"
              onClick={() => setOpen(false)}
              className="my-3 border border-marigold bg-marigold py-2.5 text-center text-sm font-bold text-grape-950"
            >
              Tickets
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
