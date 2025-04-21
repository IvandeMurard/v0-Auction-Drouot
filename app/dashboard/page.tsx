import { Suspense } from "react"
import Link from "next/link"
import { Bell, Gavel, Heart, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#C4151C]">Drouot Explorer</span>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="sm">
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Link href="/dashboard" className="flex items-center p-2 bg-gray-100 rounded-md">
                    <Heart size={16} className="mr-2" />
                    <span>Saved Lots</span>
                  </Link>
                  <Link href="/dashboard/bids" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                    <Gavel size={16} className="mr-2" />
                    <span>My Bids</span>
                  </Link>
                  <Link href="/dashboard/notifications" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                    <Bell size={16} className="mr-2" />
                    <span>Notifications</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Notification Settings</CardTitle>
                <CardDescription>Customize your alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/settings/notifications">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Preferences
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>

            <Tabs defaultValue="saved">
              <TabsList className="mb-4">
                <TabsTrigger value="saved">Saved Lots</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Auctions</TabsTrigger>
                <TabsTrigger value="bids">Active Bids</TabsTrigger>
              </TabsList>

              <TabsContent value="saved">
                <Suspense fallback={<div className="h-64 w-full bg-gray-100 animate-pulse rounded-md"></div>}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* This would be populated with actual saved lots */}
                    <SavedLotCard />
                    <SavedLotCard />
                    <SavedLotCard />
                  </div>
                </Suspense>
              </TabsContent>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  <p className="text-gray-500">You have no upcoming auctions that match your interests.</p>
                  <Button asChild>
                    <Link href="/search">Browse Auctions</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="bids">
                <div className="space-y-4">
                  <p className="text-gray-500">You have no active bids at the moment.</p>
                  <Button asChild>
                    <Link href="/search">Find Lots to Bid On</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function SavedLotCard() {
  return (
    <Card>
      <div className="aspect-square relative overflow-hidden">
        <img src="/placeholder.svg?height=300&width=300" alt="Auction lot" className="object-cover w-full h-full" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">19th Century Oil Painting</h3>
        <p className="text-sm text-gray-500">Estimate: 2,000€ - 3,000€</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">Auction: May 15, 2023</span>
          <Button variant="outline" size="sm">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
