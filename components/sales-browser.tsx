"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SalesBrowser() {
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
            placeholder="Search for auctions, lots, artists..."
            className="pl-10 pr-4 py-3 w-full rounded-l-md border-r-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="rounded-l-none bg-[#C4151C] hover:bg-[#A01016]" disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-2">
        Try: "Impressionist paintings", "Jewelry auctions in Paris", "Antique furniture"
      </p>
    </div>
  )
}
