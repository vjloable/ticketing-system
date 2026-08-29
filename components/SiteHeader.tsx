"use client"

import Link from "next/link"
import { useState } from "react"
import { Logo } from "./Logo"
import { useAuth } from "@/lib/auth-context"

const nav = [
  { label: "About", href: "/#about" },
  { label: "Partner", href: "/#partner-passes" },
  { label: "Program", href: "/#highlights" },
  { label: "Exhibitors", href: "/#exhibitors" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Venue", href: "/#venue" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const { user, logout } = useAuth()

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

        {/* Top-Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/register/visitor"
            className="hidden border border-marigold bg-marigold px-4 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-marigold sm:inline-block"
          >
            Visitor Pass
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown((v) => !v)}
                className="flex items-center gap-2 border border-white/20 bg-grape-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white/40 cursor-pointer"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-basil"></span>
                <span className="max-w-25 truncate">{user.name}</span>
                <span className="text-[10px] text-white/50">▼</span>
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 border border-white/15 bg-grape-900 shadow-xl">
                  <div className="border-b border-white/10 px-4 py-2.5">
                    <p className="text-xs font-medium text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-white/50 truncate">{user.email}</p>
                    <span className="mt-1 inline-block border border-basil/40 px-1.5 py-0.2 text-[9px] uppercase tracking-wider text-basil">
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href="/passes"
                    onClick={() => setUserDropdown(false)}
                    className="block px-4 py-2.5 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    My Claimed Passes ({user.passes.length})
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdown(false)
                      logout()
                    }}
                    className="w-full border-t border-white/10 px-4 py-2.5 text-left text-xs text-chili transition-colors hover:bg-white/10 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="border border-white/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/5"
            >
              Sign In / Register
            </Link>
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center border border-white/15 lg:hidden"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-white/12 bg-grape-900 px-5 py-3 lg:hidden">
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

            <div className="flex flex-col gap-2 pt-4 pb-2">
              <Link
                href="/register/visitor"
                onClick={() => setOpen(false)}
                className="border border-marigold bg-marigold py-2.5 text-center text-xs font-bold uppercase tracking-wider text-grape-950"
              >
                Get Visitor Pass
              </Link>

              {user ? (
                <>
                  <Link
                    href="/passes"
                    onClick={() => setOpen(false)}
                    className="border border-white/20 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white"
                  >
                    My Passes ({user.passes.length})
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false)
                      logout()
                    }}
                    className="py-2 text-center text-xs text-chili"
                  >
                    Sign Out ({user.email})
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="border border-white/20 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                >
                  Sign In / Register Account
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}