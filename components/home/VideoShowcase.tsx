"use client"

import { useState, useEffect } from "react"
import { getAssetUrl } from "@/lib/assets"

interface VideoShowcaseProps {
  /** Video URL or path: e.g. "/opfbex25-highlights.mp4" or YouTube embed */
  videoUrl?: string
  /** Optional companion webm path for faster loading: e.g. "/opfbex25-highlights.webm" */
  webmUrl?: string
  /** Section eyebrow label */
  eyebrow?: string
  /** Section heading */
  title?: string
  /** Subtitle description */
  description?: string
  /** Thumbnail image path (e.g. a high quality .webp poster) */
  posterUrl?: string
}

export function VideoShowcase({
  videoUrl = getAssetUrl("/opfbex25-highlights.mp4"),
  webmUrl = getAssetUrl("/opfbex25-highlights.webm"),
  eyebrow = "Year 01 Reel",
  title = "Relive the Sizzle & Energy",
  description = "Take a peek inside OPFBEX Year 01 at SMX Clark — two unforgettable days of artisan tastings, culinary showdowns, and the region's vibrant food community.",
  posterUrl,
}: VideoShowcaseProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close modal on Escape key and prevent background body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const isDirectVideo =
    videoUrl.endsWith(".mp4") ||
    videoUrl.endsWith(".webm") ||
    videoUrl.includes(".mp4?") ||
    Boolean(webmUrl)

  return (
    <section id="video-showcase" className="border-b border-white/12 bg-grape-950">
      <div className="mx-auto max-w-6xl border-x border-white/12 px-6 py-16 md:py-24">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-6">
          <div>
            <div className="flex items-center gap-3 eyebrow text-marigold">
              <span>{eyebrow}</span>
              <span className="h-px w-6 bg-white/20" />
              <span className="text-white/40">Official Event Recap</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            {description}
          </p>
        </div>

        {/* Video Thumbnail Frame with Brutalist Styling */}
        <div className="mt-10">
          <div
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsOpen(true)}
            aria-label="Play OPFBEX Highlight Video"
            className="group relative aspect-video w-full cursor-pointer overflow-hidden border-2 border-marigold/80 bg-grape-900 shadow-[8px_8px_0px_0px_rgba(251,176,52,0.35)] transition-all duration-300 hover:border-marigold hover:shadow-[12px_12px_0px_0px_rgba(251,176,52,0.7)]"
          >
            {/* Background Graphic Texture or Poster */}
            {posterUrl ? (
              <img
                src={posterUrl}
                alt="OPFBEX Video Thumbnail"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `radial-gradient(circle at center, rgba(106, 59, 191, 0.45) 0%, rgba(30, 15, 58, 0.95) 80%), repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 24px)`,
                }}
              >
                {/* Abstract decorative lights */}
                <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
                <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-chili/15 blur-3xl" />
              </div>
            )}

            {/* Brutalist Corner Crosshairs */}
            <div className="pointer-events-none absolute top-3 left-3 font-mono text-xs font-bold text-marigold/60 select-none">
              + 01_REC
            </div>
            <div className="pointer-events-none absolute top-3 right-3 font-mono text-xs font-bold text-marigold/60 select-none">
              4K_UHD +
            </div>

            {/* Badge Overlays */}
            <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-2 border border-chili/50 bg-chili/20 px-3 py-1 font-display text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-chili animate-pulse" />
                Live Highlights
              </span>
              <span className="border border-white/20 bg-grape-950/70 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                SMX Clark
              </span>
            </div>

            <div className="absolute bottom-6 left-6 hidden sm:block">
              <div className="font-display text-lg font-black tracking-tight text-white drop-shadow-md">
                10,000+ Foodies · 80+ Regional Brands
              </div>
              <div className="text-xs text-white/60">
                Experience Central Luzon&apos;s biggest food exhibition
              </div>
            </div>

            <div className="absolute bottom-6 right-6">
              <span className="border border-marigold/40 bg-grape-950/85 px-3 py-1.5 font-mono text-xs font-bold text-marigold backdrop-blur-sm">
                02:15 MIN
              </span>
            </div>

            {/* Central Animated Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="relative flex items-center justify-center">
                {/* Radar pulse ripples */}
                <div className="absolute h-24 w-24 rounded-full bg-marigold/25 animate-ping duration-1000" />
                <div className="absolute h-32 w-32 rounded-full border border-marigold/30 transition-transform duration-500 group-hover:scale-110" />

                {/* Main Play Circle */}
                <div className="relative flex h-20 w-20 items-center justify-center border-2 border-marigold bg-marigold text-grape-950 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white">
                  <svg
                    className="ml-1 h-8 w-8 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="font-display text-xs font-black uppercase tracking-[0.25em] text-marigold group-hover:text-white transition-colors">
                Watch Event Aftermovie →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-grape-950/90 p-4 backdrop-blur-md transition-all sm:p-6 md:p-10"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar with Close Button */}
            <div className="flex items-center justify-between border-b border-white/15 bg-grape-900 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-chili" />
                <span className="eyebrow text-[11px] text-white/80">OPFBEX 2025 Highlights Video</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/70 hover:border-chili hover:bg-chili hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full bg-black">
              {isDirectVideo ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  {webmUrl && <source src={webmUrl} type="video/webm" />}
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              ) : (
                <iframe
                  src={videoUrl}
                  title="OPFBEX 2025 Highlight Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}