"use client"

import { Copy, Info } from "lucide-react"
import { useState } from "react"

interface ReferralCardProps {
  referralLink: string
  onInfoClick?: () => void
}

export default function ReferralCard({ referralLink, onInfoClick }: ReferralCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-dark">Реферальная программа</h3>
        <button
          onClick={onInfoClick}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Information"
        >
          <Info size={16} style={{ color: "var(--color-main, #627ffe)" }} />
        </button>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 pr-1">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 bg-transparent border-none text-sm text-gray-500 focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className={`p-2 rounded-full transition-colors ${copied ? "text-secondary" : "text-main"}`}
          aria-label="Copy referral link"
        >
          <Copy size={16} />
        </button>
      </div>

      {copied && <p className="text-xs mt-1 text-secondary">Ссылка скопирована!</p>}
    </div>
  )
}
