"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ClaimedPass } from "@/lib/pass-types"
import { VisitorForm } from "@/components/forms/VisitorForm"
import { ExhibitorForm } from "@/components/forms/ExhibitorForm"
import { SponsorForm } from "@/components/forms/SponsorForm"

export default function MyPassesPage() {
  const { user, isLoading, updatePass } = useAuth()
  const [viewingPass, setViewingPass] = useState<ClaimedPass | null>(null)
  const [editingPass, setEditingPass] = useState<ClaimedPass | null>(null)
  const [successMsg, setSuccessMsg] = useState("")

  const handleUpdate = (updatedFormData: any) => {
    if (!editingPass) return
    updatePass(editingPass.id, updatedFormData)
    setEditingPass(null)
    setSuccessMsg("Registration details updated successfully!")
    setTimeout(() => setSuccessMsg(""), 4000)
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
            Sign in to view and manage your registered passes.
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

        {successMsg && (
          <div className="mt-6 border border-basil/50 bg-basil/10 p-4 text-xs font-semibold text-basil">
            ✓ {successMsg}
          </div>
        )}

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

                <div className="mt-6 space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingPass(pass)}
                      className="flex-1 border border-white/20 bg-white/5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setEditingPass(pass)}
                      className="flex-1 border border-marigold/40 bg-marigold/10 py-2 text-xs font-semibold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-grape-950 cursor-pointer"
                    >
                      Edit Info
                    </button>
                  </div>

                  <div className="border-t border-white/10 pt-3 text-[11px] text-white/40 flex justify-between">
                    <span>SMX Clark, Pampanga</span>
                    <span>Sept 19–20, 2026</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- VIEW DETAILS MODAL ---------------- */}
      {viewingPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl border border-white/15 bg-grape-900 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="eyebrow text-marigold">{viewingPass.passType} Pass Details</span>
                <h2 className="mt-1 font-display text-2xl font-bold">Submitted Information</h2>
              </div>
              <button
                onClick={() => setViewingPass(null)}
                className="text-xl text-white/50 hover:text-white cursor-pointer px-2"
              >
                ✕
              </button>
            </div>

            <div className="my-6 space-y-3 divide-y divide-white/10 text-xs">
              <div className="flex justify-between py-2">
                <span className="text-white/40 uppercase font-semibold">Ticket Code</span>
                <span className="font-mono font-bold text-marigold">{viewingPass.ticketCode}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-white/40 uppercase font-semibold">Claimed At</span>
                <span className="text-white/80">{new Date(viewingPass.claimedAt).toLocaleString()}</span>
              </div>

              {Object.entries(viewingPass.formData || {}).map(([key, val]) => {
                if (key === "agree" || key === "privacyConsent") return null
                const displayVal = Array.isArray(val) ? val.join(", ") : String(val)
                return (
                  <div key={key} className="flex justify-between py-2 gap-4">
                    <span className="text-white/40 uppercase font-semibold shrink-0">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-white/90 text-right">{displayVal || "—"}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => {
                  const toEdit = viewingPass
                  setViewingPass(null)
                  setEditingPass(toEdit)
                }}
                className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold cursor-pointer"
              >
                Edit Information
              </button>
              <button
                onClick={() => setViewingPass(null)}
                className="border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EDIT REGISTRATION MODAL ---------------- */}
      {editingPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
          <div className="w-full max-w-3xl border border-white/15 bg-grape-900 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="eyebrow text-marigold">Edit Pass Registration</span>
                <h2 className="mt-1 font-display text-2xl font-bold">
                  Update {editingPass.passType.toUpperCase()} Info ({editingPass.ticketCode})
                </h2>
              </div>
              <button
                onClick={() => setEditingPass(null)}
                className="text-xl text-white/50 hover:text-white cursor-pointer px-2"
              >
                ✕
              </button>
            </div>

            {editingPass.passType === "visitor" && (
              <VisitorForm
                onSubmit={handleUpdate}
                initialData={editingPass.formData}
                submitLabel="Save Changes →"
              />
            )}
            {editingPass.passType === "exhibitor" && (
              <ExhibitorForm
                onSubmit={handleUpdate}
                initialData={editingPass.formData}
                submitLabel="Save Changes →"
              />
            )}
            {editingPass.passType === "sponsor" && (
              <SponsorForm
                onSubmit={handleUpdate}
                initialData={editingPass.formData}
                submitLabel="Save Changes →"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}