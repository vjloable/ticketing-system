"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QRScannerProps {
  onScan: (decodedText: string) => void
  onError?: (errorMessage: string) => void
  isScanningPaused?: boolean
}

export function QRScanner({ onScan, onError, isScanningPaused = false }: QRScannerProps) {
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment")

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)
  const isMountedRef = useRef(true)
  const activeTracksRef = useRef<MediaStreamTrack[]>([])
  const lastScannedCodeRef = useRef<string | null>(null)
  const scanLockTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const onScanRef = useRef(onScan)
  const isScanningPausedRef = useRef(isScanningPaused)

  useEffect(() => {
    onScanRef.current = onScan
    isScanningPausedRef.current = isScanningPaused
  }, [onScan, isScanningPaused])

  const containerId = "opfbex-qr-reader"

  // 1. Intercept and track all camera hardware streams directly at the browser API level
  useEffect(() => {
    isMountedRef.current = true
    const navMedia = typeof navigator !== "undefined" ? navigator.mediaDevices : null
    const originalGetUserMedia = navMedia?.getUserMedia?.bind(navMedia)

    if (navMedia && originalGetUserMedia) {
      navMedia.getUserMedia = async (constraints) => {
        const stream = await originalGetUserMedia(constraints)
        
        // If user already navigated away before stream resolved, kill it immediately
        if (!isMountedRef.current) {
          stream.getTracks().forEach((track) => {
            track.stop()
            track.enabled = false
          })
          return stream
        }

        stream.getTracks().forEach((track) => {
          activeTracksRef.current.push(track)
        })
        return stream
      }
    }

    return () => {
      isMountedRef.current = false

      // Restore native getUserMedia
      if (navMedia && originalGetUserMedia) {
        navMedia.getUserMedia = originalGetUserMedia
      }

      // Forcefully kill every hardware camera track opened during this session
      activeTracksRef.current.forEach((track) => {
        try {
          track.stop()
          track.enabled = false
        } catch {}
      })
      activeTracksRef.current = []
    }
  }, [])

  // 2. Manage Html5Qrcode Scanner Lifecycle
  useEffect(() => {
    let qrCode: Html5Qrcode | null = null

    const initScanner = async () => {
      if (html5QrCodeRef.current) {
        try {
          if (html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop()
          }
          html5QrCodeRef.current.clear()
        } catch {}
        html5QrCodeRef.current = null
      }

      if (!isMountedRef.current) return

      try {
        qrCode = new Html5Qrcode(containerId)
        html5QrCodeRef.current = qrCode

        await qrCode.start(
          { facingMode },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            if (isScanningPausedRef.current) return

            // Prevent duplicate scans within 2.5s
            if (lastScannedCodeRef.current === decodedText) return
            lastScannedCodeRef.current = decodedText

            if (scanLockTimeoutRef.current) clearTimeout(scanLockTimeoutRef.current)
            scanLockTimeoutRef.current = setTimeout(() => {
              lastScannedCodeRef.current = null
            }, 2500)

            if (onScanRef.current) {
              onScanRef.current(decodedText)
            }
          },
          () => {
            // Normal scan frame tick
          }
        )

        if (!isMountedRef.current) {
          if (qrCode.isScanning) {
            await qrCode.stop().catch(() => {})
            try { qrCode.clear() } catch {}
          }
          return
        }

        setCameraActive(true)
        setCameraError(null)
      } catch (err: any) {
        if (!isMountedRef.current) return
        console.error("[QRScanner] Failed to start camera:", err)
        setCameraActive(false)
        setCameraError("Camera access unavailable. Please check browser permissions.")
      }
    }

    initScanner()

    return () => {
      if (scanLockTimeoutRef.current) clearTimeout(scanLockTimeoutRef.current)

      if (html5QrCodeRef.current) {
        const qr = html5QrCodeRef.current
        html5QrCodeRef.current = null
        if (qr.isScanning) {
          qr.stop()
            .catch(() => {})
            .finally(() => {
              try { qr.clear() } catch {}
            })
        } else {
          try { qr.clear() } catch {}
        }
      }
    }
  }, [facingMode])

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))
  }

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden border border-white/20 bg-black flex items-center justify-center">
      {/* Scanner DOM target */}
      <div id={containerId} className="w-full h-full" />

      {/* Scoped CSS for video fit and clean framing */}
      <style>{`
        #opfbex-qr-reader {
          border: none !important;
          padding: 0 !important;
          background: #000 !important;
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          overflow: hidden !important;
        }
        #opfbex-qr-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block !important;
        }
        #opfbex-qr-reader__scan_region {
          width: 100% !important;
          height: 100% !important;
        }
        #qr-shaded-region,
        #opfbex-qr-reader svg,
        #opfbex-qr-reader__dashboard {
          display: none !important;
        }
        @keyframes scanSweep {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Camera Error Message */}
      {cameraError && (
        <div className="absolute inset-0 flex items-center justify-center bg-grape-950/90 p-6 text-center z-20">
          <div>
            <div className="text-2xl mb-2">📷⚠️</div>
            <p className="text-xs text-chili font-semibold">{cameraError}</p>
            <p className="mt-2 text-[11px] text-white/50">
              You can still manually type ticket codes in the input bar below.
            </p>
          </div>
        </div>
      )}

      {/* Flip Camera Button */}
      {cameraActive && (
        <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
          <button
            onClick={toggleCamera}
            className="border border-white/30 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20 cursor-pointer"
            title="Switch Camera (Front/Rear)"
          >
            🔄 Flip Camera
          </button>
        </div>
      )}

      {/* Dim Mask with Clear Scan Box & Golden Reticle */}
      {cameraActive && !isScanningPaused && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
          <div className="relative h-60 w-60 border border-marigold/50 shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]">
            {/* 4 Corner Bracket Accents */}
            <div className="absolute -top-1 -left-1 h-5 w-5 border-t-3 border-l-3 border-marigold" />
            <div className="absolute -top-1 -right-1 h-5 w-5 border-t-3 border-r-3 border-marigold" />
            <div className="absolute -bottom-1 -left-1 h-5 w-5 border-b-3 border-l-3 border-marigold" />
            <div className="absolute -bottom-1 -right-1 h-5 w-5 border-b-3 border-r-3 border-marigold" />

            {/* Laser Scanning Line */}
            <div
              className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-marigold to-transparent"
              style={{ animation: "scanSweep 2.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      )}
    </div>
  )
}