"use client"

import { useState } from "react"
import { TextInput } from "./FormField"
import { SponsorFormData } from "@/lib/pass-types"

const SPONSORSHIP_TIERS = [
  {
    id: "CO-PRESENTOR",
    name: "Co-Presentor",
    price: "₱2,000,000",
    accent: "border-marigold text-marigold bg-marigold/10",
    tag: "Exclusive",
    perks: [
      "Brand Exclusivity",
      "Year-round inclusion in all OPFBEX major & pocket activities",
      "FREE 6 units 2m × 3m booths inside SMX Halls",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "45 minutes on-stage air time for 2 days",
      "Branded special award in the Culinary Cup",
      "Banner display at SMX Lobby",
      "Inclusion in OPFBEX website inc. promotional videos & ads",
      "Access to all exhibitors & attendees database",
    ],
  },
  {
    id: "GOLD",
    name: "Gold Sponsor",
    price: "₱1,000,000",
    accent: "border-tangerine text-tangerine bg-tangerine/10",
    perks: [
      "Year-round inclusion in all OPFBEX major & pocket activities",
      "FREE 4 units 2m × 3m booths inside SMX Halls OR 1 unit 5m × 3m at SMX Lobby",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "30 minutes on-stage air time for 2 days",
      "Branded special award in the Culinary Cup",
      "Banner display at SMX Lobby",
      "Inclusion in OPFBEX website",
      "Access to all exhibitors & attendees database",
    ],
  },
  {
    id: "SILVER",
    name: "Silver Sponsor",
    price: "₱500,000",
    accent: "border-white/40 text-white bg-white/5",
    perks: [
      "FREE 3 units 2m × 3m booths inside SMX Halls",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "15 minutes on-stage air time for 2 days",
    ],
  },
  {
    id: "BRONZE",
    name: "Bronze Sponsor",
    price: "₱250,000",
    accent: "border-basil text-basil bg-basil/10",
    perks: [
      "FREE 1 unit 2m × 3m booths inside SMX Halls",
      "Inclusion in all road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "10 minutes on-stage air time for 2 days",
    ],
  },
  {
    id: "AFFILIATE",
    name: "Affiliate Partner",
    price: "₱100,000",
    accent: "border-lime text-lime bg-lime/10",
    perks: [
      "FREE 1 unit table space at SMX Lobby",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "Opportunity for flyering within expo halls",
    ],
  },
]

