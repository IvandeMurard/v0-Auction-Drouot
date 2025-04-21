"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "app.title": "Drou Explorer",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.myAccount": "My Account",
    "nav.dashboard": "Dashboard",
    "nav.notifications": "Notifications",
    "nav.myBids": "My Bids",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "nav.auctionAssistant": "Auction Assistant",

    // Home
    "home.title": "Explore Auction Sales",
    "home.subtitle": "Discover, bid, and get notified on auction lots that match your interests",
    "home.search.placeholder": "Search for auctions, lots, artists...",
    "home.search.button": "Search",
    "home.search.searching": "Searching...",
    "home.search.examples": 'Try: "Impressionist paintings", "Jewelry auctions in Paris", "Antique furniture"',
    "home.lucky.button": "I'm feeling lucky",
    "home.lucky.loading": "Finding something special...",

    // Features
    "features.title": "AI-Powered Features",
    "features.priceEstimator.title": "Price Estimator",
    "features.priceEstimator.description": "Get AI-powered price estimates for your items",
    "features.priceEstimator.example": '"What\'s the value of this 19th century painting?"',
    "features.auctionAssistant.title": "Auction Assistant",
    "features.auctionAssistant.description": "Get instant answers to your auction questions",
    "features.auctionAssistant.example": '"How does the bidding process work?"',
    "features.auctionAssistant.button": "Chat Now",

    // Browse Sales
    "browse.title": "Browse Sales",
    "browse.description": "Explore upcoming auctions with natural language search",
    "browse.example": '"Show me all art auctions happening next week"',

    // Automated Bidding
    "bidding.title": "Automated Bidding",
    "bidding.description": "Set up an agent to bid on your behalf up to your maximum",
    "bidding.example": '"Bid on lot number 123 up to 5000€"',

    // Notifications
    "notifications.title": "Custom Notifications",
    "notifications.description": "Get alerts when lots matching your criteria come up for auction",
    "notifications.example": '"Notify me about Picasso prints under 3000€"',

    // Footer
    "footer.partnership": "In partnership with",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.contact": "Contact",

    // AI Tools
    "aiTools.title": "Drou AI Tools",
    "aiTools.priceEstimator": "Price Estimator",

    // Price Estimator
    "priceEstimator.title": "AI Price Estimator",
    "priceEstimator.itemDetails": "Enter Item Details",
    "priceEstimator.placeholder":
      "Enter details about the item (type, artist, period, condition, provenance, dimensions, materials, etc.)",
    "priceEstimator.tip": "The more specific details you provide, the more accurate the estimate will be.",
    "priceEstimator.button": "Estimate Price",
    "priceEstimator.estimating": "Estimating...",
    "priceEstimator.priceRange": "Estimated Price Range",
    "priceEstimator.confidence.high": "High Confidence",
    "priceEstimator.confidence.medium": "Medium Confidence",
    "priceEstimator.confidence.low": "Low Confidence",
    "priceEstimator.reasoning": "Reasoning",
    "priceEstimator.disclaimer":
      "Note: This is an AI-generated estimate and should be used as a general guide only. For a formal appraisal, please consult with a professional appraiser.",

    // Chat Assistant
    "chat.title": "Drou Assistant",
    "chat.placeholder": "Type your message...",
    "chat.welcome": "Welcome to the Drou Assistant! Ask me anything about auctions, lots, or bidding.",
    "chat.error": "I'm sorry, I encountered an error. Please try again.",

    // Dashboard
    "dashboard.title": "Your Dashboard",
    "dashboard.savedLots": "Saved Lots",
    "dashboard.upcomingAuctions": "Upcoming Auctions",
    "dashboard.activeBids": "Active Bids",
    "dashboard.noUpcomingAuctions": "You have no upcoming auctions that match your interests.",
    "dashboard.browseAuctions": "Browse Auctions",
    "dashboard.noActiveBids": "You have no active bids at the moment.",
    "dashboard.findLots": "Find Lots to Bid On",
    "dashboard.notificationSettings": "Notification Settings",
    "dashboard.notificationDescription": "Customize your alerts",
    "dashboard.managePreferences": "Manage Preferences",

    // Lot Details
    "lot.backToSearch": "Back to search",
    "lot.description": "Description",
    "lot.details": "Details",
    "lot.provenance": "Provenance",
    "lot.estimate": "Estimate",
    "lot.auctionDetails": "Auction Details",
    "lot.sale": "Sale",
    "lot.auctionHouse": "Auction House",
    "lot.auctioneer": "Auctioneer",
    "lot.dimensions": "Dimensions",
    "lot.material": "Material",
    "lot.period": "Period",
    "lot.condition": "Condition",

    // Bid Form
    "bid.maxBid": "Your Maximum Bid (€)",
    "bid.placeholder": "Enter your maximum bid",
    "bid.tip": "Enter the maximum amount you are willing to bid",
    "bid.autoBidding": "Enable automatic bidding",
    "bid.autoBiddingDescription":
      "Automatic bidding will place bids on your behalf up to your maximum amount. You will be notified if you are outbid.",
    "bid.button": "Place Bid",
    "bid.processing": "Processing...",
    "bid.success": "Your bid has been successfully placed! You will be notified of any updates.",

    // Social Share
    "share.button": "Share",
    "share.title": "Share this lot",
    "share.description": "Share this auction lot with your friends and followers",
    "share.socialMedia": "Social Media",
    "share.copyLink": "Copy Link",
    "share.copied": "Link copied to clipboard!",
  },
  fr: {
    // Header
    "app.title": "L'Enchanteur Drou",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.myAccount": "Mon Compte",
    "nav.dashboard": "Tableau de Bord",
    "nav.notifications": "Notifications",
    "nav.myBids": "Mes Enchères",
    "nav.settings": "Paramètres",
    "nav.logout": "Déconnexion",
    "nav.auctionAssistant": "Assistant d'Enchères",

    // Home
    "home.title": "Explorez les Ventes aux Enchères",
    "home.subtitle":
      "Découvrez, enchérissez et recevez des notifications sur les lots qui correspondent à vos intérêts",
    "home.search.placeholder": "Rechercher des ventes, lots, artistes...",
    "home.search.button": "Rechercher",
    "home.search.searching": "Recherche en cours...",
    "home.search.examples": 'Essayez : "Peintures impressionnistes", "Ventes de bijoux à Paris", "Mobilier ancien"',
    "home.lucky.button": "J'ai de la chance",
    "home.lucky.loading": "Recherche de quelque chose de spécial...",

    // Features
    "features.title": "Fonctionnalités IA",
    "features.priceEstimator.title": "Estimateur de Prix",
    "features.priceEstimator.description": "Obtenez des estimations de prix alimentées par l'IA pour vos objets",
    "features.priceEstimator.example": '"Quelle est la valeur de cette peinture du 19ème siècle ?"',
    "features.auctionAssistant.title": "Assistant d'Enchères",
    "features.auctionAssistant.description": "Obtenez des réponses instantanées à vos questions sur les enchères",
    "features.auctionAssistant.example": '"Comment fonctionne le processus d\'enchères ?"',
    "features.auctionAssistant.button": "Discuter Maintenant",

    // Browse Sales
    "browse.title": "Parcourir les Ventes",
    "browse.description": "Explorez les ventes à venir avec une recherche en langage naturel",
    "browse.example": '"Montrez-moi toutes les ventes d\'art qui ont lieu la semaine prochaine"',

    // Automated Bidding
    "bidding.title": "Enchères Automatisées",
    "bidding.description": "Configurez un agent pour enchérir en votre nom jusqu'à votre maximum",
    "bidding.example": '"Enchérir sur le lot numéro 123 jusqu\'à 5000€"',

    // Notifications
    "notifications.title": "Notifications Personnalisées",
    "notifications.description":
      "Recevez des alertes lorsque des lots correspondant à vos critères sont mis aux enchères",
    "notifications.example": '"Prévenez-moi des estampes de Picasso à moins de 3000€"',

    // Footer
    "footer.partnership": "En partenariat avec",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
    "footer.contact": "Contact",

    // AI Tools
    "aiTools.title": "Outils IA Drou",
    "aiTools.priceEstimator": "Estimateur de Prix",

    // Price Estimator
    "priceEstimator.title": "Estimateur de Prix IA",
    "priceEstimator.itemDetails": "Entrez les Détails de l'Objet",
    "priceEstimator.placeholder":
      "Entrez les détails de l'objet (type, artiste, période, état, provenance, dimensions, matériaux, etc.)",
    "priceEstimator.tip": "Plus vous fournissez de détails spécifiques, plus l'estimation sera précise.",
    "priceEstimator.button": "Estimer le Prix",
    "priceEstimator.estimating": "Estimation en cours...",
    "priceEstimator.priceRange": "Fourchette de Prix Estimée",
    "priceEstimator.confidence.high": "Confiance Élevée",
    "priceEstimator.confidence.medium": "Confiance Moyenne",
    "priceEstimator.confidence.low": "Confiance Faible",
    "priceEstimator.reasoning": "Raisonnement",
    "priceEstimator.disclaimer":
      "Note : Ceci est une estimation générée par IA et doit être utilisée uniquement comme guide général. Pour une évaluation formelle, veuillez consulter un expert.",

    // Chat Assistant
    "chat.title": "Assistant Drou",
    "chat.placeholder": "Tapez votre message...",
    "chat.welcome":
      "Bienvenue sur l'Assistant Drou ! Posez-moi n'importe quelle question sur les ventes, les lots ou les enchères.",
    "chat.error": "Je suis désolé, j'ai rencontré une erreur. Veuillez réessayer.",

    // Dashboard
    "dashboard.title": "Votre Tableau de Bord",
    "dashboard.savedLots": "Lots Enregistrés",
    "dashboard.upcomingAuctions": "Ventes à Venir",
    "dashboard.activeBids": "Enchères Actives",
    "dashboard.noUpcomingAuctions": "Vous n'avez pas de ventes à venir qui correspondent à vos intérêts.",
    "dashboard.browseAuctions": "Parcourir les Ventes",
    "dashboard.noActiveBids": "Vous n'avez pas d'enchères actives pour le moment.",
    "dashboard.findLots": "Trouver des Lots pour Enchérir",
    "dashboard.notificationSettings": "Paramètres de Notification",
    "dashboard.notificationDescription": "Personnalisez vos alertes",
    "dashboard.managePreferences": "Gérer les Préférences",

    // Lot Details
    "lot.backToSearch": "Retour à la recherche",
    "lot.description": "Description",
    "lot.details": "Détails",
    "lot.provenance": "Provenance",
    "lot.estimate": "Estimation",
    "lot.auctionDetails": "Détails de la Vente",
    "lot.sale": "Vente",
    "lot.auctionHouse": "Maison de Vente",
    "lot.auctioneer": "Commissaire-Priseur",
    "lot.dimensions": "Dimensions",
    "lot.material": "Matériau",
    "lot.period": "Période",
    "lot.condition": "État",

    // Bid Form
    "bid.maxBid": "Votre Enchère Maximum (€)",
    "bid.placeholder": "Entrez votre enchère maximum",
    "bid.tip": "Entrez le montant maximum que vous êtes prêt à enchérir",
    "bid.autoBidding": "Activer les enchères automatiques",
    "bid.autoBiddingDescription":
      "Les enchères automatiques placeront des enchères en votre nom jusqu'à votre montant maximum. Vous serez notifié si vous êtes surenchéri.",
    "bid.button": "Placer l'Enchère",
    "bid.processing": "Traitement en cours...",
    "bid.success": "Votre enchère a été placée avec succès ! Vous serez notifié de toute mise à jour.",

    // Social Share
    "share.button": "Partager",
    "share.title": "Partager ce lot",
    "share.description": "Partagez ce lot de vente aux enchères avec vos amis et abonnés",
    "share.socialMedia": "Réseaux Sociaux",
    "share.copyLink": "Copier le Lien",
    "share.copied": "Lien copié dans le presse-papiers !",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr") // Default to French

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
