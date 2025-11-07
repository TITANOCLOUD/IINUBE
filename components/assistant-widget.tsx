"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, MessageCircle, Phone, Send } from "lucide-react"
import { usePathname } from "next/navigation"

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const whatsappNumber = "523323131655"
    const whatsappMessage = `Hola, me llamo ${formData.name}.\n\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje: ${formData.message}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappUrl, "_blank")

    setIsSubmitting(false)
    setShowContactForm(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const getContextualMessage = () => {
    if (isAuthenticated) {
      return `Hola ${userName}, soy Manuel Fraustro, tu Director Comercial para LATAM. Estoy aquí para ayudarte con lo que necesites. ¿En qué puedo asistirte hoy?`
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

    return "Hola, soy Manuel Fraustro, Director Comercial LATAM de IINUBE. Estoy aquí para ayudarte con cualquier duda sobre nuestros servicios. ¿En qué puedo asistirte?"
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Abrir asistente Manuel Fraustro"
      >
        <div className="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3RERQcvArHN0Mv7hr2U5eNVHny4WuE.png"
            alt="Manuel Fraustro - Director Comercial para LATAM"
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
          aria-label="Abrir chat con Manuel Fraustro"
        >
          <div className="relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3RERQcvArHN0Mv7hr2U5eNVHny4WuE.png"
              alt="Manuel Fraustro - Director Comercial"
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3RERQcvArHN0Mv7hr2U5eNVHny4WuE.png"
                alt="Manuel Fraustro"
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">Manuel Fraustro</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-400">Director Comercial LATAM</p>
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
                  onClick={() => {
                    setIsOpen(false)
                    setShowContactForm(false)
                  }}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!showContactForm ? (
              <>
                {/* Message */}
                <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-200 leading-relaxed">{getContextualMessage()}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    onClick={() => setShowContactForm(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                    onClick={() => window.open("tel:+523323131655", "_self")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar Ahora
                  </Button>
                </div>

                {/* Footer */}
                <p className="text-xs text-gray-500 text-center mt-3">Estoy disponible para ayudarte 24/7</p>
              </>
            ) : (
              <>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-300">
                      Completa tus datos y te contactaré de inmediato por WhatsApp
                    </p>
                  </div>

                  <div>
                    <Input
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Tu teléfono (WhatsApp)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Textarea
                      placeholder="¿En qué puedo ayudarte?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={3}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Card>
      )}
    </>
  )
}
