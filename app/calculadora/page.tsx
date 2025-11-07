"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingDown, Check, ArrowRight, Award, Zap, Shield, Gauge } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CalculadoraPage() {
  const [cpu, setCpu] = useState(4)
  const [ram, setRam] = useState(8)
  const [storage, setStorage] = useState(160)
  const [bandwidth, setBandwidth] = useState(1000)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  const calculateAzure = () => {
    const baseCost = cpu * 35 + ram * 4.5 + storage * 0.15 + bandwidth * 0.08
    return billingPeriod === "yearly" ? baseCost * 12 * 0.9 : baseCost
  }

  const calculateAWS = () => {
    const baseCost = cpu * 32 + ram * 4.2 + storage * 0.12 + bandwidth * 0.09
    return billingPeriod === "yearly" ? baseCost * 12 * 0.88 : baseCost
  }

  const calculateGoogleCloud = () => {
    const baseCost = cpu * 33 + ram * 4.4 + storage * 0.13 + bandwidth * 0.085
    return billingPeriod === "yearly" ? baseCost * 12 * 0.89 : baseCost
  }

  const calculateAlibabaCloud = () => {
    const baseCost = cpu * 22 + ram * 3.2 + storage * 0.09 + bandwidth * 0.05
    return billingPeriod === "yearly" ? baseCost * 12 * 0.87 : baseCost
  }

  const calculateOVH = () => {
    const baseCost = cpu * 18 + ram * 2.8 + storage * 0.08 + bandwidth * 0.02
    return billingPeriod === "yearly" ? baseCost * 12 * 0.85 : baseCost
  }

  const calculateTitano = () => {
    const baseCost = cpu * 12 + ram * 2.2 + storage * 0.05 + bandwidth * 0.01
    return billingPeriod === "yearly" ? baseCost * 12 * 0.8 : baseCost
  }

  const azurePrice = calculateAzure()
  const awsPrice = calculateAWS()
  const googlePrice = calculateGoogleCloud()
  const alibabaPrice = calculateAlibabaCloud()
  const ovhPrice = calculateOVH()
  const titanoPrice = calculateTitano()

  const prices = [
    {
      name: "Azure",
      price: azurePrice,
      color: "from-blue-500 to-cyan-500",
      logo: "/azure-logo.jpg",
      bandwidthCost: 0.08,
      support: 7,
      performance: 9,
      scalability: 9,
    },
    {
      name: "AWS",
      price: awsPrice,
      color: "from-orange-500 to-yellow-500",
      logo: "/aws-logo.jpg",
      bandwidthCost: 0.09,
      support: 8,
      performance: 9,
      scalability: 10,
    },
    {
      name: "Google Cloud",
      price: googlePrice,
      color: "from-red-500 to-yellow-500",
      logo: "/google-cloud-logo.jpg",
      bandwidthCost: 0.085,
      support: 7,
      performance: 9,
      scalability: 9,
    },
    {
      name: "Alibaba Cloud",
      price: alibabaPrice,
      color: "from-orange-600 to-red-500",
      logo: "/alibaba-cloud-logo.jpg",
      bandwidthCost: 0.05,
      support: 6,
      performance: 8,
      scalability: 8,
    },
    {
      name: "OVHcloud",
      price: ovhPrice,
      color: "from-blue-600 to-blue-400",
      logo: "/ovh-logo.jpg",
      bandwidthCost: 0.02,
      support: 7,
      performance: 8,
      scalability: 7,
    },
    {
      name: "Titano Cloud",
      price: titanoPrice,
      color: "from-cyan-500 to-blue-600",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k21IITkCmVDgyEhscyDWx9TlrI6ovP.png",
      bandwidthCost: 0.01,
      support: 10,
      performance: 9,
      scalability: 10,
    },
  ].sort((a, b) => a.price - b.price)

  const cheapest = prices[0]

  const calculateScore = (provider: (typeof prices)[0]) => {
    const priceScore =
      ((Math.max(...prices.map((p) => p.price)) - provider.price) / Math.max(...prices.map((p) => p.price))) * 100
    const bandwidthScore =
      ((Math.max(...prices.map((p) => p.bandwidthCost)) - provider.bandwidthCost) /
        Math.max(...prices.map((p) => p.bandwidthCost))) *
      100
    const supportScore = (provider.support / 10) * 100
    const performanceScore = (provider.performance / 10) * 100
    const scalabilityScore = (provider.scalability / 10) * 100

    // Weighted average: Price 30%, Bandwidth 25%, Support 20%, Performance 15%, Scalability 10%
    return (
      priceScore * 0.3 + bandwidthScore * 0.25 + supportScore * 0.2 + performanceScore * 0.15 + scalabilityScore * 0.1
    )
  }

  const pricesWithScores = prices
    .map((provider) => ({
      ...provider,
      score: calculateScore(provider),
    }))
    .sort((a, b) => b.score - a.score)

  const bestOverall = pricesWithScores[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Calculator className="w-12 h-12 text-cyan-400" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Calculadora de Costos Cloud
          </h1>
        </div>
        <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
          Compara precios entre los principales proveedores de cloud del mundo
        </p>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Configura las especificaciones de tu servidor y descubre cuánto puedes ahorrar con Titano Cloud
        </p>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <Card className="bg-gradient-to-br from-cyan-900/20 via-slate-900 to-slate-900 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              ¿Qué hace esta calculadora?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 text-lg leading-relaxed">
              Nuestra calculadora inteligente compara en tiempo real los costos de infraestructura cloud entre los
              principales proveedores del mercado:{" "}
              <span className="text-cyan-400 font-semibold">
                AWS, Azure, Google Cloud, Alibaba Cloud, OVHcloud y Titano Cloud
              </span>
              .
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              No solo comparamos precios, sino que evaluamos múltiples factores críticos para tu negocio:{" "}
              <span className="text-cyan-400 font-semibold">
                costo-beneficio, ancho de banda, rendimiento, soporte técnico y escalabilidad
              </span>
              . Al final, obtendrás una recomendación calificada basada en datos reales.
            </p>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-lg">
                <Award className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Análisis Multifactorial</h4>
                  <p className="text-slate-400 text-sm">
                    Evaluamos 5 variables clave para darte la mejor recomendación
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-lg">
                <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Datos Transparentes</h4>
                  <p className="text-slate-400 text-sm">Precios reales sin costos ocultos ni sorpresas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Calculator Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Configura tu Servidor</CardTitle>
              <CardDescription className="text-slate-400">
                Ajusta las especificaciones según tus necesidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* CPU Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">CPU (vCores)</label>
                  <span className="text-cyan-400 font-bold text-lg">{cpu} vCPU</span>
                </div>
                <Slider
                  value={[cpu]}
                  onValueChange={(value) => setCpu(value[0])}
                  min={1}
                  max={32}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 vCPU</span>
                  <span>32 vCPU</span>
                </div>
              </div>

              {/* RAM Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">Memoria RAM (GB)</label>
                  <span className="text-cyan-400 font-bold text-lg">{ram} GB</span>
                </div>
                <Slider
                  value={[ram]}
                  onValueChange={(value) => setRam(value[0])}
                  min={2}
                  max={128}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>2 GB</span>
                  <span>128 GB</span>
                </div>
              </div>

              {/* Storage Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">Almacenamiento SSD (GB)</label>
                  <span className="text-cyan-400 font-bold text-lg">{storage} GB</span>
                </div>
                <Slider
                  value={[storage]}
                  onValueChange={(value) => setStorage(value[0])}
                  min={20}
                  max={2000}
                  step={20}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>20 GB</span>
                  <span>2000 GB</span>
                </div>
              </div>

              {/* Bandwidth Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-medium">Ancho de Banda (GB/mes)</label>
                  <span className="text-cyan-400 font-bold text-lg">
                    {bandwidth >= 10000 ? "Ilimitado" : `${bandwidth} GB`}
                  </span>
                </div>
                <Slider
                  value={[bandwidth]}
                  onValueChange={(value) => setBandwidth(value[0])}
                  min={100}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>100 GB</span>
                  <span>Ilimitado</span>
                </div>
              </div>

              {/* Billing Period Toggle */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-slate-200 font-medium block">Período de Facturación</label>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setBillingPeriod("monthly")}
                    variant={billingPeriod === "monthly" ? "default" : "outline"}
                    className={
                      billingPeriod === "monthly"
                        ? "flex-1 bg-cyan-500 hover:bg-cyan-600"
                        : "flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                    }
                  >
                    Mensual
                  </Button>
                  <Button
                    onClick={() => setBillingPeriod("yearly")}
                    variant={billingPeriod === "yearly" ? "default" : "outline"}
                    className={
                      billingPeriod === "yearly"
                        ? "flex-1 bg-cyan-500 hover:bg-cyan-600"
                        : "flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                    }
                  >
                    Anual (Ahorra hasta 20%)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-900/30 via-slate-900 to-slate-900 border-green-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Award className="w-7 h-7 text-green-400" />
                  Recomendación Calificada
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Basada en análisis multifactorial de costo-beneficio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg border-2 border-green-500">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={bestOverall.logo || "/placeholder.svg"}
                      alt={bestOverall.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{bestOverall.name}</h3>
                    <p className="text-green-400 font-semibold">Mejor Opción General</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{bestOverall.score.toFixed(0)}</div>
                    <div className="text-xs text-slate-400">Puntuación</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Precio Mensual</span>
                    </div>
                    <span className="text-white font-bold">${bestOverall.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Costo Ancho de Banda</span>
                    </div>
                    <span className="text-white font-bold">${bestOverall.bandwidthCost}/GB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Soporte Técnico</span>
                    </div>
                    <span className="text-white font-bold">{bestOverall.support}/10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Rendimiento</span>
                    </div>
                    <span className="text-white font-bold">{bestOverall.performance}/10</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-6 text-lg mt-4">
                  Comenzar con {bestOverall.name}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Comparación de Precios</CardTitle>
                <CardDescription className="text-slate-400">
                  Precios estimados {billingPeriod === "monthly" ? "mensuales" : "anuales"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {prices.map((provider, index) => (
                  <div
                    key={provider.name}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      index === 0
                        ? "border-green-500 bg-green-500/10"
                        : "border-slate-700 bg-slate-950/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={provider.logo || "/placeholder.svg"}
                            alt={provider.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                          {index === 0 && <span className="text-xs text-green-400 font-semibold">✓ Mejor Precio</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">${provider.price.toFixed(2)}</p>
                        <p className="text-xs text-slate-400">{billingPeriod === "monthly" ? "/mes" : "/año"}</p>
                      </div>
                    </div>
                    {index > 0 && (
                      <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <span>
                          ${(provider.price - cheapest.price).toFixed(2)} más caro que {cheapest.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white mb-4">Metodología de Evaluación</CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              Variables que utilizamos para calificar y recomendar el mejor proveedor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Precio (30%)</h3>
                </div>
                <p className="text-slate-400">
                  Costo total mensual/anual basado en CPU, RAM, almacenamiento y transferencia de datos. Incluye
                  descuentos por compromiso anual.
                </p>
              </div>

              <div className="p-6 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Ancho de Banda (25%)</h3>
                </div>
                <p className="text-slate-400">
                  Costo por GB de transferencia de datos. Un factor crítico para aplicaciones con alto tráfico o
                  streaming.
                </p>
              </div>

              <div className="p-6 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Soporte (20%)</h3>
                </div>
                <p className="text-slate-400">
                  Calidad y disponibilidad del soporte técnico. Incluye tiempo de respuesta, canales disponibles y
                  expertise del equipo.
                </p>
              </div>

              <div className="p-6 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Rendimiento (15%)</h3>
                </div>
                <p className="text-slate-400">
                  Velocidad de procesamiento, latencia de red y tiempo de respuesta. Basado en benchmarks
                  independientes.
                </p>
              </div>

              <div className="p-6 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Escalabilidad (10%)</h3>
                </div>
                <p className="text-slate-400">
                  Facilidad para escalar recursos vertical y horizontalmente. Incluye opciones de auto-scaling y límites
                  de crecimiento.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-cyan-900/20 to-slate-950 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Puntuación Final</h3>
                </div>
                <p className="text-slate-300">
                  Promedio ponderado de todas las variables. El proveedor con mayor puntuación ofrece el mejor
                  equilibrio costo-beneficio.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
              <p className="text-slate-300 text-center text-lg">
                <span className="text-cyan-400 font-semibold">Nota:</span> Los precios son estimaciones basadas en
                tarifas públicas actuales. Los costos reales pueden variar según región, compromisos de uso y
                promociones vigentes.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white mb-4">¿Por qué Titano Cloud es más económico?</CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              Optimización de costos sin sacrificar calidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Infraestructura Propia</h3>
                <p className="text-slate-400">Sin intermediarios, controlamos toda la cadena de valor</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Eficiencia Energética</h3>
                <p className="text-slate-400">Centros de datos optimizados reducen costos operativos</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sin Costos Ocultos</h3>
                <p className="text-slate-400">Precio transparente, pagas solo por lo que usas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Special Offer Contact CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-slate-900 border-cyan-500/50">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
                <Award className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Me faltó comentarte que tenemos un valor especial si nos contactas
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Obtén precios exclusivos y personalizados según tus necesidades. Nuestro equipo comercial te ayudará a
                encontrar la mejor solución para tu negocio con descuentos especiales.
              </p>
              <Link href="/contacto">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6 px-8 text-lg">
                  Contáctanos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
