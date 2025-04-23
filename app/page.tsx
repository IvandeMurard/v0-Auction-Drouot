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
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#C4151C]">L'Enchanteur Drou</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/lots" className="text-gray-600 hover:text-gray-900">
                Lots
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserAuthButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
          <h2 className="text-2xl font-bold mb-6 text-center">Fonctionnalités IA</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/ai-tools?tab=search">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recherche Intelligente</h3>
                <p className="text-gray-600 mb-4 flex-grow">Recherchez des ventes et des lots en langage naturel</p>
                <p className="text-sm text-gray-500 italic">"Trouvez-moi des bijoux Art Déco sous 5000€"</p>
              </div>
            </Link>

            <Link href="/ai-tools?tab=price">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Gavel className="text-amber-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Estimateur de Prix</h3>
                <p className="text-gray-600 mb-4 flex-grow">Obtenez des estimations de prix par IA pour vos objets</p>
                <p className="text-sm text-gray-500 italic">
                  "Quelle est la valeur de cette peinture du 19ème siècle?"
                </p>
              </div>
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="text-purple-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assistant d'Enchères</h3>
              <p className="text-gray-600 mb-4 flex-grow">Obtenez des réponses instantanées à vos questions</p>
              <p className="text-sm text-gray-500 italic">"Comment fonctionne le processus d'enchères?"</p>
              <Button variant="outline" className="mt-auto">
                Discuter Maintenant
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} L'Enchanteur Drou</p>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Conditions
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Confidentialité
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
