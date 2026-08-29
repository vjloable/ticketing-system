"use client"

import { useState } from "react"
import { TextInput } from "./FormField"
import { VisitorFormData } from "@/lib/pass-types"

const AGE_OPTIONS = [
  "Below 13 years old",
  "13 - 17 years old",
  "18 - 24 years old",
  "25 - 34 years old",
  "35 - 44 years old",
  "45 - 54 years old",
  "55 years old and above",
]

const PURPOSE_OPTIONS = [
  {
    id: "b2b",
    label: "B2B Networking & Sourcing: Looking for new F&B suppliers, ingredients, or raw materials",
  },
  {
    id: "franchise",
    label: "Franchise & Business Opportunities: Exploring food franchises, dealership, or distributorships",
  },
  {
    id: "equipment",
    label: "Equipment & Technology: Sourcing kitchen equipment, packaging, or tech solutions",
  },
  {
    id: "coffee",
    label: "Coffee & Beverage Sourcing: Looking for coffee bean/matcha suppliers, equipment, or cafe concepts (ONE Coffee & Matcha Fest)",
  },
  {
    id: "culinary",
    label: "Culinary Showcase & Competitions: Attending/Supporting the One Pampanga Culinary Competition (OPCC)",
  },
  {
    id: "tasting",
    label: "General Visitor / Food Tasting: Exploring local food brands and consumer products",
  },
]

const DAY_OPTIONS = [
  "Day 1: September 19, 2026 (Saturday)",
  "Day 2: September 20, 2026 (Sunday)",
]

const HEAR_OPTIONS = [
  "Social Media (Facebook / Instagram / TikTok)",
  "Directly invited by an Exhibitor / Partner",
  "Email Newsletter / Online Announcement",
  "Billboard / Poster / Streamer",
  "Word of Mouth / Friend or Colleague",
]

