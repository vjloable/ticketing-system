import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center leading-none">
      {/* Sized to match the text wordmark it replaces:
          compact ≈ text-xl (20px), default ≈ text-2xl (24px). */}
      <img
        src="/opfbex-logo.svg"
        alt="OPFBEX"
        className={`w-auto ${compact ? "h-5" : "h-6"}`}
      />
    </Link>
  );
}
