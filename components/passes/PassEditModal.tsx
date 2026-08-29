"use client"

import { ClaimedPass } from "@/lib/pass-types"
import { canEditPass, POLICY_RULES } from "@/lib/form-constants"
import { VisitorForm } from "@/components/forms/VisitorForm"
import { ExhibitorForm } from "@/components/forms/ExhibitorForm"
import { SponsorForm } from "@/components/forms/SponsorForm"

export function PassEditModal({
  pass,
  onClose,
  onSave,
}: {
  pass: ClaimedPass
  onClose: () => void
  onSave: (updatedData: any) => void
}) {
  const policy = canEditPass(pass)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl border border-white/15 bg-grape-900 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <span className="eyebrow text-marigold">Edit Pass Registration</span>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Update {pass.passType.toUpperCase()} Details ({pass.ticketCode})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-white/50 hover:text-white cursor-pointer px-2"
          >
            ✕
          </button>
        </div>

        {/* Check Policy */}
        {!policy.allowed ? (
          <div className="border border-chili/40 bg-chili/10 p-6 text-center">
            <p className="text-sm font-semibold text-chili">{policy.reason}</p>
            <p className="mt-2 text-xs text-white/60">
              For urgent inquiries, please contact{" "}
              <a href={`mailto:${POLICY_RULES.supportEmail}`} className="text-marigold underline">
                {POLICY_RULES.supportEmail}
              </a>
            </p>
            <button
              onClick={onClose}
              className="mt-6 border border-white/20 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            {/* Commercial notice for Exhibitors and Sponsors */}
            {pass.passType !== "visitor" && (
              <div className="mb-6 border border-marigold/30 bg-marigold/10 p-4 text-xs text-white/80">
                <span className="font-bold text-marigold">⚠ Commercial Modification Notice:</span>{" "}
                To change your registered booth space or sponsorship tier after initial booking,
                please coordinate directly with the secretariat at{" "}
                <span className="text-marigold">{POLICY_RULES.supportEmail}</span>.
              </div>
            )}

            {pass.passType === "visitor" && (
              <VisitorForm
                onSubmit={onSave}
                initialData={pass.formData}
                submitLabel="Save Changes →"
              />
            )}
            {pass.passType === "exhibitor" && (
              <ExhibitorForm
                onSubmit={onSave}
                initialData={pass.formData}
                submitLabel="Save Changes →"
              />
            )}
            {pass.passType === "sponsor" && (
              <SponsorForm
                onSubmit={onSave}
                initialData={pass.formData}
                submitLabel="Save Changes →"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}