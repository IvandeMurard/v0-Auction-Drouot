import { PriceEstimator } from "@/components/price-estimator"
import { SiteLayout } from "@/components/layout/site-layout"

export default function AIToolsPage() {
  return (
    <SiteLayout>
      <div className="w-full max-w-4xl mx-auto">
        <PriceEstimator />
      </div>
    </SiteLayout>
  )
}
