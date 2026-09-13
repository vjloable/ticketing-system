"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSentTo, setEmailSentTo] = useState<string | null>(null)
  const { user, register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  useEffect(() => {
    if (user) {
      router.push(redirect)
    }
  }, [user, redirect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all required fields.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await register(name.trim(), email.trim(), password)
      if (result.needsConfirmation) {
        setEmailSentTo(email.trim())
        return
      }
      router.push(redirect)
    } catch (err: any) {
      setError(err?.message || "An error occurred during account creation.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md border border-white/12 bg-grape-900 p-8 sm:p-10 text-center">
        <p className="eyebrow text-basil">Signed In</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Redirecting you...</h2>
      </div>
    )
  }

  // Confirmation email dispatch screen
  if (emailSentTo) {
    return (
      <div className="mx-auto max-w-md border border-white/12 bg-grape-900 p-8 sm:p-10 text-center">
        <div className="text-4xl">✉️</div>
        <div className="mt-3 eyebrow text-marigold">Check Your Inbox</div>
        <h1 className="mt-2 font-display text-2xl font-black sm:text-3xl">
          Confirm Your Account
        </h1>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          We&apos;ve sent a verification link to{" "}
          <span className="font-bold text-white">{emailSentTo}</span>.
        </p>
        <p className="mt-2 text-xs text-white/50">
          Please click the link in your email to activate your account.
        </p>

        <div className="mt-8 border-t border-white/10 pt-6">
          <Link
            href={`/signin${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="block w-full border border-marigold bg-marigold py-3 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md border border-white/12 bg-grape-900 p-8 sm:p-10">
      <div className="eyebrow text-marigold">New Member</div>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
        Create Member Account
      </h1>
      <p className="mt-2 text-sm text-white/60">
        Register a free account to secure and manage your event passes.
      </p>

      {error && (
        <div className="mt-5 border border-chili/40 bg-chili/10 p-3 text-xs text-chili">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="eyebrow block text-white/50 mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Dela Cruz"
            className="w-full border border-white/15 bg-grape-950 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-marigold focus:outline-none"
          />
        </div>

        <div>
          <label className="eyebrow block text-white/50 mb-1.5">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="juan@example.com"
            className="w-full border border-white/15 bg-grape-950 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-marigold focus:outline-none"
          />
        </div>

        <div>
          <label className="eyebrow block text-white/50 mb-1.5">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full border border-white/15 bg-grape-950 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-marigold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full border border-marigold bg-marigold py-3 text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-marigold cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Create Account & Continue →"}
        </button>
      </form>

      <div className="mt-6 border-t border-white/10 pt-4 text-center">
        <p className="text-xs text-white/60">
          Already have an account?{" "}
          <Link
            href={`/signin${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="font-semibold text-marigold hover:underline"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="bg-grape-950 py-16 px-5">
      <Suspense fallback={<div className="text-center text-white/50 eyebrow py-12">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}