export function VisitorForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: VisitorFormData) => void
  initialData?: { name?: string; email?: string }
}) {
  const [formData, setFormData] = useState<VisitorFormData>({
    fullName: initialData?.name || "",
    email: initialData?.email || "",
    phone: "",
    organization: "",
    jobTitle: "",
    cityProvince: "",
    age: "",
    purposes: [],
    otherPurpose: "",
    daysAttending: [],
    howDidYouHear: "",
    privacyConsent: false,
  })

  const [hasOtherPurpose, setHasOtherPurpose] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePurposeToggle = (label: string) => {
    setFormData((prev) => {
      const exists = prev.purposes.includes(label)
      return {
        ...prev,
        purposes: exists
          ? prev.purposes.filter((p) => p !== label)
          : [...prev.purposes, label],
      }
    })
  }

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const exists = prev.daysAttending.includes(day)
      return {
        ...prev,
        daysAttending: exists
          ? prev.daysAttending.filter((d) => d !== day)
          : [...prev.daysAttending, day],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!formData.age) {
      setErrorMsg("Please select your age bracket.")
      return
    }

    if (formData.purposes.length === 0 && (!hasOtherPurpose || !formData.otherPurpose?.trim())) {
      setErrorMsg("Please select at least one primary purpose for attending.")
      return
    }

    if (formData.daysAttending.length === 0) {
      setErrorMsg("Please select at least one day you plan to attend.")
      return
    }

    if (!formData.howDidYouHear) {
      setErrorMsg("Please tell us how you heard about OPFBEX 2026.")
      return
    }

    if (!formData.privacyConsent) {
      setErrorMsg("You must agree to the Data Privacy Consent terms to complete registration.")
      return
    }

    const payload: VisitorFormData = {
      ...formData,
      purposes: hasOtherPurpose && formData.otherPurpose?.trim()
        ? [...formData.purposes, `Other: ${formData.otherPurpose.trim()}`]
        : formData.purposes,
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errorMsg && (
        <div className="border border-chili/50 bg-chili/10 p-4 text-xs font-semibold text-chili">
          ⚠ {errorMsg}
        </div>
      )}

      {/* 1. Basic Info */}
      <div className="space-y-6">
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-marigold">
          1. Personal &amp; Contact Information
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleTextChange}
            placeholder="Juan Dela Cruz"
            required
          />
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleTextChange}
            placeholder="juan@example.com"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Mobile Number"
            name="phone"
            value={formData.phone}
            onChange={handleTextChange}
            placeholder="+63 9XX XXX XXXX"
            required
          />
          <TextInput
            label="City / Province"
            name="cityProvince"
            value={formData.cityProvince}
            onChange={handleTextChange}
            placeholder="Angeles City, Pampanga"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <TextInput
            label="Company / Organization Name"
            name="organization"
            value={formData.organization || ""}
            onChange={handleTextChange}
            placeholder="Optional"
          />
          <TextInput
            label="Job Title / Role"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleTextChange}
            placeholder="Optional"
          />
        </div>
      </div>

      {/* 2. Age Selection */}
      <div className="space-y-4">
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-marigold">
          2. Age Bracket <span className="text-chili">*</span>
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {AGE_OPTIONS.map((age) => {
            const isSelected = formData.age === age
            return (
              <label
                key={age}
                className={`flex cursor-pointer items-center gap-3 border p-3 text-sm transition-all ${
                  isSelected
                    ? "border-marigold bg-marigold/10 text-white font-medium"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="age"
                  value={age}
                  checked={isSelected}
                  onChange={() => setFormData((prev) => ({ ...prev, age }))}
                  className="accent-marigold h-4 w-4"
                />
                <span>{age}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 3. Primary Purpose */}
      <div className="space-y-4">
        <div>
          <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-marigold">
            3. Primary Purpose for Attending <span className="text-chili">*</span>
          </h3>
          <p className="mt-1 text-xs text-white/50">Check all that apply</p>
        </div>

        <div className="space-y-2.5">
          {PURPOSE_OPTIONS.map((opt) => {
            const checked = formData.purposes.includes(opt.label)
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-start gap-3 border p-3.5 text-sm transition-all ${
                  checked
                    ? "border-marigold bg-marigold/10 text-white font-medium"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handlePurposeToggle(opt.label)}
                  className="accent-marigold mt-0.5 h-4 w-4 shrink-0"
                />
                <span className="leading-snug">{opt.label}</span>
              </label>
            )
          })}

          {/* Other option */}
          <div
            className={`border p-3.5 transition-all ${
              hasOtherPurpose
                ? "border-marigold bg-marigold/10 text-white"
                : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
            }`}
          >
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={hasOtherPurpose}
                onChange={(e) => setHasOtherPurpose(e.target.checked)}
                className="accent-marigold h-4 w-4 shrink-0"
              />
              <span>Other:</span>
            </label>
            {hasOtherPurpose && (
              <input
                type="text"
                placeholder="Please specify your purpose..."
                value={formData.otherPurpose || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, otherPurpose: e.target.value }))
                }
                className="mt-3 w-full border border-white/20 bg-grape-950 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-marigold focus:outline-none"
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. Days Attending */}
      <div className="space-y-4">
        <div>
          <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-marigold">
            4. Which days do you plan to attend? <span className="text-chili">*</span>
          </h3>
          <p className="mt-1 text-xs text-white/50">Check all that apply</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {DAY_OPTIONS.map((day) => {
            const checked = formData.daysAttending.includes(day)
            return (
              <label
                key={day}
                className={`flex cursor-pointer items-center gap-3 border p-4 text-sm transition-all ${
                  checked
                    ? "border-marigold bg-marigold/10 text-white font-semibold"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleDayToggle(day)}
                  className="accent-marigold h-4 w-4"
                />
                <span>{day}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 5. How did you hear */}
      <div className="space-y-4">
        <h3 className="border-b border-white/10 pb-2 font-display text-base font-bold text-marigold">
          5. How did you hear about OPFBEX 2026? <span className="text-chili">*</span>
        </h3>
        <div className="space-y-2">
          {HEAR_OPTIONS.map((opt) => {
            const isSelected = formData.howDidYouHear === opt
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 border p-3 text-sm transition-all ${
                  isSelected
                    ? "border-marigold bg-marigold/10 text-white font-medium"
                    : "border-white/10 bg-grape-950/60 text-white/70 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="howDidYouHear"
                  value={opt}
                  checked={isSelected}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, howDidYouHear: opt }))
                  }
                  className="accent-marigold h-4 w-4"
                />
                <span>{opt}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 6. Data Privacy Consent */}
      <div className="space-y-4 border border-white/15 bg-grape-950/80 p-6">
        <h3 className="eyebrow text-marigold">Data Privacy Consent</h3>
        <div className="space-y-2 text-xs leading-relaxed text-white/65">
          <p>
            By submitting this form, you agree and give consent to OPFBEX / Project One to
            collect, process, and store your personal information strictly for event
            registration, identification, access control, and official communication regarding
            OPFBEX 2026 and OPCC 2026.
          </p>
          <p>
            In compliance with the Data Privacy Act of 2012 (RA 10173), your personal data will
            remain confidential, secure, and will not be shared with unauthorized third parties
            without your prior permission. If you wish to update or remove your details from our
            system, you may contact us at{" "}
            <span className="text-basil">opfbexofficial@gmail.com</span>.
          </p>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-3 border-t border-white/10 pt-4 text-xs font-semibold text-white">
          <input
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, privacyConsent: e.target.checked }))
            }
            className="accent-marigold mt-0.5 h-4 w-4 shrink-0"
            required
          />
          <span>
            Yes, I have read and agree to the Data Privacy Consent terms for OPFBEX 2026. <span className="text-chili">*</span>
          </span>
        </label>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        className="w-full border border-marigold bg-marigold py-4 text-sm font-bold uppercase tracking-wider text-grape-950 transition-all hover:bg-transparent hover:text-marigold"
      >
        Complete Visitor Registration →
      </button>
    </form>
  )
}
