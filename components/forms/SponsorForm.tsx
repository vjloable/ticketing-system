"use client"

import { useState } from "react"
import { TextInput, TextAreaInput, SelectInput } from "./FormField"

export function SponsorForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: any) => void
  initialData?: { name?: string; email?: string }
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: initialData?.name || "",
    email: initialData?.email || "",
    phone: "",
    sponsorshipTier: "platinum",
    customObjectives: "",
  })

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput
          label="Company / Organization Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Contact Person & Title"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput
          label="Official Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Contact Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+63 9XX XXX XXXX"
          required
        />
      </div>

      <SelectInput
        label="Desired Sponsorship Tier"
        name="sponsorshipTier"
        value={formData.sponsorshipTier}
        onChange={handleChange}
        options={[
          { label: "Presenting Partner (Title Sponsor)", value: "presenting" },
          { label: "Platinum Sponsor (Main Stage & Hall)", value: "platinum" },
          { label: "Gold Sponsor (Culinary Arena)", value: "gold" },
          { label: "Silver Sponsor (Badge & Directory Partner)", value: "silver" },
        ]}
        required
      />

      <TextAreaInput
        label="Sponsorship Goals / Custom Activations"
        name="customObjectives"
        value={formData.customObjectives}
        onChange={handleChange}
        placeholder="Describe how your brand would like to activate at OPFBEX 2026..."
      />

      <button
        type="submit"
        className="w-full border border-tangerine bg-tangerine py-4 text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-tangerine"
      >
        Submit Sponsor Proposal →
      </button>
    </form>
  )
}
