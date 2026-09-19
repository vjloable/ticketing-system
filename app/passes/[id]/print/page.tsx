"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"
import { ClaimedPass, PassStatus, PassType } from "@/lib/pass-types"
import { PassPrintBadge } from "@/components/passes/PassPrintBadge"
import { PassStatusBadge } from "@/components/passes/PassStatusBadge"
import { PassEditModal } from "@/components/passes/PassEditModal"

export default function PrintPassPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const passId = resolvedParams.id
  const { user, isLoading: isAuthLoading } = useAuth()
  const [dbPass, setDbPass] = useState<ClaimedPass | null>(null)
  const [ownerName, setOwnerName] = useState<string>("")
  const [isFetchingPass, setIsFetchingPass] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function loadPass() {
      // 1. Check if the pass is in the current user's claimed passes
      const userPass = user?.passes.find((p) => p.id === passId || p.ticketCode === passId)
      if (userPass) {
        setDbPass(userPass)
        setOwnerName(userPass.formData?.fullName || userPass.formData?.contactPerson || user?.name || "Attendee")
        setIsFetchingPass(false)
        return
      }

      // 2. Fetch pass from Supabase (works for both unauthenticated attendees & admins)
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(passId)

        let query = supabase
          .from("passes")
          .select(`
            id,
            event_id,
            user_id,
            pass_type,
            ticket_code,
            status,
            form_data,
            created_at,
            profiles:user_id (
              id,
              full_name,
              email
            )
          `)

        if (isUuid) {
          query = query.eq("id", passId)
        } else {
          query = query.eq("ticket_code", passId.toUpperCase())
        }

        const { data, error } = await query.maybeSingle()

        if (error) {
          console.error("Error querying pass for print:", error)
        }

        if (data) {
          const profile = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles
          const formatted: ClaimedPass = {
            id: data.id,
            eventId: data.event_id,
            userId: data.user_id,
            passType: data.pass_type as PassType,
            ticketCode: data.ticket_code,
            status: data.status as PassStatus,
            formData: data.form_data || {},
            claimedAt: data.created_at,
          }
          setDbPass(formatted)
          setOwnerName(
            data.form_data?.fullName ||
            data.form_data?.contactPerson ||
            profile?.full_name ||
            "Attendee"
          )
        }
      } catch (err) {
        console.error("Error fetching pass for print:", err)
      } finally {
        setIsFetchingPass(false)
      }
    }

    if (!isAuthLoading) {
      loadPass()
    }
  }, [passId, user, isAuthLoading, supabase])

  const handlePrint = () => {
    window.print()
  }

  const handleSaveEdit = async (updatedData: any) => {
    if (!dbPass) return
    setIsSaving(true)

    try {
      const { error } = await supabase
        .from("passes")
        .update({
          form_data: updatedData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", dbPass.id)

      if (error) throw error

      setDbPass((prev) => (prev ? { ...prev, formData: updatedData } : null))
      setOwnerName(updatedData.fullName || updatedData.contactPerson || "Attendee")
      setIsEditing(false)
    } catch (err: any) {
      alert(`Failed to save changes: ${err.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  if (isAuthLoading || isFetchingPass) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-grape-950 text-white/50 eyebrow">
        Loading pass badge...
      </div>
    )
  }

  if (!dbPass) {
    return (
      <div className="bg-grape-950 py-20 px-5 text-center min-h-[70vh]">
        <div className="mx-auto max-w-md border border-white/15 bg-grape-900 p-8">
          <h1 className="font-display text-2xl font-bold text-white">Pass Not Found</h1>
          <p className="mt-2 text-sm text-white/60">
            Could not locate the requested pass for printing.
          </p>
          <Link
            href={user?.role === "admin" ? "/admin" : user ? "/passes" : "/register-visitor"}
            className="mt-6 inline-block border border-marigold bg-marigold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
          >
            {user?.role === "admin" ? "← Back to Admin Directory" : user ? "← Back to My Passes" : "← Go to Registration"}
          </Link>
        </div>
      </div>
    )
  }

  const isAdmin = user?.role === "admin"
  const formData = dbPass.formData || {}
  const canEdit = dbPass.status === "active" || dbPass.status === "pending_verification"

  return (
    <div className="bg-grape-950 min-h-screen py-10 px-4 print:bg-white print:py-0 print:px-0">
      {/* Top Floating Action Bar (Hidden on Print) */}
      <div className="print:hidden mx-auto max-w-5xl mb-8 bg-grape-900 border border-white/15 p-4 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={isAdmin ? "/admin" : user ? "/passes" : "/"}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-semibold"
        >
          {isAdmin ? "← Back to Admin Directory" : user ? "← Back to Passes" : "← Back to Home"}
        </Link>

        <div className="flex items-center gap-3">
          {/* Direct Express Entry Link */}
          {dbPass.passType === "visitor" && (
            <Link
              href={`/passes/${dbPass.id}/express`}
              className="border border-emerald-500 bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>⚡</span> Express Pass
            </Link>
          )}

          {canEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              ✏️ Edit Details
            </button>
          )}
          <button
            onClick={handlePrint}
            className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>🖨️</span> Print Badge / Save PDF
          </button>
        </div>
      </div>

      {/* Main Grid: Badge on Left, Registration Info on Right */}
      <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-12 items-start">
        {/* Printable Badge Area (Occupies full width on print) */}
        <div className="lg:col-span-5 flex justify-center print:lg:col-span-12 print-badge-container">
          <PassPrintBadge pass={dbPass} userName={ownerName} />
        </div>

        {/* Registration Information Dashboard (Hidden on Print) */}
        <div className="lg:col-span-7 print:hidden space-y-6">
          <div className="border border-white/15 bg-grape-900 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="eyebrow text-marigold">Registration Details</div>
                <h2 className="font-display text-2xl font-bold text-white mt-1">
                  {ownerName}
                </h2>
              </div>
              <PassStatusBadge status={dbPass.status} />
            </div>

            {/* Ticket Code Box */}
            <div className="border border-white/10 bg-grape-950 p-4 flex items-center justify-between">
              <div>
                <span className="eyebrow text-white/40">Official Ticket Code</span>
                <p className="font-mono text-lg font-bold text-marigold tracking-wider mt-0.5">
                  {dbPass.ticketCode}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 border border-white/15 px-2 py-1">
                {dbPass.passType} Pass
              </span>
            </div>

            {/* Contact & Personal Information */}
            <div>
              <h3 className="eyebrow text-white/50 mb-3">Contact & Location</h3>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="border border-white/5 bg-grape-950/60 p-3">
                  <span className="text-white/40 block">Email Address</span>
                  <span className="font-medium text-white truncate block mt-0.5">
                    {formData.email || "—"}
                  </span>
                </div>
                <div className="border border-white/5 bg-grape-950/60 p-3">
                  <span className="text-white/40 block">Mobile Number</span>
                  <span className="font-medium text-white block mt-0.5">
                    {formData.phone || "—"}
                  </span>
                </div>
                <div className="border border-white/5 bg-grape-950/60 p-3">
                  <span className="text-white/40 block">City / Province</span>
                  <span className="font-medium text-white block mt-0.5">
                    {formData.cityProvince || "—"}
                  </span>
                </div>
                <div className="border border-white/5 bg-grape-950/60 p-3">
                  <span className="text-white/40 block">Age Bracket</span>
                  <span className="font-medium text-white block mt-0.5">
                    {formData.age || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Organization / Professional Info */}
            {(formData.organization || formData.companyName || formData.jobTitle) && (
              <div>
                <h3 className="eyebrow text-white/50 mb-3">Organization & Role</h3>
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="border border-white/5 bg-grape-950/60 p-3">
                    <span className="text-white/40 block">Company / Organization</span>
                    <span className="font-medium text-white block mt-0.5">
                      {formData.companyName || formData.organization || "—"}
                    </span>
                  </div>
                  <div className="border border-white/5 bg-grape-950/60 p-3">
                    <span className="text-white/40 block">Job Title / Role</span>
                    <span className="font-medium text-white block mt-0.5">
                      {formData.jobTitle || "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Days Attending */}
            {formData.daysAttending && Array.isArray(formData.daysAttending) && formData.daysAttending.length > 0 && (
              <div>
                <h3 className="eyebrow text-white/50 mb-2">Days Attending</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.daysAttending.map((day: string, idx: number) => (
                    <span
                      key={idx}
                      className="border border-basil/40 bg-basil/10 px-2.5 py-1 text-[11px] font-semibold text-basil"
                    >
                      ✓ {day}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Purpose */}
            {formData.purposes && Array.isArray(formData.purposes) && formData.purposes.length > 0 && (
              <div>
                <h3 className="eyebrow text-white/50 mb-2">Primary Interests</h3>
                <ul className="space-y-1.5 text-xs text-white/70">
                  {formData.purposes.map((p: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-marigold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timestamps & Source */}
            <div className="border-t border-white/10 pt-4 flex flex-wrap justify-between text-[11px] text-white/40">
              <span>
                Registered on:{" "}
                {new Date(dbPass.claimedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {formData.source && (
                <span className="uppercase text-[9px] border border-white/10 px-1.5 py-0.5">
                  Source: {formData.source}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Pass Modal */}
      {isEditing && (
        <PassEditModal
          pass={dbPass}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  )
}