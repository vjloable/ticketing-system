"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/Logo"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"

export function AdminNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [pendingCount, setPendingCount] = useState(0)

  // Fetch pending approval count + subscribe to realtime updates
  useEffect(() => {
    const supabase = createClient()

    const fetchPending = async () => {
      const { count } = await supabase
        .from("passes")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending_verification")
      setPendingCount(count || 0)
    }

    fetchPending()

    const channel = supabase
      .channel("admin-nav-pending")
      .on("postgres_changes", { event: "*", schema: "public", table: "passes" }, () => {
        fetchPending()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const links = [
    { label: "Attendee Directory", href: "/admin", icon: "📋" },
    { label: "QR Code Scanner", href: "/admin/scan", icon: "📷" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/12 bg-grape-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        {/* Left: Brand & Admin Tag */}
        <div className="flex items-center gap-4">
          <Logo compact />
          <span className="border border-marigold/40 bg-marigold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-marigold">
            Admin Ops
          </span>
          {/* Pending Badge */}
          {pendingCount > 0 && (
            <Link
              href="/admin"
              className="flex items-center gap-1 border border-marigold bg-marigold/20 px-2 py-0.5 text-[10px] font-bold text-marigold animate-pulse"
              title={`${pendingCount} passes awaiting approval`}
            >
              ⏳ {pendingCount} pending
            </Link>
          )}
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border border-marigold bg-marigold text-grape-950"
                    : "border border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right: Operator Badge & Sign Out */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-basil animate-pulse" />
              <span>{user?.name}</span>
            </div>
            <p className="text-[10px] text-white/50">{user?.email}</p>
          </div>

          <Link
            href="/passes"
            className="hidden border border-white/20 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10 lg:inline-block"
            title="Public Passes Portal"
          >
            My Passes
          </Link>

          <button
            onClick={() => logout()}
            className="border border-chili/30 bg-chili/10 px-3 py-1.5 text-xs font-semibold text-chili hover:bg-chili hover:text-white transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>
    </header>
  )
}