"use client"

import Link from "next/link"
import { ClaimedPass } from "@/lib/pass-types"
import { PassStatusBadge } from "./PassStatusBadge"
import { PassQRCode } from "./PassQRCode"
import { PaymentDetailsCard } from "@/components/forms/PaymentDetailsCard"
import { VenueLayoutBanner } from "@/components/forms/VenueLayoutBanner"
import { canEditPass, canCancelPass } from "@/lib/form-constants"

export function PassDetailsModal({
  pass,
  onClose,
  onOpenEdit,
  onOpenCancel,
}: {
  pass: ClaimedPass
  onClose: () => void
  onOpenEdit: () => void
  onOpenCancel: () => void
}) {
  const editPolicy = canEditPass(pass)
  const cancelPolicy = canCancelPass(pass)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl border border-white/15 bg-grape-900 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-marigold">{pass.passType} Pass</span>
              <PassStatusBadge status={pass.status} />
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold">Registration Information</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-white/50 hover:text-white cursor-pointer px-2"
          >
            ✕
          </button>
        </div>

        {/* QR Code & Pass Overview Banner */}
        <div className="my-6 border border-white/10 bg-grape-950 p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex justify-center">
            <PassQRCode value={pass.ticketCode} size={130} showCodeText={false} />
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="text-[10px] uppercase tracking-wider text-white/40">Official Ticket Code</div>
            <div className="font-mono text-xl font-black tracking-wider text-marigold">
              {pass.ticketCode}
            </div>
            <p className="text-xs text-white/60">
              Scan this QR code at the SMX Clark entrance desk for instant on-site check-in.
            </p>
            <div className="pt-2">
              <Link
                href={`/passes/${pass.id}/print`}
                className="inline-flex items-center gap-1.5 border border-marigold bg-marigold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-grape-950 transition-colors"
              >
                <span>🖨️</span> Print Event Badge
              </Link>
            </div>
          </div>
        </div>

        {/* Ticket Summary */}
        <div className="my-6 space-y-3 divide-y divide-white/10 text-xs">
          <div className="flex justify-between py-2">
            <span className="text-white/40 uppercase font-semibold">Registration Date</span>
            <span className="text-white/80">{new Date(pass.claimedAt).toLocaleString()}</span>
          </div>

          {/* Form responses */}
          {Object.entries(pass.formData || {}).map(([key, val]) => {
            if (key === "agree" || key === "privacyConsent") return null
            const displayVal = Array.isArray(val) ? val.join(", ") : String(val)
            return (
              <div key={key} className="flex justify-between py-2 gap-4">
                <span className="text-white/40 uppercase font-semibold shrink-0">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="text-white/90 text-right font-medium">{displayVal || "—"}</span>
              </div>
            )
          })}
        </div>

        {/* Commercial Payment & Venue Info for Exhibitor/Sponsors */}
        {pass.passType !== "visitor" && (
          <div className="space-y-4 mb-6">
            <PaymentDetailsCard accentColor="text-marigold" />
            <div className="flex justify-end">
              <VenueLayoutBanner />
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            {cancelPolicy.allowed && (
              <button
                onClick={onOpenCancel}
                className="text-xs text-chili underline hover:text-chili/80 cursor-pointer"
              >
                Cancel Pass
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {editPolicy.allowed ? (
              <button
                onClick={onOpenEdit}
                className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold cursor-pointer"
              >
                Edit Information
              </button>
            ) : (
              <span className="text-[11px] text-white/40 self-center">
                {editPolicy.reason}
              </span>
            )}
            <button
              onClick={onClose}
              className="border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}