export function SponsorForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: SponsorFormData) => void
  initialData?: { name?: string; email?: string }
}) {
  const [formData, setFormData] = useState<SponsorFormData>({
    companyName: "",
    contactPerson: initialData?.name || "",
    email: initialData?.email || "",
    
    phone: "",
    sponsorshipTier: "",
    preferredBoothNo: "",
    boothWithShellStructure: "",
    sellingAtEvent: "",
    cookingOnSite: "",
    extraElectricalLoad: "",
    additionalIds: "",
    agree: false,
  })

  const [errorMsg, setErrorMsg] = useState("")

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!formData.sponsorshipTier) {
      setErrorMsg("Please select a Sponsorship Package tier.")
      return
    }
    if (!formData.boothWithShellStructure) {
      setErrorMsg("Please select whether you need a booth with shell structure.")
      return
    }
    if (!formData.sellingAtEvent) {
      setErrorMsg("Please indicate if you will be selling at the event.")
      return
    }
    if (!formData.cookingOnSite) {
      setErrorMsg("Please indicate if you will be cooking on-site.")
      return
    }
    if (!formData.extraElectricalLoad) {
      setErrorMsg("Please indicate if you need extra electrical load.")
      return
    }
    if (!formData.additionalIds.trim()) {
      setErrorMsg("Please answer the Additional IDs question (or indicate N/A).")
      return
    }
    if (!formData.agree) {
      setErrorMsg("You must check 'I agree' to proceed with your application.")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {errorMsg && (
        <div className="border border-chili/50 bg-chili/10 p-4 text-xs font-semibold text-chili">
          ⚠ {errorMsg}
        </div>
      )}

      {/* 1. Company & Contact Details */}
      <div className="space-y-6">
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-tangerine">
          1. Company &amp Representative Information
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Company / Brand Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleTextChange}
            placeholder="e.g. San Miguel Foods"
            required
          />
          <TextInput
            label="Contact Person &amp Designation"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleTextChange}
            placeholder="e.g. Juan Dela Cruz - Marketing Director"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Official Business Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleTextChange}
            placeholder="contact@company.com"
            required
          />
          <TextInput
            label="Contact Number"
            name="phone"
            value={formData.phone}
            onChange={handleTextChange}
            placeholder="+63 9XX XXX XXXX"
            required
          />
        </div>
      </div>

      {/* 2. Sponsorship Package Selection */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-2">
          <div>
            <h3 className="font-display text-base font-bold text-tangerine">
              2. Sponsorship Package Selection <span className="text-chili">*</span>
            </h3>
            <p className="text-xs text-white/50">Select your preferred sponsorship tier</p>
          </div>
          <a
            href="https://canva.link/59jgmeo05db"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-flex items-center gap-1.5 border border-marigold/40 bg-marigold/10 px-3 py-1.5 text-marigold transition-colors hover:bg-marigold hover:text-grape-950"
          >
            🗺 View Updated Venue Layout ↗
          </a>
        </div>

        <div className="space-y-3">
          {SPONSORSHIP_TIERS.map((tier) => {
            const isSelected = formData.sponsorshipTier === tier.id
            return (
              <div
                key={tier.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    sponsorshipTier: tier.id as any,
                  }))
                }
                className={`cursor-pointer border p-5 transition-all ${
                  isSelected
                    ? "border-tangerine bg-tangerine/10 shadow-lg shadow-tangerine/5"
                    : "border-white/10 bg-grape-950/60 hover:border-white/25"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="sponsorshipTier"
                      value={tier.id}
                      checked={isSelected}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sponsorshipTier: tier.id as any,
                        }))
                      }
                      className="accent-tangerine h-4 w-4"
                    />
                    <div>
                      <span className="font-display text-base font-bold text-white">
                        {tier.name}
                      </span>
                      {tier.tag && (
                        <span className="ml-2 border border-marigold px-1.5 py-0.5 text-[10px] font-bold uppercase text-marigold">
                          {tier.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-display text-lg font-extrabold tracking-tight text-tangerine">
                    {tier.price} CASH
                  </span>
                </div>

                <ul className="mt-4 grid gap-1.5 border-t border-white/10 pt-3 text-xs text-white/70 sm:grid-cols-2">
                  {tier.perks.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-tangerine">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Booth & Operational Requirements */}
      <div className="space-y-6">
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-tangerine">
          3. Booth &amp Logistics Specifications
        </h3>

        {/* Preferred Booth No */}
        <TextInput
          label="Preferred Booth No/s."
          name="preferredBoothNo"
          value={formData.preferredBoothNo}
          onChange={handleTextChange}
          placeholder="e.g. Booth 12, 14 (Refer to Venue Layout)"
          hint="Check the venue layout link above for available numbers."
          required
        />

        {/* Booth With Shell Structure */}
        <div className="space-y-2">
          <label className="eyebrow block text-white/70">
            Booth With Shell Structure <span className="text-chili">*</span>
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border p-3 text-sm transition-all ${
                  formData.boothWithShellStructure === opt
                    ? "border-tangerine bg-tangerine/10 text-white font-bold"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="boothWithShellStructure"
                  value={opt}
                  checked={formData.boothWithShellStructure === opt}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      boothWithShellStructure: opt as any,
                    }))
                  }
                  className="accent-tangerine h-4 w-4"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Selling at the event */}
        <div className="space-y-2">
          <label className="eyebrow block text-white/70">
            Will you be selling at the event? <span className="text-chili">*</span>
          </label>
          <p className="text-xs text-white/50">
            * We need this information so we can determine which participants require selling permits.
          </p>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border p-3 text-sm transition-all ${
                  formData.sellingAtEvent === opt
                    ? "border-tangerine bg-tangerine/10 text-white font-bold"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="sellingAtEvent"
                  value={opt}
                  checked={formData.sellingAtEvent === opt}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      sellingAtEvent: opt as any,
                    }))
                  }
                  className="accent-tangerine h-4 w-4"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking On-site */}
        <div className="space-y-2">
          <label className="eyebrow block text-white/70">
            Will you be cooking on-site? <span className="text-chili">*</span>
          </label>
          <div className="border border-white/10 bg-grape-950/60 p-3 text-xs leading-relaxed text-marigold">
            ⚠ Kindly note that only electric cooking is permitted. No open fire is allowed. The charge is ₱2,000 per day, to be paid directly to the venue management.
          </div>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border p-3 text-sm transition-all ${
                  formData.cookingOnSite === opt
                    ? "border-tangerine bg-tangerine/10 text-white font-bold"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="cookingOnSite"
                  value={opt}
                  checked={formData.cookingOnSite === opt}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      cookingOnSite: opt as any,
                    }))
                  }
                  className="accent-tangerine h-4 w-4"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Extra Electrical Load */}
        <div className="space-y-2">
          <label className="eyebrow block text-white/70">
            Do you need extra electrical load? <span className="text-chili">*</span>
          </label>
          <p className="text-xs text-white/50">
            * Each booth includes five (5) amperes. If yes, form will be sent to you for the additional electrical load.
          </p>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border p-3 text-sm transition-all ${
                  formData.extraElectricalLoad === opt
                    ? "border-tangerine bg-tangerine/10 text-white font-bold"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="extraElectricalLoad"
                  value={opt}
                  checked={formData.extraElectricalLoad === opt}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      extraElectricalLoad: opt as any,
                    }))
                  }
                  className="accent-tangerine h-4 w-4"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional IDs */}
        <TextInput
          label="Do you need additional Exhibitor/Sponsor ID?"
          name="additionalIds"
          value={formData.additionalIds}
          onChange={handleTextChange}
          placeholder="e.g. 2 IDs, or N/A"
          hint="*Each booth includes two (2) IDs. If yes, specify total number of IDs. If no, indicate N/A. Additional IDs cost ₱250.00 each."
          required
        />
      </div>

      {/* 4. Payment Details */}
      <div className="space-y-4 border border-white/15 bg-grape-950/90 p-6">
        <div className="eyebrow text-tangerine">Official Payment Details</div>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div>
            <span className="text-white/40 block">Bank Name:</span>
            <span className="font-semibold text-white text-sm">Security Bank</span>
          </div>
          <div>
            <span className="text-white/40 block">Account Type:</span>
            <span className="font-semibold text-white text-sm">Current</span>
          </div>
          <div>
            <span className="text-white/40 block">Account Name:</span>
            <span className="font-semibold text-white text-sm">Asuncion Family Ventures Inc.</span>
          </div>
          <div>
            <span className="text-white/40 block">Account Number:</span>
            <span className="font-mono font-bold text-marigold text-base tracking-wider">
              0000071667602
            </span>
          </div>
        </div>
      </div>

      {/* 5. Venue Layout & Terms Agreement */}
      <div className="space-y-4 border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">
            Please ensure you have reviewed the venue map before submitting.
          </span>
          <a
            href="https://canva.link/59jgmeo05db"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-marigold underline hover:text-white"
          >
            Click here for updated venue layout ↗
          </a>
        </div>

        <label className="flex cursor-pointer items-start gap-3 border border-white/15 bg-grape-950 p-4 text-sm font-semibold text-white">
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agree: e.target.checked }))
            }
            className="accent-tangerine mt-0.5 h-4 w-4 shrink-0"
            required
          />
          <span>
            I agree to the terms, payment conditions, and booth regulations of OPFBEX 2026. <span className="text-chili">*</span>
          </span>
        </label>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        className="w-full border border-tangerine bg-tangerine py-4 text-sm font-bold uppercase tracking-wider text-grape-950 transition-all hover:bg-transparent hover:text-tangerine"
      >
        Submit Sponsorship Application →
      </button>
    </form>
  )
}