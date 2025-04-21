"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"

export function SocialShare() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleWhatsAppShare = () => {
    const text = "Check out this amazing auction lot I found!"
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`, "_blank")
    setIsOpen(false)
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct share URL, so we'd typically copy to clipboard
    // and prompt the user to share manually
    navigator.clipboard.writeText(shareUrl)
    alert("URL copied to clipboard. Open Instagram to share!")
    setIsOpen(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Share2 size={16} />
          {t("share.button")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("share.title")}</DialogTitle>
          <DialogDescription>{t("share.description")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="social">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="social">{t("share.socialMedia")}</TabsTrigger>
            <TabsTrigger value="link">{t("share.copyLink")}</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-20"
                onClick={handleWhatsAppShare}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.721 0-3.343-.404-4.792-1.12l-5.458 1.447 1.479-5.4A10.466 10.466 0 012.25 12C2.25 6.714 6.714 2.25 12 2.25S21.75 6.714 21.75 12 17.286 21.75 12 21.75z" />
                </svg>
                WhatsApp
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-20"
                onClick={handleInstagramShare}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#E4405F">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="link" className="pt-4">
            <div className="space-y-4">
              <div className="p-3 bg-gray-100 rounded-md break-all">{shareUrl}</div>
              <Button onClick={handleCopyLink} className="w-full bg-[#C4151C] hover:bg-[#A01016]">
                {isCopied ? t("share.copied") : t("share.copyLink")}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
