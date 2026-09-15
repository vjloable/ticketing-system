import Link from "next/link"

export function CtaBanner() {
  return (
    <section className="border-b border-white/12 bg-chili">
      <div className="mx-auto max-w-6xl border-x border-grape-950/20 px-6 py-20 text-center">
        <div className="eyebrow text-grape-950/60">Four days of culinary excellence</div>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-black tracking-tight text-grape-950 sm:text-6xl">
          Come hungry. Leave inspired.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-grape-950/70">
          Secure your visitor pass for Central Luzon&apos;s tastiest weekend of the year.
        </p>
        <Link
          href="/register-visitor"
          className="mt-9 inline-block border border-grape-950 bg-grape-950 px-9 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-transparent hover:text-grape-950"
        >
          Register as Visitor →
        </Link>
      </div>
    </section>
  )
}