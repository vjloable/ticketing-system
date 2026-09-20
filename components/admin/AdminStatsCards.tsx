"use client"

import { AdminPassRecord } from "@/lib/pass-types"

interface StatsCardsProps {
  passes: AdminPassRecord[]
}

export function AdminStatsCards({ passes }: StatsCardsProps) {
  const total = passes.length
  const day1CheckIns = passes.filter((p) => !!p.checkedInDay1At).length
  const day2CheckIns = passes.filter((p) => !!p.checkedInDay2At).length
  const bothDaysCheckIns = passes.filter((p) => !!p.checkedInDay1At && !!p.checkedInDay2At).length

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

      {/* 2. Day 1 Check-Ins */}
      <div className="border border-marigold/40 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-marigold uppercase tracking-wider font-semibold">
          <span>Day 1 Check-Ins (Sept 19)</span>
          <span className="text-base">✓</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="font-display text-3xl font-extrabold text-white">{day1CheckIns}</div>
          <div className="text-xs font-bold text-marigold">
            {total > 0 ? Math.round((day1CheckIns / total) * 100) : 0}% of total
          </div>
        </div>
        <p className="mt-3 text-[11px] text-white/50">Saturday attendees recorded</p>
      </div>

      {/* 3. Day 2 Live Check-Ins */}
      <div className="border border-basil/40 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-basil uppercase tracking-wider font-semibold">
          <span>Day 2 Check-Ins (Sept 20 - Today)</span>
          <span className="text-base">📍</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="font-display text-3xl font-extrabold text-white">{day2CheckIns}</div>
          <div className="text-xs font-bold text-basil">Live Arrivals</div>
        </div>
        <p className="mt-3 text-[11px] text-white/50">Sunday attendees checked in</p>
      </div>

      {/* 4. Attended Both Days */}
      <div className="border border-lime/40 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-lime uppercase tracking-wider font-semibold">
          <span>Attended Both Days</span>
          <span className="text-base">⭐</span>
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-white">{bothDaysCheckIns}</div>
        <p className="mt-3 text-[11px] text-white/50">Loyal visitors attending D1 + D2</p>
      </div>
    </div>
  )
}