"use client"

import { ClaimedPass } from "@/lib/pass-types"

export function PassCancelModal({
  pass,
  onClose,
  onConfirm,
}: {
  pass: ClaimedPass
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md border border-chili/30 bg-grape-900 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="text-2xl">⚠️</span>
          <div>
            <div className="eyebrow text-chili">Cancel Registration</div>
            <h2 className="font-display text-xl font-bold">Cancel this Pass?</h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          Are you sure you want to cancel your{" "}
          <span className="font-semibold text-white uppercase">{pass.passType} Pass</span> (
          <span className="font-mono text-marigold">{pass.ticketCode}</span>)?
        </p>
        <p className="mt-2 text-xs text-white/50">
          This will invalidate your e-ticket and access badge for OPFBEX 2026.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 border border-chili bg-chili py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-transparent hover:text-chili cursor-pointer"
          >
            Yes, Cancel Pass
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-white/20 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
          >
            Keep Pass
          </button>
        </div>
      </div>
    </div>
  )
}