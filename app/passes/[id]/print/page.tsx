"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"
import { ClaimedPass, PassStatus, PassType } from "@/lib/pass-types"
import { PassPrintBadge } from "@/components/passes/PassPrintBadge"

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

      // 2. If not found in user.passes (e.g. Admin printing an attendee's pass), fetch from Supabase
      try {
        const { data, error } = await supabase
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
          .or(`id.eq.${passId},ticket_code.eq.${passId}`)
          .maybeSingle()

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
          <h1 className="font-display text-2xl font-bold">Pass Not Found</h1>
          <p className="mt-2 text-sm text-white/60">
            Could not locate the requested pass for printing.
          </p>
          <Link
            href={user?.role === "admin" ? "/admin" : "/passes"}
            className="mt-6 inline-block border border-marigold bg-marigold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
          >
            {user?.role === "admin" ? "← Back to Admin Directory" : "← Back to My Passes"}
          </Link>
        </div>
      </div>
    )
  }

  const isAdmin = user?.role === "admin"

  return (
    <div className="bg-grape-950 min-h-screen py-10 px-4 print:bg-white print:py-0 print:px-0">
      {/* Floating Action Controls (Hidden on Print) */}
      <div className="print:hidden mx-auto max-w-lg mb-8 bg-grape-900 border border-white/15 p-4 flex items-center justify-between gap-4">
        <Link
          href={isAdmin ? "/admin" : "/passes"}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-semibold"
        >
          {isAdmin ? "← Back to Admin Directory" : "← Back to Passes"}
        </Link>
        <button
          onClick={handlePrint}
          className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold cursor-pointer flex items-center gap-2"
        >
          <span>🖨️</span> Print Badge / Save PDF
        </button>
      </div>

      {/* Printable Badge Area */}
      <div className="print-badge-container flex justify-center items-center">
        <PassPrintBadge pass={dbPass} userName={ownerName} />
      </div>
    </div>
  )
}