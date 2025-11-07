"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Server,
  Zap,
  Shield,
  HeadphonesIcon,
  Check,
  Cpu,
  HardDrive,
  Container,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getFeaturedVPSPlans } from "@/data/vps-plans"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [requiresCaptcha, setRequiresCaptcha] = useState(false)

  const slides = [
    {
      title: "Infraestructura Cloud",
      highlight: "Sin Límites",
      subtitle:
        "Donde otros ponen barreras, nosotros ponemos posibilidades. Escala, adapta y evoluciona con una plataforma que se alinea con tus sueños y los hace realidad.",
      cta: "EXPLORAR SOLUCIONES",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gen-3%20Alpha%201526416146%2C%20An%20award-winning%20doc%2C%20M%205-VPbQWqMh9T89eE5wBBPdqZ2pHUkKm1.mp4",
    },
    {
      title: "Despliegue en",
      highlight: "60 Segundos",
      subtitle:
        "No importa si tu idea es grande o pequeña, nosotros la levantamos al instante. Infraestructura cloud ágil, soporte dedicado y tecnología de IA lista para que brilles desde el primer minuto.",
      cta: "COMENZAR AHORA",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250217_1848_Futuristic%20Truck%20Journey_simple_compose_01jmb4z8tcfm2vf0jhvev9m7fj-WpdItknruB6KhR3HufrlXbjaXLTkwh.mp4",
    },
    {
      title: "Soporte Técnico",
      highlight: "Experto 24/7",
      subtitle:
        "Estamos contigo en cada paso: integración, mantenimiento, escalado. Nuestro equipo actúa como parte de tu proyecto, para que tú solo te enfoques en crecer. Soporte real, no promesas.",
      cta: "CONTACTAR SOPORTE",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250210_0934_Futuristic%20Spartan%20Patrol_simple_compose_01jkr4g0rcezjbc3hqvw5jftvc-0dY1WN4r87nCSqF1vcHkpxJjkQcWuG.mp4",
    },
    {
      title: "AI + Innovation + Development",
      highlight: "Building the Next Era of Cloud Technology",
      subtitle:
        "Integrar IA en tus procesos no es futuro: es ahora. Creamos soluciones inteligentes que aprenden, optimizan y transforman tu negocio. Con nosotros, no sólo estás en la nube — estás en la nube inteligente.",
      cta: "DESCUBRE NUESTRA IA",
      video:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0f39b7b7-2666-4ec8-a0bc-ad51b86ada0a_4978c8a8-1754-42ab-a1b1-7f3c30df1fa9-xZw6fiRSD5O92S1AU5LQ4FZsxcQHjr.mp4",
      isAISlide: true,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      setIsAuthenticated(authStatus)
      console.log("[v0] Authentication status:", authStatus)
    }

    checkAuth()

    // Listen for storage changes (when user logs in from another tab)
    window.addEventListener("storage", checkAuth)

    // Check auth when page becomes visible (user returns from login)
    window.addEventListener("visibilitychange", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("visibilitychange", checkAuth)
    }
  }, [])

  useEffect(() => {
    if (window.location.hash === "#chat") {
      const chatSection = document.getElementById("chat")
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    console.log("[v0] Sending message, isAuthenticated:", isAuthenticated) // added debug log

    // Add user message to chat
    const newMessages = [...messages, { role: "user" as const, content: userInput }]
    setMessages(newMessages)
    setUserInput("")
    setIsAnalyzing(true)

    try {
      console.log("[v0] Calling API with messages:", newMessages) // added debug log

      const response = await fetch("/api/loise/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          isAuthenticated,
        }),
      })

      console.log("[v0] API response status:", response.status) // added debug log

      if (!response.ok) {
        const errorData = await response.json()
        console.log("[v0] API error data:", errorData) // added debug log

        if (errorData.requiresLogin) {
          setShowLoginPrompt(true)
          setMessages([
            ...newMessages,
            {
              role: "assistant",
              content: errorData.message,
            },
          ])
          setIsAnalyzing(false)
          return
        }

        if (errorData.requiresCaptcha) {
          setRequiresCaptcha(true)
          setMessages([
            ...newMessages,
            {
              role: "assistant",
              content: errorData.message,
            },
          ])
          setIsAnalyzing(false)
          return
        }

        throw new Error(errorData.message || "Error al procesar la solicitud")
      }

      // Stream the response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              const content = line.slice(2).replace(/^"(.*)"$/, "$1")
              assistantMessage += content
              setMessages([...newMessages, { role: "assistant", content: assistantMessage }])
            }
          }
        }
      }

      setIsAnalyzing(false)
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "❌ Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.",
        },
      ])
      setIsAnalyzing(false)
    }
  }

  const handleLogin = () => {
    window.location.href = "/login?returnTo=/#chat"
  }

  const handleCompleteCaptcha = () => {
    // Simulate CAPTCHA completion
    setRequiresCaptcha(false)
    setMessages([
      ...messages,
      {
        role: "assistant",
        content: "✅ Verificación completada. Puedes continuar con tu consulta.",
      },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Navigation */}

      <section className="relative overflow-hidden w-full">
        <div className="relative h-[700px] md:h-[800px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0">
                {slide.video ? (
                  <video src={slide.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={`${slide.title} - SATURNO`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                {slide.isAISlide ? (
                  <>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight drop-shadow-2xl">
                      AI <span className="text-cyan-400">+</span> Innovation <span className="text-cyan-400">+</span>{" "}
                      Development <span className="text-cyan-400">=</span>
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                      <span className="text-cyan-400">Building</span>{" "}
                      <span className="text-white">the Next Era of Cloud Technology</span>
                    </h3>
                  </>
                ) : (
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                    {slide.title} <span className="text-cyan-400">{slide.highlight}</span>
                  </h2>
                )}
                <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-3xl drop-shadow-lg">{slide.subtitle}</p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-xl transition-all"
                >
                  <a href="/contacto">{slide.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full transition-all"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-cyan-400 w-8" : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* AI Product Recommendation Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ¿No sabes quién te puede ayudar a <span className="text-cyan-400">diseñar lo que necesitas?</span>
            </h2>
            <div className="text-lg text-slate-300 max-w-3xl mx-auto">
              <p className="mb-4">
                La persona responsable de diseñar, planificar y supervisar la infraestructura tecnológica en la nube de
                una organización es el <strong className="text-cyan-400">Arquitecto Cloud</strong>. Esto incluye
                servidores, redes, almacenamiento y seguridad, integrados de modo que respondan a los objetivos del
                negocio.
              </p>
              <p className="text-xl font-semibold text-white">
                Si no tienes uno, aquí te presentamos a <span className="text-cyan-400">Aníbal de IINUBE</span>. Puedes
                usarlo desde que expliques todo a detalle.
              </p>
            </div>
          </div>

          <div id="chat" className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative hidden md:block">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl sticky top-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-J76NbjPkSjZHxJuRkxDF2jSbY2rouq.png"
                  alt="Aníbal Hernández - Gerente de Infraestructura y Ciberseguridad"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                    <p className="text-white font-semibold mb-1">
                      Aníbal Hernández - Gerente de Infraestructura y Ciberseguridad
                    </p>
                    <p className="text-slate-300 text-sm">Disponible 24/7 para diseñar tu infraestructura ideal</p>
                    {isAuthenticated && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-medium">Sesión activa</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white">Aníbal AI Assistant</CardTitle>
                </div>
                <CardDescription className="text-slate-300 text-base">
                  Arquitecto Cloud con IA • Consulta profesional gratuita
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Chat Messages */}
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-slate-400">
                        ¡Hola! Soy Aníbal Hernández, tu Arquitecto Cloud. Cuéntame sobre tu proyecto y te ayudaré a
                        diseñar la mejor infraestructura para tu negocio.
                      </p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.role === "user"
                              ? "bg-cyan-500 text-white"
                              : "bg-slate-950 text-slate-200 border border-cyan-500/30"
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">Tú</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {isAnalyzing && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white animate-spin" />
                      </div>
                      <div className="bg-slate-950 border border-cyan-500/30 rounded-lg p-4">
                        <p className="text-slate-400 text-sm">Aníbal está analizando tu consulta...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Login Prompt */}
                {showLoginPrompt && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                    <p className="text-orange-400 font-semibold mb-3">🔒 Autenticación Requerida</p>
                    <Button onClick={handleLogin} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Iniciar Sesión / Registrarse
                    </Button>
                  </div>
                )}

                {/* CAPTCHA Prompt */}
                {requiresCaptcha && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 font-semibold mb-3">⚠️ Verificación de Seguridad</p>
                    <Button onClick={handleCompleteCaptcha} className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Completar CAPTCHA
                    </Button>
                  </div>
                )}

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      placeholder="Ejemplo: Necesito alojar una aplicación web con base de datos que espero tenga 5000 usuarios concurrentes..."
                      className="w-full h-32 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none text-base"
                      disabled={isAnalyzing}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Aníbal está pensando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Consulta
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    Presiona Enter para enviar • Shift + Enter para nueva línea
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Infraestructura Cloud de Nueva Generación
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Potencia tu negocio con soluciones de hosting escalables, seguras y de alto rendimiento
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <a href="/contacto">Comenzar Ahora</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            <a href="#vps">Ver Planes</a>
          </Button>
        </div>
      </section>

      {/* Offers Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full mb-6 animate-pulse">
            <Zap className="w-6 h-6" />
            <span className="font-bold text-lg">OFERTAS DEL DÍA</span>
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Descuentos Especiales por Tiempo Limitado</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Aprovecha estas ofertas exclusivas antes de que terminen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Deal 1: VPS */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-orange-500 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              -40% OFF
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-10 h-10 text-orange-400" />
                <div>
                  <CardTitle className="text-2xl text-white">VPS Pro</CardTitle>
                  <CardDescription className="text-slate-400">Oferta Flash</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>4 vCPU</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>8 GB RAM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>160 GB SSD NVMe</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-orange-400" />
                  <span>Ancho de banda ilimitado</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 line-through text-xl">$700 MXN</span>
                  <span className="text-4xl font-bold text-orange-400">$420</span>
                  <span className="text-slate-400">MXN/mes</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Precio especial por 12 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>

          {/* Deal 2: Bare Metal */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-cyan-500 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              -30% OFF
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-10 h-10 text-cyan-400" />
                <div>
                  <CardTitle className="text-2xl text-white">Bare Metal RISE-3</CardTitle>
                  <CardDescription className="text-slate-400">Oferta Especial</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>AMD Ryzen 9 5900X (12c/24t)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>32 GB RAM DDR4</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>2 x 512 GB NVMe SSD</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <span>1 Gbps garantizado</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 line-through text-xl">$2,040 MXN</span>
                  <span className="text-4xl font-bold text-cyan-400">$1,420</span>
                  <span className="text-slate-400">MXN/mes</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Ahorra $620 MXN/mes durante 6 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>

          {/* Deal 3: Cluster */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-2 border-purple-500 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm rotate-12 shadow-lg">
              -25% OFF
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Container className="w-10 h-10 text-purple-400" />
                <div>
                  <CardTitle className="text-2xl text-white">Cluster Pro</CardTitle>
                  <CardDescription className="text-slate-400">Kubernetes Managed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>5 nodos worker</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Auto-scaling automático</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>CI/CD integrado</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Load Balancer incluido</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 line-through text-xl">$5,000 MXN</span>
                  <span className="text-4xl font-bold text-purple-400">$3,740</span>
                  <span className="text-slate-400">MXN/mes</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Oferta válida por 3 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 text-lg">
            ⏰ Ofertas válidas hasta agotar stock o fin de mes • Sin compromisos a largo plazo
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Nuestra Infraestructura</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Centros de datos de última generación con tecnología de punta
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250302_0144_Sustainable%20Nordic%20Data%20Center_simple_compose_01jnasjptjebbv6vjrnzjqjzhz-2FgFcG5ALsu91wMvFbQc0BdPMIF5Jp.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Centros de Datos TIER IV</h3>
              <p className="text-slate-300 text-sm">Somos conformes pero ecológicos</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84163ebe-30d6-4cc7-b74d-dee266072e18_ab45ad1e-125c-4711-9935-0306fe40e59d-TRhSsRHE7syUEk25ng9YgWoLUfiwdu.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Monitoreo 24/7</h3>
              <p className="text-slate-300 text-sm">Supervisión continua de toda la infraestructura</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65ffb1f37ddab9d2d6003117-1mHLhKwgrx3VSDs5V80gZQRgNBM2Qq.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Red de Alta Velocidad</h3>
              <p className="text-slate-300 text-sm">Conectividad de 10Gbps con baja latencia</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gen-3%20Alpha%20990622162%2C%20todo%20un%20equipo%20de%20es%20%281%29-iDYoV2fgcDVphStTjtUIbdns3cJQmx.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Seguridad Multicapa</h3>
              <p className="text-slate-300 text-sm">Protección DDoS y firewalls avanzados</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3757e01-ec2e-4022-a410-4d66541e4c58_7ea54835-a64c-4190-897e-339fa2b91000-iVNgh7Uo8DgNWA7P9r6eVEucnpTIoJ.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Escalabilidad Instantánea</h3>
              <p className="text-slate-300 text-sm">Recursos que crecen con tu negocio</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg aspect-video bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300">
            <Image
              src="/green-energy-efficient-data-center-with-cooling-sy.jpg"
              alt="Eficiencia energética"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Eficiencia Energética</h3>
              <p className="text-slate-300 text-sm">Tecnología verde y sostenible</p>
            </div>
          </div>
        </div>
      </section>

      {/* VPS Section */}
      <section id="vps" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Servidores Privados Virtuales</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">VPS escalables con recursos dedicados y control total</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {getFeaturedVPSPlans().map((plan) => (
            <Card key={plan.id} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-cyan-400">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>{plan.cpu}v CPU</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>{plan.ram} GB RAM DDR5</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span>{plan.storage} GB SSD NVMe</span>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-3xl font-bold text-white">${plan.price.toLocaleString()} MXN/mes</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Contratar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Bare Metal Section */}
      <section id="bare-metal" className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Servidores Bare Metal</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Máximo rendimiento con hardware dedicado</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Server className="w-6 h-6" />
                Bare Metal Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-300">
                  <strong>CPU:</strong> Intel Xeon E-2288G (8 cores / 16 threads)
                </p>
                <p className="text-slate-300">
                  <strong>RAM:</strong> 64 GB DDR4 ECC
                </p>
                <p className="text-slate-300">
                  <strong>Storage:</strong> 2x 1TB NVMe SSD RAID 1
                </p>
                <p className="text-slate-300">
                  <strong>Network:</strong> 1 Gbps ilimitado
                </p>
              </div>
              <p className="text-3xl font-bold text-white">$3,980 MXN/mes</p>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Contratar</Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Server className="w-6 h-6" />
                Bare Metal Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-300">
                  <strong>CPU:</strong> AMD EPYC 7543P (32 cores / 64 threads)
                </p>
                <p className="text-slate-300">
                  <strong>RAM:</strong> 256 GB DDR4 ECC
                </p>
                <p className="text-slate-300">
                  <strong>Storage:</strong> 4x 2TB NVMe SSD RAID 10
                </p>
                <p className="text-slate-300">
                  <strong>Network:</strong> 10 Gbps ilimitado
                </p>
              </div>
              <p className="text-3xl font-bold text-white">$11,980 MXN/mes</p>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Contratar</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clusters Section */}
      <section id="clusters" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Kubernetes Clusters</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Orquestación de contenedores gestionada</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Container className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Cluster Básico</CardTitle>
              <CardDescription className="text-slate-400">3 nodos worker</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Auto-scaling
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Load Balancer
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Monitoreo 24/7
                </li>
              </ul>
              <p className="text-3xl font-bold text-white mt-6">$2,400 MXN/mes</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Container className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Cluster Pro</CardTitle>
              <CardDescription className="text-slate-400">5 nodos worker</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Todo de Básico
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> CI/CD integrado
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Backup automático
                </li>
              </ul>
              <p className="text-3xl font-bold text-white mt-6">$5,000 MXN/mes</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Container className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Cluster Enterprise</CardTitle>
              <CardDescription className="text-slate-400">10+ nodos worker</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Todo de Pro
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Multi-región
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Soporte dedicado
                </li>
              </ul>
              <p className="text-3xl font-bold text-white mt-6">$10,000 MXN/mes</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-6">
                Aprovechar Oferta
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Dominios Section */}
      <section id="dominios" className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Registro de Dominios</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Encuentra y registra tu dominio perfecto</p>
        </div>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Busca tu dominio..."
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
            <Button className="bg-cyan-500 hover:bg-cyan-600">Buscar</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { tld: ".com", price: "$260 MXN/año" },
            { tld: ".net", price: "$300 MXN/año" },
            { tld: ".org", price: "$280 MXN/año" },
            { tld: ".io", price: "$800 MXN/año" },
          ].map((domain) => (
            <Card key={domain.tld} className="bg-slate-900 border-slate-800 text-center">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">{domain.tld}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white font-bold">{domain.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">¿Por qué elegir SATURNO?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Alto Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Infraestructura de última generación con SSD NVMe y red de 10Gbps</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Seguridad Avanzada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Protección DDoS, firewalls configurables y backups automáticos</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <HeadphonesIcon className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Soporte 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Equipo técnico disponible en todo momento para ayudarte</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partners Gallery Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Con Quiénes <span className="text-cyan-400">Trabajamos</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Integramos las mejores tecnologías cloud del mercado para ofrecerte soluciones de clase mundial
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* OVHcloud */}
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/ovhcloud-logo.jpg"
                  alt="OVHcloud Partner"
                  fill
                  className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">OVHcloud</h3>
                <p className="text-slate-400 text-sm">Infraestructura europea de alto rendimiento</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* AWS */}
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/aws-amazon-web-services-logo.jpg"
                  alt="AWS Partner"
                  fill
                  className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Amazon Web Services</h3>
                <p className="text-slate-400 text-sm">Líder mundial en servicios cloud</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* Azure */}
            <div className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="relative h-24 flex items-center justify-center">
                <Image
                  src="/microsoft-azure-logo.jpg"
                  alt="Microsoft Azure Partner"
                  fill
                  className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Microsoft Azure</h3>
                <p className="text-slate-400 text-sm">Plataforma cloud empresarial de Microsoft</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-lg">
              Combinamos lo mejor de cada plataforma para crear soluciones híbridas y multi-cloud optimizadas para tu
              negocio
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-4"></div>
      </footer>
    </div>
  )
}
