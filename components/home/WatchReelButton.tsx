"use client"

import { useState, useEffect } from "react"

interface WatchReelButtonProps {
  videoUrl?: string
  webmUrl?: string
}

export function WatchReelButton({
  videoUrl = "/opfbex25-highlights.mp4",
  webmUrl = "/opfbex25-highlights.webm",
}: WatchReelButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close on Escape key and lock background scroll
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

  return (
    <>
      {/* Subtle Ghost Play Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2.5 py-2 text-xs font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-marigold cursor-pointer"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/5 transition-all group-hover:border-marigold group-hover:bg-marigold/10 group-hover:scale-105">
          <svg
            className="ml-0.5 h-2.5 w-2.5 fill-current text-white/80 transition-colors group-hover:text-marigold"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="underline-offset-4 group-hover:underline">
          Watch &apos;25 Recap
        </span>
      </button>

      {/* Video Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-grape-950/90 p-4 backdrop-blur-md sm:p-6 md:p-10"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/15 bg-grape-900 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-chili animate-pulse" />
                <span className="eyebrow text-[11px] text-white/80">OPFBEX Highlights Reel</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/70 hover:border-chili hover:bg-chili hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                controls
                autoPlay
                playsInline
                preload="auto"
                className="h-full w-full object-contain"
              >
                {webmUrl && <source src={webmUrl} type="video/webm" />}
                {videoUrl && <source src={videoUrl} type="video/mp4" />}
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  )
}