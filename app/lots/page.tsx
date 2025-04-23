import { Suspense } from "react"
import { SiteLayout } from "@/components/layout/site-layout"

export default function LotsPage() {
  return (
    <SiteLayout>
      <h1 className="text-3xl font-bold mb-6">Lots en vente</h1>
      <Suspense fallback={<div className="h-64 w-full bg-gray-100 animate-pulse rounded-md"></div>}>
        <div className="w-full" id="lots-container">
          {/* @ts-expect-error Server Component */}
          <LotsList />
        </div>
      </Suspense>
    </SiteLayout>
  )
}

import LotsList from "@/components/components/lots-browser/LotsList"
