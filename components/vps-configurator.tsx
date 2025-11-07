"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Minus, Mail, MessageCircle, AlertCircle } from "lucide-react"
import type { VPSPlan } from "@/data/vps-plans"

interface Complement {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

interface VPSConfiguratorProps {
  plan: VPSPlan
  onClose: () => void
}

export function VPSConfigurator({ plan, onClose }: VPSConfiguratorProps) {
  // Upgrades state with max limits based on plan
  const [extraStorage, setExtraStorage] = useState(0) // units of 50GB
  const [extraCPU, setExtraCPU] = useState(0) // units of 2v
  const [extraRAM, setExtraRAM] = useState(0) // units of 2GB
  const [extraBandwidth, setExtraBandwidth] = useState(0) // units of 1 Gbps

  // Complements state
  const [tsPlusUsers, setTsPlusUsers] = useState(0)
  const [officeLTSC, setOfficeLTSC] = useState(0)
  const [hasOffice365, setHasOffice365] = useState(false)
  const [office365Users, setOffice365Users] = useState(0)
  const [hasAntivirus, setHasAntivirus] = useState(false)
  const [hasBackups, setHasBackups] = useState(false)
  const [hasTsPlusSecurity, setHasTsPlusSecurity] = useState(false)

  // User info for quote
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userCompany, setUserCompany] = useState("")

  // Urgency flag state
  const [isUrgent, setIsUrgent] = useState(false)

  const upgradesPricing = {
    storage: 250, // per 50GB
    cpu: 200, // per 2v
    ram: 300, // per 2GB
    bandwidth: 500, // per Gbps upgrade
  }

  const complementsPricing = {
    tsPlusUser: 70,
    officeLTSC: 17640,
    office365: 400, // per user monthly
    antivirus: 3500, // per machine annual
    backups: 2500, // per machine annual
    tsPlusSecurity: 5757, // perpetual license
  }

  const getMaxStorage = () => {
    // Max storage limits by plan (example logic)
    const baseLimits: Record<string, number> = {
      basic: 500,
      inter: 800,
      pro: 1000,
      plus: 1200,
      prime: 1500,
      xprime: 2000,
      zprime: 3000,
      colossal: 5000,
    }
    return baseLimits[plan.id] || 2000
  }

  const getMaxCPU = () => {
    const baseLimits: Record<string, number> = {
      basic: 16,
      inter: 16,
      pro: 24,
      plus: 24,
      prime: 32,
      xprime: 48,
      zprime: 64,
      colossal: 96,
    }
    return baseLimits[plan.id] || 32
  }

  const getMaxRAM = () => {
    const baseLimits: Record<string, number> = {
      basic: 16,
      inter: 32,
      pro: 48,
      plus: 64,
      prime: 96,
      xprime: 128,
      zprime: 192,
      colossal: 256,
    }
    return baseLimits[plan.id] || 64
  }

  const calculateTotal = () => {
    const basePrice = plan.price
    const upgradesTotal =
      extraStorage * upgradesPricing.storage +
      extraCPU * upgradesPricing.cpu +
      extraRAM * upgradesPricing.ram +
      extraBandwidth * upgradesPricing.bandwidth

    const complementsTotal =
      tsPlusUsers * complementsPricing.tsPlusUser +
      officeLTSC * complementsPricing.officeLTSC +
      (hasOffice365 ? office365Users * complementsPricing.office365 : 0) +
      (hasAntivirus ? complementsPricing.antivirus : 0) +
      (hasBackups ? complementsPricing.backups : 0) +
      (hasTsPlusSecurity ? complementsPricing.tsPlusSecurity : 0)

    return basePrice + upgradesTotal + complementsTotal
  }

