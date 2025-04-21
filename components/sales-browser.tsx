"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"

export function SalesBrowser() {
  const { t } = useLanguage()
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    // In a real app, this would call an API to search for sales
    setTimeout(() => {
      setIsSearching(false)
      // Navigate to results page or update state with results
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }, 1000)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={t("home.search.placeholder")}
            className="pl-10 pr-4 py-3 w-full rounded-l-md border-r-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="rounded-l-none bg-[#C4151C] hover:bg-[#A01016]" disabled={isSearching}>
          {isSearching ? t("home.search.searching") : t("home.search.button")}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-2">{t("home.search.examples")}</p>
    </div>
  )
}
