"use client"

import { use } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { PassPrintBadge } from "@/components/passes/PassPrintBadge"

export default function PrintPassPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const passId = resolvedParams.id
  const { user, isLoading } = useAuth()

  const pass = user?.passes.find((p) => p.id === passId || p.ticketCode === passId)

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-grape-950 text-white/50 eyebrow">
        Loading pass badge...
      </div>
    )
  }

  if (!user || !pass) {
    return (
      <div className="bg-grape-950 py-20 px-5 text-center min-h-[70vh]">
        <div className="mx-auto max-w-md border border-white/15 bg-grape-900 p-8">
          <h1 className="font-display text-2xl font-bold">Pass Not Found</h1>
          <p className="mt-2 text-sm text-white/60">
            Could not locate the requested pass for printing.
          </p>
          <Link
            href="/passes"
            className="mt-6 inline-block border border-marigold bg-marigold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-grape-950 cursor-pointer"
          >
            ← Back to My Passes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-grape-950 min-h-screen py-10 px-4 print:bg-white print:py-0 print:px-0">
      {/* Floating Action Controls (Hidden on Print) */}
      <div className="print:hidden mx-auto max-w-lg mb-8 bg-grape-900 border border-white/15 p-4 flex items-center justify-between gap-4">
        <Link
          href="/passes"
          className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-semibold"
        >
          ← Back to Passes
        </Link>
        <button
          onClick={handlePrint}
          className="border border-marigold bg-marigold px-5 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold cursor-pointer flex items-center gap-2"
        >
          <span>🖨️</span> Print Badge / Save PDF
        </button>
      </div>

      {/* Printable Badge Area */}
      <div className="print-badge-container flex justify-center items-center">
        <PassPrintBadge pass={pass} userName={user.name} />
      </div>
    </div>
  )
}