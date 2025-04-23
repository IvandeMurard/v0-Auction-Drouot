"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Gavel, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export function MainNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    {
      name: "Recherche Intelligente",
      href: "/ai-tools?tab=search",
      icon: <Search className="h-4 w-4 mr-2" />,
      active: pathname === "/ai-tools" && pathname.includes("search"),
    },
    {
      name: "Estimateur de Prix",
      href: "/ai-tools?tab=price",
      icon: <Gavel className="h-4 w-4 mr-2" />,
      active: pathname === "/ai-tools" && pathname.includes("price"),
    },
    {
      name: "Assistant d'Enchères",
      href: "#",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      active: false,
      onClick: () => {
        // Cette fonction sera remplacée par l'ouverture de l'assistant de chat
        const chatButton = document.querySelector("[data-chat-button]") as HTMLButtonElement
        if (chatButton) chatButton.click()
      },
    },
    {
      name: "Lots",
      href: "/lots",
      active: pathname === "/lots",
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) =>
        item.onClick ? (
          <button
            key={item.name}
            onClick={item.onClick}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              item.active ? "text-[#C4151C]" : "text-muted-foreground",
            )}
          >
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </button>
        ) : (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              item.active ? "text-[#C4151C]" : "text-muted-foreground",
            )}
          >
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        ),
      )}
    </nav>
  )
}
