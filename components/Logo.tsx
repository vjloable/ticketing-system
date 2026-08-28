import Link from "next/link";

const letters = [
  { c: "O", color: "text-chili" },
  { c: "P", color: "text-tangerine" },
  { c: "F", color: "text-marigold" },
  { c: "B", color: "text-marigold" },
  { c: "E", color: "text-basil" },
  { c: "X", color: "text-lime" },
];

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-baseline gap-1.5 leading-none">
      <span
        className={`font-display font-black tracking-tighter ${
          compact ? "text-xl" : "text-2xl"
        }`}
      >
        {letters.map((l, i) => (
          <span key={i} className={l.color}>
            {l.c}
          </span>
        ))}
        <span className="text-white">26</span>
      </span>
    </Link>
  );
}
