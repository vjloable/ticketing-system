"use client"

import { useState } from "react"
import { TextInput, TextAreaInput, SelectInput } from "./FormField"

export function ExhibitorForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: any) => void
  initialData?: { name?: string; email?: string }
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    brandName: "",
    contactPerson: initialData?.name || "",
    email: initialData?.email || "",
    phone: "",
    websiteOrSocial: "",
    productCategory: "Food & Beverage",
    boothSizePreference: "standard",
    specialRequirements: "",
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
          label="Brand / Display Name"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Registered Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Business Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput
          label="Contact Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+63 9XX XXX XXXX"
          required
        />
        <TextInput
          label="Social Media / Website"
          name="websiteOrSocial"
          value={formData.websiteOrSocial}
          onChange={handleChange}
          placeholder="fb.com/yourbrand or instagram"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectInput
          label="Product Category"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          options={[
            { label: "Food & Beverage / Restaurant", value: "Food & Beverage" },
            { label: "Coffee, Tea & Beverages", value: "Beverages" },
            { label: "Packaged Goods & Sauces", value: "Packaged Goods" },
            { label: "Kitchen Equipment & Tech", value: "Equipment" },
            { label: "Farm & Fresh Produce", value: "Farm Produce" },
          ]}
          required
        />
        <SelectInput
          label="Booth Space Preference"
          name="boothSizePreference"
          value={formData.boothSizePreference}
          onChange={handleChange}
          options={[
            { label: "Standard Booth (2m × 2m)", value: "standard" },
            { label: "Corner Premium Booth (3m × 3m)", value: "corner" },
            { label: "Custom Island Space", value: "custom" },
          ]}
          required
        />
      </div>

      <TextAreaInput
        label="Special Requirements / Power Requirements"
        name="specialRequirements"
        value={formData.specialRequirements}
        onChange={handleChange}
        placeholder="e.g. 220V electrical outlet, heavy refrigeration, cooking stove..."
      />

      <button
        type="submit"
        className="w-full border border-basil bg-basil py-4 text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-basil"
      >
        Submit Exhibitor Application →
      </button>
    </form>
  )
}