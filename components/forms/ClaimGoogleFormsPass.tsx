"use client"

import { useState } from "react"
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

  const supabase = createClient()

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

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/passes/${claimedPass.passId}/print`}
            className="border border-marigold bg-marigold px-6 py-3 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold transition-colors cursor-pointer"
          >
            🖨️ Print Badge / Save PDF
          </Link>
          <button
            onClick={onBack}
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
        <label className="block eyebrow text-white/60 mb-2">Registered Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. juan@example.com"
          className="w-full border border-white/20 bg-grape-900 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-marigold focus:outline-none font-sans"
        />
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