import { Suspense } from "react"
import Link from "next/link"
import { SalesBrowser } from "@/components/sales-browser"
import { LuckyButton } from "@/components/lucky-button"
import { SiteLayout } from "@/components/layout/site-layout"

export default function Home() {
  return (
    <SiteLayout>
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explorez les Ventes aux Enchères</h1>
        <p className="text-lg text-gray-600 mb-8">
          Découvrez, enchérissez et recevez des notifications sur les lots qui correspondent à vos intérêts
        </p>

        <Suspense fallback={<div className="h-12 w-full bg-gray-100 animate-pulse rounded-md"></div>}>
          <SalesBrowser />
        </Suspense>

        <div className="mt-6 flex justify-center">
          <LuckyButton />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Lots en Vedette</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ici, nous pourrions afficher quelques lots en vedette */}
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/lots" className="text-[#C4151C] hover:underline">
            Voir tous les lots
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}
