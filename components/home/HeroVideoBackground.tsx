"use client"

import { getAssetUrl } from "@/lib/assets"

interface HeroVideoBackgroundProps {
  mp4Src?: string
  webmSrc?: string
  /** Video opacity: e.g. "opacity-60", "opacity-75", "opacity-90" */
  opacityClass?: string
}

export function HeroVideoBackground({
  mp4Src = getAssetUrl("/opfbex25-highlights.mp4"),
  webmSrc = getAssetUrl("/opfbex25-highlights.webm"),
  opacityClass = "opacity-85",
}: HeroVideoBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`h-full w-full object-cover filter brightness-95 contrast-105 transition-opacity duration-700 ${opacityClass}`}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {mp4Src && <source src={mp4Src} type="video/mp4" />}
      </video>

      {/* Asymmetric Brand Gradient: Deeper on the left behind the text, open on the right for visibility */}
      <div className="absolute inset-0 bg-linear-to-r from-grape-950/75 via-grape-950/45 to-grape-950/40" />

      {/* Subtle top & bottom edge blend */}
      <div className="absolute inset-0 bg-linear-to-b from-grape-950/40 via-transparent to-grape-950/70" />
    </div>
  )
}