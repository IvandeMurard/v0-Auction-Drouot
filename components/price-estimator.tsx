"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

interface PriceEstimation {
  estimatedMinPrice: number
  estimatedMaxPrice: number
  confidence: "low" | "medium" | "high"
  reasoning: string
}

export function PriceEstimator() {
  const { t } = useLanguage()
  const [itemDetails, setItemDetails] = useState("")
  const [isEstimating, setIsEstimating] = useState(false)
  const [estimation, setEstimation] = useState<PriceEstimation | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleEstimate = async () => {
    if (!itemDetails.trim()) return

    setIsEstimating(true)
    setError(null)

    try {
      const response = await fetch("/api/estimate-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemDetails }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to estimate price")
      }

      setEstimation(data.estimation)
    } catch (err) {
      console.error("Price estimation error:", err)
      setError("Failed to estimate price. Please try again.")
    } finally {
      setIsEstimating(false)
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidenceText = (confidence: string) => {
    switch (confidence) {
      case "high":
        return t("priceEstimator.confidence.high")
      case "medium":
        return t("priceEstimator.confidence.medium")
      case "low":
        return t("priceEstimator.confidence.low")
      default:
        return confidence
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("priceEstimator.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="item-details" className="block text-sm font-medium text-gray-700 mb-1">
            {t("priceEstimator.itemDetails")}
          </label>
          <Textarea
            id="item-details"
            placeholder={t("priceEstimator.placeholder")}
            className="min-h-[150px]"
            value={itemDetails}
            onChange={(e) => setItemDetails(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">{t("priceEstimator.tip")}</p>
        </div>

        <Button
          onClick={handleEstimate}
          className="w-full bg-[#C4151C] hover:bg-[#A01016]"
          disabled={isEstimating || !itemDetails.trim()}
        >
          {isEstimating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("priceEstimator.estimating")}
            </>
          ) : (
            t("priceEstimator.button")
          )}
        </Button>

        {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

        {estimation && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{t("priceEstimator.priceRange")}</h3>
              <Badge className={getConfidenceColor(estimation.confidence)}>
                {getConfidenceText(estimation.confidence)}
              </Badge>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-md">
              <span className="text-3xl font-bold">
                {estimation.estimatedMinPrice.toLocaleString()}€ - {estimation.estimatedMaxPrice.toLocaleString()}€
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">{t("priceEstimator.reasoning")}</h4>
              <p className="text-sm text-gray-700 p-4 bg-gray-50 rounded-md">{estimation.reasoning}</p>
            </div>

            <div className="text-xs text-gray-500 italic">{t("priceEstimator.disclaimer")}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
