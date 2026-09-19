"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"

interface ClaimGoogleFormsPassProps {
  onBack: () => void
}

export function ClaimGoogleFormsPass({ onBack }: ClaimGoogleFormsPassProps) {
  const { user, refreshUserPasses } = useAuth()
  const [email, setEmail] = useState(user?.email || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [claimedPass, setClaimedPass] = useState<{
    passId: string
    ticketCode: string
    fullName: string
    alreadyClaimed: boolean
  } | null>(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  // Live Search state
  const [searchResults, setSearchResults] = useState<Array<{
    id: string
    full_name: string
    email: string
    organization?: string
    pass_id?: string
  }>>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleDirectCheckIn = async () => {
    if (!claimedPass?.passId || isCheckedIn || isCheckingIn) return
    setIsCheckingIn(true)
    setToastMessage(null)

    try {
      const { error: rpcErr } = await supabase.rpc("check_in_express_pass", {
        p_pass_id: claimedPass.passId,
      })

      if (rpcErr) throw rpcErr

      setIsCheckedIn(true)
      const formattedTime = new Date().toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      setToastMessage({
        text: `✓ ${claimedPass.fullName} checked in at ${formattedTime}!`,
        type: "success",
      })
    } catch (err: any) {
      setToastMessage({
        text: err.message || "Failed to check in pass",
        type: "error",
      })
    } finally {
      setIsCheckingIn(false)
    }
  }

  const supabase = createClient()

  // 300ms debounced live search by Name OR Email
  useEffect(() => {
    const query = email.trim()
    if (query.length < 2) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      const { data } = await supabase
        .from("google_forms_registrants")
        .select("id, full_name, email, organization, pass_id")
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(6)

      setSearchResults(data || [])
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [email, supabase])

  // One-click: Claim + Auto Check-In
  const handleSelectRegistrant = async (reg: { full_name: string; email: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Claim Google Forms Pass
      const { data, error: rpcError } = await supabase.rpc("claim_google_forms_pass", {
        p_email: reg.email.trim().toLowerCase(),
        p_user_id: user?.id || null,
      })

      if (rpcError) throw rpcError
      if (!data?.success) {
        setError("Could not generate pass for this registrant.")
        return
      }

      // 2. Automatically record check-in
      const targetPassId = data.pass_id
      await supabase.rpc("check_in_express_pass", {
        p_pass_id: targetPassId,
      })

      const formattedTime = new Date().toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })

      setClaimedPass({
        passId: targetPassId,
        ticketCode: data.ticket_code,
        fullName: data.full_name || reg.full_name,
        alreadyClaimed: data.already_claimed,
      })
      setIsCheckedIn(true)
      setToastMessage({
        text: `✓ ${data.full_name || reg.full_name} checked in at ${formattedTime}!`,
        type: "success",
      })
      setSearchResults([])
      await refreshUserPasses()
    } catch (err: any) {
      setError(err.message || "An error occurred while claiming pass.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const { data, error: rpcError } = await supabase.rpc("claim_google_forms_pass", {
        p_email: email.trim().toLowerCase(),
        p_user_id: user?.id || null,
      })

      if (rpcError) throw rpcError

      if (!data.success) {
        setError("No Google Forms registration was found with this email. Please check for typos or register as a new visitor.")
      } else {
        setClaimedPass({
          passId: data.pass_id,
          ticketCode: data.ticket_code,
          fullName: data.full_name,
          alreadyClaimed: data.already_claimed,
        })
        await refreshUserPasses()
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while looking up your registration.")
    } finally {
      setIsLoading(false)
    }
  }

  if (claimedPass) {
    return (
      <div className="border border-basil/40 bg-grape-950 p-6 sm:p-8 text-center">
        <span className="text-4xl">🎉</span>
        <div className="mt-3 eyebrow text-basil">
          {claimedPass.alreadyClaimed ? "Pass Found" : "Pass Activated from Google Forms!"}
        </div>
        <h2 className="mt-1 font-display text-2xl font-bold text-white">
          Welcome, {claimedPass.fullName}
        </h2>
        <p className="mt-2 text-xs text-white/60">
          Your official OPFBEX 2026 Visitor Pass and QR Code have been generated.
        </p>

        <div className="my-6 border border-white/15 bg-grape-900 p-4">
          <div className="eyebrow text-white/40">Official Ticket Code</div>
          <div className="font-mono text-xl font-bold text-marigold tracking-widest mt-1">
            {claimedPass.ticketCode}
          </div>
          <div className="mt-2 text-[11px] text-white/50">
            Show this code or print your badge for entry at SMX Clark.
          </div>
        </div>

        {/* In-place Toast Notification */}
        {toastMessage && (
          <div
            className={`my-4 border p-3 text-xs font-semibold ${
              toastMessage.type === "success"
                ? "border-basil/60 bg-basil/15 text-basil"
                : "border-chili/60 bg-chili/15 text-chili"
            }`}
          >
            {toastMessage.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Instant In-Place Check-In Button */}
          <button
            type="button"
            onClick={handleDirectCheckIn}
            disabled={isCheckingIn || isCheckedIn}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              isCheckedIn
                ? "border-basil/50 bg-basil/20 text-basil cursor-default"
                : "border-emerald-500 bg-emerald-500 text-grape-950 hover:bg-transparent hover:text-emerald-400 disabled:opacity-50"
            }`}
          >
            {isCheckingIn
              ? "Checking in..."
              : isCheckedIn
              ? "✓ Checked In"
              : "⚡ Check-In Now"}
          </button>

          <Link
            href={`/passes/${claimedPass.passId}/print`}
            className="border border-marigold bg-marigold px-6 py-3 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold transition-colors cursor-pointer"
          >
            🖨️ Print Badge / Save PDF
          </Link>
          <button
            onClick={() => {
              setIsCheckedIn(false)
              setToastMessage(null)
              onBack()
            }}
            className="border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleClaim} className="border border-marigold/30 bg-grape-950 p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="eyebrow text-marigold">Pre-Registered via Google Forms</div>
          <h2 className="font-display text-xl font-bold text-white">Claim Your Official Badge</h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-white/50 hover:text-white cursor-pointer"
        >
          ← Back to Normal Form
        </button>
      </div>

      <p className="text-xs text-white/70 leading-relaxed">
        If you already completed our Google Forms registration earlier, enter the email address you used. We will verify your submission and generate your QR pass badge.
      </p>

      {error && (
        <div className="border border-chili/40 bg-chili/10 p-3 text-xs text-chili">
          ⚠ {error}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block eyebrow text-white/60">Search Registrant (Name or Email)</label>
          {isSearching && <span className="text-[10px] text-marigold animate-pulse">Searching...</span>}
        </div>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type at least 2 letters (e.g. 'zamora', 'garcia', or email)"
          className="w-full border border-white/20 bg-grape-900 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-marigold focus:outline-none font-sans"
        />

        {/* Live Matching Results List */}
        {searchResults.length > 0 && (
          <div className="mt-2 border border-white/15 bg-grape-900 divide-y divide-white/10 overflow-hidden shadow-2xl">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-marigold bg-grape-950/80">
              Matching Registrants ({searchResults.length}) — Click to Check In:
            </div>
            {searchResults.map((reg) => (
              <button
                key={reg.id}
                type="button"
                onClick={() => handleSelectRegistrant(reg)}
                disabled={isLoading}
                className="w-full text-left p-3 hover:bg-grape-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-marigold transition-colors">
                    {reg.full_name}
                  </div>
                  <div className="text-xs text-white/50">
                    {reg.email} {reg.organization ? `• ${reg.organization}` : ""}
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 border border-emerald-500/50 bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-grape-950 transition-colors">
                  ⚡ Check In
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !email.trim()}
        className="w-full border border-marigold bg-marigold py-3.5 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold disabled:opacity-40 transition-colors cursor-pointer"
      >
        {isLoading ? "Searching Records..." : "Lookup & Generate Badge →"}
      </button>
    </form>
  )
}