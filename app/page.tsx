"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Server,
  Zap,
  Shield,
  Globe,
  Gauge,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Clock,
  Layers,
  Cloud,
  Database,
  Lock,
  Activity,
  BarChart3,
  MessageSquare,
} from "lucide-react"

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const infrastructureImages = [
    {
      src: "/modern-datacenter-server-racks-with-blue-lighting.jpg",
      alt: "Centro de Datos Tier IV",
      title: "Infraestructura de Clase Mundial",
    },
    {
      src: "/network-cables-and-fiber-optics-in-datacenter.jpg",
      alt: "Red de Alta Velocidad",
      title: "Conectividad Global Premium",
    },
    {
      src: "/server-monitoring-dashboard-with-graphs.jpg",
      alt: "Monitoreo 24/7",
      title: "Control Total en Tiempo Real",
    },
    {
      src: "/cloud-security-infrastructure-locks-and-shields.jpg",
      alt: "Seguridad Avanzada",
      title: "Protección Multicapa",
    },
  ]

  const stats = [
    { icon: Server, value: "99.99%", label: "Uptime SLA", color: "#00c4cc" },
    { icon: Users, value: "10,000+", label: "Clientes Activos", color: "#00c4cc" },
    { icon: Globe, value: "15+", label: "Data Centers", color: "#00c4cc" },
    { icon: Zap, value: "<2ms", label: "Latencia Promedio", color: "#00c4cc" },
  ]

  const services = [
    {
      icon: Server,
      title: "Bare Metal Servers",
      description: "Servidores dedicados de alto rendimiento con hardware de última generación",
      features: ["Procesadores AMD EPYC/Intel Xeon", "Hasta 2TB RAM", "NVMe Gen4", "100Gbps Network"],
      gradient: "from-cyan-500/20 to-blue-500/20",
      link: "/bare-metal",
    },
    {
      icon: Cloud,
      title: "Virtual Private Servers",
      description: "VPS escalables con recursos garantizados y control total",
      features: ["SSD NVMe Storage", "IPv4 + IPv6", "Root Access", "Snapshots Gratis"],
      gradient: "from-blue-500/20 to-purple-500/20",
      link: "/vps",
    },
    {
      icon: Layers,
      title: "Kubernetes Clusters",
      description: "Clusters Kubernetes administrados con escalado automático",
      features: ["Auto-Scaling", "Load Balancing", "Monitoring Integrado", "99.95% SLA"],
      gradient: "from-purple-500/20 to-pink-500/20",
      link: "/clusters",
    },
  ]

  const features = [
    { icon: Shield, title: "Seguridad DDoS", desc: "Protección contra ataques volumétricos" },
    { icon: Lock, title: "Cifrado E2E", desc: "Datos encriptados en tránsito y reposo" },
    { icon: Activity, title: "Monitoreo 24/7", desc: "Supervisión continua de infraestructura" },
    { icon: Database, title: "Backup Automático", desc: "Respaldos incrementales diarios" },
    { icon: Gauge, title: "Red 100Gbps", desc: "Conectividad de ultra alta velocidad" },
    { icon: BarChart3, title: "Analytics", desc: "Métricas detalladas en tiempo real" },
  ]

  const testimonials = [
    {
      name: "Carlos Méndez",
      role: "CTO @ TechStartup",
      content:
        "La infraestructura de IINBUE nos permitió escalar de 1,000 a 100,000 usuarios sin interrupciones. Su soporte técnico es excepcional.",
      rating: 5,
    },
    {
      name: "Ana Rodríguez",
      role: "DevOps Lead @ FinanceApp",
      content:
        "Migramos de AWS y redujimos costos en 40% manteniendo el mismo rendimiento. Los servidores bare metal son impresionantes.",
      rating: 5,
    },
    {
      name: "Miguel Torres",
      role: "CEO @ E-Commerce Platform",
      content:
        "Llevamos 2 años con IINBUE, cero caídas importantes. La latencia es perfecta para nuestros clientes en LATAM.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,196,204,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,196,204,0.05),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-[#00c4cc]/10 text-[#00c4cc] border-[#00c4cc]/20 px-4 py-2 text-sm font-semibold">
              <Zap className="w-4 h-4 mr-2 inline" />
              Infraestructura Cloud de Nueva Generación
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Potencia tu negocio con
              <span className="block mt-2 bg-gradient-to-r from-[#00c4cc] to-cyan-300 bg-clip-text text-transparent">
                Infraestructura Cloud Premium
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Servidores dedicados, VPS y Kubernetes de alto rendimiento con
              <span className="text-[#00c4cc] font-semibold"> 99.99% uptime</span> y soporte 24/7
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                asChild
                size="lg"
                className="bg-[#00c4cc] hover:bg-[#00b3b8] text-black font-bold px-8 py-6 text-lg shadow-lg shadow-[#00c4cc]/20 hover:shadow-[#00c4cc]/40 transition-all"
              >
                <Link href="/contacto">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#00c4cc] text-[#00c4cc] hover:bg-[#00c4cc]/10 px-8 py-6 text-lg font-semibold bg-transparent"
              >
                <Link href="/calculadora">
                  <Gauge className="mr-2 w-5 h-5" />
                  Calcular Recursos
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all p-6"
                >
                  <stat.icon className="w-8 h-8 mb-3 mx-auto" style={{ color: stat.color }} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="py-24 bg-gradient-to-b from-black to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00c4cc]/10 text-[#00c4cc] border-[#00c4cc]/20">Servicios Cloud</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Soluciones para Cada Necesidad</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Desde startups hasta empresas Fortune 500, tenemos la infraestructura perfecta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-[#00c4cc]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00c4cc]/10"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#00c4cc]/10 flex items-center justify-center mb-6 group-hover:bg-[#00c4cc]/20 transition-colors">
                    <service.icon className="w-8 h-8 text-[#00c4cc]" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-400 mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00c4cc] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-[#00c4cc]/10 hover:bg-[#00c4cc] text-[#00c4cc] hover:text-black border border-[#00c4cc]/20 font-semibold group-hover:shadow-lg group-hover:shadow-[#00c4cc]/20"
                  >
                    <Link href={service.link}>
                      Ver Planes
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Gallery - Enhanced with larger images */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00c4cc]/10 text-[#00c4cc] border-[#00c4cc]/20">Nuestra Infraestructura</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Data Centers de Clase Mundial</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              15 ubicaciones estratégicas con certificación Tier IV y conectividad premium
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {infrastructureImages.map((image, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-slate-900 border-slate-800 hover:border-[#00c4cc]/50 transition-all duration-300 aspect-video"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00c4cc] transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-sm text-slate-300">{image.alt}</p>
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-[#00c4cc]/20 text-[#00c4cc] border-[#00c4cc]/30">
                    <Activity className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00c4cc]/10 text-[#00c4cc] border-[#00c4cc]/20">Características Premium</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Todo lo que Necesitas, Incluido</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-[#00c4cc]/50 transition-all p-6 hover:shadow-lg hover:shadow-[#00c4cc]/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00c4cc]/10 flex items-center justify-center mb-4 group-hover:bg-[#00c4cc]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#00c4cc]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00c4cc] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00c4cc]/10 text-[#00c4cc] border-[#00c4cc]/20">
              <MessageSquare className="w-3 h-3 mr-1 inline" />
              Testimonios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Clientes Satisfechos</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 p-12">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#00c4cc] text-[#00c4cc]" />
                ))}
              </div>

              <p className="text-xl text-slate-300 text-center mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>

              <div className="text-center">
                <p className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                <p className="text-[#00c4cc] text-sm">{testimonials[currentTestimonial].role}</p>
              </div>

              <div className="flex gap-2 justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-[#00c4cc] w-8" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,196,204,0.1),transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Comienza tu Proyecto Hoy</h2>
            <p className="text-xl text-slate-300 mb-10">
              Únete a más de 10,000 empresas que confían en nuestra infraestructura
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#00c4cc] hover:bg-[#00b3b8] text-black font-bold px-10 py-7 text-lg shadow-2xl shadow-[#00c4cc]/30"
              >
                <Link href="/contacto">
                  Hablar con Ventas
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#00c4cc] text-[#00c4cc] hover:bg-[#00c4cc]/10 px-10 py-7 text-lg font-semibold bg-transparent"
              >
                <Link href="/vps">Ver Planes VPS</Link>
              </Button>
            </div>

            <p className="text-sm text-slate-500 mt-8">
              <Clock className="w-4 h-4 inline mr-1" />
              Activación inmediata • Sin contratos • Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
