"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import { AdminPassRecord, PassStatus, PassType } from "@/lib/pass-types"
import { AdminStatsCards } from "@/components/admin/AdminStatsCards"
import { PassStatusBadge } from "@/components/passes/PassStatusBadge"
import { AdminPassDetailModal } from "@/components/admin/AdminPassDetailModal"

type SortField = "name" | "passType" | "status" | "claimedAt" | "checkedInAt"
type SortDirection = "asc" | "desc"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [passes, setPasses] = useState<AdminPassRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  type FilterStatus = PassStatus | "all" | "day1_checked_in" | "day2_checked_in" | "both_days"
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("all")
  const [selectedType, _setSelectedType] = useState<PassType | "all">("all")
  const [inspectingPass, setInspectingPass] = useState<AdminPassRecord | null>(null)
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("claimedAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const itemsPerPage = 15

  const supabase = createClient()

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setFeedback({ text, type })
    setTimeout(() => setFeedback(null), 4000)
  }

  // CSV Export — respects current filters
  const exportToCSV = () => {
    const headers = [
      "Ticket Code", "Name", "Company", "Email", "Phone",
      "Pass Type", "Status", "Registered Days", "Registered At",
      "Checked In Day 1", "Checked In Day 2", "Latest Check In",
    ]
    const rows = filteredPasses.map((p) => [
      p.ticketCode,
      p.formData?.fullName || p.formData?.contactPerson || p.userProfile?.fullName || "",
      p.formData?.companyName || p.formData?.organization || "",
      p.formData?.email || p.userProfile?.email || "",
      p.formData?.phone || "",
      p.passType,
      p.status,
      Array.isArray(p.formData?.daysAttending) ? p.formData.daysAttending.join("; ") : p.formData?.daysAttending || "",
      new Date(p.claimedAt).toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      p.checkedInDay1At
        ? new Date(p.checkedInDay1At).toLocaleString("en-US", { timeZone: "Asia/Manila" })
        : "",
      p.checkedInDay2At
        ? new Date(p.checkedInDay2At).toLocaleString("en-US", { timeZone: "Asia/Manila" })
        : "",
      p.checkedInAt
        ? new Date(p.checkedInAt).toLocaleString("en-US", { timeZone: "Asia/Manila" })
        : "",
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `opfbex-attendees-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Column Sort Toggle
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortIndicator = (field: SortField) =>
    sortField === field ? (sortDirection === "asc" ? " ↑" : " ↓") : ""

  // Fetch all visitor passes using batching to bypass the 1,000 PostgREST limit
  const fetchPasses = useCallback(async () => {
    try {
      let allRows: any[] = []
      let from = 0
      const batchSize = 1000

      while (true) {
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
          .eq("pass_type", "visitor")
          .order("created_at", { ascending: false })
          .range(from, from + batchSize - 1)

        if (error) {
          console.error("Failed to load passes: ", error)
          showToast("Error fetching passes from Supabase", "error")
          return
        }

        if (!data || data.length === 0) break
        allRows.push(...data)
        if (data.length < batchSize) break
        from += batchSize
      }

      const formatted: AdminPassRecord[] = allRows.map((row: any) => ({
        id: row.id,
        eventId: row.event_id,
        userId: row.user_id,
        passType: row.pass_type as PassType,
        ticketCode: row.ticket_code,
        status: row.status as PassStatus,
        formData: row.form_data || {},
        claimedAt: row.created_at,
        checkedInAt: row.checked_in_at,
        checkedInDay1At: row.checked_in_day1_at,
        checkedInDay2At: row.checked_in_day2_at,
        checkedInBy: row.checked_in_by,
        checkedInDay1By: row.checked_in_day1_by,
        checkedInDay2By: row.checked_in_day2_by,
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
    const nowIso = new Date().toISOString()
    const { error } = await supabase
      .from("passes")
      .update({
        status: "checked_in",
        checked_in_day2_at: nowIso,
        checked_in_day2_by: user?.id || null,
        checked_in_at: nowIso,
        checked_in_by: user?.id || null,
        updated_at: nowIso,
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

    let matchesStatus = true
    if (selectedStatus === "all") {
      matchesStatus = true
    } else if (selectedStatus === "day1_checked_in") {
      matchesStatus = !!p.checkedInDay1At
    } else if (selectedStatus === "day2_checked_in") {
      matchesStatus = !!p.checkedInDay2At
    } else if (selectedStatus === "both_days") {
      matchesStatus = !!p.checkedInDay1At && !!p.checkedInDay2At
    } else {
      matchesStatus = p.status === selectedStatus
    }
    const matchesType = selectedType === "all" || p.passType === selectedType

    return matchesQuery && matchesStatus && matchesType
  })

  // Sort Logic
  const sortedPasses = [...filteredPasses].sort((a, b) => {
    const dir = sortDirection === "asc" ? 1 : -1
    switch (sortField) {
      case "name": {
        const nameA = (
          a.formData?.fullName || a.formData?.contactPerson || a.userProfile?.fullName || ""
        ).toLowerCase()
        const nameB = (
          b.formData?.fullName || b.formData?.contactPerson || b.userProfile?.fullName || ""
        ).toLowerCase()
        return nameA.localeCompare(nameB) * dir
      }
      case "passType":
        return a.passType.localeCompare(b.passType) * dir
      case "status":
        return a.status.localeCompare(b.status) * dir
      case "claimedAt":
        return (new Date(a.claimedAt).getTime() - new Date(b.claimedAt).getTime()) * dir
      case "checkedInAt": {
        const timeA = a.checkedInAt ? new Date(a.checkedInAt).getTime() : 0
        const timeB = b.checkedInAt ? new Date(b.checkedInAt).getTime() : 0
        return (timeA - timeB) * dir
      }
      default:
        return 0
    }
  })

  // Pagination Logic
  const totalPages = Math.ceil(sortedPasses.length / itemsPerPage) || 1
  const paginatedPasses = sortedPasses.slice(
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
            onClick={exportToCSV}
            className="border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
            title="Export filtered list as CSV"
          >
            📥 Export CSV
          </button>
          <button
            onClick={() => fetchPasses()}
            className="border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
            title="Refresh list"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Toast Notification — ARIA Live Region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-4">
        {feedback && (
          <div
            className={`border p-3 text-xs font-semibold ${
              feedback.type === "success"
                ? "border-basil/50 bg-basil/10 text-basil"
                : "border-chili/50 bg-chili/10 text-chili"
            }`}
          >
            {feedback.type === "success" ? "✓" : "⚠️"} {feedback.text}
          </div>
        )}
      </div>

      {/* Stats Cards Section */}
      <div className="mt-6">
        <AdminStatsCards passes={passes} />
      </div>

      {/* Search & Filters Toolbar */}
      <div className="mt-8 border border-white/12 bg-grape-900 p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="admin-search" className="sr-only">
              Search attendees by ticket code, name, company, or email
            </label>
            <input
              id="admin-search"
              type="search"
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
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Tabs with Multi-Day Support */}
        <div
          className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3"
          role="group"
          aria-label="Filter by pass status"
        >
          <span className="text-[10px] uppercase font-bold text-white/40 mr-1">Filter:</span>
          {(
            [
              { id: "all", label: "All", count: passes.length },
              { id: "day2_checked_in", label: "Day 2 Checked In", count: passes.filter((p) => !!p.checkedInDay2At).length },
              { id: "day1_checked_in", label: "Day 1 Checked In", count: passes.filter((p) => !!p.checkedInDay1At).length },
              { id: "both_days", label: "Both Days", count: passes.filter((p) => !!p.checkedInDay1At && !!p.checkedInDay2At).length },
              { id: "active", label: "Not Checked In", count: passes.filter((p) => p.status === "active").length },
              { id: "pending_verification", label: "Pending", count: passes.filter((p) => p.status === "pending_verification").length },
              { id: "cancelled", label: "Cancelled", count: passes.filter((p) => p.status === "cancelled").length },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedStatus(tab.id)
                setCurrentPage(1)
              }}
              aria-pressed={selectedStatus === tab.id}
              className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedStatus === tab.id
                  ? tab.id === "day2_checked_in"
                    ? "border border-basil bg-basil text-grape-950"
                    : tab.id === "day1_checked_in"
                    ? "border border-marigold bg-marigold text-grape-950"
                    : tab.id === "both_days"
                    ? "border border-lime bg-lime text-grape-950"
                    : "border border-white bg-white text-grape-950"
                  : "border border-white/15 bg-grape-950 text-white/60 hover:text-white"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Directory Table */}
      <div className="mt-6 border border-white/12 bg-grape-900 overflow-x-auto">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-white/50">Loading attendees...</div>
        ) : sortedPasses.length === 0 ? (
          <div className="p-12 text-center text-xs text-white/50">No attendee passes found matching filters.</div>
        ) : (
          <table className="w-full text-left text-xs text-white/80 border-collapse">
            <thead>
              <tr className="border-b border-white/12 bg-grape-950 text-[10px] uppercase tracking-wider text-white/50">
                <th className="py-3 px-4">Ticket Code</th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => toggleSort("name")}
                >
                  Attendee / Company{sortIndicator("name")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => toggleSort("status")}
                >
                  Status{sortIndicator("status")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => toggleSort("claimedAt")}
                >
                  Registered{sortIndicator("claimedAt")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors select-none"
                  onClick={() => toggleSort("checkedInAt")}
                >
                  Check-In{sortIndicator("checkedInAt")}
                </th>
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

                    {/* Check In Dates for Day 1 & Day 2 */}
                    <td className="py-3 px-4 whitespace-nowrap space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="text-white/40 uppercase">D1:</span>
                        {p.checkedInDay1At ? (
                          <span className="text-marigold font-mono font-semibold">
                            ✓ {new Date(p.checkedInDay1At).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="text-white/40 uppercase">D2:</span>
                        {p.checkedInDay2At ? (
                          <span className="text-basil font-mono font-semibold">
                            ✓ {new Date(p.checkedInDay2At).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </div>
                    </td>

                    {/* Simplified 1-Click Operations */}
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      {p.status === "active" && (
                        <button
                          onClick={() => handleManualCheckIn(p.id)}
                          className="border border-lime bg-lime/20 px-3 py-1 text-[11px] font-bold uppercase text-lime hover:bg-lime hover:text-grape-950 transition-colors cursor-pointer"
                          title="Manual Check-In"
                        >
                          ✓ Check-In
                        </button>
                      )}

                      {p.status === "checked_in" && (
                        <button
                          onClick={() => handleRevertCheckIn(p.id)}
                          className="border border-marigold/40 bg-marigold/10 px-3 py-1 text-[11px] font-bold uppercase text-marigold hover:bg-marigold hover:text-grape-950 transition-colors cursor-pointer"
                          title="Undo / Revert Check-In"
                        >
                          Revert
                        </button>
                      )}

                      <button
                        onClick={() => setInspectingPass(p)}
                        className="border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase text-white hover:bg-white/15 cursor-pointer"
                      >
                        Details
                      </button>

                      <Link
                        href={`/passes/${p.id}/print`}
                        target="_blank"
                        className="border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:text-white inline-block align-middle"
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
            {Math.min(currentPage * itemsPerPage, sortedPasses.length)} of {sortedPasses.length} attendees
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