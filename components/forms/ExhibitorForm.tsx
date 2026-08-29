"use client"

import { useState } from "react"
import { TextInput } from "./FormField"
import { ExhibitorFormData } from "@/lib/pass-types"

const EXHIBITOR_PACKAGES = [
  {
    id: "MSME Booth",
    name: "MSME Booth",
    price: "₱25,000 net of VAT",
    duration: "2 days",
    accent: "border-basil text-basil bg-basil/10",
    specs: [
      "Size: 2m × 2m with booth shell",
      "2 Official Exhibitor IDs",
      "5 amperes electrical capacity",
      "Selling Permit from Mabalacat LGU",
    ],
  },
  {
    id: "FOOD EXHIBITOR",
    name: "Food Exhibitor",
    price: "₱40,000 – ₱45,000 net of VAT",
    duration: "2 days",
    accent: "border-marigold text-marigold bg-marigold/10",
    note: "₱40,000 (Own Structure) · ₱45,000 (With Booth Shell)",
    specs: [
      "Size: 3m × 3m",
      "4 Official Exhibitor IDs",
      "5 amperes electrical capacity",
      "Selling Permit from Mabalacat LGU",
    ],
  },
  {
    id: "NON-FOOD (SERVICES) EXHIBITOR",
    name: "Non-Food (Services) Exhibitor",
    price: "₱40,000 – ₱45,000 net of VAT",
    duration: "2 days",
    accent: "border-tangerine text-tangerine bg-tangerine/10",
    note: "₱40,000 (Own Structure) · ₱45,000 (With Booth Shell)",
    specs: [
      "Size: 3m × 3m",
      "4 Official Exhibitor IDs",
      "5 amperes electrical capacity",
      "Selling Permit from Mabalacat LGU",
    ],
  },
  {
    id: "LOBBY TABLE SPACE",
    name: "Lobby Table Space",
    price: "₱15,000 net of VAT",
    duration: "2 days",
    accent: "border-lime text-lime bg-lime/10",
    specs: [
      "Size: 1m × 1.5m booth space only",
      "2 Official Exhibitor IDs",
    ],
  },
]

