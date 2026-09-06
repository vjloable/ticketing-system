import { BANK_PAYMENT_DETAILS } from "@/lib/form-constants"

export function PaymentDetailsCard({ accentColor = "text-marigold" }: { accentColor?: string }) {
  return (
    <div className="space-y-4 border border-white/15 bg-grape-950/90 p-6">
      <div className={`eyebrow ${accentColor}`}>Official Payment Details</div>
      <div className="grid gap-4 sm:grid-cols-2 text-xs">
        <div>
          <span className="text-white/40 block">Bank Name:</span>
          <span className="font-semibold text-white text-sm">{BANK_PAYMENT_DETAILS.bankName}</span>
        </div>
        <div>
          <span className="text-white/40 block">Account Type:</span>
          <span className="font-semibold text-white text-sm">{BANK_PAYMENT_DETAILS.accountType}</span>
        </div>
        <div>
          <span className="text-white/40 block">Account Name:</span>
          <span className="font-semibold text-white text-sm">{BANK_PAYMENT_DETAILS.accountName}</span>
        </div>
        <div>
          <span className="text-white/40 block">Account Number:</span>
          <span className="font-mono font-bold text-marigold text-base tracking-wider">
            {BANK_PAYMENT_DETAILS.accountNumber}
          </span>
        </div>
      </div>
    </div>
  )
}