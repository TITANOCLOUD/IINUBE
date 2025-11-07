export interface VPSPlan {
  id: string
  name: string
  subtitle: string
  cpu: number
  ram: number
  storage: number
  bandwidth: string
  price: number
  setupFee: string
  recommended?: boolean
  processor: string
  features: string[]
}

export const vpsPlans: VPSPlan[] = [
  {
    id: "basic",
    name: "VPSi BASIC",
    subtitle: "Ideal para proyectos pequeños",
    cpu: 8,
    ram: 4,
    storage: 80,
    bandwidth: "Hasta 2 Gbps",
    price: 1590,
    setupFee: "Gratis",
    processor: "DUAL INTEL XEON GOLD 6542Y",
    features: [
      "4GB RAM DDR5",
      "8v CPU DUAL INTEL XEON GOLD 6542Y",
      "80GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "inter",
    name: "VPSi INTER",
    subtitle: "Para aplicaciones en crecimiento",
    cpu: 8,
    ram: 8,
    storage: 180,
    bandwidth: "Hasta 2 Gbps",
    price: 2690,
    setupFee: "Gratis",
    processor: "DUAL INTEL XEON GOLD 6542Y",
    features: [
      "8GB RAM DDR5",
      "8v CPU DUAL INTEL XEON GOLD 6542Y",
      "180GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "pro",
    name: "VPSi PRO",
    subtitle: "Alto rendimiento",
    cpu: 8,
    ram: 12,
    storage: 280,
    bandwidth: "Hasta 2 Gbps",
    price: 3790,
    setupFee: "Gratis",
    recommended: true,
    processor: "INTEL XEON GOLD 6542Y",
    features: [
      "12GB RAM DDR5",
      "8v CPU INTEL XEON GOLD 6542Y",
      "280GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "plus",
    name: "VPSi PLUS",
    subtitle: "Máxima potencia",
    cpu: 8,
    ram: 16,
    storage: 380,
    bandwidth: "Hasta 2 Gbps",
    price: 4890,
    setupFee: "Gratis",
    processor: "INTEL XEON GOLD 6542Y",
    features: [
      "16GB RAM DDR5",
      "8v CPU INTEL XEON GOLD 6542Y",
      "380GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "prime",
    name: "VPSi PRIME",
    subtitle: "Nivel empresarial",
    cpu: 16,
    ram: 24,
    storage: 480,
    bandwidth: "Hasta 2 Gbps",
    price: 5990,
    setupFee: "Gratis",
    processor: "DUAL INTEL XEON GOLD 6542Y",
    features: [
      "24GB RAM DDR5",
      "16v CPU DUAL INTEL XEON GOLD 6542Y",
      "480GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "xprime",
    name: "VPSi XPRIME",
    subtitle: "Potencia superior",
    cpu: 16,
    ram: 32,
    storage: 580,
    bandwidth: "Hasta 2 Gbps",
    price: 6990,
    setupFee: "Gratis",
    processor: "DUAL INTEL XEON GOLD 6542Y",
    features: [
      "32GB RAM DDR5",
      "16v CPU DUAL INTEL XEON GOLD 6542Y",
      "580GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "zprime",
    name: "VPSi ZPRIME",
    subtitle: "Extremo rendimiento",
    cpu: 32,
    ram: 64,
    storage: 980,
    bandwidth: "Hasta 2 Gbps",
    price: 10990,
    setupFee: "Gratis",
    processor: "INTEL XEON GOLD 6542Y",
    features: [
      "64GB RAM DDR5",
      "32v CPU INTEL XEON GOLD 6542Y",
      "980GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
  {
    id: "colossal",
    name: "VPSi COLOSSAL",
    subtitle: "El titán supremo",
    cpu: 32,
    ram: 128,
    storage: 1580,
    bandwidth: "Hasta 2 Gbps",
    price: 15990,
    setupFee: "Gratis",
    processor: "DUAL INTEL XEON GOLD 6542Y",
    features: [
      "128GB RAM DDR5",
      "32v CPU DUAL INTEL XEON GOLD 6542Y",
      "1,580GB SSD NVME",
      "UPLINK HASTA 2 GBPS",
      "DNS 24HRS",
      "1 IP FIJA IPV4 E IPV6",
      "99% UPTIME",
      "TRANSFERENCIA ILIMITADA",
      "ALTA DISPONIBILIDAD",
    ],
  },
]

// Helper function to get featured plans for home page (first 3)
export const getFeaturedVPSPlans = () => vpsPlans.slice(0, 3)

// Helper function to get all plans
export const getAllVPSPlans = () => vpsPlans

// Helper function to get plan by ID
export const getVPSPlanById = (id: string) => vpsPlans.find((plan) => plan.id === id)
