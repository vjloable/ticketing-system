"use client"

import { CheckInScanResult } from "@/lib/pass-types"

interface ScanResultCardProps {
  result: CheckInScanResult
  onDismiss: () => void
  onApprovePending?: (passId: string) => void
  onUndoCheckIn?: (passId: string) => void
}

export function ScanResultCard({
  result,
  onDismiss,
  onApprovePending,
  onUndoCheckIn,
}: ScanResultCardProps) {
  const { status, message, pass, timestamp } = result
  const data = pass?.formData || {}
  const attendeeName =
    data.fullName || data.contactPerson || data.companyName || pass?.userProfile?.fullName || "Attendee"

  switch (status) {
    case "success":
      return (
        <div className="border-2 border-basil bg-basil/15 p-5 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-basil/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-basil text-grape-950 font-bold text-xs">
                ✓
              </span>
              <span className="font-display font-extrabold uppercase tracking-wider text-basil text-sm">
                Check-In Successful
              </span>
            </div>
            <button onClick={onDismiss} className="text-white/60 hover:text-white text-sm cursor-pointer">
              ✕
            </button>
          </div>

          <div className="mt-3">
            <h3 className="font-display text-xl font-black uppercase text-white">{attendeeName}</h3>
            {data.companyName && <p className="text-xs text-white/70">{data.companyName}</p>}

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-basil/20 pt-3">
              <div>
                <span className="text-white/50 text-[10px] block uppercase">Ticket Code</span>
                <span className="font-mono font-bold text-marigold">{pass?.ticketCode}</span>
              </div>
              <div>
                <span className="text-white/50 text-[10px] block uppercase">Pass Tier</span>
                <span className="font-bold uppercase text-white">{pass?.passType}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-basil font-semibold">
              <span>Physical Badge / Wristband Issued</span>
              <span>{timestamp || "Just Now"}</span>
            </div>

            {onUndoCheckIn && pass && (
              <div className="mt-3 border-t border-basil/20 pt-2 text-right">
                <button
                  onClick={() => onUndoCheckIn(pass.id)}
                  className="text-[11px] text-white/60 hover:text-marigold underline cursor-pointer"
                >
                  Accidental scan? Click to undo check-in
                </button>
              </div>
            )}
          </div>
        </div>
      )

    case "already_checked_in":
      return (
        <div className="border-2 border-marigold bg-marigold/15 p-5 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-marigold/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-marigold text-grape-950 font-bold text-xs">
                ⚠️
              </span>
              <span className="font-display font-extrabold uppercase tracking-wider text-marigold text-sm">
                Already Checked In
              </span>
            </div>
            <button onClick={onDismiss} className="text-white/60 hover:text-white text-sm cursor-pointer">
              ✕
            </button>
          </div>

          <div className="mt-3">
            <h3 className="font-display text-lg font-bold text-white">{attendeeName}</h3>
            <p className="font-mono text-xs font-semibold text-marigold mt-1">{pass?.ticketCode}</p>

            <div className="mt-3 border border-marigold/30 bg-grape-950 p-3 text-xs">
              <p className="text-white/70">{message}</p>
              {pass?.checkedInDay1At && (
                <p className="mt-1 text-white/70 text-[11px]">
                  Day 1 Check-In:{" "}
                  <span className="text-white font-mono">
                    {new Date(pass.checkedInDay1At).toLocaleString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </p>
              )}
              {pass?.checkedInDay2At && (
                <p className="mt-0.5 text-marigold text-[11px] font-semibold">
                  Day 2 Check-In:{" "}
                  <span className="font-mono">
                    {new Date(pass.checkedInDay2At).toLocaleString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </p>
              )}
              {!pass?.checkedInDay1At && !pass?.checkedInDay2At && pass?.checkedInAt && (
                <p className="mt-1 text-marigold font-semibold">
                  Recorded Check-In:{" "}
                  {new Date(pass.checkedInAt).toLocaleString("en-US", { timeZone: "Asia/Manila" })}
                </p>
              )}
            </div>

            {onUndoCheckIn && pass && (
              <button
                onClick={() => onUndoCheckIn(pass.id)}
                className="mt-3 w-full border border-marigold bg-marigold/20 py-2 text-xs font-bold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-grape-950 transition-colors cursor-pointer"
              >
                ↺ Undo Check-In (Mark Active)
              </button>
            )}
          </div>
        </div>
      )

    case "pending_verification":
      return (
        <div className="border-2 border-tangerine bg-tangerine/15 p-5 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-tangerine/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tangerine text-grape-950 font-bold text-xs">
                ⏳
              </span>
              <span className="font-display font-extrabold uppercase tracking-wider text-tangerine text-sm">
                Pending Commercial Approval
              </span>
            </div>
            <button onClick={onDismiss} className="text-white/60 hover:text-white text-sm cursor-pointer">
              ✕
            </button>
          </div>

          <div className="mt-3">
            <h3 className="font-display text-lg font-bold text-white">{attendeeName}</h3>
            <p className="text-xs text-white/70 mt-1">
              Pass Tier: <span className="font-bold text-marigold uppercase">{pass?.passType}</span>
            </p>
            <p className="mt-2 text-xs text-white/80">
              Commercial pass has not yet been activated by secretariat.
            </p>

            {onApprovePending && pass && (
              <button
                onClick={() => onApprovePending(pass.id)}
                className="mt-4 w-full border border-basil bg-basil py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-basil transition-colors cursor-pointer"
              >
                ✓ Approve & Activate Pass Now
              </button>
            )}
          </div>
        </div>
      )
    case "day1_only":
      return (
        <div className="border-2 border-chili bg-chili/15 p-5 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-chili/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-chili text-white font-bold text-xs">
                ✕
              </span>
              <span className="font-display font-extrabold uppercase tracking-wider text-chili text-sm">
                Day 1 Pass Only — Day 2 Pass Required
              </span>
            </div>
            <button onClick={onDismiss} className="text-white/60 hover:text-white text-sm cursor-pointer">
              ✕
            </button>
          </div>

          <div className="mt-3">
            <h3 className="font-display text-lg font-bold text-white">{attendeeName}</h3>
            <p className="font-mono text-xs font-semibold text-marigold mt-1">{pass?.ticketCode}</p>

            <div className="mt-3 border border-chili/30 bg-grape-950 p-3 text-xs space-y-2">
              <p className="text-white/90 font-medium">{message}</p>
              <p className="text-white/60 text-[11px]">
                Registered Days:{" "}
                <span className="text-marigold font-mono">
                  {Array.isArray(data.daysAttending)
                    ? data.daysAttending.join(", ")
                    : data.daysAttending || "Day 1 Only"}
                </span>
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="/register-visitor"
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-marigold bg-marigold py-2.5 text-center text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold transition-colors"
              >
                Register Day 2 Pass →
              </a>
            </div>
          </div>
        </div>
      )
    case "cancelled":
    case "not_found":
    default:
      return (
        <div className="border-2 border-chili bg-chili/15 p-5 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-chili/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-chili text-white font-bold text-xs">
                ✕
              </span>
              <span className="font-display font-extrabold uppercase tracking-wider text-chili text-sm">
                {status === "cancelled" ? "Pass Cancelled" : "Invalid Ticket Code"}
              </span>
            </div>
            <button onClick={onDismiss} className="text-white/60 hover:text-white text-sm cursor-pointer">
              ✕
            </button>
          </div>

          <div className="mt-3 text-xs text-white/80">
            <p>{message}</p>
            {pass?.ticketCode && (
              <p className="mt-1 font-mono text-chili font-semibold">{pass.ticketCode}</p>
            )}
          </div>
        </div>
      )
  }
}