  const generateQuoteMessage = () => {
    const lines = ["📋 Solicitud de cotizacion", ""]

    // Add urgency flag if checked
    if (isUrgent) {
      lines.push("🚨 ⚠️ CLIENTE CON URGENCIA ⚠️ 🚨")
      lines.push("")
    }

    lines.push(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "🌐 COTIZACIÓN IINUBE - VPS CLOUD",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "┌─────────────────────────────┐",
      "│  👤 DATOS DEL CLIENTE       │",
      "└─────────────────────────────┘",
    )

    if (userName) lines.push(`Nombre: ${userName}`)
    if (userCompany) lines.push(`Empresa: ${userCompany}`)
    if (userEmail) lines.push(`Email: ${userEmail}`)
    if (userPhone) lines.push(`Teléfono: ${userPhone}`)

    lines.push(
      "",
      "┌─────────────────────────────┐",
      "│  💻 PLAN BASE SELECCIONADO  │",
      "└─────────────────────────────┘",
      `Plan: ${plan.name} - ${plan.subtitle}`,
      `Precio base: $${plan.price.toLocaleString()} MXN/mes`,
      "",
      "Especificaciones:",
      `  • RAM: ${plan.ram}GB DDR5`,
      `  • CPU: ${plan.cpu}v ${plan.processor}`,
      `  • Almacenamiento: ${plan.storage}GB SSD NVMe`,
      `  • Ancho de banda: ${plan.bandwidth}`,
      "",
    )

    // Add upgrades if any
    if (extraStorage > 0 || extraCPU > 0 || extraRAM > 0 || extraBandwidth > 0) {
      lines.push("┌─────────────────────────────┐", "│  ⬆️ UPGRADES ADICIONALES    │", "└─────────────────────────────┘")

      if (extraStorage > 0) {
        lines.push(
          `Disco Duro SSD NVMe:`,
          `  • +${extraStorage * 50}GB adicionales`,
          `  • Total: ${plan.storage + extraStorage * 50}GB`,
          `  • Subtotal: $${(extraStorage * upgradesPricing.storage).toLocaleString()} MXN/mes`,
          "",
        )
      }
      if (extraCPU > 0) {
        lines.push(
          `CPU Intel Xeon Gold:`,
          `  • +${extraCPU * 2}v núcleos adicionales`,
          `  • Total: ${plan.cpu + extraCPU * 2}v CPU`,
          `  • Subtotal: $${(extraCPU * upgradesPricing.cpu).toLocaleString()} MXN/mes`,
          "",
        )
      }
      if (extraRAM > 0) {
        lines.push(
          `Memoria RAM DDR5:`,
          `  • +${extraRAM * 2}GB adicionales`,
          `  • Total: ${plan.ram + extraRAM * 2}GB RAM`,
          `  • Subtotal: $${(extraRAM * upgradesPricing.ram).toLocaleString()} MXN/mes`,
          "",
        )
      }
      if (extraBandwidth > 0) {
        lines.push(
          `Ancho de Banda:`,
          `  • +${extraBandwidth} Gbps adicionales`,
          `  • Subtotal: $${(extraBandwidth * upgradesPricing.bandwidth).toLocaleString()} MXN/mes`,
          "",
        )
      }
    }

    // Add complements if any
    const hasComplements =
      tsPlusUsers > 0 || officeLTSC > 0 || hasOffice365 || hasAntivirus || hasBackups || hasTsPlusSecurity
    if (hasComplements) {
      lines.push(
        "┌─────────────────────────────┐",
        "│  📦 COMPLEMENTOS SOFTWARE   │",
        "└─────────────────────────────┘",
      )

      if (tsPlusUsers > 0) {
        lines.push(
          `Usuarios TSPlus:`,
          `  • ${tsPlusUsers} usuario(s) de acceso seguro`,
          `  • $${complementsPricing.tsPlusUser} MXN c/u`,
          `  • Subtotal: $${(tsPlusUsers * complementsPricing.tsPlusUser).toLocaleString()} MXN/mes`,
          "",
        )
      }

      if (officeLTSC > 0) {
        lines.push(
          `Office LTSC Standard 2024:`,
          `  • ${officeLTSC} licencia(s) perpetua(s)`,
          `  • $${complementsPricing.officeLTSC.toLocaleString()} MXN c/u`,
          `  • Subtotal: $${(officeLTSC * complementsPricing.officeLTSC).toLocaleString()} MXN (único pago)`,
          "",
        )
      }

      if (hasOffice365) {
        lines.push(
          `Microsoft 365 Business Standard:`,
          `  • ${office365Users} usuario(s)`,
          `  • $${complementsPricing.office365} MXN por usuario/mes`,
          `  • Subtotal: $${(office365Users * complementsPricing.office365).toLocaleString()} MXN/mes`,
          "",
        )
      }

      if (hasAntivirus) {
        lines.push(
          `ESET Server Security:`,
          `  • Licencia anual para 1 máquina`,
          `  • Subtotal: $${complementsPricing.antivirus.toLocaleString()} MXN/año`,
          "",
        )
      }

      if (hasBackups) {
        lines.push(
          `Respaldos Automatizados:`,
          `  • Licencia anual para 1 máquina (7 Snapshots)`,
          `  • Subtotal: $${complementsPricing.backups.toLocaleString()} MXN/año`,
          "",
        )
      }

      if (hasTsPlusSecurity) {
        lines.push(
          `TSPlus Advanced Security:`,
          `  • Licencia perpetua (actualizaciones 21% anual)`,
          `  • Subtotal: $${complementsPricing.tsPlusSecurity.toLocaleString()} MXN (único pago)`,
          "",
        )
      }
    }

    const total = calculateTotal()
    const iva = Math.round(total * 0.16)
    const totalConIVA = total + iva

    lines.push(
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "💰 RESUMEN FINANCIERO",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Subtotal mensual: $${total.toLocaleString()} MXN`,
      `IVA (16%): $${iva.toLocaleString()} MXN`,
      `──────────────────────────────`,
      `TOTAL MENSUAL: $${totalConIVA.toLocaleString()} MXN`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "📋 TÉRMINOS Y CONDICIONES:",
      "",
      "🔹 LICENCIAS:",
      "  • TSPlus Advanced Security: actualización anual 21% del valor",
      "  • Software NO incluye servicios, capacitación o instalación",
      "",
      "🔹 TIEMPOS DE ENTREGA (Horario: L-V 9am-3pm y 4pm-6pm):",
      "  • Servidores VPSi nuevos: 4 horas",
      "  • Escalamientos: 1 hora",
      "  • Complementos adicionales: 6 horas",
      "",
      "🔹 IMPORTANTES:",
      "  • Precios sujetos a cambio sin previo aviso",
      "  • Todos los precios son más IVA",
      "  • Precios en moneda nacional (MXN)",
      "  • Datacenter en Canadá - Alta disponibilidad 99%",
      "  • Contrato sin plazo forzoso",
      "",
      "🌐 IINUBE - Infraestructura Cloud",
      "📧 management@iinube.com",
      "📞 +52 33 3660 3088",
      "🌍 https://iinube.com",
    )

    return lines.filter(Boolean).join("\n")
  }

  const sendToWhatsApp = () => {
    if (!userName || !userPhone) {
      alert("Por favor ingresa tu nombre y teléfono")
      return
    }
    const message = generateQuoteMessage()
    const whatsappUrl = `https://wa.me/523328346167?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const sendToEmail = () => {
    if (!userName || !userEmail) {
      alert("Por favor ingresa tu nombre y email")
      return
    }
    const message = generateQuoteMessage()
    const subject = `Cotización VPS ${plan.name} - ${userName}`
    const mailtoUrl = `mailto:management@iinube.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoUrl
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="bg-slate-900 border-slate-800 max-w-4xl w-full my-8">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">Configurar {plan.name}</CardTitle>
              <CardDescription className="text-slate-400">{plan.subtitle}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Plan Base */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Plan Base</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">RAM DDR5:</p>
                <p className="text-white font-semibold">{plan.ram}GB</p>
              </div>
              <div>
                <p className="text-slate-400">CPU:</p>
                <p className="text-white font-semibold">
                  {plan.cpu}v {plan.processor}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Almacenamiento:</p>
                <p className="text-white font-semibold">{plan.storage}GB SSD NVMe</p>
              </div>
              <div>
                <p className="text-slate-400">Precio Base:</p>
                <p className="text-cyan-400 font-bold text-xl">${plan.price.toLocaleString()} MXN/mes</p>
              </div>
            </div>
          </div>

          {/* Upgrades */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">⬆️ Upgrades de Recursos</h3>
            <div className="grid gap-4">
              {/* Storage Upgrade */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Disco Duro SSD NVMe</p>
                      <p className="text-slate-400 text-sm">+50GB por unidad - $250 MXN c/u</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        Total: {plan.storage + extraStorage * 50}GB / Máx: {getMaxStorage()}GB
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExtraStorage(Math.max(0, extraStorage - 1))}
                        className="border-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white w-8 text-center">{extraStorage}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newTotal = plan.storage + (extraStorage + 1) * 50
                          if (newTotal <= getMaxStorage()) {
                            setExtraStorage(extraStorage + 1)
                          }
                        }}
                        className="border-slate-600"
                        disabled={plan.storage + (extraStorage + 1) * 50 > getMaxStorage()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CPU Upgrade */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">CPU Intel Xeon Gold</p>
                      <p className="text-slate-400 text-sm">+2v núcleos por unidad - $200 MXN c/u</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        Total: {plan.cpu + extraCPU * 2}v / Máx: {getMaxCPU()}v CPU
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExtraCPU(Math.max(0, extraCPU - 1))}
                        className="border-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white w-8 text-center">{extraCPU}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newTotal = plan.cpu + (extraCPU + 1) * 2
                          if (newTotal <= getMaxCPU()) {
                            setExtraCPU(extraCPU + 1)
                          }
                        }}
                        className="border-slate-600"
                        disabled={plan.cpu + (extraCPU + 1) * 2 > getMaxCPU()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RAM Upgrade */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Memoria RAM DDR5</p>
                      <p className="text-slate-400 text-sm">+2GB por unidad - $300 MXN c/u</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        Total: {plan.ram + extraRAM * 2}GB / Máx: {getMaxRAM()}GB RAM
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExtraRAM(Math.max(0, extraRAM - 1))}
                        className="border-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white w-8 text-center">{extraRAM}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newTotal = plan.ram + (extraRAM + 1) * 2
                          if (newTotal <= getMaxRAM()) {
                            setExtraRAM(extraRAM + 1)
                          }
                        }}
                        className="border-slate-600"
                        disabled={plan.ram + (extraRAM + 1) * 2 > getMaxRAM()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bandwidth Upgrade */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Ancho de Banda</p>
                      <p className="text-slate-400 text-sm">+1 Gbps por unidad - $500 MXN c/u</p>
                      <p className="text-cyan-400 text-sm mt-1">Base: 2 Gbps + {extraBandwidth} Gbps adicionales</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExtraBandwidth(Math.max(0, extraBandwidth - 1))}
                        className="border-slate-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white w-8 text-center">{extraBandwidth}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExtraBandwidth(extraBandwidth + 1)}
                        className="border-slate-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Complements */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">📦 Complementos Software</h3>
            <div className="grid gap-3">
              {/* TSPlus Users - Counter */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Usuarios TSPlus</p>
                      <p className="text-slate-400 text-xs">Usuario de acceso seguro a servidor virtual</p>
                      <p className="text-cyan-400 text-sm mt-1">${complementsPricing.tsPlusUser} MXN c/u</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setTsPlusUsers(Math.max(0, tsPlusUsers - 1))}
                        className="border-slate-600 h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white w-8 text-center text-sm">{tsPlusUsers}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setTsPlusUsers(tsPlusUsers + 1)}
                        className="border-slate-600 h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office LTSC - Counter */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Office LTSC Standard 2024</p>
                      <p className="text-slate-400 text-xs">Licencia perpetua</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        ${complementsPricing.officeLTSC.toLocaleString()} MXN c/u
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOfficeLTSC(Math.max(0, officeLTSC - 1))}
                        className="border-slate-600 h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white w-8 text-center text-sm">{officeLTSC}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOfficeLTSC(officeLTSC + 1)}
                        className="border-slate-600 h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office 365 - Radio button + user counter */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-semibold">Microsoft 365 Business Standard</p>
                        <p className="text-slate-400 text-xs">Suscripción mensual por usuario</p>
                        <p className="text-cyan-400 text-sm mt-1">${complementsPricing.office365} MXN/usuario/mes</p>
                      </div>
                      <Checkbox checked={hasOffice365} onCheckedChange={(checked) => setHasOffice365(!!checked)} />
                    </div>
                    {hasOffice365 && (
                      <div className="flex items-center justify-between pl-4 border-l-2 border-cyan-500">
                        <p className="text-slate-300 text-sm">Número de usuarios:</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setOffice365Users(Math.max(1, office365Users - 1))}
                            className="border-slate-600 h-7 w-7 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white w-8 text-center text-sm">{office365Users || 1}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setOffice365Users((office365Users || 1) + 1)}
                            className="border-slate-600 h-7 w-7 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Antivirus - Radio button */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">ESET Server Security</p>
                      <p className="text-slate-400 text-xs">Licencia anual para 1 máquina</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        ${complementsPricing.antivirus.toLocaleString()} MXN/año
                      </p>
                    </div>
                    <Checkbox checked={hasAntivirus} onCheckedChange={(checked) => setHasAntivirus(!!checked)} />
                  </div>
                </CardContent>
              </Card>

              {/* Backups - Radio button */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Respaldos Automatizados</p>
                      <p className="text-slate-400 text-xs">Licencia anual para 1 máquina (7 Snapshots)</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        ${complementsPricing.backups.toLocaleString()} MXN/año
                      </p>
                    </div>
                    <Checkbox checked={hasBackups} onCheckedChange={(checked) => setHasBackups(!!checked)} />
                  </div>
                </CardContent>
              </Card>

              {/* TSPlus Security - Radio button */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-semibold">TSPlus Advanced Security</p>
                      <p className="text-slate-400 text-xs">Licencia perpetua (actualización 21% anual)</p>
                      <p className="text-cyan-400 text-sm mt-1">
                        ${complementsPricing.tsPlusSecurity.toLocaleString()} MXN
                      </p>
                    </div>
                    <Checkbox
                      checked={hasTsPlusSecurity}
                      onCheckedChange={(checked) => setHasTsPlusSecurity(!!checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* User Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">👤 Tus Datos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-slate-300">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Tu nombre"
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-slate-300">
                  Empresa
                </Label>
                <Input
                  id="company"
                  value={userCompany}
                  onChange={(e) => setUserCompany(e.target.value)}
                  placeholder="Nombre de empresa"
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-300">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-slate-300">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+52 33 1234 5678"
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>
            </div>

            {/* Urgency checkbox */}
            <div className="mt-4 flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <Checkbox id="urgent" checked={isUrgent} onCheckedChange={(checked) => setIsUrgent(!!checked)} />
              <label
                htmlFor="urgent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                Cliente con urgencia (se notificará prioridad en la cotización)
              </label>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-xl font-semibold">Total Mensual:</span>
              <span className="text-4xl font-bold text-cyan-400">${calculateTotal().toLocaleString()}</span>
            </div>
            <p className="text-slate-300 text-sm">+ IVA (16%) • Precios en MXN</p>
          </div>
        </CardContent>

        <CardFooter className="border-t border-slate-800 flex gap-4">
          <Button onClick={sendToWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            <MessageCircle className="w-5 h-5 mr-2" />
            Enviar por WhatsApp
          </Button>
          <Button onClick={sendToEmail} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Mail className="w-5 h-5 mr-2" />
            Enviar por Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
