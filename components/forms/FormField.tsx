import React from "react"

export function TextInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  hint,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="eyebrow block text-white/70">
        {label} {required && <span className="text-chili">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-white/15 bg-grape-950 px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-marigold focus:outline-none"
      />
      {hint && <p className="text-xs text-white/40">{hint}</p>}
    </div>
  )
}

export function TextAreaInput({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 3,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="space-y-1.5">
      <label className="eyebrow block text-white/70">
        {label} {required && <span className="text-chili">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-white/15 bg-grape-950 px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-marigold focus:outline-none"
      />
    </div>
  )
}

export function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { label: string; value: string }[]
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="eyebrow block text-white/70">
        {label} {required && <span className="text-chili">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-white/15 bg-grape-950 px-4 py-3 text-sm text-white transition-colors focus:border-marigold focus:outline-none"
      >
        <option value="" disabled>Select an option...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-grape-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}