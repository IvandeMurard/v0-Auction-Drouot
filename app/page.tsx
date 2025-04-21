import { Suspense } from "react"
import Link from "next/link"
import { SalesBrowser } from "@/components/sales-browser"
import { LuckyButton } from "@/components/lucky-button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserAuthButton } from "@/components/user-auth-button"
import { ChatAssistant } from "@/components/chat-assistant"
import { Search, Gavel, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#C4151C]">Drouot Explorer</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserAuthButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Hôtel Drouot Sales</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover, bid, and get notified on auction lots that match your interests
          </p>

          <Suspense fallback={<div className="h-12 w-full bg-gray-100 animate-pulse rounded-md"></div>}>
            <SalesBrowser />
          </Suspense>

          <div className="mt-6">
            <LuckyButton />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">AI-Powered Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/ai-tools?tab=search">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Natural Language Search</h3>
                <p className="text-gray-600 mb-4 flex-grow">Search for auctions and lots using everyday language</p>
                <p className="text-sm text-gray-500 italic">"Find me Art Deco jewelry under 5000€"</p>
              </div>
            </Link>

            <Link href="/ai-tools?tab=price">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Gavel className="text-amber-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Price Estimator</h3>
                <p className="text-gray-600 mb-4 flex-grow">Get AI-powered price estimates for your items</p>
                <p className="text-sm text-gray-500 italic">"What's the value of this 19th century painting?"</p>
              </div>
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="text-purple-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Auction Assistant</h3>
              <p className="text-gray-600 mb-4 flex-grow">Get instant answers to your auction questions</p>
              <p className="text-sm text-gray-500 italic">"How does the bidding process work?"</p>
              <Button variant="outline" className="mt-auto">
                Chat Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                In partnership with{" "}
                <a
                  href="https://www.drouot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C4151C] font-semibold"
                >
                  Hôtel Drouot
                </a>
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat assistant is always available */}
      <ChatAssistant />
    </div>
  )
}
