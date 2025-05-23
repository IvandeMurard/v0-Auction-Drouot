import type React from "react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { UserAuthButton } from "@/components/user-auth-button"
import { ChatAssistant } from "@/components/chat-assistant"
import { MainNav } from "@/components/main-nav"

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#C4151C]">L'Enchanteur Drou</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserAuthButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>

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
