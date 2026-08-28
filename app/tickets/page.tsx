"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Tier = {
  id: string;
  name: string;
  price: number;
  accent: string;
  tag?: string;
  perks: string[];
};

const tiers: Tier[] = [
  {
    id: "day",
    name: "Day Pass",
    price: 250,
    accent: "text-basil",
    perks: ["Single-day entry", "Access to all halls", "Live cooking stage", "Marketplace access"],
  },
  {
    id: "weekend",
    name: "Weekend Pass",
    price: 400,
    accent: "text-marigold",
    tag: "Most Popular",
    perks: ["Both event days", "All halls & demos", "Priority seating at talks", "OPFBEX tote bag", "Exclusive tastings"],
  },
  {
    id: "vip",
    name: "VIP Foodie",
    price: 900,
    accent: "text-tangerine",
    perks: ["Everything in Weekend", "VIP lounge access", "Meet & greet with chefs", "Front-row awards seats", "Premium gift box", "Fast-track entry"],
  },
];

export default function TicketsPage() {
  const [qty, setQty] = useState<Record<string, number>>({ day: 0, weekend: 1, vip: 0 });

  const total = useMemo(
    () => tiers.reduce((sum, t) => sum + t.price * (qty[t.id] || 0), 0),
    [qty]
  );
  const count = useMemo(
    () => Object.values(qty).reduce((a, b) => a + b, 0),
    [qty]
  );

  const setCount = (id: string, delta: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + delta) }));

  return (
    <div className="bg-grape-950">
      {/* header */}
      <section className="border-b border-white/12 bg-grape-900">
        <div className="mx-auto max-w-6xl border-x border-white/12 px-6 py-16">
          <div className="flex items-center gap-4 eyebrow text-marigold">
            <span>Registration</span>
            <span className="h-px w-8 bg-white/25" />
            <span className="text-white/50">Sept 19–20 · SMX Clark</span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-black tracking-tighter sm:text-6xl">
            Get Your Tickets
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/65">
            Pick your pass, choose your quantity, and get ready for two days of
            unforgettable flavor.
          </p>
        </div>
      </section>

      {/* tickets */}
      <section className="border-b border-white/12">
        <div className="mx-auto max-w-6xl border-x border-white/12">
          <div className="grid lg:grid-cols-[1.7fr_1fr]">
            {/* tier cards */}
            <div className="grid border-b border-white/12 sm:grid-cols-2 lg:border-b-0 lg:border-r">
              {tiers.map((t, i) => (
                <div
                  key={t.id}
                  className={`flex flex-col border-white/12 p-7 ${
                    i < tiers.length ? "border-b" : ""
                  } ${i % 2 === 0 ? "sm:border-r" : ""} ${
                    t.tag ? "bg-white/[0.03]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold">{t.name}</h3>
                    {t.tag && (
                      <span className="border border-marigold px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-marigold">
                        {t.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1.5 border-b border-white/12 pb-5">
                    <span className={`font-display text-4xl font-extrabold tracking-tight ${t.accent}`}>
                      ₱{t.price}
                    </span>
                    <span className="text-sm text-white/45">/ pass</span>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-white/70">
                        <span className={`mt-px ${t.accent}`}>—</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border border-white/15">
                    <button
                      onClick={() => setCount(t.id, -1)}
                      className="grid h-11 w-11 place-items-center border-r border-white/15 text-lg font-bold transition-colors hover:bg-white/10"
                      aria-label={`Remove ${t.name}`}
                    >
                      −
                    </button>
                    <span className="font-display text-lg font-bold tabular-nums">
                      {qty[t.id] || 0}
                    </span>
                    <button
                      onClick={() => setCount(t.id, 1)}
                      className="grid h-11 w-11 place-items-center border-l border-white/15 bg-marigold text-lg font-bold text-grape-950 transition-colors hover:bg-marigold/80"
                      aria-label={`Add ${t.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {/* filler cell to complete the grid */}
              <div className="hidden border-b border-white/12 sm:block" />
            </div>

            {/* order summary */}
            <div className="lg:sticky lg:top-[57px] lg:self-start">
              <div className="border-b border-white/12 p-8">
                <h3 className="eyebrow text-white/45">Order Summary</h3>

                <div className="mt-6 space-y-3">
                  {count === 0 && (
                    <p className="text-sm text-white/45">
                      No tickets selected yet. Add a pass to get started.
                    </p>
                  )}
                  {tiers.map((t) =>
                    (qty[t.id] || 0) > 0 ? (
                      <div key={t.id} className="flex items-center justify-between text-sm">
                        <span className="text-white/70">
                          {qty[t.id]} × {t.name}
                        </span>
                        <span className="font-semibold tabular-nums">₱{t.price * qty[t.id]}</span>
                      </div>
                    ) : null
                  )}
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-white/12 pt-6">
                  <span className="text-sm text-white/55">
                    Total · {count} {count === 1 ? "ticket" : "tickets"}
                  </span>
                  <span className="font-display text-3xl font-extrabold tracking-tight text-marigold tabular-nums">
                    ₱{total}
                  </span>
                </div>

                <button
                  disabled={count === 0}
                  className="mt-6 w-full border border-marigold bg-marigold py-3.5 text-sm font-bold uppercase tracking-wider text-grape-950 transition-colors enabled:hover:bg-transparent enabled:hover:text-marigold disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Checkout
                </button>
                <p className="mt-3 text-center text-xs text-white/40">
                  Secure checkout · Instant e-ticket delivery
                </p>
              </div>

              <div className="p-8 text-sm text-white/60">
                <p className="eyebrow text-white/45">Group Rate</p>
                <p className="mt-3 leading-relaxed">
                  Groups of 10+ get 15% off. Email{" "}
                  <span className="text-basil">opfbexofficial@gmail.com</span>.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-block eyebrow text-white/50 hover:text-white"
                >
                  ← Back to event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