export function ExhibitorForm({
  onSubmit,
  initialData,
  submitLabel = "Submit Exhibitor Application →",
}: {
  onSubmit: (data: ExhibitorFormData) => void
  initialData?: Partial<ExhibitorFormData> & { name?: string; email?: string }
  submitLabel?: string
}) {
  const [formData, setFormData] = useState<ExhibitorFormData>({
    companyName: initialData?.companyName || "",
    contactPerson: initialData?.contactPerson || initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    packageSelection: initialData?.packageSelection || "",
    numberOfBooths: initialData?.numberOfBooths || "",
    boothWithShellStructure: initialData?.boothWithShellStructure || "",
    sellingAtEvent: initialData?.sellingAtEvent || "",
    cookingOnSite: initialData?.cookingOnSite || "",
    additionalIds: initialData?.additionalIds || "",
    additionalFurniture: initialData?.additionalFurniture || "",
    agree: initialData?.agree || false,
  })

  const [errorMsg, setErrorMsg] = useState("")

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!formData.packageSelection) {
      setErrorMsg("Please select an Exhibitor Package.")
      return
    }
    if (!formData.numberOfBooths.trim()) {
      setErrorMsg("Please indicate how many booths you need.")
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
    if (!formData.additionalIds.trim()) {
      setErrorMsg("Please answer the Additional IDs question (or indicate N/A).")
      return
    }
    if (!formData.additionalFurniture.trim()) {
      setErrorMsg("Please answer the Additional Tables/Chairs question (or indicate N/A).")
      return
    }
    if (!formData.agree) {
      setErrorMsg("You must check 'I agree' to confirm your application.")
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
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-basil">
          1. Exhibitor &amp; Representative Information
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Company / Brand Display Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleTextChange}
            placeholder="e.g. Kapampangan Delights"
            required
          />
          <TextInput
            label="Contact Person &amp; Title"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleTextChange}
            placeholder="e.g. Maria Santos - Owner"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Business Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleTextChange}
            placeholder="info@brand.com"
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

      {/* 2. Package Selection */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-2">
          <div>
            <h3 className="font-display text-base font-bold text-basil">
              2. Exhibitor Package Selection <span className="text-chili">*</span>
            </h3>
            <p className="text-xs text-white/50">Select your preferred booth package</p>
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

        <div className="grid gap-4 sm:grid-cols-2">
          {EXHIBITOR_PACKAGES.map((pkg) => {
            const isSelected = formData.packageSelection === pkg.id
            return (
              <div
                key={pkg.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    packageSelection: pkg.id as any,
                  }))
                }
                className={`flex flex-col justify-between cursor-pointer border p-5 transition-all ${
                  isSelected
                    ? "border-basil bg-basil/10 shadow-lg shadow-basil/5"
                    : "border-white/10 bg-grape-950/60 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="packageSelection"
                      value={pkg.id}
                      checked={isSelected}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          packageSelection: pkg.id as any,
                        }))
                      }
                      className="accent-basil h-4 w-4"
                    />
                    <span className="font-display text-base font-bold text-white">
                      {pkg.name}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="font-display text-lg font-extrabold text-basil">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-white/45 ml-1">for {pkg.duration}</span>
                  </div>

                  {pkg.note && (
                    <p className="mt-1 text-[11px] font-medium text-white/60">
                      {pkg.note}
                    </p>
                  )}

                  <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-xs text-white/70">
                    {pkg.specs.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-basil">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Booth & Operational Requirements */}
      <div className="space-y-6">
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-basil">
          3. Booth &amp; Operational Details
        </h3>

        {/* How many booths */}
        <TextInput
          label="How Many Booths?"
          name="numberOfBooths"
          value={formData.numberOfBooths}
          onChange={handleTextChange}
          placeholder="e.g. 1 booth, 2 booths"
          required
        />

        {/* Booth With Shell Structure */}
        <div className="space-y-2">
          <label className="eyebrow block text-white/70">
            Booth With Shell Structure? <span className="text-chili">*</span>
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border p-3 text-sm transition-all ${
                  formData.boothWithShellStructure === opt
                    ? "border-basil bg-basil/10 text-white font-bold"
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
                  className="accent-basil h-4 w-4"
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
                    ? "border-basil bg-basil/10 text-white font-bold"
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
                  className="accent-basil h-4 w-4"
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
                    ? "border-basil bg-basil/10 text-white font-bold"
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
                  className="accent-basil h-4 w-4"
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
          placeholder="e.g. 2 additional IDs, or N/A"
          hint="*Each booth includes two (2) IDs. If yes, specify total number of IDs. If no, indicate N/A. Additional IDs cost ₱250.00 each."
          required
        />

        {/* Additional Furniture */}
        <TextInput
          label="Do you require additional tables and/or chairs?"
          name="additionalFurniture"
          value={formData.additionalFurniture}
          onChange={handleTextChange}
          placeholder="e.g. 1 extra table, 2 extra chairs, or N/A"
          hint="*Each booth includes one (1) table and two (2) chairs. If you require additional furniture, indicate quantity needed, or N/A."
          required
        />
      </div>

      {/* 4. Payment Details */}
      <div className="space-y-4 border border-white/15 bg-grape-950/90 p-6">
        <div className="eyebrow text-basil">Official Payment Details</div>
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

      {/* 5. Venue Layout & Agreement */}
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
            className="accent-basil mt-0.5 h-4 w-4 shrink-0"
            required
          />
          <span>
            By submitting this form, the exhibitor confirms their interest in participating in the One Pampanga Food &amp; Beverage Expo 2026 and agrees to comply with the rules, regulations, and guidelines set by the organizers. <span className="text-chili">*</span>
          </span>
        </label>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        className="w-full border border-basil bg-basil py-4 text-sm font-bold uppercase tracking-wider text-grape-950 transition-all hover:bg-transparent hover:text-basil cursor-pointer"
      >
        {submitLabel}
      </button>
    </form>
  )
}