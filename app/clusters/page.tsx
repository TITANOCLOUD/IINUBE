"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Container, Check, Cpu, HardDrive, Network, Shield, Zap, ChevronDown, GitBranch } from "lucide-react"
import { useState } from "react"

export default function ClustersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const clusterPlans = [
    {
      name: "Cluster Básico",
      nodes: "3 nodos worker",
      cpu: "6 vCPU por nodo",
      ram: "12 GB RAM por nodo",
      storage: "100 GB SSD por nodo",
      price: "$120",
      features: ["Auto-scaling", "Load Balancer", "Monitoreo 24/7", "SSL automático"],
    },
    {
      name: "Cluster Pro",
      nodes: "5 nodos worker",
      cpu: "8 vCPU por nodo",
      ram: "16 GB RAM por nodo",
      storage: "200 GB SSD por nodo",
      price: "$250",
      features: ["Todo de Básico", "CI/CD integrado", "Backup automático", "Multi-zona"],
      popular: true,
    },
    {
      name: "Cluster Enterprise",
      nodes: "10+ nodos worker",
      cpu: "16 vCPU por nodo",
      ram: "32 GB RAM por nodo",
      storage: "500 GB SSD por nodo",
      price: "$500",
      features: ["Todo de Pro", "Multi-región", "Soporte dedicado", "SLA 99.99%"],
    },
  ]

  const scaleServers = [
    {
      name: "Scale-a1 2024",
      cpu: "AMD EPYC GENOA 9124",
      cores: "16c/32t - 3GHz/3.6GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: "$413",
    },
    {
      name: "Scale-a3 2024",
      cpu: "AMD EPYC GENOA 9354",
      cores: "32c/64t - 3.25GHz/3.75GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: "$496",
    },
    {
      name: "Scale-a5 2024",
      cpu: "AMD EPYC GENOA 9554",
      cores: "64c/128t - 3.1GHz/3.75GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: "$590",
    },
  ]

  const faqs = [
    {
      question: "¿Qué es un Kubernetes Cluster?",
      answer:
        "Un Kubernetes Cluster es un conjunto de servidores (nodos) que trabajan juntos para ejecutar aplicaciones containerizadas. Kubernetes orquesta automáticamente el despliegue, escalado y gestión de tus aplicaciones, asegurando alta disponibilidad y eficiencia en el uso de recursos.",
    },
    {
      question: "¿Cuánto cuesta un cluster?",
      answer:
        "El precio de un cluster depende del número de nodos, recursos por nodo (CPU, RAM, almacenamiento) y características adicionales como multi-región o soporte dedicado. Nuestros clusters comienzan desde $120/mes para 3 nodos básicos hasta $500/mes para clusters enterprise con 10+ nodos. Los factores que influyen incluyen la cantidad de aplicaciones que ejecutarás, el tráfico esperado y los requisitos de alta disponibilidad.",
    },
    {
      question: "¿Qué incluye el servicio managed?",
      answer:
        "Nuestro servicio Kubernetes managed incluye: instalación y configuración del cluster, actualizaciones automáticas de Kubernetes, monitoreo 24/7, backups automáticos, load balancer integrado, certificados SSL automáticos, y soporte técnico especializado. Tú solo te enfocas en tus aplicaciones, nosotros gestionamos la infraestructura.",
    },
    {
      question: "¿Puedo escalar mi cluster?",
      answer:
        "Sí, puedes escalar tanto vertical como horizontalmente. Escala horizontal agregando o removiendo nodos según la demanda. Escala vertical aumentando los recursos (CPU/RAM) de los nodos existentes. El auto-scaling automático ajusta los recursos basándose en métricas como uso de CPU y memoria.",
    },
    {
      question: "¿Qué es la Serie Scale?",
      answer:
        "La Serie Scale son servidores bare metal de alto rendimiento diseñados específicamente para clusters Kubernetes y cargas de trabajo intensivas. Equipados con procesadores AMD EPYC GENOA/TURIN de última generación, ofrecen hasta 192 cores, 3TB de RAM y 50 Gbps de red privada, ideales para microservicios, big data y aplicaciones de IA.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-6">
          <Container className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">Kubernetes Managed Clusters</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Orquestación de Contenedores
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Despliega, escala y gestiona aplicaciones containerizadas con Kubernetes totalmente administrado. Enfócate en
          tu código, nosotros gestionamos la infraestructura.
        </p>
      </section>

      {/* Managed Kubernetes Plans */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Kubernetes Managed</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Clusters totalmente gestionados listos para producción</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clusterPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-slate-900 ${plan.popular ? "border-2 border-cyan-500 relative" : "border-slate-800"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MÁS POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.nodes}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>{plan.cpu}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Container className="w-5 h-5 text-cyan-400" />
                    <span>{plan.ram}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <HardDrive className="w-5 h-5 text-cyan-400" />
                    <span>{plan.storage}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-slate-300 text-sm">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-cyan-500 hover:bg-cyan-600" : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  Crear Cluster
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Scale Series for Clusters */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Serie Scale - Bare Metal para Clusters</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Servidores de alto rendimiento optimizados para Kubernetes y cargas intensivas
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {scaleServers.map((server) => (
            <Card key={server.name} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{server.name}</CardTitle>
                <CardDescription className="text-slate-400">{server.cpu}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-slate-300">
                    <Cpu className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.cores}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Container className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.ram}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <HardDrive className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.storage}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <Network className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{server.bandwidth}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{server.price}</span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">Configurar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Características del Servicio Managed</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo incluido para clusters production-ready</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <GitBranch className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">CI/CD Integrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Pipeline completo de integración y despliegue continuo con GitLab, GitHub Actions o Jenkins
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Shield className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Seguridad Avanzada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Network policies, RBAC, secrets management y escaneo de vulnerabilidades automático
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Auto-Scaling Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Escalado automático de pods y nodos basado en métricas de CPU, memoria y custom metrics
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre Kubernetes Clusters</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800">
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
          <h2 className="text-4xl font-bold mb-4 text-white">¿Listo para modernizar tu infraestructura?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Despliega tu primer cluster Kubernetes en minutos. Prueba gratuita de 14 días.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Crear Cluster Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
            >
              Ver Documentación
            </Button>
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
