"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Server,
  Check,
  Cpu,
  HardDrive,
  Shield,
  Zap,
  ChevronDown,
  Globe,
  X,
  Activity,
  Share2,
  RotateCcw,
  Monitor,
  Smartphone,
  Laptop,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function VPSPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [configCpu, setConfigCpu] = useState(4)
  const [configRam, setConfigRam] = useState(8)
  const [configStorage, setConfigStorage] = useState(100)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isTestingSpeed, setIsTestingSpeed] = useState(false)
  const [speedResults, setSpeedResults] = useState<any>(null)
  const [hoveredDatacenter, setHoveredDatacenter] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [speedPhase, setSpeedPhase] = useState<"idle" | "download" | "upload" | "latency" | "complete">("idle")
  const [userIpInfo, setUserIpInfo] = useState<any>(null)
  const [showServerSelector, setShowServerSelector] = useState(false)

  const vpsPlans = [
    {
      id: "atlas",
      name: "Atlas",
      subtitle: "El Fundamento",
      cpu: 4,
      ram: 8,
      storage: 100,
      bandwidth: "400 Mbit/s",
      price: 4.2,
      setupFee: "Gratis",
      maxCpu: 8,
      maxRam: 16,
      maxStorage: 200,
    },
    {
      id: "prometeo",
      name: "Prometeo",
      subtitle: "El Visionario",
      cpu: 6,
      ram: 12,
      storage: 150,
      bandwidth: "1 Gb/s",
      price: 6.75,
      setupFee: "Gratis",
      maxCpu: 12,
      maxRam: 24,
      maxStorage: 300,
    },
    {
      id: "cronos",
      name: "Cronos",
      subtitle: "El Líder",
      cpu: 8,
      ram: 24,
      storage: 200,
      bandwidth: "1.5 Gb/s",
      price: 12.75,
      setupFee: "Gratis",
      recommended: true,
      maxCpu: 16,
      maxRam: 48,
      maxStorage: 500,
    },
    {
      id: "hiperion",
      name: "Hiperión",
      subtitle: "La Luz",
      cpu: 12,
      ram: 48,
      storage: 300,
      bandwidth: "2 Gb/s",
      price: 22.08,
      setupFee: "Gratis",
      maxCpu: 20,
      maxRam: 64,
      maxStorage: 700,
    },
    {
      id: "oceano",
      name: "Océano",
      subtitle: "El Vasto",
      cpu: 16,
      ram: 64,
      storage: 350,
      bandwidth: "2.5 Gb/s",
      price: 34.34,
      setupFee: "Gratis",
      maxCpu: 24,
      maxRam: 96,
      maxStorage: 900,
    },
    {
      id: "titan",
      name: "Titán",
      subtitle: "El Supremo",
      cpu: 24,
      ram: 96,
      storage: 400,
      bandwidth: "3 Gb/s",
      price: 45.39,
      setupFee: "Gratis",
      maxCpu: 32,
      maxRam: 128,
      maxStorage: 1000,
    },
  ]

  const datacenters = [
    { id: "ny", name: "Nueva York", x: 25, y: 35, type: "primary" },
    { id: "london", name: "Londres", x: 50, y: 30, type: "primary" },
    { id: "tokyo", name: "Tokio", x: 85, y: 35, type: "primary" },
    { id: "sydney", name: "Sídney", x: 88, y: 75, type: "vps" },
    { id: "saopaulo", name: "São Paulo", x: 35, y: 70, type: "vps" },
    { id: "frankfurt", name: "Frankfurt", x: 52, y: 28, type: "vps" },
    { id: "singapore", name: "Singapur", x: 78, y: 55, type: "vps" },
    { id: "toronto", name: "Toronto", x: 23, y: 32, type: "local" },
    { id: "mumbai", name: "Mumbai", x: 70, y: 45, type: "local" },
    { id: "paris", name: "París", x: 51, y: 30, type: "coming" },
    { id: "dubai", name: "Dubái", x: 62, y: 42, type: "vps" },
    { id: "chicago", name: "Chicago", x: 22, y: 33, type: "local" },
  ]

  const serverLocations = [
    {
      id: "beauharnois",
      name: "Beauharnois",
      country: "Canadá",
      region: "América del Norte",
      lat: 45.3167,
      lng: -73.8667,
      speed: "10 Gb/s",
      flag: "🇨🇦",
    },
    {
      id: "ny",
      name: "Nueva York",
      country: "Estados Unidos",
      region: "América del Norte",
      lat: 40.7128,
      lng: -74.006,
      speed: "10 Gb/s",
      flag: "🇺🇸",
    },
    {
      id: "london",
      name: "Londres",
      country: "Reino Unido",
      region: "Europa",
      lat: 51.5074,
      lng: -0.1278,
      speed: "10 Gb/s",
      flag: "🇬🇧",
    },
    {
      id: "tokyo",
      name: "Tokio",
      country: "Japón",
      region: "Asia",
      lat: 35.6762,
      lng: 139.6503,
      speed: "10 Gb/s",
      flag: "🇯🇵",
    },
    {
      id: "sydney",
      name: "Sídney",
      country: "Australia",
      region: "Oceanía",
      lat: -33.8688,
      lng: 151.2093,
      speed: "10 Gb/s",
      flag: "🇦🇺",
    },
    {
      id: "saopaulo",
      name: "São Paulo",
      country: "Brasil",
      region: "América del Sur",
      lat: -23.5505,
      lng: -46.6333,
      speed: "10 Gb/s",
      flag: "🇧🇷",
    },
    {
      id: "buenosaires",
      name: "Buenos Aires",
      country: "Argentina",
      region: "América del Sur",
      lat: -34.6037,
      lng: -58.3816,
      speed: "10 Gb/s",
      flag: "🇦🇷",
    },
    {
      id: "frankfurt",
      name: "Frankfurt",
      country: "Alemania",
      region: "Europa",
      lat: 50.1109,
      lng: 8.6821,
      speed: "10 Gb/s",
      flag: "🇩🇪",
    },
    {
      id: "singapore",
      name: "Singapur",
      country: "Singapur",
      region: "Asia",
      lat: 1.3521,
      lng: 103.8198,
      speed: "10 Gb/s",
      flag: "🇸🇬",
    },
    {
      id: "toronto",
      name: "Toronto",
      country: "Canadá",
      region: "América del Norte",
      lat: 43.6532,
      lng: -79.3832,
      speed: "10 Gb/s",
      flag: "🇨🇦",
    },
    {
      id: "mumbai",
      name: "Mumbai",
      country: "India",
      region: "Asia",
      lat: 19.076,
      lng: 72.8777,
      speed: "10 Gb/s",
      flag: "🇮🇳",
    },
    {
      id: "paris",
      name: "París",
      country: "Francia",
      region: "Europa",
      lat: 48.8566,
      lng: 2.3522,
      speed: "10 Gb/s",
      flag: "🇫🇷",
    },
  ]

  const faqs = [
    {
      question: "¿Qué es un VPS?",
      answer:
        "Un VPS (Virtual Private Server) es un servidor virtual que funciona como un servidor dedicado dentro de un servidor físico más grande. Ofrece recursos garantizados, control total del sistema operativo y aislamiento de otros usuarios.",
    },
    {
      question: "¿Cuánto cuesta un servidor VPS?",
      answer:
        "El precio de un VPS depende de varios factores: cantidad de CPU, memoria RAM, almacenamiento y ancho de banda. Nuestros planes comienzan desde $4.20/mes para proyectos pequeños hasta $45.39/mes para aplicaciones de alto rendimiento. Los factores que influyen en el precio incluyen el tipo de almacenamiento (SSD NVMe es más rápido), la cantidad de RAM necesaria para tus aplicaciones, y el ancho de banda requerido.",
    },
    {
      question: "¿Qué sistemas operativos están disponibles?",
      answer:
        "Ofrecemos una amplia selección de sistemas operativos gratuitos y de pago. Entre los gratuitos incluimos distribuciones Linux como Ubuntu, CentOS, Fedora y Debian. También disponemos de licencias para Windows Server con costos adicionales según la versión requerida.",
    },
    {
      question: "¿Puedo escalar mi VPS?",
      answer:
        "Sí, todos nuestros planes VPS son escalables. Puedes aumentar CPU, RAM y almacenamiento en cualquier momento sin tiempo de inactividad significativo. El proceso es simple desde tu panel de control.",
    },
    {
      question: "¿Qué tipo de almacenamiento utilizan?",
      answer:
        "Todos nuestros VPS utilizan almacenamiento SSD NVMe de última generación, que ofrece velocidades de lectura/escritura hasta 6 veces más rápidas que los SSD SATA tradicionales. Esto se traduce en mejor rendimiento para bases de datos y aplicaciones.",
    },
  ]

  const calculateCustomPrice = () => {
    const baseCpuPrice = 1.5
    const baseRamPrice = 2
    const baseStoragePrice = 0.15
    return (configCpu * baseCpuPrice + configRam * baseRamPrice + configStorage * baseStoragePrice).toFixed(2)
  }

  const getSelectedPlanLimits = () => {
    const plan = vpsPlans.find((p) => p.id === selectedPlan)
    return plan || vpsPlans[2] // Default to Cronos
  }

  const detectUserLocation = async () => {
    setIsDetectingLocation(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate fetching IP info
      const mockIpInfo = {
        ip: "179.6.6.121",
        ipv6: "2800:200:e508:7e0:21b8:9c",
        isp: "Claro",
        connectionType: "FTTH",
        asn: "12252",
        city: "Buenos Aires",
        country: "Argentina",
        browser:
          typeof window !== "undefined" ? (navigator.userAgent.includes("Chrome") ? "Chrome" : "Browser") : "Chrome",
        os: typeof window !== "undefined" ? (navigator.userAgent.includes("Win") ? "Windows 10" : "OS") : "Windows 10",
      }

      setUserIpInfo(mockIpInfo)
      // Default to Beauharnois as the server location
      setUserLocation("beauharnois")
      setSelectedLocation("beauharnois")
    } catch (error) {
      console.error("[v0] Error detecting location:", error)
      // Fallback to Beauharnois
      setUserLocation("beauharnois")
      setSelectedLocation("beauharnois")
    }

    setIsDetectingLocation(false)
  }

  useEffect(() => {
    detectUserLocation()
  }, [])

  const runSpeedTest = async (locationId: string) => {
    if (!userLocation) {
      alert("Por favor, detecta tu ubicación primero")
      return
    }

    setIsTestingSpeed(true)
    setSelectedLocation(locationId)
    setSpeedResults(null)
    setCurrentSpeed(0)
    setSpeedPhase("download")

    const downloadTarget = Math.random() * 100 + 150 // 150-250 Mbps
    for (let i = 0; i <= downloadTarget; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 30))
      setCurrentSpeed(i)
    }
    setCurrentSpeed(downloadTarget)

    await new Promise((resolve) => setTimeout(resolve, 500))

    setSpeedPhase("upload")
    const uploadTarget = downloadTarget * 0.85
    setCurrentSpeed(0)
    for (let i = 0; i <= uploadTarget; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 30))
      setCurrentSpeed(i)
    }
    setCurrentSpeed(uploadTarget)

    await new Promise((resolve) => setTimeout(resolve, 500))

    setSpeedPhase("latency")
    const targetLocation = serverLocations.find((l) => l.id === locationId)
    const originLocation = serverLocations.find((l) => l.id === userLocation)

    const distance = Math.sqrt(
      Math.pow(targetLocation!.lat - originLocation!.lat, 2) + Math.pow(targetLocation!.lng - originLocation!.lng, 2),
    )
    const baseLatency = Math.min(distance * 10 + Math.random() * 20, 300)

    setSpeedResults({
      origin: originLocation?.name,
      destination: targetLocation?.name,
      latency: {
        min: baseLatency.toFixed(1),
        avg: (baseLatency + 0.7).toFixed(1),
        jitter: (Math.random() * 2 + 0.5).toFixed(3),
      },
      download: {
        max: downloadTarget.toFixed(1),
        avg: (downloadTarget * 0.87).toFixed(1),
      },
      upload: {
        max: uploadTarget.toFixed(1),
        avg: (uploadTarget * 0.89).toFixed(1),
      },
      packetLoss: (Math.random() * 0.5).toFixed(2),
    })

    setSpeedPhase("complete")
    setIsTestingSpeed(false)
  }

  const shareResults = () => {
    if (speedResults) {
      const text = `Test de velocidad TITANO CLOUD\nDesde: ${speedResults.origin} → Hacia: ${speedResults.destination}\nDescarga: ${speedResults.download.max} Mbps\nSubida: ${speedResults.upload.max} Mbps\nLatencia: ${speedResults.latency.avg} ms`
      navigator.clipboard.writeText(text)
      alert("Resultados copiados al portapapeles")
    }
  }

  const restartTest = () => {
    setSpeedResults(null)
    setCurrentSpeed(0)
    setSpeedPhase("idle")
    setIsTestingSpeed(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Server className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">VPS Serie Titán</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Servidores VPS de Alto Rendimiento
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Elija la configuración que mejor se adapta a sus necesidades: web hosting, gaming, VPN, desarrollo y mucho
          más. Cada plan lleva el nombre de un Titán, simbolizando poder y confiabilidad.
        </p>
      </section>

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Sus datos, alojados donde más los necesite</h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Nuestros VPS están disponibles en numerosas localizaciones estratégicas a nivel mundial para garantizar una
            baja latencia en sus proyectos.
          </p>
        </div>
        <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-hidden">
          <div className="relative w-full aspect-[2/1] mb-8 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(6 182 212)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Detailed Cyan World Map */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4295-uvgis37mbyF8ri7S11CFYfkvShAlFe.png"
                alt="Mapa mundial de centros de datos"
                className="w-full h-full object-contain opacity-80"
              />
            </div>

            {/* Datacenter Markers Overlay */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Connection Lines between datacenters */}
              <g opacity="0.3">
                <line x1="25" y1="35" x2="50" y2="30" stroke="rgb(6 182 212)" strokeWidth="0.2" strokeDasharray="2,2">
                  <animate attributeName="stroke-dashoffset" from="0" to="4" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="50" y1="30" x2="85" y2="35" stroke="rgb(6 182 212)" strokeWidth="0.2" strokeDasharray="2,2">
                  <animate attributeName="stroke-dashoffset" from="0" to="4" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="85" y1="35" x2="88" y2="75" stroke="rgb(6 182 212)" strokeWidth="0.2" strokeDasharray="2,2">
                  <animate attributeName="stroke-dashoffset" from="0" to="4" dur="2s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Datacenter Markers */}
              {datacenters.map((dc) => (
                <g
                  key={dc.id}
                  onMouseEnter={() => setHoveredDatacenter(dc.id)}
                  onMouseLeave={() => setHoveredDatacenter(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse Effect */}
                  <circle
                    cx={dc.x}
                    cy={dc.y}
                    r="2"
                    fill="none"
                    stroke={
                      dc.type === "primary"
                        ? "rgb(6 182 212)"
                        : dc.type === "vps"
                          ? "rgb(249 115 22)"
                          : dc.type === "local"
                            ? "rgb(100 116 139)"
                            : "rgb(71 85 105)"
                    }
                    strokeWidth="0.3"
                    opacity="0.6"
                  >
                    <animate attributeName="r" from="2" to="4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Main Marker */}
                  <circle
                    cx={dc.x}
                    cy={dc.y}
                    r={hoveredDatacenter === dc.id ? "1.5" : "1"}
                    fill={
                      dc.type === "primary"
                        ? "rgb(6 182 212)"
                        : dc.type === "vps"
                          ? "rgb(249 115 22)"
                          : dc.type === "local"
                            ? "rgb(100 116 139)"
                            : "rgb(71 85 105)"
                    }
                    className="transition-all duration-300"
                  >
                    <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Glow Effect */}
                  <circle
                    cx={dc.x}
                    cy={dc.y}
                    r="1.5"
                    fill={
                      dc.type === "primary"
                        ? "rgb(6 182 212)"
                        : dc.type === "vps"
                          ? "rgb(249 115 22)"
                          : dc.type === "local"
                            ? "rgb(100 116 139)"
                            : "rgb(71 85 105)"
                    }
                    opacity="0.3"
                    filter="blur(1px)"
                  />

                  {/* Label on hover */}
                  {hoveredDatacenter === dc.id && (
                    <g>
                      <rect
                        x={dc.x - 6}
                        y={dc.y - 5}
                        width="12"
                        height="3"
                        fill="rgb(15 23 42)"
                        stroke="rgb(6 182 212)"
                        strokeWidth="0.2"
                        rx="0.5"
                      />
                      <text x={dc.x} y={dc.y - 3} textAnchor="middle" fill="white" fontSize="1.5" fontWeight="600">
                        {dc.name}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-cyan-500 mt-1 flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-75" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">TITANO CLOUD Datacenters</p>
                <p className="text-slate-400">Centros de datos principales</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Local Zones con VPS</p>
                <p className="text-slate-400">Zonas locales con VPS disponibles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold mb-1">Local Zones</p>
                <p className="text-slate-400">Zonas locales en expansión</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded border-2 border-slate-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold mb-1">Próximamente</p>
                <p className="text-slate-400">Nuevas localizaciones</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-white">Características no disponibles en Local Zone:</span>{" "}
              Aplicaciones preinstaladas, Windows, almacenamiento adicional, monitorización, IP adicionales, Load
              Balancer, bases de datos administradas.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Planes VPS Serie Titán</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Del más pequeño al más poderoso, cada plan lleva el nombre de un Titán de la mitología
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {vpsPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-slate-900 ${plan.recommended ? "border-2 border-cyan-500 relative" : "border-slate-800"} hover:border-cyan-500/50 transition-all duration-300`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  Recomendado
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <p className="text-cyan-400 text-sm font-semibold">{plan.subtitle}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm text-slate-400">Desde</span>
                  <span className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-sm text-slate-500">Gastos de instalación: {plan.setupFee}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.cpu} vCores</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.ram} GB RAM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.storage} GB SSD NVMe</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Backup automatizado 1 día</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Tráfico ilimitado</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{plan.bandwidth} de ancho de banda</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.recommended ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  Configurar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-slate-900 border-slate-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">
                    Configurar {vpsPlans.find((p) => p.id === selectedPlan)?.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {vpsPlans.find((p) => p.id === selectedPlan)?.subtitle}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedPlan(null)
                    const plan = getSelectedPlanLimits()
                    setConfigCpu(plan.cpu)
                    setConfigRam(plan.ram)
                    setConfigStorage(plan.storage)
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* CPU Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    CPU (vCores)
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{configCpu} vCores</span>
                </div>
                <input
                  type="range"
                  min={getSelectedPlanLimits().cpu}
                  max={getSelectedPlanLimits().maxCpu}
                  step="2"
                  value={configCpu}
                  onChange={(e) => setConfigCpu(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{getSelectedPlanLimits().cpu}</span>
                  <span>{getSelectedPlanLimits().maxCpu}</span>
                </div>
              </div>

              {/* RAM Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Server className="w-5 h-5 text-cyan-400" />
                    RAM (GB)
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{configRam} GB</span>
                </div>
                <input
                  type="range"
                  min={getSelectedPlanLimits().ram}
                  max={getSelectedPlanLimits().maxRam}
                  step="4"
                  value={configRam}
                  onChange={(e) => setConfigRam(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{getSelectedPlanLimits().ram} GB</span>
                  <span>{getSelectedPlanLimits().maxRam} GB</span>
                </div>
              </div>

              {/* Storage Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    Almacenamiento SSD NVMe (GB)
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{configStorage} GB</span>
                </div>
                <input
                  type="range"
                  min={getSelectedPlanLimits().storage}
                  max={getSelectedPlanLimits().maxStorage}
                  step="50"
                  value={configStorage}
                  onChange={(e) => setConfigStorage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{getSelectedPlanLimits().storage} GB</span>
                  <span>{getSelectedPlanLimits().maxStorage} GB</span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300 text-lg">Precio estimado:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">${calculateCustomPrice()}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-400 mb-6">
                  <div className="flex justify-between">
                    <span>CPU ({configCpu} vCores)</span>
                    <span>${(configCpu * 1.5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM ({configRam} GB)</span>
                    <span>${(configRam * 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Almacenamiento ({configStorage} GB)</span>
                    <span>${(configStorage * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between text-cyan-400 font-semibold">
                      <span>Total mensual</span>
                      <span>${calculateCustomPrice()}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Contratar Configuración</Button>
              </div>

              {/* Included Features */}
              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Tráfico ilimitado</p>
                    <p className="text-slate-400 text-xs">Sin límites de transferencia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Backup automatizado</p>
                    <p className="text-slate-400 text-xs">Respaldo diario incluido</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Protección DDoS</p>
                    <p className="text-slate-400 text-xs">Seguridad avanzada incluida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">Soporte 24/7</p>
                    <p className="text-slate-400 text-xs">Asistencia técnica siempre disponible</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Test de Velocidad Profesional</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Mide la Velocidad de Conexión</h2>
            <p className="text-slate-400 max-w-3xl mx-auto">
              Prueba la velocidad real de conexión desde tu ubicación hacia nuestros centros de datos globales
            </p>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr_300px] gap-6">
            {/* Left Sidebar - Connection Info */}
            <Card className="bg-slate-900 border-slate-800 h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k21IITkCmVDgyEhscyDWx9TlrI6ovP.png"
                    alt="TITANO CLOUD"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-white font-bold text-lg">TITANO CLOUD</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {userIpInfo ? (
                  <>
                    <div className="border-b border-slate-800 pb-3">
                      <p className="text-slate-400 mb-1">Operador:</p>
                      <p className="text-white font-semibold">{userIpInfo.isp}</p>
                    </div>
                    <div className="border-b border-slate-800 pb-3">
                      <p className="text-slate-400 mb-1">Tipo de conexión:</p>
                      <p className="text-white font-semibold">{userIpInfo.connectionType}</p>
                    </div>
                    <div className="border-b border-slate-800 pb-3">
                      <p className="text-slate-400 mb-1">IPv4:</p>
                      <p className="text-cyan-400 font-mono text-xs">{userIpInfo.ip}</p>
                    </div>
                    <div className="border-b border-slate-800 pb-3">
                      <p className="text-slate-400 mb-1">IPv6:</p>
                      <p className="text-cyan-400 font-mono text-xs break-all">{userIpInfo.ipv6}</p>
                    </div>
                    <div className="border-b border-slate-800 pb-3">
                      <p className="text-slate-400 mb-1">ASN:</p>
                      <p className="text-white font-semibold">{userIpInfo.asn}</p>
                    </div>
                    <div className="pb-3">
                      <p className="text-slate-400 mb-1">Sistema:</p>
                      <p className="text-white font-semibold">{userIpInfo.browser}</p>
                      <p className="text-white font-semibold">{userIpInfo.os}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <Activity className="w-8 h-8 text-cyan-400 animate-spin" />
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-slate-400 text-xs mb-3">Descargar aplicación:</p>
                  <div className="flex gap-3 justify-center">
                    <Smartphone className="w-8 h-8 text-slate-600 hover:text-cyan-400 cursor-pointer transition-colors" />
                    <Monitor className="w-8 h-8 text-slate-600 hover:text-cyan-400 cursor-pointer transition-colors" />
                    <Laptop className="w-8 h-8 text-slate-600 hover:text-cyan-400 cursor-pointer transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Center - Speedometer */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Speedometer SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Outer circle */}
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgb(30 41 59)" strokeWidth="2" />

                    {/* Speed scale marks */}
                    {[0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value, index) => {
                      const angle = -135 + (value / 100) * 270
                      const rad = (angle * Math.PI) / 180
                      const x1 = 100 + 75 * Math.cos(rad)
                      const y1 = 100 + 75 * Math.sin(rad)
                      const x2 = 100 + 85 * Math.cos(rad)
                      const y2 = 100 + 85 * Math.sin(rad)
                      return (
                        <g key={value}>
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(71 85 105)" strokeWidth="2" />
                          <text
                            x={100 + 65 * Math.cos(rad)}
                            y={100 + 65 * Math.sin(rad)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="rgb(148 163 184)"
                            fontSize="8"
                            fontWeight="600"
                          >
                            {value}
                          </text>
                        </g>
                      )
                    })}

                    {/* 1Gb and 10Gb markers */}
                    <text x="30" y="170" fill="rgb(100 116 139)" fontSize="10" fontWeight="600">
                      0
                    </text>
                    <text x="85" y="185" fill="rgb(100 116 139)" fontSize="10" fontWeight="600">
                      1Gb
                    </text>
                    <text x="155" y="170" fill="rgb(100 116 139)" fontSize="10" fontWeight="600">
                      10Gb
                    </text>

                    {/* Speed arc */}
                    <path
                      d="M 25 100 A 75 75 0 0 1 175 100"
                      fill="none"
                      stroke="url(#speedGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      opacity="0.3"
                    />

                    {/* Active speed arc */}
                    {currentSpeed > 0 && (
                      <path
                        d={`M 25 100 A 75 75 0 ${currentSpeed > 50 ? 1 : 0} 1 ${100 + 75 * Math.cos(((-135 + (currentSpeed / 100) * 270) * Math.PI) / 180)} ${100 + 75 * Math.sin(((-135 + (currentSpeed / 100) * 270) * Math.PI) / 180)}`}
                        fill="none"
                        stroke="url(#speedGradientActive)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(6 182 212)" />
                        <stop offset="100%" stopColor="rgb(37 99 235)" />
                      </linearGradient>
                      <linearGradient id="speedGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(6 182 212)" />
                        <stop offset="50%" stopColor="rgb(59 130 246)" />
                        <stop offset="100%" stopColor="rgb(147 51 234)" />
                      </linearGradient>
                    </defs>

                    {/* Needle */}
                    <g transform={`rotate(${-135 + (currentSpeed / 100) * 270} 100 100)`}>
                      <line x1="100" y1="100" x2="100" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="8" fill="white" />
                      <circle cx="100" cy="100" r="4" fill="rgb(6 182 212)" />
                    </g>

                    {/* Center display */}
                    <circle cx="100" cy="100" r="35" fill="rgb(15 23 42)" stroke="rgb(51 65 85)" strokeWidth="2" />

                    {/* Speed value */}
                    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                      {currentSpeed.toFixed(0)}
                    </text>
                    <text x="100" y="110" textAnchor="middle" fill="rgb(148 163 184)" fontSize="8">
                      Mbps
                    </text>
                  </svg>

                  {/* Center buttons */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 mt-16">
                    {speedResults && (
                      <Button
                        onClick={shareResults}
                        size="sm"
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-slate-900/90 backdrop-blur"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                      </Button>
                    )}
                    <Button
                      onClick={restartTest}
                      size="sm"
                      variant="outline"
                      disabled={isTestingSpeed}
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-slate-900/90 backdrop-blur"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reiniciar
                    </Button>
                  </div>
                </div>

                {/* Server info and selector */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-center gap-3 text-sm">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">
                      {selectedLocation && serverLocations.find((l) => l.id === selectedLocation)?.flag} [
                      {selectedLocation && serverLocations.find((l) => l.id === selectedLocation)?.name}] -{" "}
                      {selectedLocation && serverLocations.find((l) => l.id === selectedLocation)?.speed} - TITANO CLOUD
                    </span>
                  </div>

                  <Button
                    onClick={() => setShowServerSelector(!showServerSelector)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Selección de servidor
                  </Button>

                  {showServerSelector && (
                    <Card className="bg-slate-800 border-slate-700 max-h-60 overflow-y-auto">
                      <CardContent className="p-2">
                        {serverLocations.map((location) => (
                          <button
                            key={location.id}
                            onClick={() => {
                              runSpeedTest(location.id)
                              setShowServerSelector(false)
                            }}
                            disabled={isTestingSpeed}
                            className="w-full text-left p-3 rounded hover:bg-slate-700 transition-colors text-sm text-white disabled:opacity-50"
                          >
                            {location.flag} {location.name} - {location.speed}
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right Sidebar - Results */}
            <Card className="bg-slate-900 border-slate-800 h-fit">
              <CardContent className="pt-6 space-y-6">
                {speedResults ? (
                  <>
                    {/* Download */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-blue-500" />
                        <span className="text-blue-400 font-semibold">Descargar</span>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
                        <div className="h-20 flex items-end gap-0.5">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Máximo</span>
                        <span className="text-white font-bold">{speedResults.download.max} Mb/s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Media</span>
                        <span className="text-white font-bold">{speedResults.download.avg} Mb/s</span>
                      </div>
                    </div>

                    {/* Upload */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-blue-500" />
                        <span className="text-blue-400 font-semibold">Cargar</span>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
                        <div className="h-20 flex items-end gap-0.5">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Máximo</span>
                        <span className="text-white font-bold">{speedResults.upload.max} Mb/s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Media</span>
                        <span className="text-white font-bold">{speedResults.upload.avg} Mb/s</span>
                      </div>
                    </div>

                    {/* Latency */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                        <span className="text-blue-400 font-semibold">Latencia</span>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
                        <div className="h-20 flex items-end gap-0.5">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-blue-500 rounded-t"
                              style={{ height: `${60 + Math.random() * 40}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Mínimo</span>
                        <span className="text-white font-bold">{speedResults.latency.min} ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Media</span>
                        <span className="text-white font-bold">{speedResults.latency.avg} ms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Jitter</span>
                        <span className="text-white font-bold">{speedResults.latency.jitter} ms</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Activity className="w-12 h-12 text-slate-700 mb-4" />
                    <p className="text-slate-400 text-sm">
                      {isTestingSpeed ? "Realizando test..." : "Selecciona un servidor para comenzar"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Características Incluidas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas en un VPS</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">SSD NVMe Ultra Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Almacenamiento de última generación con velocidades de hasta 3500 MB/s para máximo rendimiento
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Protección DDoS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Protección automática contra ataques DDoS incluida en todos los planes sin costo adicional
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader>
              <Globe className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Ubicaciones Globales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Despliega tu VPS en múltiples ubicaciones estratégicas alrededor del mundo para baja latencia
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre nuestros VPS</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
            >
              <CardHeader
                className="cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </div>
              </CardHeader>
              {openFaq === index && (
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4 text-white">¿Listo para comenzar?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Despliega tu VPS en menos de 60 segundos. Sin compromisos a largo plazo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Comenzar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
            >
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
