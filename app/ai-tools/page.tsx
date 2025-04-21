import { PriceEstimator } from "@/components/price-estimator"

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-[#C4151C]">Outils IA Drou</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <PriceEstimator />
        </div>
      </main>
    </div>
  )
}
