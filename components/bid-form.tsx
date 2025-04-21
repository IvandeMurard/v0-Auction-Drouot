"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Gavel } from "lucide-react"

interface BidFormProps {
  lotId: string
}

export function BidForm({ lotId }: BidFormProps) {
  const [maxBid, setMaxBid] = useState("")
  const [isAutoBidding, setIsAutoBidding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!maxBid) return

    setIsSubmitting(true)

    // In a real app, this would call an API to place the bid
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after a few seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="max-bid">Your Maximum Bid (€)</Label>
        <Input
          id="max-bid"
          type="number"
          min="0"
          step="100"
          placeholder="Enter your maximum bid"
          value={maxBid}
          onChange={(e) => setMaxBid(e.target.value)}
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">Enter the maximum amount you are willing to bid</p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="auto-bidding" checked={isAutoBidding} onCheckedChange={setIsAutoBidding} />
        <Label htmlFor="auto-bidding">Enable automatic bidding</Label>
      </div>

      {isAutoBidding && (
        <div className="bg-gray-50 p-3 rounded-md text-sm">
          <p className="text-gray-700">
            Automatic bidding will place bids on your behalf up to your maximum amount. You will be notified if you are
            outbid.
          </p>
        </div>
      )}

      <Button type="submit" className="w-full bg-[#C4151C] hover:bg-[#A01016]" disabled={!maxBid || isSubmitting}>
        {isSubmitting ? (
          "Processing..."
        ) : (
          <>
            <Gavel size={16} className="mr-2" />
            Place Bid
          </>
        )}
      </Button>

      {isSuccess && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
          Your bid has been successfully placed! You will be notified of any updates.
        </div>
      )}
    </form>
  )
}
