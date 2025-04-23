"use client"

import { useEffect, useState } from "react"

type Lot = {
  id: string
  title: string
  description: string
  image_url: string
  auction_date: string
  venue: string
  estimated_price_eur: { min: number; max: number }
}

export function LotsList() {
  const [lots, setLots] = useState<Lot[]>([])

  useEffect(() => {
    fetch("/data/lots.json")
      .then((res) => res.json())
      .then((data) => setLots(data))
      .catch((err) => console.error("Erreur lors du chargement des lots:", err))
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {lots.map((lot) => (
        <div key={lot.id} className="border rounded-xl p-4 shadow-md bg-white">
          <img src={lot.image_url || "/placeholder.svg"} alt={lot.title} className="w-full h-auto mb-3 rounded-lg" />
          <h3 className="text-lg font-semibold">{lot.title}</h3>
          <p className="text-sm text-gray-600">{lot.description}</p>
          <p className="mt-2 text-sm">
            <strong>Estimation :</strong> {lot.estimated_price_eur.min.toLocaleString()} –{" "}
            {lot.estimated_price_eur.max.toLocaleString()} €
          </p>
          <p className="text-xs text-gray-500">{new Date(lot.auction_date).toLocaleString("fr-FR")}</p>
          <p className="text-xs text-gray-500">{lot.venue}</p>
        </div>
      ))}
    </div>
  )
}
