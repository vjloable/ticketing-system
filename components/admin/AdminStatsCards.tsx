"use client"

import { AdminPassRecord } from "@/lib/pass-types"

interface StatsCardsProps {
  passes: AdminPassRecord[]
}

export function AdminStatsCards({ passes }: StatsCardsProps) {
  const total = passes.length
  const checkedIn = passes.filter((p) => p.status === "checked_in").length
  const active = passes.filter((p) => p.status === "active").length
  const pending = passes.filter((p) => p.status === "pending_verification").length
  const cancelled = passes.filter((p) => p.status === "cancelled").length

  const visitors = passes.filter((p) => p.passType === "visitor").length
  const exhibitors = passes.filter((p) => p.passType === "exhibitor").length
  const sponsors = passes.filter((p) => p.passType === "sponsor").length

  const checkInRate = total > 0 ? Math.round((checkedIn / total) * 100) : 0

  // Today's check-ins (PHT / Asia/Manila)
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayCheckIns = passes.filter(
    (p) => p.checkedInAt && new Date(p.checkedInAt) >= todayStart
  ).length

  // Donut chart percentages
  const visitorPct = total > 0 ? (visitors / total) * 100 : 0
  const exhibitorPct = total > 0 ? (exhibitors / total) * 100 : 0
  const sponsorPct = total > 0 ? (sponsors / total) * 100 : 0

  // CSS conic-gradient for donut chart
  const donutGradient =
    total > 0
      ? `conic-gradient(
          var(--color-marigold) 0% ${visitorPct}%,
          var(--color-basil) ${visitorPct}% ${visitorPct + exhibitorPct}%,
          var(--color-tangerine) ${visitorPct + exhibitorPct}% ${visitorPct + exhibitorPct + sponsorPct}%,
          rgba(255,255,255,0.08) ${visitorPct + exhibitorPct + sponsorPct}% 100%
        )`
      : "conic-gradient(rgba(255,255,255,0.08) 0% 100%)"

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {/* 1. Total Registered + Donut */}
      <div className="border border-white/12 bg-grape-900 p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="text-xs text-white/50 uppercase tracking-wider">
              Total Registrations
            </div>
            <div className="mt-2 font-display text-3xl font-extrabold text-white">{total}</div>
          </div>
          {/* CSS Donut Chart */}
          <div
            className="relative h-14 w-14 shrink-0"
            style={{ background: donutGradient, borderRadius: "50%" }}
          >
            <div className="absolute inset-1.25 rounded-full bg-grape-900" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
          <span className="border border-marigold/40 bg-marigold/10 px-1.5 py-0.5 text-marigold">
            {visitors} Visitors
          </span>
          <span className="border border-basil/40 bg-basil/10 px-1.5 py-0.5 text-basil">
            {exhibitors} Exhibitors
          </span>
          <span className="border border-tangerine/40 bg-tangerine/10 px-1.5 py-0.5 text-tangerine">
            {sponsors} Sponsors
          </span>
        </div>
      </div>

      {/* 2. Today's Check-Ins */}
      <div className="border border-lime/30 bg-grape-900 p-5 relative overflow-hidden">
        <div className="flex justify-between items-center text-xs text-lime uppercase tracking-wider font-semibold">
          <span>Today&apos;s Check-Ins</span>
          <span className="text-base">📍</span>
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-white">{todayCheckIns}</div>
        <p className="mt-3 text-[11px] text-white/50">
          {todayCheckIns > 0
            ? `${todayCheckIns} arrival${todayCheckIns !== 1 ? "s" : ""} processed today`
            : "No check-ins recorded today yet"}
        </p>
      </div>

      {/* 3. Checked In (All Time) */}
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
        <div
          className="mt-3 h-1.5 w-full bg-grape-950 overflow-hidden"
          role="progressbar"
          aria-valuenow={checkInRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Check-in rate: ${checkInRate}%`}
        >
          <div
            className="h-full bg-basil transition-all duration-500"
            style={{ width: `${checkInRate}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-white/50">{active} active passes awaiting arrival</p>
      </div>

      {/* 4. Pending Commercial Approvals */}
      <div className={`border p-5 ${pending > 0 ? "border-marigold bg-marigold/5" : "border-white/12 bg-grape-900"}`}>
        <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-marigold">
          <span>Pending Approvals</span>
          <span className="text-base">⏳</span>
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-white">{pending}</div>
        <p className="mt-3 text-[11px] text-white/60">
          {pending > 0 ? (
            <span className="text-marigold font-semibold">⚠️ Action required: Verify commercial payments</span>
          ) : (
            "All commercial passes up to date"
          )}
        </p>
      </div>

      {/* 5. Cancelled Passes */}
      <div className="border border-white/12 bg-grape-900 p-5">
        <div className="flex justify-between items-center text-xs text-white/50 uppercase tracking-wider">
          <span>Cancelled Passes</span>
          <span className="text-base">✕</span>
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-white/70">{cancelled}</div>
        <p className="mt-3 text-[11px] text-white/40">Reclaimable before deadline</p>
      </div>
    </div>
  )
}