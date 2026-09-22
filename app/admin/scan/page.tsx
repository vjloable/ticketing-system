"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { AdminPassRecord, CheckInScanResult, PassType } from "@/lib/pass-types"
import { QRScanner } from "@/components/admin/QRScanner"
import { ScanResultCard } from "@/components/admin/ScanResultCard"
import { audioFeedback } from "@/lib/audio-feedback"

export default function AdminScanPage() {
  const { user } = useAuth()
  const [manualCode, setManualCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [scanResult, setScanResult] = useState<CheckInScanResult | null>(null)
  const [recentScans, setRecentScans] = useState<Array<{ code: string; status: string; name: string; time: string }>>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [stats, setStats] = useState({ valid: 0, duplicate: 0, invalid: 0 })
  const [activeDay, setActiveDay] = useState<1 | 2>(2)

  const supabase = createClient()
  const manualInputRef = useRef<HTMLInputElement>(null)

  // Verify and Check In ticket code
  const processTicketCode = async (rawCode: string) => {
    if (!rawCode || isProcessing) return
    const code = rawCode.trim().toUpperCase()
    if (!code) return

    setIsProcessing(true)

    try {
      // 1. Fetch pass from Supabase
      const { data: passRow, error } = await supabase
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
          checked_in_at,
          checked_in_day1_at,
          checked_in_day2_at,
          checked_in_by,
          checked_in_day1_by,
          checked_in_day2_by,
          profiles:user_id (
            id,
            full_name,
            email
          )
        `)
        .eq("ticket_code", code)
        .maybeSingle()

      if (error || !passRow) {
        if (soundEnabled) audioFeedback.playError()
        setScanResult({
          status: "not_found",
          message: `Ticket code "${code}" does not exist in the registration database.`,
        })
        setStats((prev) => ({ ...prev, invalid: prev.invalid + 1 }))
        setIsProcessing(false)
        return
      }

      const pass: AdminPassRecord = {
        id: passRow.id,
        eventId: passRow.event_id,
        userId: passRow.user_id,
        passType: passRow.pass_type as PassType,
        ticketCode: passRow.ticket_code,
        status: passRow.status,
        formData: passRow.form_data || {},
        claimedAt: passRow.created_at,
        checkedInAt: passRow.checked_in_at,
        checkedInDay1At: passRow.checked_in_day1_at,
        checkedInDay2At: passRow.checked_in_day2_at,
        checkedInBy: passRow.checked_in_by,
        checkedInDay1By: passRow.checked_in_day1_by,
        checkedInDay2By: passRow.checked_in_day2_by,
        userProfile: passRow.profiles
          ? {
              id: rowProfile(passRow.profiles).id,
              fullName: rowProfile(passRow.profiles).full_name,
              email: rowProfile(passRow.profiles).email,
            }
          : undefined,
      }

      const attendeeName =
        pass.formData.fullName ||
        pass.formData.contactPerson ||
        pass.formData.companyName ||
        pass.userProfile?.fullName ||
        "Attendee"

      // 2. Handle Cancelled Pass
      if (pass.status === "cancelled") {
        if (soundEnabled) audioFeedback.playError()
        setScanResult({
          status: "cancelled",
          message: `Pass was cancelled by attendee. Admission cannot be granted.`,
          pass,
        })
        setStats((prev) => ({ ...prev, invalid: prev.invalid + 1 }))
        addRecent(code, "Cancelled", attendeeName)
        setIsProcessing(false)
        return
      }

      // 3. Handle Pending Commercial Verification
      if (pass.status === "pending_verification") {
        if (soundEnabled) audioFeedback.playWarning()
        setScanResult({
          status: "pending_verification",
          message: `Commercial pass is pending review. Please verify payment at Secretariat Desk.`,
          pass,
        })
        setStats((prev) => ({ ...prev, invalid: prev.invalid + 1 }))
        addRecent(code, "Pending", attendeeName)
        setIsProcessing(false)
        return
      }

      // 4. DAY RESTRICTION CHECK (Only for visitors; exhibitors & sponsors have full all-day credentials)
      if (pass.passType === "visitor") {
        const rawDays: string[] = Array.isArray(pass.formData.daysAttending)
          ? pass.formData.daysAttending
          : typeof pass.formData.daysAttending === "string"
          ? [pass.formData.daysAttending]
          : []

        const isRegisteredDay1 = rawDays.some((d) => /day\s*1/i.test(d))
        const isRegisteredDay2 = rawDays.some((d) => /day\s*2/i.test(d))

        if (activeDay === 2 && !isRegisteredDay2) {
          // Attending on Day 2, but registered ONLY for Day 1
          if (soundEnabled) audioFeedback.playError()
          setScanResult({
            status: "day1_only",
            message: `This pass was registered for Day 1 only. Attendee must register a new pass for Day 2.`,
            pass,
          })
          setStats((prev) => ({ ...prev, invalid: prev.invalid + 1 }))
          addRecent(code, "Day 1 Only", attendeeName)
          setIsProcessing(false)
          return
        }

        if (activeDay === 1 && !isRegisteredDay1) {
          // Attending on Day 1, but registered ONLY for Day 2
          if (soundEnabled) audioFeedback.playError()
          setScanResult({
            status: "day1_only",
            message: `This pass was registered for Day 2 only. Attendee is not registered for Day 1.`,
            pass,
          })
          setStats((prev) => ({ ...prev, invalid: prev.invalid + 1 }))
          addRecent(code, "Day 2 Only", attendeeName)
          setIsProcessing(false)
          return
        }
      }

      // 5. CHECK IF ALREADY CHECKED IN FOR THIS SPECIFIC ACTIVE DAY
      const alreadyCheckedInThisDay =
        activeDay === 1 ? !!pass.checkedInDay1At : !!pass.checkedInDay2At

      if (alreadyCheckedInThisDay) {
        if (soundEnabled) audioFeedback.playWarning()
        const checkInTimestamp =
          activeDay === 1 ? pass.checkedInDay1At : pass.checkedInDay2At
        const formattedCheckIn = checkInTimestamp
          ? new Date(checkInTimestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : ""

        setScanResult({
          status: "already_checked_in",
          message: `Attendee already checked in for Day ${activeDay}${formattedCheckIn ? ` at ${formattedCheckIn}` : ""}.`,
          pass,
        })
        setStats((prev) => ({ ...prev, duplicate: prev.duplicate + 1 }))
        addRecent(code, `Duplicate (D${activeDay})`, attendeeName)
        setIsProcessing(false)
        return
      }

      // 6. EVENT CONCLUDED GUARD: Lock scanner into Read-Only Audit Mode
      const isEventConcluded = new Date() > new Date("2026-09-20T22:00:00+08:00")
      if (isEventConcluded) {
        if (soundEnabled) audioFeedback.playWarning()
        setScanResult({
          status: "success",
          message: "Event Concluded — Pass loaded in Read-Only Audit Mode. No new check-in was recorded.",
          pass,
        })
        addRecent(code, "Audit Lookup", attendeeName)
        setIsProcessing(false)
        return
      }

      // 7. RECORD CHECK-IN FOR ACTIVE DAY (Only when event was live)
      const checkInTime = new Date().toISOString()
      const updatePayload: Record<string, any> = {
        status: "checked_in",
        checked_in_at: checkInTime,
        checked_in_by: user?.id || null,
        updated_at: checkInTime,
      }

      if (activeDay === 1) {
        updatePayload.checked_in_day1_at = checkInTime
        updatePayload.checked_in_day1_by = user?.id || null
      } else {
        updatePayload.checked_in_day2_at = checkInTime
        updatePayload.checked_in_day2_by = user?.id || null
      }

      const { error: updateErr } = await supabase
        .from("passes")
        .update(updatePayload)
        .eq("id", pass.id)

      if (updateErr) {
        if (soundEnabled) audioFeedback.playError()
        setScanResult({
          status: "not_found",
          message: `Failed to update check-in state: ${updateErr.message}`,
        })
        setIsProcessing(false)
        return
      }

      if (soundEnabled) audioFeedback.playSuccess()
      setScanResult({
        status: "success",
        message:
          activeDay === 2 && pass.checkedInDay1At
            ? "Day 2 Check-In Verified! (Attended Day 1)"
            : `Check-In Verified for Day ${activeDay}!`,
        pass: {
          ...pass,
          status: "checked_in",
          checkedInAt: checkInTime,
          checkedInDay1At: activeDay === 1 ? checkInTime : pass.checkedInDay1At,
          checkedInDay2At: activeDay === 2 ? checkInTime : pass.checkedInDay2At,
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      })
      setStats((prev) => ({ ...prev, valid: prev.valid + 1 }))
      addRecent(code, `Success (D${activeDay})`, attendeeName)
    } catch (err) {
      console.error("Scan processing error: ", err)
    } finally {
      setIsProcessing(false)
    }
  }

  const rowProfile = (p: any) => {
    if (Array.isArray(p)) return p[0] || {}
    return p || {}
  }

  const addRecent = (code: string, status: string, name: string) => {
    setRecentScans((prev) => [
      {
        code,
        status,
        name,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      },
      ...prev.slice(0, 4),
    ])
  }

  const handleApprovePending = async (passId: string) => {
    await supabase
      .from("passes")
      .update({ status: "active", updated_at: new Date().toISOString() })
      .eq("id", passId)

    if (scanResult?.pass) {
      processTicketCode(scanResult.pass.ticketCode)
    }
  }

  const handleUndoCheckIn = async (passId: string) => {
    setIsProcessing(true)
    const pass = scanResult?.pass
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (activeDay === 1) {
      updatePayload.checked_in_day1_at = null
      updatePayload.checked_in_day1_by = null
      if (!pass?.checkedInDay2At) {
        updatePayload.status = "active"
        updatePayload.checked_in_at = null
      }
    } else {
      updatePayload.checked_in_day2_at = null
      updatePayload.checked_in_day2_by = null
      if (!pass?.checkedInDay1At) {
        updatePayload.status = "active"
        updatePayload.checked_in_at = null
      } else {
        // Fall back latest check-in to Day 1
        updatePayload.checked_in_at = pass.checkedInDay1At
      }
    }

    const { error } = await supabase
      .from("passes")
      .update(updatePayload)
      .eq("id", passId)

    setIsProcessing(false)

    if (error) {
      alert("Failed to undo check-in: " + error.message)
    } else {
      setScanResult(null)
    }
  }

  return (
    <div className="py-6 px-4 sm:px-6 max-w-4xl mx-auto min-h-[85vh]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-4">
        <div>
          <div className="eyebrow text-marigold">SMX Clark Entrance</div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            QR Check-In Scanner
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Day 1 / Day 2 Mode Selector */}
          <div className="inline-flex rounded-sm p-0.5 bg-grape-950 border border-white/15">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-3 py-1 text-xs font-bold rounded-sm transition-colors cursor-pointer ${
                activeDay === 1
                  ? "bg-marigold text-grape-950 shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Day 1 (Sept 19)
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-3 py-1 text-xs font-bold rounded-sm transition-colors cursor-pointer ${
                activeDay === 2
                  ? "bg-basil text-grape-950 shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Day 2 (Sept 20)
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled((v) => !v)}
            className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              soundEnabled
                ? "border-basil/40 bg-basil/10 text-basil"
                : "border-white/20 bg-grape-950 text-white/40"
            }`}
          >
            {soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"}
          </button>
          <Link
            href="/admin"
            className="border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase text-white hover:bg-white/10"
          >
            ← Directory
          </Link>
        </div>
      </div>

      {/* Live Session Counter */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-grape-900 px-4 py-2 text-xs">
        <div className="text-white/60">
          Booth Session Scans:{" "}
          <span className="font-bold text-white">{stats.valid + stats.duplicate + stats.invalid}</span>
        </div>
        <div className="flex gap-3 text-[11px]">
          <span className="text-basil font-bold">✓ {stats.valid} Valid</span>
          <span className="text-marigold font-bold">⚠️ {stats.duplicate} Duplicates</span>
          <span className="text-chili font-bold">✕ {stats.invalid} Invalid</span>
        </div>
      </div>

      {/* Post-Event Audit Banner */}
      <div className="mb-4 flex items-center justify-between border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-300">
        <div className="flex items-center gap-2 font-medium">
          <span className="font-bold uppercase tracking-wider">🔒 Read-Only Audit Mode</span>
          <span className="text-white/30">•</span>
          <span className="text-white/70">
            Event concluded on Sept 20, 10:00 PM. Scanning is active for attendee verification only — database check-ins are locked.
          </span>
        </div>
      </div>

      {/* Main Grid: Camera Scanner & Live Feedback */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Left Column: Camera Viewfinder */}
        <div className="space-y-4">
          <QRScanner onScan={(code) => processTicketCode(code)} isScanningPaused={isProcessing} />

          {/* Manual Entry Fallback */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              processTicketCode(manualCode)
              setManualCode("")
            }}
            className="border border-white/15 bg-grape-900 p-4"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
              Manual Ticket Code Entry
            </div>
            <div className="flex gap-2">
              <input
                ref={manualInputRef}
                type="text"
                placeholder="e.g. OPFBEX-2026-VIS-00001"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                className="flex-1 border border-white/20 bg-grape-950 px-3 py-2 text-xs font-mono text-white placeholder-white/30 uppercase focus:border-marigold focus:outline-none"
              />
              <button
                type="submit"
                disabled={!manualCode.trim() || isProcessing}
                className="border border-marigold bg-marigold px-4 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 disabled:opacity-40 hover:bg-transparent hover:text-marigold transition-colors cursor-pointer"
              >
                {isProcessing ? "..." : "Check In"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Scan Result Feedback & Timeline */}
        <div className="space-y-4">
          {scanResult ? (
            <ScanResultCard
              result={scanResult}
              onDismiss={() => setScanResult(null)}
              onApprovePending={handleApprovePending}
              onUndoCheckIn={handleUndoCheckIn}
            />
          ) : (
            <div className="border border-white/12 bg-grape-900/60 p-8 text-center flex flex-col items-center justify-center min-h-55">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-display text-sm font-bold uppercase text-white/70">
                Ready to Scan Passes
              </p>
              <p className="mt-1 text-xs text-white/40 max-w-xs">
                Position the attendee&apos;s mobile screen or printed lanyard QR code in the camera frame.
              </p>
            </div>
          )}

          {/* Recent Scans Timeline */}
          {recentScans.length > 0 && (
            <div className="border border-white/10 bg-grape-900 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                Recent Scans Timeline
              </div>
              <div className="divide-y divide-white/5 text-xs">
                {recentScans.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="font-mono text-[10px] text-white/40 ml-2">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          item.status === "Success"
                            ? "text-basil"
                            : item.status === "Duplicate"
                            ? "text-marigold"
                            : "text-chili"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[10px] text-white/30">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}