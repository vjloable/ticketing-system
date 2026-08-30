"use client"

import { ClaimedPass } from "@/lib/pass-types"
import { PassQRCode } from "./PassQRCode"
import { PassStatusBadge } from "./PassStatusBadge"

interface PassPrintBadgeProps {
  pass: ClaimedPass
  userName?: string
}

export function PassPrintBadge({ pass, userName }: PassPrintBadgeProps) {
  const formData = pass.formData || {}
  const attendeeName = formData.fullName || formData.contactPerson || userName || "Attendee"
  const companyName = formData.companyName || formData.organization || ""
  const jobTitle = formData.jobTitle || ""
  const tierOrPackage = formData.packageSelection || formData.sponsorshipTier || ""

  const passBadgeColors = {
    visitor: "bg-marigold text-grape-950 border-marigold",
    exhibitor: "bg-basil text-grape-950 border-basil",
    sponsor: "bg-tangerine text-white border-tangerine",
  }

  const badgeColor = passBadgeColors[pass.passType] || passBadgeColors.visitor

  return (
    <div className="print-badge-card mx-auto w-full max-w-95 bg-grape-900 border-2 border-white/20 text-white print:text-black print:bg-white print:border-2 print:border-black p-6 shadow-2xl flex flex-col justify-between min-h-135">
      {/* TOP HEADER: Event Branding & Lanyard Slot Mark */}
      <div>
        <div className="flex justify-center pb-2">
          {/* Lanyard punch guide mark */}
          <div className="h-2 w-12 rounded-full border border-white/30 bg-white/10 print:border-black/40 print:bg-black/10" />
        </div>

        <div className="flex items-center justify-between border-b border-white/15 print:border-black pb-3 mt-2">
          <div>
            <span className="font-display text-lg font-black tracking-tight text-marigold print:text-black">
              OPFBEX 2026
            </span>
            <p className="text-[9px] uppercase tracking-wider text-white/60 print:text-black/70">
              One Pampanga Food & Beverage Expo
            </p>
          </div>
          <div className="text-right">
            <PassStatusBadge status={pass.status} />
          </div>
        </div>

        {/* PASS TYPE BANNER */}
        <div className="mt-4 text-center">
          <span
            className={`inline-block w-full py-1.5 text-xs font-black uppercase tracking-widest border ${badgeColor} print:bg-black print:text-white print:border-black`}
          >
            {pass.passType} PASS
          </span>
        </div>

        {/* ATTENDEE DETAILS */}
        <div className="mt-6 text-center">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white print:text-black wrap-break-word">
            {attendeeName}
          </h2>

          {companyName && (
            <p className="mt-1 text-sm font-bold text-marigold print:text-black uppercase">
              {companyName}
            </p>
          )}

          {jobTitle && (
            <p className="text-xs text-white/60 print:text-black/70">
              {jobTitle}
            </p>
          )}

          {tierOrPackage && (
            <div className="mt-2 inline-block border border-white/20 print:border-black/30 px-3 py-0.5 text-[10px] font-semibold text-white/80 print:text-black">
              {tierOrPackage}
            </div>
          )}
        </div>
      </div>

      {/* CENTER: HIGH RESOLUTION QR CODE */}
      <div className="my-6 flex justify-center">
        <PassQRCode value={pass.ticketCode} size={150} />
      </div>

      {/* BOTTOM: VENUE, DATES & GATE INSTRUCTIONS */}
      <div className="border-t border-white/15 print:border-black pt-3 text-[10px] text-white/70 print:text-black">
        <div className="flex justify-between font-semibold">
          <span>SMX Convention Center Clark</span>
          <span>Sept 19–20, 2026</span>
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-white/40 print:text-black/60">
          <span>Present QR at registration desk</span>
          <span>Hall Entry Pass</span>
        </div>
      </div>
    </div>
  )
}