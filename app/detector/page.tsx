"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { checkAllServices } from "../actions/check-service-status"

interface Service {
  name: string
  logo: string
  status: "operational" | "degraded" | "down"
  reports: number
  lastIncident: string
  uptimeData: number[]
  responseTime?: number
}

export default function DetectorPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [autoUpdate, setAutoUpdate] = useState(true)

  const { data: services, isLoading } = useSWR<Service[]>("services-status", async () => await checkAllServices(), {
    refreshInterval: autoUpdate ? 30000 : 0, // Refresh every 30 seconds if auto-update is on
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const operationalCount = services?.filter((s) => s.status === "operational").length || 0
  const degradedCount = services?.filter((s) => s.status === "degraded").length || 0
  const downCount = services?.filter((s) => s.status === "down").length || 0
  const totalReports = services?.reduce((sum, s) => sum + s.reports, 0) || 0

  const renderUptimeChart = (data: number[], status: Service["status"]) => {
    const width = 200
    const height = 60
    const padding = 5

    // Vivid color selection based on status
    const colors = {
      operational: "#06b6d4", // Vivid cyan/aquamarine
      degraded: "#fbbf24", // Vivid yellow
      down: "#ef4444", // Vivid red
    }

    const color = colors[status]
    const glowColor =
      status === "operational"
        ? "rgba(6, 182, 212, 0.5)"
        : status === "degraded"
          ? "rgba(251, 191, 36, 0.5)"
          : "rgba(239, 68, 68, 0.5)"

    // Calculate points for the line
    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * (width - padding * 2) + padding
        const y = height - (value / 100) * (height - padding * 2) - padding
        return `${x},${y}`
      })
      .join(" ")

    // Create area fill points
    const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`

    return (
      <div className="mt-4 relative">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Gradient definition for area fill */}
          <defs>
            <linearGradient id={`gradient-${status}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
            {/* Glow filter */}
            <filter id={`glow-${status}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area fill */}
          <polygon points={areaPoints} fill={`url(#gradient-${status})`} className="transition-all duration-300" />

          {/* Line with glow effect */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${status})`}
            className="transition-all duration-300"
          />

          {/* Data points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * (width - padding * 2) + padding
            const y = height - (value / 100) * (height - padding * 2) - padding
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={color}
                className="transition-all duration-300"
                style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const getStatusBadge = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Operacional</Badge>
      case "degraded":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Degradado</Badge>
      case "down":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Caído</Badge>
    }
  }

  const getCardBorderClass = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return "border-green-500/50 hover:border-green-500"
      case "degraded":
        return "border-yellow-500/50 hover:border-yellow-500"
      case "down":
        return "border-red-500/50 hover:border-red-500"
    }
  }

  if (isLoading || !services) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Verificando estado de servicios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Detector de Caídas</h1>
          </div>
          <p className="text-lg text-slate-400 mb-6">
            Monitoreo en tiempo real del estado de los servicios más populares de Internet
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <div>
              Última actualización: <span className="text-cyan-400">{currentTime.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={() => setAutoUpdate(!autoUpdate)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                autoUpdate
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              Auto-actualización {autoUpdate ? "ON" : "OFF"}
            </button>
          </div>
          <p className="text-xs text-cyan-400 mt-2">✓ Datos en tiempo real verificados cada 30 segundos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-green-500/10 border-green-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="text-sm font-semibold text-green-400">Operacionales</div>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{operationalCount}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Servicios funcionando correctamente</div>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="text-sm font-semibold text-yellow-400">Degradados</div>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{degradedCount}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Servicios con problemas</div>
          </Card>

          <Card className="bg-red-500/10 border-red-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="text-sm font-semibold text-red-400">Caídos</div>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{downCount}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Servicios no disponibles</div>
          </Card>

          <Card className="bg-cyan-500/10 border-cyan-500/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              <div className="text-sm font-semibold text-cyan-400">Reportes Totales</div>
            </div>
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{totalReports}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Reportes en las últimas 24h</div>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <Card
              key={service.name}
              className={`bg-slate-900 border-2 ${getCardBorderClass(service.status)} p-6 transition-all hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={service.logo || "/placeholder.svg"}
                    alt={service.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // Fallback to first letter if logo fails to load
                      e.currentTarget.style.display = "none"
                      e.currentTarget.parentElement!.innerHTML =
                        `<span class="text-2xl font-bold text-slate-400">${service.name[0]}</span>`
                    }}
                  />
                </div>
                {getStatusBadge(service.status)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
              <div className="text-xs text-slate-500 mb-2">
                {service.status === "operational"
                  ? "Operacional"
                  : service.status === "degraded"
                    ? "Degradado"
                    : "Caído"}
                {service.responseTime && service.responseTime > 0 && (
                  <span className="ml-2 text-cyan-400">({service.responseTime}ms)</span>
                )}
              </div>

              {/* Uptime Chart */}
              {renderUptimeChart(service.uptimeData, service.status)}

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Reportes:</span>
                  <span className="text-white font-medium">{service.reports}</span>
                </div>
                <div className="flex justify-between">
                  <span>Último incidente:</span>
                  <span className="text-white">{service.lastIncident}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explanation Section */}
        <Card className="bg-slate-900/50 border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">¿Cómo funciona el Detector de Caídas?</h2>
          <p className="text-slate-400 mb-8">
            Nuestro sistema de monitoreo NOC/SOC analiza en tiempo real el estado de los servicios más populares de
            Internet, recopilando datos de múltiples fuentes para ofrecerte información precisa y actualizada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Operacional</h3>
                <p className="text-sm text-slate-400">
                  El servicio funciona correctamente sin problemas reportados significativos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Degradado</h3>
                <p className="text-sm text-slate-400">
                  El servicio presenta problemas de rendimiento o funcionalidad limitada.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Caído</h3>
                <p className="text-sm text-slate-400">
                  El servicio no está disponible o presenta fallos críticos generalizados.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
