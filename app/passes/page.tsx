"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function MyPassesPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-grape-950">
        <p className="eyebrow text-white/50">Loading passes...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-grape-950 py-20 px-5 text-center">
        <div className="mx-auto max-w-md border border-white/12 bg-grape-900 p-10">
          <h1 className="font-display text-2xl font-bold">Please Sign In</h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to view your registered passes.
          </p>
          <Link
            href="/login?redirect=/passes"
            className="mt-6 inline-block border border-marigold bg-marigold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-grape-950 py-16 px-5 min-h-[70vh]">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-6">
          <div>
            <div className="eyebrow text-marigold">Attendee Portal</div>
            <h1 className="mt-2 font-display text-4xl font-extrabold">My Event Passes</h1>
            <p className="mt-1 text-sm text-white/60">
              Account: {user.name} ({user.email})
            </p>
          </div>
          <Link
            href="/register/visitor"
            className="border border-marigold bg-marigold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold"
          >
            + Claim Another Pass
          </Link>
        </div>

        {user.passes.length === 0 ? (
          <div className="mt-12 border border-white/12 bg-grape-900 p-12 text-center">
            <p className="text-lg font-medium text-white/80">No passes registered yet.</p>
            <p className="mt-2 text-sm text-white/50">
              Choose a pass type to get started for OPFBEX 2026.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/register/visitor"
                className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950"
              >
                Visitor Pass
              </Link>
              <Link
                href="/register/exhibitor"
                className="border border-basil bg-basil px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950"
              >
                Exhibitor Pass
              </Link>
              <Link
                href="/register/sponsor"
                className="border border-tangerine bg-tangerine px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950"
              >
                Sponsor Pass
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {user.passes.map((pass) => (
              <div
                key={pass.id}
                className="border border-white/15 bg-grape-900 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="eyebrow text-marigold">{pass.passType} pass</span>
                    <span className="text-[11px] text-white/40">
                      {new Date(pass.claimedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold uppercase">
                    {pass.passType} Entry Badge
                  </h3>
                  <div className="mt-4 border border-white/10 bg-grape-950 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Ticket Code</div>
                    <div className="font-display text-lg font-black tracking-widest text-marigold">
                      {pass.ticketCode}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50 flex justify-between">
                  <span>SMX Clark, Pampanga</span>
                  <span>Sept 19–20, 2026</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}