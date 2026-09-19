"use client"

import { AdminPassRecord } from "@/lib/pass-types"

interface StatsCardsProps {
  passes: AdminPassRecord[]
}

export function AdminStatsCards({ passes }: StatsCardsProps) {
  const total = passes.length
  const checkedIn = passes.filter((p) => p.status === "checked_in").length
  // Passes not checked in yet (excluding cancelled)
  const notCheckedIn = passes.filter(
    (p) => p.status !== "checked_in" && p.status !== "cancelled"
  ).length

  const checkInRate = total > 0 ? Math.round((checkedIn / total) * 100) : 0
  const notCheckedInRate = total > 0 ? Math.round((notCheckedIn / total) * 100) : 0

  // Today's check-ins (PHT / Asia/Manila)
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayCheckIns = passes.filter(
    (p) => p.checkedInAt && new Date(p.checkedInAt) >= todayStart
  ).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Visitor Registrations */}
      <div className="border border-white/12 bg-grape-900 p-5">
        <div className="text-xs text-white/50 uppercase tracking-wider">
          Total Visitors Registered
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-white">{total}</div>
        <p className="mt-3 text-[11px] text-white/50">Official OPFBEX 2026 Visitor Passes</p>
      </div>

      {/* 2. Checked In (All Time) */}
      <div className="border border-basil/40 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-basil uppercase tracking-wider font-semibold">
          <span>Checked In</span>
          <span className="text-base">✓</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="font-display text-3xl font-extrabold text-white">{checkedIn}</div>
          <div className="text-xs font-bold text-basil">{checkInRate}% rate</div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-1.5 w-full bg-grape-950 overflow-hidden">
          <div
            className="h-full bg-basil transition-all duration-500"
            style={{ width: `${checkInRate}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-white/50">{checkedIn} total arrivals recorded</p>
      </div>

      {/* 3. NOT Checked In Yet (Awaiting Arrival) */}
      <div className="border border-marigold/40 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-marigold uppercase tracking-wider font-semibold">
          <span>Not Checked In</span>
          <span className="text-base">⏳</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="font-display text-3xl font-extrabold text-white">{notCheckedIn}</div>
          <div className="text-xs font-bold text-marigold">{notCheckedInRate}% pending</div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1.5 w-full bg-grape-950 overflow-hidden">
          <div
            className="h-full bg-marigold transition-all duration-500"
            style={{ width: `${notCheckedInRate}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-white/50">{notCheckedIn} passes awaiting arrival at gate</p>
      </div>

      {/* 4. Today's Live Check-Ins */}
      <div className="border border-lime/40 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-lime uppercase tracking-wider font-semibold">
          <span>Today&apos;s Gate Check-Ins</span>
          <span className="text-base">📍</span>
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-white">{todayCheckIns}</div>
        <p className="mt-3 text-[11px] text-white/50">
          {todayCheckIns > 0
            ? `${todayCheckIns} attendee${todayCheckIns !== 1 ? "s" : ""} processed today`
            : "No check-ins recorded today yet"}
        </p>
      </div>
    </div>
  )
}