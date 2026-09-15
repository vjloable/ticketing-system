import Link from "next/link"

export function PartnerPassesSection() {
  return (
    <section id="partner-passes" className="border-b border-white/12 bg-grape-950">
      <div className="mx-auto max-w-6xl border-x border-white/12 px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-6">
          <div>
            <div className="eyebrow text-marigold">Partner Opportunities</div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Join as an Exhibitor or Sponsor
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60">
            Showcase your culinary brand or partner with Central Luzon&apos;s fastest-growing food &amp; beverage expo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Exhibitor Card */}
          <div className="flex flex-col justify-between border border-white/12 bg-grape-900/60 p-8 transition-all hover:border-basil/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-basil">Exhibitor Registration</span>
                <span className="border border-basil/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-basil">
                  Booths Available
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">Exhibit Your Brand</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Put your products directly in front of 10,000+ hungry foodies, restaurateurs, distributors, and buyers.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <span className="text-basil">✓</span> Prime floor booth placement
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-basil">✓</span> Official OPFBEX directory listing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-basil">✓</span> Exhibitor pass badges for staff
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/register-exhibitor"
                className="inline-block w-full border border-basil bg-basil py-3 text-center text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-basil"
              >
                Register as Exhibitor →
              </Link>
            </div>
          </div>

          {/* Sponsor Card */}
          <div className="flex flex-col justify-between border border-white/12 bg-grape-900/60 p-8 transition-all hover:border-tangerine/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-tangerine">Sponsorship Program</span>
                <span className="border border-tangerine/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tangerine">
                  Custom Packages
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">Become an Official Sponsor</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Elevate your brand presence across main stage activations, digital banners, VIP lounges, and media coverage.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <span className="text-tangerine">✓</span> Premium stage &amp; hall branding
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-tangerine">✓</span> VIP access passes &amp; lounge privileges
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-tangerine">✓</span> Co-branded marketing campaigns
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/register-sponsor"
                className="inline-block w-full border border-tangerine bg-tangerine py-3 text-center text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors hover:bg-transparent hover:text-tangerine"
              >
                Register as Sponsor →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}