import Link from "next/link"
import Image from "next/image"

export function CtaBanner() {
  return (
    <section className="border-b border-white/12 bg-grape-950 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br from-grape-900 via-grape-950 to-grape-900 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 grid gap-8 md:grid-cols-12 md:items-center">
            {/* Left: Text & CTA Button */}
            <div className="md:col-span-7">
              <span className="eyebrow text-marigold font-bold">Post-Event Appreciation</span>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                Thank You for Celebrating OPFBEX 2026!
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Your presence made Central Luzon&apos;s biggest culinary showcase unforgettable.
                We want to hear about your experience — what inspired you, what you tasted, and what you want to see at OPFBEX 2027.
              </p>

              <div className="mt-7">
                <Link
                  href="/feedback"
                  className="inline-block border border-marigold bg-marigold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-grape-950 transition-all hover:bg-transparent hover:text-marigold"
                >
                  Complete Feedback Form (2 Mins) →
                </Link>
              </div>
            </div>

            {/* Right: QR Code Display */}
            <div className="flex flex-col items-center justify-center md:col-span-5 md:border-l md:border-white/12 md:pl-8">
              <div className="rounded-xl border border-white/20 bg-white p-3 shadow-xl transition-transform hover:scale-105">
                <Image
                  src="/feedback-qr.png"
                  alt="OPFBEX 2026 Feedback QR Code"
                  width={180}
                  height={180}
                  className="rounded-lg object-contain"
                />
              </div>
              <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-white/60">
                Scan with your camera to share feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}