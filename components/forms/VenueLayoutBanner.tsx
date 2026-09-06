import { BANK_PAYMENT_DETAILS } from "@/lib/form-constants"

export function VenueLayoutBanner() {
  return (
    <a
      href={BANK_PAYMENT_DETAILS.venueLayoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="eyebrow inline-flex items-center gap-1.5 border border-marigold/40 bg-marigold/10 px-3 py-1.5 text-marigold transition-colors hover:bg-marigold hover:text-grape-950"
    >
      🗺 View Updated Venue Layout ↗
    </a>
  )
}