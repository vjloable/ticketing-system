"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
// import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password || (isRegister && !name)) {
      setError("Please fill out all required fields.")
      return
    }

    try {
      if (isRegister) {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      router.push(redirect)
    } catch (err) {
      setError("An error occurred during authentication.")
    }
  }

  return (
    <div className="bg-grape-950 py-16 px-5">
      <div className="mx-auto max-w-md border border-white/12 bg-grape-900 p-8 sm:p-10">
        <div className="eyebrow text-marigold">Member Authentication</div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
          {isRegister ? "Create Member Account" : "Sign In to Account"}
        </h1>
        <p className="mt-2 text-sm text-white/60">
          {isRegister
            ? "Register to claim and access your event passes."
            : "Sign in to manage your claimed passes."}
        </p>

        {error && (
          <div className="mt-5 border border-chili/40 bg-chili/10 p-3 text-xs text-chili">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isRegister && (
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
          )}

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-white/15 bg-grape-950 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-marigold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full border border-marigold bg-marigold py-3 text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-marigold"
          >
            {isRegister ? "Create Account &amp; Continue" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister)
              setError("")
            }}
            className="text-xs text-white/60 hover:text-white"
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "Don&apos;t have an account? Register as Member"}
          </button>
        </div>
      </div>
    </div>
  )
}