export function MarqueeBar() {
  const items = [
    "LIVE COOKING", "ARTISAN COFFEE", "STREET EATS", "CRAFT DRINKS",
    "PASTRY LAB", "CHEF TALKS", "FARM TO TABLE", "SWEET TREATS",
  ]
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-b border-white/12 bg-marigold py-3">
      <div className="animate-marquee flex w-max gap-6 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-sm font-black uppercase tracking-[0.2em] text-grape-950"
          >
            {t} <span className="mx-2 text-grape-950/40">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}