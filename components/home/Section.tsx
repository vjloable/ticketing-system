import React from "react"

export interface SectionProps {
  id?: string
  index: string
  label: string
  title: React.ReactNode
  children: React.ReactNode
  action?: React.ReactNode
}

export function Section({
  id,
  index,
  label,
  title,
  children,
  action,
}: SectionProps) {
  return (
    <section id={id} className="border-b border-white/12">
      <div className="mx-auto max-w-6xl border-x border-white/12 px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-6">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-white/30">{index}</span>
            <div>
              <div className="eyebrow text-marigold">{label}</div>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {title}
              </h2>
            </div>
          </div>
          {action}
        </div>
        <div className="pt-10">{children}</div>
      </div>
    </section>
  )
}