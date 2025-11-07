"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Download, Upload, Wifi, MapPin, Globe, Share2, RotateCcw } from "lucide-react"
import Image from "next/image"

export default function SpeedTestPage() {
  const [isTesting, setIsTesting] = useState(false)
  const [testComplete, setTestComplete] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [downloadSpeed, setDownloadSpeed] = useState(0)
  const [uploadSpeed, setUploadSpeed] = useState(0)
  const [latency, setLatency] = useState(0)
  const [jitter, setJitter] = useState(0)
  const [packetLoss, setPacketLoss] = useState(0)
  const [testPhase, setTestPhase] = useState<"idle" | "download" | "upload" | "latency">("idle")
  const [selectedServer, setSelectedServer] = useState("beauharnois")
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [userIP, setUserIP] = useState<string | null>(null)
  const [userISP, setUserISP] = useState<string | null>(null)
  const [connectionType, setConnectionType] = useState<string | null>(null)

  const servers = [
    { id: "beauharnois", name: "Beauharnois", country: "Canadá", flag: "🇨🇦", speed: "10 Gb/s" },
    { id: "miami", name: "Miami", country: "Estados Unidos", flag: "🇺🇸", speed: "10 Gb/s" },
    { id: "toronto", name: "Toronto", country: "Canadá", flag: "🇨🇦", speed: "10 Gb/s" },
    { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", flag: "🇦🇷", speed: "10 Gb/s" },
    { id: "sao-paulo", name: "São Paulo", country: "Brasil", flag: "🇧🇷", speed: "10 Gb/s" },
    { id: "london", name: "Londres", country: "Reino Unido", flag: "🇬🇧", speed: "10 Gb/s" },
    { id: "frankfurt", name: "Frankfurt", country: "Alemania", flag: "🇩🇪", speed: "10 Gb/s" },
    { id: "singapore", name: "Singapur", country: "Singapur", flag: "🇸🇬", speed: "10 Gb/s" },
    { id: "tokyo", name: "Tokio", country: "Japón", flag: "🇯🇵", speed: "10 Gb/s" },
    { id: "sydney", name: "Sídney", country: "Australia", flag: "🇦🇺", speed: "10 Gb/s" },
  ]

  const selectedServerData = servers.find((s) => s.id === selectedServer) || servers[0]

  // Simulate IP detection
  useEffect(() => {
    // Simulate fetching user location and IP
    setTimeout(() => {
      setUserLocation("Ciudad de México, México")
      setUserIP("179.6.6.121")
      setUserISP("Telmex")
      setConnectionType("FTTH")
    }, 1000)
  }, [])

  const startTest = async () => {
    setIsTesting(true)
    setTestComplete(false)
    setCurrentSpeed(0)
    setDownloadSpeed(0)
    setUploadSpeed(0)
    setLatency(0)

    // Download test
    setTestPhase("download")
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((resolve) => setTimeout(resolve, 30))
      const speed = Math.sin((i / 100) * Math.PI) * (180 + Math.random() * 40)
      setCurrentSpeed(speed)
      if (i === 100) setDownloadSpeed(speed)
    }

    // Upload test
    setTestPhase("upload")
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((resolve) => setTimeout(resolve, 30))
      const speed = Math.sin((i / 100) * Math.PI) * (200 + Math.random() * 50)
      setCurrentSpeed(speed)
      if (i === 100) setUploadSpeed(speed)
    }

    // Latency test
    setTestPhase("latency")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLatency(110 + Math.random() * 20)
    setJitter(1.2 + Math.random() * 0.8)
    setPacketLoss(0)

    setTestPhase("idle")
    setIsTesting(false)
    setTestComplete(true)
  }

  const resetTest = () => {
    setTestComplete(false)
    setCurrentSpeed(0)
    setDownloadSpeed(0)
    setUploadSpeed(0)
    setLatency(0)
    setJitter(0)
    setPacketLoss(0)
    setTestPhase("idle")
  }

  const getSpeedColor = (speed: number) => {
    if (speed < 50) return "#ef4444"
    if (speed < 100) return "#f59e0b"
    if (speed < 150) return "#10b981"
    return "#06b6d4"
  }

  const needleRotation = (currentSpeed / 250) * 180 - 90

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Test de <span className="text-cyan-400">Velocidad</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Mide la velocidad de tu conexión a nuestros centros de datos globales
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Connection Info */}
            <div className="lg:col-span-3">
              <Card className="bg-slate-900 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Tu Conexión
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="text-slate-400 mb-1">Operador:</p>
                    <p className="text-white font-semibold">{userISP || "Detectando..."}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Tipo de conexión:</p>
                    <p className="text-white font-semibold">{connectionType || "Detectando..."}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">IPv4:</p>
                    <p className="text-white font-mono text-xs">{userIP || "Detectando..."}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Ubicación:</p>
                    <p className="text-white">{userLocation || "Detectando..."}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k21IITkCmVDgyEhscyDWx9TlrI6ovP.png"
                      alt="TITANO CLOUD"
                      width={120}
                      height={40}
                      className="opacity-80"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center - Speedometer */}
            <div className="lg:col-span-6">
              <Card className="bg-slate-900 border-cyan-500/30">
                <CardContent className="p-8">
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Speedometer Background */}
                    <svg viewBox="0 0 200 120" className="w-full h-full">
                      {/* Background arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                      {/* Colored arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke={getSpeedColor(currentSpeed)}
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeDasharray={`${(currentSpeed / 250) * 251.2} 251.2`}
                        className="transition-all duration-300"
                      />

                      {/* Speed markers */}
                      {[0, 50, 100, 150, 200, 250].map((speed, i) => {
                        const angle = -90 + (i * 180) / 5
                        const rad = (angle * Math.PI) / 180
                        const x = 100 + 70 * Math.cos(rad)
                        const y = 100 + 70 * Math.sin(rad)
                        return (
                          <text
                            key={speed}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            className="fill-slate-400 text-xs font-semibold"
                          >
                            {speed}
                          </text>
                        )
                      })}

                      {/* Needle */}
                      <g transform={`rotate(${needleRotation} 100 100)`}>
                        <line
                          x1="100"
                          y1="100"
                          x2="100"
                          y2="40"
                          stroke="#06b6d4"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="100" cy="100" r="8" fill="#06b6d4" />
                        <circle cx="100" cy="100" r="4" fill="#0a0e1a" />
                      </g>
                    </svg>

                    {/* Center display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">
                          {currentSpeed.toFixed(1)}
                          <span className="text-2xl text-slate-400 ml-2">Mb/s</span>
                        </div>
                        {testPhase !== "idle" && (
                          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">
                            {testPhase === "download" && "Descargando..."}
                            {testPhase === "upload" && "Subiendo..."}
                            {testPhase === "latency" && "Midiendo latencia..."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex gap-4 justify-center mt-8">
                    {!isTesting && !testComplete && (
                      <Button
                        onClick={startTest}
                        size="lg"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-12 py-6 text-lg"
                      >
                        <Activity className="w-5 h-5 mr-2" />
                        Iniciar Test
                      </Button>
                    )}
                    {testComplete && (
                      <>
                        <Button
                          onClick={resetTest}
                          size="lg"
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Reiniciar
                        </Button>
                        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 px-8">
                          <Share2 className="w-5 h-5 mr-2" />
                          Compartir
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Server info */}
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-3 bg-slate-950 border border-cyan-500/30 rounded-lg px-6 py-3">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-semibold">
                        {selectedServerData.flag} {selectedServerData.name} - {selectedServerData.speed} - TITANO CLOUD
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Server Selection */}
              <Card className="bg-slate-900 border-cyan-500/30 mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-center">Selección de Servidor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {servers.map((server) => (
                      <button
                        key={server.id}
                        onClick={() => setSelectedServer(server.id)}
                        disabled={isTesting}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          selectedServer === server.id
                            ? "border-cyan-500 bg-cyan-500/10 text-white"
                            : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="text-2xl mb-1">{server.flag}</div>
                        <div className="font-semibold">{server.name}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Results */}
            <div className="lg:col-span-3 space-y-4">
              {/* Download */}
              <Card className="bg-slate-900 border-cyan-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <Download className="w-5 h-5 text-cyan-400" />
                    Descargar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-24 bg-slate-950 rounded-lg p-2 relative overflow-hidden">
                      {testComplete && (
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-400"
                          style={{ height: `${(downloadSpeed / 250) * 100}%` }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Máximo</span>
                      <span className="text-white font-bold">{downloadSpeed.toFixed(1)} Mb/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Media</span>
                      <span className="text-white">{(downloadSpeed * 0.87).toFixed(1)} Mb/s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload */}
              <Card className="bg-slate-900 border-cyan-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <Upload className="w-5 h-5 text-blue-400" />
                    Cargar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-24 bg-slate-950 rounded-lg p-2 relative overflow-hidden">
                      {testComplete && (
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400"
                          style={{ height: `${(uploadSpeed / 250) * 100}%` }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Máximo</span>
                      <span className="text-white font-bold">{uploadSpeed.toFixed(1)} Mb/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Media</span>
                      <span className="text-white">{(uploadSpeed * 0.85).toFixed(1)} Mb/s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Latency */}
              <Card className="bg-slate-900 border-cyan-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    Latencia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-24 bg-slate-950 rounded-lg p-2 flex items-end gap-1">
                      {testComplete &&
                        Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-purple-500 rounded-t"
                            style={{ height: `${50 + Math.random() * 50}%` }}
                          />
                        ))}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Mínimo</span>
                      <span className="text-white font-bold">{latency.toFixed(1)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Media</span>
                      <span className="text-white">{(latency + 2).toFixed(1)} ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Jitter</span>
                      <span className="text-white">{jitter.toFixed(3)} ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
