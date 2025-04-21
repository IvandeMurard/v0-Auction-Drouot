import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { BidForm } from "@/components/bid-form"
import { SocialShare } from "@/components/social-share"

export default function LotPage({ params }: { params: { id: string } }) {
  // In a real app, this would fetch the lot details from an API
  const lotId = params.id

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <span className="text-2xl font-bold text-[#C4151C]">Drouot Explorer</span>
          </Link>
          <Link href="/search" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-1" />
            Back to search
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Lot image"
                width={800}
                height={600}
                className="w-full object-contain"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Antique French Commode, Louis XV Style</h1>
              <SocialShare />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Calendar size={20} className="mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Auction Date</p>
                    <p className="text-sm text-gray-500">May 20, 2023 at 14:00</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center">
                  <MapPin size={20} className="mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-gray-500">Hôtel Drouot, Paris</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium">Lot Number</p>
                  <p className="text-sm text-gray-500">#{lotId}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">
                  Beautiful antique French commode in the Louis XV style, with marble top and bronze hardware. Made of
                  walnut wood with intricate marquetry. Late 19th century.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Dimensions: H: 85 cm, W: 130 cm, D: 55 cm</li>
                  <li>Material: Walnut, marble, bronze</li>
                  <li>Period: Late 19th century</li>
                  <li>Condition: Good, with some signs of age and use</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Provenance</h2>
                <p className="text-gray-700">Private collection, Paris.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-1">Estimate</h2>
                  <p className="text-2xl font-bold">3,000€ - 5,000€</p>
                </div>

                <BidForm lotId={lotId} />

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Auction Details</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Sale:</strong> Fine Furniture & Decorative Arts
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Auction House:</strong> Hôtel Drouot
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Auctioneer:</strong> Maître Jean Dupont
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
