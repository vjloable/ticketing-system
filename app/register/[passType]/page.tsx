"use client"

import { use } from "react"
import { useState } from "react"
import Link from "next/link"
import { PassType } from "@/lib/pass-types"
import { useAuth } from "@/lib/auth-context"
import { VisitorForm } from "@/components/forms/VisitorForm"
import { ExhibitorForm } from "@/components/forms/ExhibitorForm"
import { SponsorForm } from "@/components/forms/SponsorForm"

const passMeta: Record<
  PassType,
  { title: string; subtitle: string; badge: string; accent: string }
> = {
  visitor: {
    title: "Visitor Registration",
    subtitle: "Claim your pass for tastings, live cooking, and culinary showcases.",
    badge: "Visitor Pass",
    accent: "text-marigold border-marigold",
  },
  exhibitor: {
    title: "Exhibitor Registration",
    subtitle: "Reserve booth space and showcase your culinary brand to thousands.",
    badge: "Exhibitor Pass",
    accent: "text-basil border-basil",
  },
  sponsor: {
    title: "Sponsor Registration",
    subtitle: "Partner with OPFBEX 2026 for high-impact brand activations.",
    badge: "Sponsor Pass",
    accent: "text-tangerine border-tangerine",
  },
}

export default function RegisterPassPage({
  params,
}: {
  params: Promise<{ passType: string }>
}) {
  const resolvedParams = use(params)
  const passType = (resolvedParams.passType as PassType) || "visitor"
  const meta = passMeta[passType] || passMeta.visitor

  const { user, isLoading, claimPass } = useAuth()
  const [successPass, setSuccessPass] = useState<any>(null)

  const handleFormSubmit = (formData: any) => {
    if (!user) return
    const claimed = claimPass(passType, formData)
    setSuccessPass(claimed)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-grape-950">
        <p className="eyebrow text-white/50">Loading registration...</p>
      </div>
    )
  }

  // Auth requirement guard
  if (!user) {
    return (
      <div className="bg-grape-950 py-20 px-5">
        <div className="mx-auto max-w-xl border border-white/12 bg-grape-900 p-8 sm:p-12 text-center">
          <span className={`inline-block border px-3 py-1 text-xs font-bold uppercase tracking-wider ${meta.accent}`}>
            {meta.badge}
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Account Required
          </h1>
          <p className="mt-4 text-white/70 leading-relaxed">
            You need to be signed in to claim your{" "}
            <span className="font-semibold text-white">{meta.badge}</span>.
            Please sign in or create a free member account.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/login?redirect=/register/${passType}`}
              className="border border-marigold bg-marigold px-8 py-3 text-xs font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-marigold"
            >
              Sign In / Register Account
            </Link>
            <Link
              href="/"
              className="border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success Confirmation screen
  if (successPass) {
    return (
      <div className="bg-grape-950 py-20 px-5">
        <div className="mx-auto max-w-lg border border-white/15 bg-grape-900 p-8 sm:p-12 text-center">
          <span className="text-4xl">🎉</span>
          <div className="mt-4 eyebrow text-basil">Registration Successful</div>
          <h1 className="mt-2 font-display text-3xl font-black">You are Registered!</h1>
          <p className="mt-3 text-sm text-white/70">
            Your {meta.badge} has been attached to your member account.
          </p>

          <div className="my-8 border border-white/15 bg-grape-950 p-6 text-left">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="eyebrow text-white/40">Pass Code</span>
              <span className="font-display font-bold text-marigold tracking-wider">
                {successPass.ticketCode}
              </span>
            </div>
            <div className="mt-3 text-xs text-white/60 space-y-1">
              <p><span className="text-white/40">Type:</span> {meta.badge}</p>
              <p><span className="text-white/40">Holder:</span> {user.name}</p>
              <p><span className="text-white/40">Date:</span> Sept 19–20, 2026 · SMX Clark</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/passes"
              className="flex-1 border border-marigold bg-marigold py-3 text-center text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold"
            >
              View My Passes
            </Link>
            <Link
              href="/"
              className="flex-1 border border-white/20 py-3 text-center text-xs font-bold uppercase tracking-wider text-white hover:border-white"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-grape-950 py-16 px-5">
      <div className="mx-auto max-w-3xl border border-white/12 bg-grape-900 p-8 sm:p-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="eyebrow text-marigold">Pass Registration</div>
            <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-2 text-sm text-white/60">{meta.subtitle}</p>
          </div>
          <span className={`hidden sm:inline-block border px-3 py-1 text-xs font-bold uppercase tracking-wider ${meta.accent}`}>
            {meta.badge}
          </span>
        </div>

        <div className="mt-8">
          {passType === "visitor" && (
            <VisitorForm
              onSubmit={handleFormSubmit}
              initialData={{ name: user.name, email: user.email }}
            />
          )}
          {passType === "exhibitor" && (
            <ExhibitorForm
              onSubmit={handleFormSubmit}
              initialData={{ name: user.name, email: user.email }}
            />
          )}
          {passType === "sponsor" && (
            <SponsorForm
              onSubmit={handleFormSubmit}
              initialData={{ name: user.name, email: user.email }}
            />
          )}
        </div>
      </div>
    </div>
  )
}