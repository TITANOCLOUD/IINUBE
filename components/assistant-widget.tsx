"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, MessageCircle, Phone } from "lucide-react"
import { usePathname } from "next/navigation"

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      const user = localStorage.getItem("username") || ""
      setIsAuthenticated(isLoggedIn)
      setUserName(user)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)

    // Show widget after 5 seconds on first visit
    const timer = setTimeout(() => {
      const hasSeenWidget = sessionStorage.getItem("hasSeenAndrea")
      if (!hasSeenWidget) {
        setIsOpen(true)
        sessionStorage.setItem("hasSeenAndrea", "true")
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("storage", checkAuth)
    }
  }, [])

  // Don't show on dashboard or login pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
    return null
  }

  const getContextualMessage = () => {
    if (isAuthenticated) {
      return `Hola ${userName}, estoy aquí para ayudarte con lo que necesites. ¿En qué puedo asistirte hoy?`
    }

    if (pathname?.includes("bare-metal")) {
      return "Veo que estás interesado en nuestros servidores Bare Metal. ¿Necesitas ayuda para configurar tu servidor ideal?"
    }
    if (pathname?.includes("vps")) {
      return "¿Buscas un VPS? Puedo ayudarte a elegir el plan perfecto para tus necesidades."
    }
    if (pathname?.includes("clusters")) {
      return "Nuestros clusters Ceph son ideales para alta disponibilidad. ¿Quieres saber más?"
    }
    if (pathname?.includes("calculadora")) {
      return "¿Necesitas ayuda con el cálculo de costos? Estoy aquí para aclarar cualquier duda."
    }
    if (pathname?.includes("contacto")) {
      return "Genial, estás en contacto. Si prefieres hablar directamente, ¡llámame!"
    }

    return "Hola, soy Andrea tu asistente virtual. Estoy aquí para ayudarte con cualquier duda sobre nuestros servicios. ¿En qué puedo asistirte?"
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Abrir asistente Andrea"
      >
        <div className="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-latina-business-woman-with-headset-cu-EbEl21R5bnl6JtBeJo9hddo1jIw6P4.jpg"
            alt="Andrea - Asistente Virtual"
            className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-cyan-400 group-hover:border-cyan-300 transition-all"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>
      </button>
    )
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Abrir chat con Andrea"
        >
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-latina-business-woman-with-headset-cu-EbEl21R5bnl6JtBeJo9hddo1jIw6P4.jpg"
              alt="Andrea - Asistente Virtual"
              className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-cyan-400 group-hover:border-cyan-300 transition-all group-hover:scale-110"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 shadow-2xl border-cyan-400/50 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-latina-business-woman-with-headset-cu-EbEl21R5bnl6JtBeJo9hddo1jIw6P4.jpg"
                alt="Andrea"
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">Andrea</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-400">Asistente Virtual</p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700"
                >
                  <span className="text-lg">−</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Message */}
            <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-200 leading-relaxed">{getContextualMessage()}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => (window.location.href = "/contacto")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Enviar Mensaje
              </Button>
              <Button
                variant="outline"
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                onClick={() => (window.location.href = "tel:+1234567890")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Llamar Ahora
              </Button>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center mt-3">Estoy disponible para ayudarte 24/7</p>
          </div>
        </Card>
      )}
    </>
  )
}
