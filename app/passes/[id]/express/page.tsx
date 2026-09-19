"use client"

import { use, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ExpressPassPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const passId = resolvedParams.id

  const [passData, setPassData] = useState<{
    fullName: string
    ticketCode: string
    status: string
    checkedInAt: string | null
  } | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  // Live ticking clock to prevent forged static screenshots
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-PH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function activateAndCheckIn() {
      try {
        const decodedParam = decodeURIComponent(passId).trim()
        const isEmail = decodedParam.includes("@")
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(decodedParam)

        let targetPassId: string | null = null
        let ticketCode: string | null = null
        let attendeeName: string = "OPFBEX Attendee"
        let currentStatus: string = "active"
        let checkedInAt: string | null = null

        if (isEmail) {
          // 1. If URL contains email, claim or fetch pass via Google Forms RPC
          const { data: claimResult, error: claimErr } = await supabase.rpc(
            "claim_google_forms_pass",
            { p_email: decodedParam.toLowerCase(), p_user_id: null }
          )

          if (claimErr || !claimResult?.success) {
            setError("No registration found for this email address.")
            setIsLoading(false)
            return
          }

          targetPassId = claimResult.pass_id
          ticketCode = claimResult.ticket_code
          attendeeName = claimResult.full_name || attendeeName

          // Fetch current status for this pass
          const { data: passRow } = await supabase
            .from("passes")
            .select("status, checked_in_at")
            .eq("id", targetPassId!)
            .maybeSingle()

          if (passRow) {
            currentStatus = passRow.status
            checkedInAt = passRow.checked_in_at
          }
        } else {
          // 2. Fetch pass by UUID or Ticket Code
          let query = supabase
            .from("passes")
            .select("id, ticket_code, status, form_data, checked_in_at")

          if (isUuid) {
            query = query.eq("id", decodedParam)
          } else {
            query = query.eq("ticket_code", decodedParam.toUpperCase())
          }

          const { data, error: fetchErr } = await query.maybeSingle()

          if (fetchErr || !data) {
            setError("Pass not found. Please check your email link.")
            setIsLoading(false)
            return
          }

          targetPassId = data.id
          ticketCode = data.ticket_code
          currentStatus = data.status
          checkedInAt = data.checked_in_at
          attendeeName =
            data.form_data?.fullName ||
            data.form_data?.contactPerson ||
            attendeeName
        }

        // 3. Automatically record Check-In in Supabase if not already checked in
        if (currentStatus !== "checked_in" && targetPassId) {
          const nowIso = new Date().toISOString()
          await supabase.rpc("check_in_express_pass", {
            p_pass_id: targetPassId,
          })

          setPassData({
            fullName: attendeeName,
            ticketCode: ticketCode || "—",
            status: "checked_in",
            checkedInAt: nowIso,
          })
        } else {
          setPassData({
            fullName: attendeeName,
            ticketCode: ticketCode || "—",
            status: "checked_in",
            checkedInAt: checkedInAt,
          })
        }
      } catch (err: any) {
        setError(err.message || "Failed to load pass")
      } finally {
        setIsLoading(false)
      }
    }

    activateAndCheckIn()
  }, [passId, supabase])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-grape-950 text-white font-mono text-sm">
        <span className="animate-pulse">Activating official pass...</span>
      </div>
    )
  }

  if (error || !passData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-grape-950 p-6 text-center text-white">
        <div className="border border-chili/40 bg-chili/10 p-6 max-w-sm">
          <div className="text-3xl mb-2">⚠️</div>
          <h1 className="font-bold text-lg text-chili">Unable to Load Pass</h1>
          <p className="mt-2 text-xs text-white/70">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-grape-950 text-white flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Bar */}
      <div className="text-center pt-2">
        <span className="font-display font-black text-xl tracking-wider text-marigold">
          OPFBEX 2026
        </span>
        <p className="text-[10px] uppercase tracking-widest text-white/50">
          SMX Convention Center Clark
        </p>
      </div>

      {/* Center Hero Badge */}
      <div className="my-auto mx-auto w-full max-w-sm border-2 border-basil bg-grape-900/90 p-6 text-center shadow-[0_0_60px_rgba(74,222,128,0.2)] rounded-sm">
        {/* Pulsing Verified Indicator */}
        <div className="inline-flex items-center gap-2 bg-basil text-grape-950 px-4 py-1 font-black uppercase text-[11px] tracking-widest rounded-full mb-5">
          <span className="h-2 w-2 rounded-full bg-grape-950 animate-ping" />
          VERIFIED EXPRESS ENTRY
        </div>

        {/* Attendee Name */}
        <h1 className="font-display text-3xl font-black uppercase text-white leading-tight">
          {passData.fullName}
        </h1>
        <p className="text-xs font-semibold text-basil mt-1 uppercase tracking-wider">
          Pre-Registered Visitor
        </p>

        {/* Big Ticket Code */}
        <div className="my-6 border border-white/15 bg-grape-950 p-4 rounded">
          <div className="text-[10px] uppercase font-bold tracking-wider text-white/40">
            Ticket Code
          </div>
          <div className="font-mono text-3xl font-black text-marigold tracking-widest mt-1">
            {passData.ticketCode}
          </div>
        </div>

        {/* Live Clock to prove it's a live web session */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
          <div className="text-left">
            <span className="text-white/40 block text-[10px] uppercase">Live Clock</span>
            <span className="font-mono font-bold text-basil text-sm">{currentTime}</span>
          </div>
          <div className="text-right">
            <span className="text-white/40 block text-[10px] uppercase">Gate Status</span>
            <span className="text-basil font-bold uppercase text-xs">✓ Admitted</span>
          </div>
        </div>
      </div>

      {/* Bottom Instructions for Staff */}
      <div className="pb-4 text-center">
        <p className="text-xs font-bold text-white/90 bg-white/5 border border-white/10 py-3 px-4 rounded max-w-sm mx-auto">
          👉 Show this screen to registration staff for fast-track entry.
        </p>
      </div>
    </main>
  )
}