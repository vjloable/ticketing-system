"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ClaimedPass } from "@/lib/pass-types"
import { canEditPass, canCancelPass } from "@/lib/form-constants"
import { PassStatusBadge } from "@/components/passes/PassStatusBadge"
import { PassDetailsModal } from "@/components/passes/PassDetailsModal"
import { PassEditModal } from "@/components/passes/PassEditModal"
import { PassCancelModal } from "@/components/passes/PassCancelModal"

export default function MyPassesPage() {
  const { user, isLoading, updatePass, cancelPass } = useAuth()
  const [viewingPass, setViewingPass] = useState<ClaimedPass | null>(null)
  const [editingPass, setEditingPass] = useState<ClaimedPass | null>(null)
  const [cancellingPass, setCancellingPass] = useState<ClaimedPass | null>(null)
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "info" | "error"; text: string } | null>(null)

  const showFeedback = (text: string, type: "success" | "info" | "error" = "success") => {
    setFeedbackMsg({ text, type })
    setTimeout(() => setFeedbackMsg(null), 4500)
  }

  const handleSaveEdit = async (updatedFormData: any) => {
    if (!editingPass) return
    const success = await updatePass(editingPass.id, updatedFormData)
    setEditingPass(null)
    if (success) {
      showFeedback("Registration details updated in Supabase!", "success")
    } else {
      showFeedback("Failed to update pass. Please try again.", "error")
    }
  }

  const handleConfirmCancel = async () => {
    if (!cancellingPass) return
    const success = await cancelPass(cancellingPass.id)
    setCancellingPass(null)
    if (success) {
      showFeedback(`Pass (${cancellingPass.ticketCode}) has been cancelled.`, "info")
    } else {
      showFeedback("Failed to cancel pass. Please try again.", "error")
    }
  }

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
            Sign in to view and manage your registered event passes.
          </p>
          <Link
            href="/login?redirect=/passes"
            className="mt-6 inline-block border border-marigold bg-marigold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
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
        {/* Header Bar */}
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
            className="border border-marigold bg-marigold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold cursor-pointer"
          >
            + Claim Another Pass
          </Link>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`mt-6 border p-4 text-xs font-semibold ${
              feedbackMsg.type === "success"
                ? "border-basil/50 bg-basil/10 text-basil"
                : feedbackMsg.type === "error"
                ? "border-chili/50 bg-chili/10 text-chili"
                : "border-marigold/50 bg-marigold/10 text-marigold"
            }`}
          >
            {feedbackMsg.type === "success" ? "✓" : "ℹ"} {feedbackMsg.text}
          </div>
        )}

        {/* Passes List */}
        {user.passes.length === 0 ? (
          <div className="mt-12 border border-white/12 bg-grape-900 p-12 text-center">
            <p className="text-lg font-medium text-white/80">No passes registered yet.</p>
            <p className="mt-2 text-sm text-white/50">
              Choose a pass type to get started for OPFBEX 2026.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/register/visitor"
                className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
              >
                Visitor Pass
              </Link>
              <Link
                href="/register/exhibitor"
                className="border border-basil bg-basil px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
              >
                Exhibitor Pass
              </Link>
              <Link
                href="/register/sponsor"
                className="border border-tangerine bg-tangerine px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
              >
                Sponsor Pass
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {user.passes.map((pass) => {
              const isCancelled = pass.status === "cancelled"
              const editPolicy = canEditPass(pass)
              const cancelPolicy = canCancelPass(pass)

              return (
                <div
                  key={pass.id}
                  className={`border bg-grape-900 p-6 flex flex-col justify-between transition-all ${
                    isCancelled
                      ? "border-white/10 opacity-60 bg-grape-950"
                      : "border-white/15 hover:border-white/25"
                  }`}
                >
                  <div>
                    {/* Top Row: Type & Status */}
                    <div className="flex justify-between items-center gap-2">
                      <span className="eyebrow text-marigold">{pass.passType} pass</span>
                      <PassStatusBadge status={pass.status} />
                    </div>

                    <h3 className={`mt-3 font-display text-xl font-bold uppercase ${isCancelled ? "line-through text-white/50" : "text-white"}`}>
                      {pass.passType} Entry Badge
                    </h3>

                    {/* Ticket Code Box */}
                    <div className="mt-4 border border-white/10 bg-grape-950 p-4">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Ticket Code</div>
                      <div className={`font-display text-lg font-black tracking-widest ${isCancelled ? "line-through text-white/40" : "text-marigold"}`}>
                        {pass.ticketCode}
                      </div>
                    </div>

                    {/* Summary Preview */}
                    {pass.formData && (
                      <div className="mt-4 space-y-1 text-xs text-white/65">
                        {pass.formData.fullName && (
                          <p><span className="text-white/40">Registrant:</span> {pass.formData.fullName}</p>
                        )}
                        {pass.formData.companyName && (
                          <p><span className="text-white/40">Company:</span> {pass.formData.companyName}</p>
                        )}
                        {pass.formData.packageSelection && (
                          <p><span className="text-white/40">Package:</span> {pass.formData.packageSelection}</p>
                        )}
                        {pass.formData.sponsorshipTier && (
                          <p><span className="text-white/40">Tier:</span> {pass.formData.sponsorshipTier}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setViewingPass(pass)}
                        className="flex-1 min-w-25 border border-white/20 bg-white/5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
                      >
                        View Details
                      </button>

                      {!isCancelled && (
                        <Link
                          href={`/passes/${pass.id}/print`}
                          className="border border-marigold/40 bg-marigold/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-grape-950 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Print Event Badge"
                        >
                          <span>🖨️</span> Print
                        </Link>
                      )}

                      {editPolicy.allowed && (
                        <button
                          onClick={() => setEditingPass(pass)}
                          className="border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
                        >
                          Edit
                        </button>
                      )}

                      {cancelPolicy.allowed && (
                        <button
                          onClick={() => setCancellingPass(pass)}
                          className="border border-chili/30 bg-chili/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-chili hover:bg-chili hover:text-white cursor-pointer"
                          title="Cancel pass"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <div className="border-t border-white/10 pt-3 text-[11px] text-white/40 flex justify-between">
                      <span>SMX Clark, Pampanga</span>
                      <span>Sept 19–20, 2026</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ---------------- VIEW DETAILS MODAL ---------------- */}
      {viewingPass && (
        <PassDetailsModal
          pass={viewingPass}
          onClose={() => setViewingPass(null)}
          onOpenEdit={() => {
            const toEdit = viewingPass
            setViewingPass(null)
            setEditingPass(toEdit)
          }}
          onOpenCancel={() => {
            const toCancel = viewingPass
            setViewingPass(null)
            setCancellingPass(toCancel)
          }}
        />
      )}

      {/* ---------------- EDIT REGISTRATION MODAL ---------------- */}
      {editingPass && (
        <PassEditModal
          pass={editingPass}
          onClose={() => setEditingPass(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* ---------------- CANCEL CONFIRMATION MODAL ---------------- */}
      {cancellingPass && (
        <PassCancelModal
          pass={cancellingPass}
          onClose={() => setCancellingPass(null)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  )
}