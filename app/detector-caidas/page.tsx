"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Clock,
  Users,
  Globe,
} from "lucide-react"
import { useState, useEffect } from "react"

type ServiceStatus = "operational" | "degraded" | "down"

interface Service {
  id: string
  name: string
  logo: string
  status: ServiceStatus
  reports: number
  trend: "up" | "down" | "stable"
  lastIncident: string
  graphData: number[]
}

export default function DetectorCaidas() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "youtube",
      name: "YouTube",
      logo: "🎥",
      status: "operational",
      reports: 12,
      trend: "stable",
      lastIncident: "Hace 2 días",
      graphData: [5, 8, 6, 12, 10, 12, 8, 10, 12],
    },
    {
      id: "facebook",
      name: "Facebook",
      logo: "📘",
      status: "degraded",
      reports: 342,
      trend: "up",
      lastIncident: "Hace 15 min",
      graphData: [10, 15, 45, 120, 200, 280, 320, 342],
    },
    {
      id: "instagram",
      name: "Instagram",
      logo: "📷",
      status: "degraded",
      reports: 289,
      trend: "up",
      lastIncident: "Hace 18 min",
      graphData: [8, 12, 38, 95, 180, 245, 270, 289],
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      logo: "💬",
      status: "operational",
      reports: 23,
      trend: "stable",
      lastIncident: "Hace 1 día",
      graphData: [15, 18, 20, 25, 22, 23, 20, 23],
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      logo: "🐦",
      status: "operational",
      reports: 45,
      trend: "down",
      lastIncident: "Hace 3 horas",
      graphData: [120, 95, 80, 65, 55, 50, 48, 45],
    },
    {
      id: "tiktok",
      name: "TikTok",
      logo: "🎵",
      status: "operational",
      reports: 18,
      trend: "stable",
      lastIncident: "Hace 5 horas",
      graphData: [12, 15, 18, 20, 18, 16, 18, 18],
    },
    {
      id: "netflix",
      name: "Netflix",
      logo: "🎬",
      status: "operational",
      reports: 8,
      trend: "stable",
      lastIncident: "Hace 1 día",
      graphData: [5, 6, 8, 10, 9, 8, 7, 8],
    },
    {
      id: "spotify",
      name: "Spotify",
      logo: "🎧",
      status: "operational",
      reports: 15,
      trend: "stable",
      lastIncident: "Hace 6 horas",
      graphData: [10, 12, 15, 18, 16, 15, 14, 15],
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "📦",
      status: "operational",
      reports: 32,
      trend: "stable",
      lastIncident: "Hace 4 horas",
      graphData: [25, 28, 30, 35, 32, 30, 32, 32],
    },
    {
      id: "google",
      name: "Google",
      logo: "🔍",
      status: "operational",
      reports: 5,
      trend: "stable",
      lastIncident: "Hace 2 días",
      graphData: [3, 4, 5, 6, 5, 4, 5, 5],
    },
    {
      id: "discord",
      name: "Discord",
      logo: "💭",
      status: "operational",
      reports: 28,
      trend: "stable",
      lastIncident: "Hace 8 horas",
      graphData: [20, 22, 25, 28, 26, 28, 27, 28],
    },
    {
      id: "reddit",
      name: "Reddit",
      logo: "🤖",
      status: "operational",
      reports: 41,
      trend: "down",
      lastIncident: "Hace 2 horas",
      graphData: [85, 75, 65, 55, 48, 45, 42, 41],
    },
  ])

  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => {
          const randomChange = Math.floor(Math.random() * 20) - 10
          const newReports = Math.max(0, service.reports + randomChange)
          const newGraphData = [...service.graphData.slice(1), newReports]

          let newStatus: ServiceStatus = service.status
          if (newReports > 200) newStatus = "degraded"
          else if (newReports < 50) newStatus = "operational"

          return {
            ...service,
            reports: newReports,
            graphData: newGraphData,
            status: newStatus,
            trend: randomChange > 5 ? "up" : randomChange < -5 ? "down" : "stable",
          }
        }),
      )
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "degraded":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      case "down":
        return "text-red-400 bg-red-500/10 border-red-500/30"
    }
  }

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="w-5 h-5" />
      case "degraded":
        return <AlertTriangle className="w-5 h-5" />
      case "down":
        return <XCircle className="w-5 h-5" />
    }
  }

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case "operational":
        return "Operacional"
      case "degraded":
        return "Degradado"
      case "down":
        return "Caído"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-400" />
      default:
        return <Minus className="w-4 h-4 text-slate-400" />
    }
  }

  const operationalCount = services.filter((s) => s.status === "operational").length
  const degradedCount = services.filter((s) => s.status === "degraded").length
  const downCount = services.filter((s) => s.status === "down").length
  const totalReports = services.reduce((sum, s) => sum + s.reports, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Header */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Detector de Caídas
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Monitoreo en tiempo real del estado de los servicios más populares de Internet
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Última actualización: {lastUpdate.toLocaleTimeString("es-ES")}</span>
            </div>
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant="outline"
              size="sm"
              className={`border-slate-700 ${
                autoRefresh ? "text-cyan-400 border-cyan-500" : "text-slate-400"
              } hover:bg-slate-800 bg-transparent`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Auto-actualización ON" : "Auto-actualización OFF"}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-900/20 to-green-950/20 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Operacionales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-400">{operationalCount}</p>
              <p className="text-xs text-slate-400 mt-1">Servicios funcionando correctamente</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 border-yellow-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Degradados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-400">{degradedCount}</p>
              <p className="text-xs text-slate-400 mt-1">Servicios con problemas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/20 to-red-950/20 border-red-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-400 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Caídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-400">{downCount}</p>
              <p className="text-xs text-slate-400 mt-1">Servicios no disponibles</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-950/20 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Reportes Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-cyan-400">{totalReports.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">Reportes en las últimas 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`bg-slate-900 border-2 transition-all hover:scale-105 ${getStatusColor(service.status)}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">{service.logo}</div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(service.status)}
                    {getTrendIcon(service.trend)}
                  </div>
                </div>
                <CardTitle className="text-lg text-white">{service.name}</CardTitle>
                <CardDescription className="text-xs">
                  <span className={service.status === "operational" ? "text-green-400" : "text-yellow-400"}>
                    {getStatusText(service.status)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Mini Graph */}
                <div className="h-16 flex items-end gap-1">
                  {service.graphData.map((value, index) => {
                    const maxValue = Math.max(...service.graphData)
                    const height = (value / maxValue) * 100
                    const color =
                      service.status === "operational"
                        ? "bg-green-500"
                        : service.status === "degraded"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    return (
                      <div
                        key={index}
                        className={`flex-1 ${color} rounded-t transition-all`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  })}
                </div>

                {/* Stats */}
                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Reportes:</span>
                    <span className="font-bold text-white">{service.reports}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Último incidente:</span>
                    <span className="text-slate-400">{service.lastIncident}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Globe className="w-8 h-8 text-cyan-400" />
              ¿Cómo funciona el Detector de Caídas?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              Nuestro sistema de monitoreo NOC/SOC analiza en tiempo real el estado de los servicios más populares de
              Internet, recopilando datos de múltiples fuentes para ofrecerte información precisa y actualizada.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Operacional</h3>
                <p className="text-sm text-slate-400">
                  El servicio funciona correctamente sin problemas reportados significativos.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Degradado</h3>
                <p className="text-sm text-slate-400">
                  El servicio presenta problemas de rendimiento o funcionalidad limitada.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <XCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Caído</h3>
                <p className="text-sm text-slate-400">
                  El servicio no está disponible o presenta fallos críticos generalizados.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            {/* Logo variant="minimal" className="h-16" /> */}
            <p className="text-slate-400 text-center">
              Detector de Caídas • Monitoreo en tiempo real • Producto de SATURNO
            </p>
            <p className="text-slate-500 text-sm text-center">
              Los datos mostrados son simulados con fines demostrativos
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
