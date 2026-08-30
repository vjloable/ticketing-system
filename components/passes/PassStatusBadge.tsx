import { PassStatus } from "@/lib/pass-types"

export function PassStatusBadge({ status }: { status: PassStatus }) {
  switch (status) {
    case "active":
      return (
        <span className="border border-basil/40 bg-basil/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-basil">
          ● Active Pass
        </span>
      )
    case "checked_in":
      return (
        <span className="border border-lime/50 bg-lime/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime">
          ✓ Checked In
        </span>
      )
    case "pending_verification":
      return (
        <span className="border border-marigold/40 bg-marigold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-marigold">
          ⏳ Awaiting Verification
        </span>
      )
    case "cancelled":
      return (
        <span className="border border-chili/40 bg-chili/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-chili line-through">
          ✕ Cancelled
        </span>
      )
    default:
      return null
  }
}