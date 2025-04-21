"use client"

import { useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"

export function UserAuthButton() {
  const { t } = useLanguage()
  // In a real app, this would come from an auth context/provider
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">{t("nav.login")}</Link>
        </Button>
        <Button size="sm" className="bg-[#C4151C] hover:bg-[#A01016]" asChild>
          <Link href="/register">{t("nav.register")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <User size={16} />
          <span>{t("nav.myAccount")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">{t("nav.dashboard")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/notifications">{t("nav.notifications")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/bidding">{t("nav.myBids")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">{t("nav.settings")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>{t("nav.logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
