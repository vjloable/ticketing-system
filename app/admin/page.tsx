"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { AdminPassRecord, PassStatus, PassType } from "@/lib/pass-types"
import { AdminStatsCards } from "@/components/admin/AdminStatsCards"
import { PassStatusBadge } from "@/components/passes/PassStatusBadge"
import { AdminPassDetailModal } from "@/components/admin/AdminPassDetailModal"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [passes, setPasses] = useState<AdminPassRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<PassStatus | "all">("all")
  const [selectedType, setSelectedType] = useState<PassType | "all">("all")
  const [inspectingPass, setInspectingPass] = useState<AdminPassRecord | null>(null)
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const supabase = createClient()

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setFeedback({ text, type })
    setTimeout(() => setFeedback(null), 4000)
  }

  // Fetch all passes with profiles
  const fetchPasses = useCallback(async () => {
    try {
      const { data, error } = await supabase
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
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Failed to load passes: ", error)
        showToast("Error fetching passes from Supabase", "error")
        return
      }

      const formatted: AdminPassRecord[] = (data || []).map((row: any) => ({
        id: row.id,
        eventId: row.event_id,
        userId: row.user_id,
        passType: row.pass_type as PassType,
        ticketCode: row.ticket_code,
        status: row.status as PassStatus,
        formData: row.form_data || {},
        claimedAt: row.created_at,
        checkedInAt: row.checked_in_at,
        checkedInBy: row.checked_in_by,
        userProfile: row.profiles
          ? {
              id: row.profiles.id,
              fullName: row.profiles.full_name,
              email: row.profiles.email,
            }
          : undefined,
      }))

      setPasses(formatted)
    } catch (err) {
      console.error("Error in fetchPasses", err)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  // Realtime Postgres Changes Subscription
  useEffect(() => {
    fetchPasses()

    const channel = supabase
      .channel("admin-passes-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "passes" }, () => {
        fetchPasses()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchPasses, supabase])

  // Commercial Approval Handler
  const handleApproveCommercial = async (passId: string) => {
    const { error } = await supabase
      .from("passes")
      .update({
        status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("id", passId)

    if (error) {
      showToast(`Failed to approve pass: ${error.message}`, "error")
    } else {
      showToast("Pass approved and activated!", "success")
      fetchPasses()
    }
  }

  // Manual Check-In Handler
  const handleManualCheckIn = async (passId: string) => {
    const { error } = await supabase
      .from("passes")
      .update({
        status: "checked_in",
        checked_in_at: new Date().toISOString(),
        checked_in_by: user?.id || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", passId)

    if (error) {
      showToast(`Failed to check in pass: ${error.message}`, "error")
    } else {
      showToast("Attendee marked as Checked In!", "success")
      fetchPasses()
    }
  }

  // Revert / Undo Check-In Handler
  const handleRevertCheckIn = async (passId: string) => {
    const { error } = await supabase
      .from("passes")
      .update({
        status: "active",
        checked_in_at: null,
        checked_in_by: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", passId)

    if (error) {
      showToast(`Failed to undo check-in: ${error.message}`, "error")
    } else {
      showToast("Check-in reverted! Pass is active again.", "success")
      fetchPasses()
    }
  }

  // Filter Logic
  const filteredPasses = passes.filter((p) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      p.ticketCode.toLowerCase().includes(q) ||
      (p.formData?.fullName && String(p.formData.fullName).toLowerCase().includes(q)) ||
      (p.formData?.companyName && String(p.formData.companyName).toLowerCase().includes(q)) ||
      (p.formData?.email && String(p.formData.email).toLowerCase().includes(q)) ||
      (p.userProfile?.email && p.userProfile.email.toLowerCase().includes(q))

    const matchesStatus = selectedStatus === "all" || p.status === selectedStatus
    const matchesType = selectedType === "all" || p.passType === selectedType

    return matchesQuery && matchesStatus && matchesType
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredPasses.length / itemsPerPage) || 1
  const paginatedPasses = filteredPasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="py-8 px-5 sm:px-8 max-w-7xl mx-auto">
      {/* Header & Quick Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-6">
        <div>
          <div className="eyebrow text-marigold">On-Site Management</div>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold text-white">
            Attendee Directory & Ops
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchPasses()}
            className="border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
            title="Refresh list"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {feedback && (
        <div
          className={`mt-4 border p-3 text-xs font-semibold ${
            feedback.type === "success"
              ? "border-basil/50 bg-basil/10 text-basil"
              : "border-chili/50 bg-chili/10 text-chili"
          }`}
        >
          {feedback.type === "success" ? "✓" : "⚠️"} {feedback.text}
        </div>
      )}

      {/* Stats Cards Section */}
      <div className="mt-6">
        <AdminStatsCards passes={passes} />
      </div>

      {/* Search & Filters Toolbar */}
      <div className="mt-8 border border-white/12 bg-grape-900 p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by ticket code, name, company, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full border border-white/20 bg-grape-950 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-marigold focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Pass Type Filter */}
          <div className="flex items-center gap-3">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as any)
                setCurrentPage(1)
              }}
              className="border border-white/20 bg-grape-950 px-3 py-2 text-xs text-white focus:border-marigold focus:outline-none cursor-pointer"
            >
              <option value="all">All Pass Types</option>
              <option value="visitor">Visitor Passes</option>
              <option value="exhibitor">Exhibitor Passes</option>
              <option value="sponsor">Sponsor Passes</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
          {(["all", "active", "checked_in", "pending_verification", "cancelled"] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setSelectedStatus(st)
                setCurrentPage(1)
              }}
              className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedStatus === st
                  ? "border border-marigold bg-marigold text-grape-950"
                  : "border border-white/15 bg-grape-950 text-white/60 hover:text-white"
              }`}
            >
              {st.replace("_", " ")} ({passes.filter((p) => (st === "all" ? true : p.status === st)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Directory Table */}
      <div className="mt-6 border border-white/12 bg-grape-900 overflow-x-auto">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-white/50">Loading attendees...</div>
        ) : filteredPasses.length === 0 ? (
          <div className="p-12 text-center text-xs text-white/50">No attendee passes found matching filters.</div>
        ) : (
          <table className="w-full text-left text-xs text-white/80 border-collapse">
            <thead>
              <tr className="border-b border-white/12 bg-grape-950 text-[10px] uppercase tracking-wider text-white/50">
                <th className="py-3 px-4">Ticket Code</th>
                <th className="py-3 px-4">Attendee / Company</th>
                <th className="py-3 px-4">Pass Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4">Check-In</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedPasses.map((p) => {
                const name = p.formData?.fullName || p.formData?.contactPerson || p.userProfile?.fullName || "—"
                const company = p.formData?.companyName || p.formData?.organization || ""

                return (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    {/* Ticket Code */}
                    <td className="py-3 px-4 font-mono font-bold text-marigold tracking-wider whitespace-nowrap">
                      {p.ticketCode}
                    </td>

                    {/* Name & Company */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{name}</div>
                      {company && <div className="text-[11px] text-white/50">{company}</div>}
                    </td>

                    {/* Pass Type */}
                    <td className="py-3 px-4 uppercase font-bold text-[10px]">
                      <span
                        className={
                          p.passType === "visitor"
                            ? "text-marigold"
                            : p.passType === "exhibitor"
                            ? "text-basil"
                            : "text-tangerine"
                        }
                      >
                        {p.passType}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PassStatusBadge status={p.status} />
                    </td>

                    {/* Registered Date */}
                    <td className="py-3 px-4 text-white/50 whitespace-nowrap">
                      {new Date(p.claimedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Check In Date */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {p.checkedInAt ? (
                        <span className="text-lime text-[11px] font-semibold">
                          ✓ {new Date(p.checkedInAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>

                    {/* Row Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                      {p.status === "pending_verification" && (
                        <button
                          onClick={() => handleApproveCommercial(p.id)}
                          className="border border-basil bg-basil/20 px-2 py-1 text-[10px] font-bold uppercase text-basil hover:bg-basil hover:text-grape-950 transition-colors cursor-pointer"
                          title="Approve Commercial Pass"
                        >
                          Approve
                        </button>
                      )}

                      {p.status === "active" && (
                        <button
                          onClick={() => handleManualCheckIn(p.id)}
                          className="border border-lime bg-lime/20 px-2 py-1 text-[10px] font-bold uppercase text-lime hover:bg-lime hover:text-grape-950 transition-colors cursor-pointer"
                          title="Manual Check-In"
                        >
                          Check-In
                        </button>
                      )}

                      {p.status === "checked_in" && (
                        <button
                          onClick={() => handleRevertCheckIn(p.id)}
                          className="border border-marigold/40 bg-marigold/10 px-2 py-1 text-[10px] font-bold uppercase text-marigold hover:bg-marigold hover:text-grape-950 transition-colors cursor-pointer"
                          title="Undo / Revert Check-In"
                        >
                          Undo
                        </button>
                      )}

                      <button
                        onClick={() => setInspectingPass(p)}
                        className="border border-white/20 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase text-white hover:bg-white/15 cursor-pointer"
                      >
                        Details
                      </button>

                      <Link
                        href={`/passes/${p.id}/print`}
                        target="_blank"
                        className="border border-white/20 bg-white/5 px-2 py-1 text-[10px] font-semibold text-white/70 hover:text-white"
                        title="Print Badge"
                      >
                        🖨️
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-white/60">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredPasses.length)} of {filteredPasses.length} attendees
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border border-white/20 px-3 py-1 disabled:opacity-30 cursor-pointer"
            >
              Previous
            </button>
            <span className="py-1 px-2 font-semibold text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border border-white/20 px-3 py-1 disabled:opacity-30 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Inspect Registration Detail Modal */}
      {inspectingPass && (
        <AdminPassDetailModal
          pass={inspectingPass}
          onClose={() => setInspectingPass(null)}
          onApprove={handleApproveCommercial}
          onManualCheckIn={handleManualCheckIn}
          onRevertCheckIn={handleRevertCheckIn}
        />
      )}
    </div>
  )
}