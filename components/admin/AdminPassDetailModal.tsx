"use client"

import Link from "next/link"
import { AdminPassRecord } from "@/lib/pass-types"
import { PassStatusBadge } from "@/components/passes/PassStatusBadge"

interface AdminPassDetailModalProps {
  pass: AdminPassRecord
  onClose: () => void
  onApprove: (passId: string) => Promise<void>
  onManualCheckIn: (passId: string) => Promise<void>
  onRevertCheckIn?: (passId: string) => Promise<void>
}

export function AdminPassDetailModal({
  pass,
  onClose,
  onApprove,
  onManualCheckIn,
  onRevertCheckIn,
}: AdminPassDetailModalProps) {
  const data = pass.formData || {}
  const isPending = pass.status === "pending_verification"
  const isActive = pass.status === "active"
  const isCheckedIn = pass.status === "checked_in"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 bg-grape-900 p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow text-marigold">{pass.passType} Pass Record</span>
              <PassStatusBadge status={pass.status} />
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              {data.fullName || data.companyName || data.contactPerson || "Attendee Registration"}
            </h2>
            <p className="font-mono text-sm font-bold text-marigold tracking-widest mt-1">
              {pass.ticketCode}
            </p>
          </div>
          <button
            onClick={onClose}
            className="border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white hover:bg-white/20 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-xs text-white/80">
          {/* Account Profile Section */}
          <div className="border border-white/10 bg-grape-950 p-4">
            <h3 className="font-display font-bold uppercase tracking-wider text-white/60">Account Holder</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <span className="text-white/40">Account Name:</span> {pass.userProfile?.fullName || "—"}
              </div>
              <div>
                <span className="text-white/40">Account Email:</span> {pass.userProfile?.email || "—"}
              </div>
            </div>
          </div>

          {/* Attendee Form Data */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider text-white/60 mb-2">Registration Form Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border border-white/10 bg-grape-950 p-4">
              {Object.entries(data).map(([key, value]) => {
                if (key === "agree" || key === "privacyConsent") return null
                let displayVal = String(value)
                if (Array.isArray(value)) displayVal = value.join(", ")

                return (
                  <div key={key} className="wrap-break-word">
                    <span className="text-white/40 uppercase text-[10px] block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="text-white font-medium">{displayVal || "—"}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Audit Timestamps */}
          <div className="border border-white/10 bg-grape-950 p-4 text-[11px] space-y-1">
            <div>
              <span className="text-white/40">Registered At:</span>{" "}
              {new Date(pass.claimedAt).toLocaleString("en-US", { timeZone: "Asia/Manila" })}
            </div>
            {pass.checkedInAt && (
              <div className="text-basil font-semibold">
                <span className="text-white/40">Checked In At:</span>{" "}
                {new Date(pass.checkedInAt).toLocaleString("en-US", { timeZone: "Asia/Manila" })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap justify-between items-center gap-3 border-t border-white/10 pt-4">
          <div className="flex flex-wrap gap-2">
            {isPending && (
              <button
                onClick={async () => {
                  await onApprove(pass.id)
                  onClose()
                }}
                className="border border-basil bg-basil px-4 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-basil transition-colors cursor-pointer"
              >
                ✓ Approve Commercial Pass
              </button>
            )}

            {isActive && (
              <button
                onClick={async () => {
                  await onManualCheckIn(pass.id)
                  onClose()
                }}
                className="border border-lime bg-lime px-4 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-lime transition-colors cursor-pointer"
              >
                ✓ Manual Check-In
              </button>
            )}

            {isCheckedIn && onRevertCheckIn && (
              <button
                onClick={async () => {
                  await onRevertCheckIn(pass.id)
                  onClose()
                }}
                className="border border-marigold bg-marigold/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-grape-950 transition-colors cursor-pointer"
              >
                ↺ Undo Check-In (Mark Active)
              </button>
            )}

            <Link
              href={`/passes/${pass.id}/print`}
              target="_blank"
              className="border border-marigold/40 bg-marigold/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-grape-950 cursor-pointer transition-colors"
            >
              🖨️ Print Badge
            </Link>
          </div>

          <button
            onClick={onClose}
            className="border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}