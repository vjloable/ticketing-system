"use client"

import { useState } from "react"
import { TextInput, SelectInput } from "./FormField"

export function VisitorForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: any) => void
  initialData?: { name?: string; email?: string }
}) {
  const [formData, setFormData] = useState({
    fullName: initialData?.name || "",
    email: initialData?.email || "",
    phone: "",
    organization: "",
    jobTitle: "",
    daysAttending: "both",
    interests: "General Food Tasting",
    howDidYouHear: "Social Media",
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
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput
          label="Mobile Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+63 9XX XXX XXXX"
          required
        />
        <SelectInput
          label="Days Attending"
          name="daysAttending"
          value={formData.daysAttending}
          onChange={handleChange}
          options={[
            { label: "Both Days (Sept 19–20)", value: "both" },
            { label: "Day 1 Only (Sept 19)", value: "day1" },
            { label: "Day 2 Only (Sept 20)", value: "day2" },
          ]}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput
          label="Company / School (Optional)"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
        />
        <SelectInput
          label="Primary Interest"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          options={[
            { label: "General Food Tasting & Marketplace", value: "General Food Tasting" },
            { label: "Live Chef Demos & Competitions", value: "Chef Demos" },
            { label: "Artisan Coffee & Craft Beverages", value: "Craft Beverages" },
            { label: "B2B / Supplier Networking", value: "B2B Networking" },
          ]}
        />
      </div>

      <button
        type="submit"
        className="w-full border border-marigold bg-marigold py-4 text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-marigold"
      >
        Complete Visitor Registration →
      </button>
    </form>
  )
}