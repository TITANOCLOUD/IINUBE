"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Minus, Mail, MessageCircle, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import type { VPSPlan } from "@/data/vps-plans"
import { TermsAndConditions } from "./terms-and-conditions"

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
  const [hasOfficeLTSC, setHasOfficeLTSC] = useState(false)
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

  const [showValidation, setShowValidation] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

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
      (hasOfficeLTSC ? complementsPricing.officeLTSC : 0) +
      office365Users * complementsPricing.office365 +
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
      tsPlusUsers > 0 || hasOfficeLTSC || office365Users > 0 || hasAntivirus || hasBackups || hasTsPlusSecurity
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

      if (hasOfficeLTSC) {
        lines.push(
          `Office LTSC Standard 2024:`,
          `  • 1 licencia perpetua`,
          `  • Subtotal: $${complementsPricing.officeLTSC.toLocaleString()} MXN (único pago)`,
          "",
        )
      }

      if (office365Users > 0) {
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

  const saveOrderToFile = async () => {
    setIsSaving(true)
    try {
      const orderData = {
        timestamp: new Date().toISOString(),
        isUrgent,
        client: {
          name: userName,
          company: userCompany,
          email: userEmail,
          phone: userPhone,
        },
        plan: {
          id: plan.id,
          name: plan.name,
          subtitle: plan.subtitle,
          basePrice: plan.price,
        },
        upgrades: {
          storage: extraStorage,
          cpu: extraCPU,
          ram: extraRAM,
          bandwidth: extraBandwidth,
        },
        complements: {
          tsPlusUsers,
          hasOfficeLTSC,
          office365Users,
          hasAntivirus,
          hasBackups,
          hasTsPlusSecurity,
        },
        total: calculateTotal(),
        totalWithIVA: calculateTotal() * 1.16,
      }

      const response = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        setSaveSuccess(true)
        setTimeout(() => {
          setSaveSuccess(false)
          setShowValidation(false)
        }, 2000)
      } else {
        throw new Error("Error al guardar la orden")
      }
    } catch (error) {
      console.error("Error saving order:", error)
      alert("Error al guardar la orden. Por favor intenta nuevamente.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleValidateAndSend = () => {
    if (!userName || !userEmail || !userPhone) {
      alert("Por favor completa todos los campos requeridos")
      return
    }
    setShowValidation(true)
  }

  const handleConfirmSend = async (method: "whatsapp" | "email") => {
    await saveOrderToFile()
    if (method === "whatsapp") {
      sendToWhatsApp()
    } else {
      sendToEmail()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      {!showValidation ? (
        <Card className="bg-slate-900 border-slate-800 max-w-xl w-full max-h-[90vh] flex flex-col">
          <CardHeader className="border-b border-slate-800 py-3 px-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400 text-xs">{plan.subtitle}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-4 overflow-y-auto flex-1">
            {/* Plan Base */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-lg p-3">
              <h3 className="text-white font-semibold text-sm mb-2">Plan Base</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400">RAM DDR5:</p>
                  <p className="text-white font-semibold">{plan.ram}GB</p>
                </div>
                <div>
                  <p className="text-slate-400">CPU:</p>
                  <p className="text-white font-semibold">{plan.cpu}v</p>
                </div>
                <div>
                  <p className="text-slate-400">Almacenamiento:</p>
                  <p className="text-white font-semibold">{plan.storage}GB SSD</p>
                </div>
                <div>
                  <p className="text-slate-400">Precio Base:</p>
                  <p className="text-cyan-400 font-bold text-base">${plan.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Upgrades */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-2">⬆️ Upgrades</h3>
              <div className="grid gap-2">
                {/* Storage Upgrade */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Disco Duro SSD</p>
                        <p className="text-slate-400 text-xs">+50GB - $250</p>
                        <p className="text-cyan-400 text-xs">Total: {plan.storage + extraStorage * 50}GB</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExtraStorage(Math.max(0, extraStorage - 1))}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-5 text-center text-xs">{extraStorage}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newTotal = plan.storage + (extraStorage + 1) * 50
                            if (newTotal <= getMaxStorage()) {
                              setExtraStorage(extraStorage + 1)
                            }
                          }}
                          className="h-6 w-6 p-0"
                          disabled={plan.storage + (extraStorage + 1) * 50 > getMaxStorage()}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CPU Upgrade */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">CPU</p>
                        <p className="text-slate-400 text-xs">+2v - $200</p>
                        <p className="text-cyan-400 text-xs">Total: {plan.cpu + extraCPU * 2}v</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExtraCPU(Math.max(0, extraCPU - 1))}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-5 text-center text-xs">{extraCPU}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newTotal = plan.cpu + (extraCPU + 1) * 2
                            if (newTotal <= getMaxCPU()) {
                              setExtraCPU(extraCPU + 1)
                            }
                          }}
                          className="h-6 w-6 p-0"
                          disabled={plan.cpu + (extraCPU + 1) * 2 > getMaxCPU()}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* RAM Upgrade */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Memoria RAM DDR5</p>
                        <p className="text-slate-400 text-xs">+2GB - $300</p>
                        <p className="text-cyan-400 text-xs">Total: {plan.ram + extraRAM * 2}GB</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExtraRAM(Math.max(0, extraRAM - 1))}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-5 text-center text-xs">{extraRAM}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newTotal = plan.ram + (extraRAM + 1) * 2
                            if (newTotal <= getMaxRAM()) {
                              setExtraRAM(extraRAM + 1)
                            }
                          }}
                          className="h-6 w-6 p-0"
                          disabled={plan.ram + (extraRAM + 1) * 2 > getMaxRAM()}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bandwidth Upgrade */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Ancho de Banda</p>
                        <p className="text-slate-400 text-xs">+1 Gbps - $500</p>
                        <p className="text-cyan-400 text-xs">Base: 2 Gbps + {extraBandwidth}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExtraBandwidth(Math.max(0, extraBandwidth - 1))}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-5 text-center text-xs">{extraBandwidth}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExtraBandwidth(extraBandwidth + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Complements */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-2">📦 Complementos</h3>
              <div className="grid gap-2">
                {/* TSPlus Users */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Usuarios TSPlus</p>
                        <p className="text-cyan-400 text-xs">${complementsPricing.tsPlusUser}/u</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setTsPlusUsers(Math.max(0, tsPlusUsers - 1))}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-5 text-center text-xs">{tsPlusUsers}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setTsPlusUsers(tsPlusUsers + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office LTSC */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Office LTSC 2024</p>
                        <p className="text-slate-400 text-xs">Licencia perpetua</p>
                        <p className="text-cyan-400 text-xs">${complementsPricing.officeLTSC.toLocaleString()}</p>
                      </div>
                      <Checkbox checked={hasOfficeLTSC} onCheckedChange={(checked) => setHasOfficeLTSC(!!checked)} />
                    </div>
                  </CardContent>
                </Card>

                {/* Office 365 */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Office 365 Business</p>
                        <p className="text-slate-400 text-xs">Mensual por usuario</p>
                        <p className="text-cyan-400 text-xs">${complementsPricing.office365}/u/mes</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOffice365Users(Math.max(0, office365Users - 1))}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-white w-5 text-center text-xs">{office365Users}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOffice365Users(office365Users + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Antivirus */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">ESET Antivirus</p>
                        <p className="text-slate-400 text-xs">Anual por máquina</p>
                        <p className="text-cyan-400 text-xs">${complementsPricing.antivirus.toLocaleString()}/año</p>
                      </div>
                      <Checkbox checked={hasAntivirus} onCheckedChange={(checked) => setHasAntivirus(!!checked)} />
                    </div>
                  </CardContent>
                </Card>

                {/* Backups */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">Respaldos</p>
                        <p className="text-slate-400 text-xs">Anual (7 Snapshots)</p>
                        <p className="text-cyan-400 text-xs">${complementsPricing.backups.toLocaleString()}/año</p>
                      </div>
                      <Checkbox checked={hasBackups} onCheckedChange={(checked) => setHasBackups(!!checked)} />
                    </div>
                  </CardContent>
                </Card>

                {/* TSPlus Security */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">TSPlus Security</p>
                        <p className="text-slate-400 text-xs">Perpetua (21% anual)</p>
                        <p className="text-cyan-400 text-xs">${complementsPricing.tsPlusSecurity.toLocaleString()}</p>
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
              <h3 className="text-white font-semibold text-sm mb-2">👤 Tus Datos</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="name" className="text-slate-300 text-xs">
                    Nombre *
                  </Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Tu nombre"
                    className="bg-slate-800 border-slate-700 text-white mt-1 h-8 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-slate-300 text-xs">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    value={userCompany}
                    onChange={(e) => setUserCompany(e.target.value)}
                    placeholder="Empresa"
                    className="bg-slate-800 border-slate-700 text-white mt-1 h-8 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300 text-xs">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="bg-slate-800 border-slate-700 text-white mt-1 h-8 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-300 text-xs">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+52 33 1234 5678"
                    className="bg-slate-800 border-slate-700 text-white mt-1 h-8 text-xs"
                  />
                </div>
              </div>

              {/* Urgency checkbox */}
              <div className="mt-2 flex items-center space-x-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
                <Checkbox id="urgent" checked={isUrgent} onCheckedChange={(checked) => setIsUrgent(!!checked)} />
                <label htmlFor="urgent" className="text-xs font-medium text-white flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  Cliente con urgencia
                </label>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-semibold">Total Mensual:</span>
                <span className="text-2xl font-bold text-cyan-400">${calculateTotal().toLocaleString()}</span>
              </div>
              <p className="text-slate-300 text-xs mt-1">+ IVA (16%) • Precios en MXN</p>
            </div>
          </CardContent>

          <CardFooter className="border-t border-slate-800 flex gap-2 p-3 flex-shrink-0">
            <TermsAndConditions />
            <Button
              onClick={handleValidateAndSend}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white h-9 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Validar y Enviar
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-slate-900 border-slate-800 max-w-2xl w-full max-h-[90vh] flex flex-col">
          <CardHeader className="border-b border-slate-800 py-3 px-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white">
                  {saveSuccess ? "✅ Orden Guardada" : "📋 Validación de Orden"}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Revisa tu configuración antes de enviar
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowValidation(false)}
                className="text-slate-400 hover:text-white h-8 w-8"
                disabled={isSaving}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-4 overflow-y-auto flex-1">
            {saveSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <p className="text-white text-lg font-semibold">Orden guardada exitosamente</p>
                <p className="text-slate-400 text-sm">Tu cotización ha sido registrada</p>
              </div>
            ) : (
              <>
                {/* Urgency Alert */}
                {isUrgent && (
                  <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold text-sm">⚠️ CLIENTE CON URGENCIA</p>
                      <p className="text-red-200 text-xs">Esta orden será procesada con prioridad</p>
                    </div>
                  </div>
                )}

                {/* Client Info */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                  <h3 className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Datos del Cliente
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400">Nombre:</p>
                      <p className="text-white font-medium">{userName}</p>
                    </div>
                    {userCompany && (
                      <div>
                        <p className="text-slate-400">Empresa:</p>
                        <p className="text-white font-medium">{userCompany}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-400">Email:</p>
                      <p className="text-white font-medium">{userEmail}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Teléfono:</p>
                      <p className="text-white font-medium">{userPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Plan Base */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                  <h3 className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Plan Seleccionado
                  </h3>
                  <div className="space-y-1">
                    <p className="text-white font-bold">{plan.name}</p>
                    <p className="text-slate-300 text-xs">{plan.subtitle}</p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                      <div>
                        <p className="text-slate-400">RAM:</p>
                        <p className="text-white font-medium">{plan.ram}GB DDR5</p>
                      </div>
                      <div>
                        <p className="text-slate-400">CPU:</p>
                        <p className="text-white font-medium">{plan.cpu}v</p>
                      </div>
                      <div>
                        <p className="text-slate-400">SSD:</p>
                        <p className="text-white font-medium">{plan.storage}GB</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700 mt-2">
                      <p className="text-cyan-400 font-bold">${plan.price.toLocaleString()} MXN/mes</p>
                    </div>
                  </div>
                </div>

                {/* Upgrades if any */}
                {(extraStorage > 0 || extraCPU > 0 || extraRAM > 0 || extraBandwidth > 0) && (
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                    <h3 className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Upgrades Adicionales
                    </h3>
                    <div className="space-y-1 text-xs">
                      {extraStorage > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Disco +{extraStorage * 50}GB</span>
                          <span className="text-white font-medium">
                            ${(extraStorage * upgradesPricing.storage).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {extraCPU > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">CPU +{extraCPU * 2}v</span>
                          <span className="text-white font-medium">
                            ${(extraCPU * upgradesPricing.cpu).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {extraRAM > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">RAM +{extraRAM * 2}GB</span>
                          <span className="text-white font-medium">
                            ${(extraRAM * upgradesPricing.ram).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {extraBandwidth > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Bandwidth +{extraBandwidth} Gbps</span>
                          <span className="text-white font-medium">
                            ${(extraBandwidth * upgradesPricing.bandwidth).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Complements if any */}
                {(tsPlusUsers > 0 ||
                  hasOfficeLTSC ||
                  office365Users > 0 ||
                  hasAntivirus ||
                  hasBackups ||
                  hasTsPlusSecurity) && (
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                    <h3 className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Complementos Software
                    </h3>
                    <div className="space-y-1 text-xs">
                      {tsPlusUsers > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">TSPlus x{tsPlusUsers}</span>
                          <span className="text-white font-medium">
                            ${(tsPlusUsers * complementsPricing.tsPlusUser).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {hasOfficeLTSC && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Office LTSC 2024</span>
                          <span className="text-white font-medium">
                            ${complementsPricing.officeLTSC.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {office365Users > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Office 365 x{office365Users}</span>
                          <span className="text-white font-medium">
                            ${(office365Users * complementsPricing.office365).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {hasAntivirus && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">ESET Antivirus</span>
                          <span className="text-white font-medium">
                            ${complementsPricing.antivirus.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {hasBackups && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">Respaldos</span>
                          <span className="text-white font-medium">${complementsPricing.backups.toLocaleString()}</span>
                        </div>
                      )}
                      {hasTsPlusSecurity && (
                        <div className="flex justify-between">
                          <span className="text-slate-300">TSPlus Security</span>
                          <span className="text-white font-medium">
                            ${complementsPricing.tsPlusSecurity.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Total Summary */}
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Subtotal:</span>
                      <span className="text-white font-semibold">${calculateTotal().toLocaleString()} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">IVA (16%):</span>
                      <span className="text-white font-semibold">
                        ${Math.round(calculateTotal() * 0.16).toLocaleString()} MXN
                      </span>
                    </div>
                    <div className="border-t border-cyan-500/30 pt-2 flex justify-between items-center">
                      <span className="text-white font-bold">TOTAL:</span>
                      <span className="text-2xl font-bold text-cyan-400">
                        ${Math.round(calculateTotal() * 1.16).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms reminder */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                  <p className="text-slate-300 text-xs leading-relaxed">
                    <strong className="text-white">Nota:</strong> Esta orden será guardada en nuestro sistema y enviada
                    al equipo de ventas. Los tiempos de entrega son: VPS nuevos (4h), escalamientos (1h), complementos
                    (6h) en horario de oficina L-V 9am-3pm y 4pm-6pm.
                  </p>
                </div>
              </>
            )}
          </CardContent>

          {!saveSuccess && (
            <CardFooter className="border-t border-slate-800 flex gap-2 p-3 flex-shrink-0">
              <Button
                onClick={() => handleConfirmSend("whatsapp")}
                disabled={isSaving}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9 text-xs"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <MessageCircle className="w-4 h-4 mr-1" />
                )}
                Confirmar WhatsApp
              </Button>
              <Button
                onClick={() => handleConfirmSend("email")}
                disabled={isSaving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9 text-xs"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Mail className="w-4 h-4 mr-1" />}
                Confirmar Email
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}
