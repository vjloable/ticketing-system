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
          checked_in_by,
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
        checkedInBy: passRow.checked_in_by,
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

      // 3. Handle Already Checked In Pass
      if (pass.status === "checked_in") {
        if (soundEnabled) audioFeedback.playWarning()
        setScanResult({
          status: "already_checked_in",
          message: `Attendee has already checked in with this badge code.`,
          pass,
        })
        setStats((prev) => ({ ...prev, duplicate: prev.duplicate + 1 }))
        addRecent(code, "Duplicate", attendeeName)
        setIsProcessing(false)
        return
      }

      // 4. Handle Pending Commercial Verification
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

      // 5. Handle Valid Active Pass -> Check In
      const checkInTime = new Date().toISOString()
      const { error: updateErr } = await supabase
        .from("passes")
        .update({
          status: "checked_in",
          checked_in_at: checkInTime,
          checked_in_by: user?.id || null,
          updated_at: checkInTime,
        })
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
        message: "Check-In Verified!",
        pass: { ...pass, status: "checked_in", checkedInAt: checkInTime },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      })
      setStats((prev) => ({ ...prev, valid: prev.valid + 1 }))
      addRecent(code, "Success", attendeeName)
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

        <div className="flex items-center gap-2">
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
                placeholder="e.g. OPFBEX-2026-VIS-0001"
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