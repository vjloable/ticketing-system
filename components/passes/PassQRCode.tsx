"use client"

import { QRCodeSVG } from "qrcode.react"

interface PassQRCodeProps {
  value: string
  size?: number
  showCodeText?: boolean
  includeLogo?: boolean
  className?: string
}

export function PassQRCode({
  value,
  size = 180,
  showCodeText = true,
  includeLogo = true,
  className = "",
}: PassQRCodeProps) {
  const logoSize = Math.round(size * 0.22)

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* High-contrast QR Container */}
      <div className="bg-white p-3 border-2 border-black/80 shadow-sm inline-block">
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          imageSettings={
            includeLogo
              ? {
                src: "/logo192.png",
                height: logoSize,
                width: logoSize,
                excavate: true
              } 
              : undefined
          }
        />
      </div>

      {showCodeText && (
        <div className="mt-2 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 print:text-black/60">
            Ticket Code
          </p>
          <p className="font-mono text-sm font-black tracking-wider text-marigold print:text-black">
            {value}
          </p>
        </div>
      )}
    </div>
  )
}