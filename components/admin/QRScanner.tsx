"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QRScannerProps {
  onScan: (decodedText: string) => void
  onError?: (errorMessage: string) => void
  isScanningPaused?: boolean
}

export function QRScanner({ onScan, onError, isScanningPaused = false }: QRScannerProps) {
  const [scannerStarted, setScannerStarted] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment")
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)
  const lastScannedCodeRef = useRef<string | null>(null)
  const scanLockTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const containerId = "opfbex-qr-reader"

  useEffect(() => {
    const qrCode = new Html5Qrcode(containerId)
    html5QrCodeRef.current = qrCode

    const config = {
      fps: 12,
      qrbox: { width: 260, height: 260 },
      aspectRatio: 1.0,
    }

    qrCode
      .start(
        { facingMode: facingMode },
        config,
        (decodedText) => {
          if (isScanningPaused) return

          // Prevent scanning identical code within 2.5 seconds
          if (lastScannedCodeRef.current === decodedText) return
          lastScannedCodeRef.current = decodedText

          if (scanLockTimeoutRef.current) clearTimeout(scanLockTimeoutRef.current)
          scanLockTimeoutRef.current = setTimeout(() => {
            lastScannedCodeRef.current = null
          }, 2500)

          onScan(decodedText)
        },
        (error) => {
          if (onError && typeof error === "string") onError(error)
        }
      )
      .then(() => {
        setScannerStarted(true)
        setCameraError(null)
      })
      .catch((err) => {
        console.error("Camera start error: ", err)
        setScannerStarted(false)
        setCameraError(
          "Camera access denied or unavailable. Please ensure camera permissions are granted in browser settings."
        )
      })

    return () => {
      if (scanLockTimeoutRef.current) clearTimeout(scanLockTimeoutRef.current)
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current?.clear())
          .catch(() => {})
      }
    }
  }, [facingMode, onScan, onError, isScanningPaused])

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))
  }

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden border border-white/20 bg-black">
      {/* Target Reticle Viewfinder */}
      <div id={containerId} className="w-full aspect-square bg-grape-950" />

      {/* Camera Error Message */}
      {cameraError && (
        <div className="absolute inset-0 flex items-center justify-center bg-grape-950/90 p-6 text-center">
          <div>
            <div className="text-2xl mb-2">📷⚠️</div>
            <p className="text-xs text-chili font-semibold">{cameraError}</p>
            <p className="mt-2 text-[11px] text-white/50">
              You can still manually type ticket codes in the input bar below.
            </p>
          </div>
        </div>
      )}

      {/* Top Floating Controls */}
      {scannerStarted && (
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={toggleCamera}
            className="border border-white/30 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20 cursor-pointer"
            title="Switch Camera (Front/Rear)"
          >
            🔄 Flip Camera
          </button>
        </div>
      )}

      {/* Viewfinder Target Graphic Overlay */}
      {scannerStarted && !isScanningPaused && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative h-64 w-64 border-2 border-marigold/60 animate-pulse">
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-marigold" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-marigold" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-marigold" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-marigold" />
          </div>
        </div>
      )}
    </div>
  )
}