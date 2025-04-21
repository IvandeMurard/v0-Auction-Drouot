"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function LuckyButton() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleLuckySearch = () => {
    setIsLoading(true)

    // Array of random search terms
    const randomSearches = [
      "Animal sculptures",
      "Art deco jewelry",
      "Impressionist paintings",
      "Vintage watches",
      "Chinese porcelain",
      "Modern furniture",
      "Ancient coins",
      "Comic books",
      "Vintage posters",
      "Silver tableware",
    ]

    // Select a random search term
    const randomSearch = randomSearches[Math.floor(Math.random() * randomSearches.length)]

    // In a real app, this would navigate to search results for the random term
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = `/search?q=${encodeURIComponent(randomSearch)}&lucky=true`
    }, 1000)
  }

  return (
    <Button
      variant="outline"
      onClick={handleLuckySearch}
      disabled={isLoading}
      className="flex items-center gap-2 mx-auto"
    >
      <Sparkles size={16} />
      {isLoading ? t("home.lucky.loading") : t("home.lucky.button")}
    </Button>
  )
}
