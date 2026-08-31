"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AdminNav } from "@/components/admin/AdminNav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-grape-950">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin border-2 border-marigold border-t-transparent mb-3" />
          <p className="eyebrow text-white/50">Verifying Admin Permissions...</p>
        </div>
      </div>
    )
  }

  // 2. Unauthenticated or Non-Admin State
  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-grape-950 px-5 py-20">
        <div className="mx-auto max-w-lg border border-chili/40 bg-grape-900 p-8 sm:p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-chili/40 bg-chili/10 text-2xl text-chili">
            🔒
          </div>
          <div className="eyebrow text-chili">Access Restricted</div>
          <h1 className="mt-2 font-display text-2xl font-bold uppercase text-white">
            Admin Credentials Required
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-white/60">
            You are signed in as <span className="font-semibold text-white">{user ? user.email : "Guest"}</span>. Only accounts with the <span className="text-marigold font-semibold">admin</span> role can access the OPFBEX On-Site Operations Portal.
          </p>

          <div className="mt-6 border border-white/10 bg-grape-950 p-4 text-left text-[11px] text-white/50">
            <p className="font-semibold text-white/80">Need Admin Access?</p>
            <p className="mt-1 font-mono text-[10px] text-marigold/80 select-all">
              UPDATE public.profiles SET role = &apos;admin&apos; WHERE email = &apos;{user?.email || "your-email@example.com"}&apos;;
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {user ? (
              <Link
                href="/passes"
                className="border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
              >
                Go to My Passes
              </Link>
            ) : (
              <Link
                href="/login?redirect=/admin"
                className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950"
              >
                Sign In with Admin Account
              </Link>
            )}
            <Link
              href="/"
              className="border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 3. Authorized Admin
  return (
    <div className="min-h-screen bg-grape-950">
      <AdminNav />
      <main>{children}</main>
    </div>
  )
}