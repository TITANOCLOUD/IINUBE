"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Server,
  Cpu,
  HardDrive,
  Network,
  ChevronDown,
  Zap,
  Database,
  Gamepad2,
  Filter,
  TrendingUp,
  Terminal,
  GitBranch,
  Check,
} from "lucide-react"
import { useState } from "react"

export default function BareMetalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [priceFilter, setPriceFilter] = useState<string>("all")

  const categories = [
    { id: "all", name: "Todos los Servidores", icon: Server, color: "cyan" },
    { id: "rise", name: "RISE - Entrada", icon: TrendingUp, color: "green" },
    { id: "advance", name: "Advance - Empresarial", icon: Zap, color: "blue" },
    { id: "scale", name: "Scale - Alto Rendimiento", icon: Cpu, color: "purple" },
    { id: "hgr", name: "High Grade - Enterprise", icon: Server, color: "orange" },
    { id: "storage", name: "Storage - Almacenamiento", icon: Database, color: "yellow" },
    { id: "game", name: "Game - Gaming", icon: Gamepad2, color: "pink" },
  ]

  const allServers = [
    // RISE Series
    {
      category: "rise",
      name: "RISE-S-1",
      cpu: "AMD Ryzen 7 9700X",
      cores: "8c/16t - 3.8GHz/5.5GHz",
      ram: "64 GB",
      storage: "2x512GB",
      bandwidth: "1 Gbps público",
      price: 61,
      status: "Próximamente",
    },
    {
      category: "rise",
      name: "RISE-1",
      cpu: "Intel Xeon-E 2386G",
      cores: "6c/12t - 3.5GHz/4.7GHz",
      ram: "32-128 GB",
      storage: "2x512GB hasta 2x512GB+2x6TB",
      bandwidth: "1 Gbps público, 1 Gbps privado",
      price: 64,
    },
    {
      category: "rise",
      name: "RISE-2",
      cpu: "Intel Xeon-E 2388G",
      cores: "8c/16t - 3.2GHz/4.6GHz",
      ram: "32-128 GB",
      storage: "2x512GB hasta 2x512GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 72,
    },
    {
      category: "rise",
      name: "Rise-Game-1",
      cpu: "AMD Ryzen 5 5600X",
      cores: "6c/12t - 3.7GHz/4.6GHz",
      ram: "32-64 GB",
      storage: "2x512GB",
      bandwidth: "250 Mbit/s (burst 1 Gbps) hasta 1 Gbps",
      price: 72,
    },
    {
      category: "rise",
      name: "RISE-S-2",
      cpu: "AMD Ryzen 7 9700X",
      cores: "8c/16t - 3.8GHz/5.5GHz",
      ram: "64 GB",
      storage: "2x512GB",
      bandwidth: "1 Gbps público, 1 Gbps privado",
      price: 72,
    },
    {
      category: "rise",
      name: "Rise-Game-2",
      cpu: "AMD Ryzen 7 5800X",
      cores: "8c/16t - 3.8GHz/4.7GHz",
      ram: "64-128 GB",
      storage: "2x960GB",
      bandwidth: "250 Mbit/s (burst 1 Gbps) hasta 1 Gbps",
      price: 100,
    },
    {
      category: "rise",
      name: "RISE-3",
      cpu: "AMD Ryzen 9 5900X",
      cores: "12c/24t - 3.7GHz/4.8GHz",
      ram: "32-128 GB",
      storage: "2x512GB hasta 2x512GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 102,
      popular: true,
    },
    {
      category: "rise",
      name: "RISE-M",
      cpu: "AMD RYZEN 9 9900X",
      cores: "12c/24t - 4.4GHz/5.6GHz",
      ram: "64 GB",
      storage: "2x512GB",
      bandwidth: "1 Gbps público, 1 Gbps privado",
      price: 106,
      badge: "Nuevo",
    },
    {
      category: "rise",
      name: "RISE-L",
      cpu: "AMD RYZEN 9 9950X",
      cores: "16c/32t - 4.3GHz/5.7GHz",
      ram: "128 GB",
      storage: "2x960GB",
      bandwidth: "1 Gbps público, 1 Gbps privado",
      price: 150,
      badge: "Nuevo",
      status: "Próximamente",
    },
    {
      category: "rise",
      name: "RISE-4",
      cpu: "AMD Epyc 7313",
      cores: "16c/32t - 3GHz/3.7GHz",
      ram: "64GB-1TB",
      storage: "2x960GB hasta 2x960GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 177,
    },
    {
      category: "rise",
      name: "RISE-STOR",
      cpu: "AMD Ryzen 7 Pro 3700",
      cores: "8c/16t - 3.6GHz/4.4GHz",
      ram: "32-128 GB",
      storage: "4x14TB hasta 6x14TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 183,
    },
    {
      category: "rise",
      name: "RISE-7",
      cpu: "AMD Epyc 7402",
      cores: "24c/48t - 2.8GHz/3.35GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 4x3.84TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 189,
      status: "Próximamente",
    },
    {
      category: "rise",
      name: "RISE-5",
      cpu: "AMD Epyc 7413",
      cores: "24c/48t - 2.65GHz/3.6GHz",
      ram: "128GB-1TB",
      storage: "2x960GB hasta 2x960GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 200,
    },
    {
      category: "rise",
      name: "RISE-8",
      cpu: "AMD Epyc 7532",
      cores: "32c/64t - 2.4GHz/3.3GHz",
      ram: "256GB-1TB",
      storage: "2x1.92TB hasta 4x3.84TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 211,
    },
    {
      category: "rise",
      name: "RISE-6",
      cpu: "Intel Xeon Gold 6312U",
      cores: "24c/48t - 2.4GHz/3.6GHz",
      ram: "128GB-1TB",
      storage: "2x960GB hasta 2x960GB+2x6TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 233,
    },
    {
      category: "rise",
      name: "RISE-9",
      cpu: "AMD Epyc 7642",
      cores: "48c/96t - 2.3GHz/3.6GHz",
      ram: "256GB-1TB",
      storage: "2x1.92TB hasta 4x3.84TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 255,
      badge: "Nuevo",
      status: "Próximamente",
    },
    {
      category: "rise",
      name: "RISE-XL",
      cpu: "AMD EPYC TURIN 9455",
      cores: "48c/96t - 3.15GHz/4.4GHz",
      ram: "128 GB",
      storage: "2x1.92TB",
      bandwidth: "1-3 Gbps público, 1-2 Gbps privado",
      price: 299,
      badge: "Nuevo",
    },

    // Advance Series
    {
      category: "advance",
      name: "Advance-1 2024",
      cpu: "AMD EPYC 4244P",
      cores: "6c/12t - 3.8GHz/5.1GHz",
      ram: "32-192 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 90,
    },
    {
      category: "advance",
      name: "Advance-1 2026",
      cpu: "AMD EPYC 4245P",
      cores: "6c/12t - 3.9GHz/5.4GHz",
      ram: "32-256 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 118,
    },
    {
      category: "advance",
      name: "Advance-2 2024",
      cpu: "AMD EPYC 4344P",
      cores: "8c/16t - 3.8GHz/5.3GHz",
      ram: "64-192 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 123,
    },
    {
      category: "advance",
      name: "Advance-2 2026",
      cpu: "AMD EPYC 4345P",
      cores: "8c/16t - 3.8GHz/5.5GHz",
      ram: "64-256 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 142,
    },
    {
      category: "advance",
      name: "Advance-3 2024",
      cpu: "AMD EPYC 4464P",
      cores: "12c/24t - 3.7GHz/5.4GHz",
      ram: "64-192 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 167.99,
    },
    {
      category: "advance",
      name: "Advance-3 2026",
      cpu: "AMD EPYC 4465P",
      cores: "12c/24t - 3.4GHz/5.4GHz",
      ram: "64-256 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 189,
    },
    {
      category: "advance",
      name: "Advance-4 2024",
      cpu: "AMD EPYC 4584PX",
      cores: "16c/32t - 4.2GHz/5.7GHz",
      ram: "64-192 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 202,
    },
    {
      category: "advance",
      name: "Advance-5 2024",
      cpu: "AMD EPYC 8224P",
      cores: "24c/48t - 2.55GHz/3GHz",
      ram: "96-576 GB",
      storage: "2x960GB hasta 8x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 224,
    },
    {
      category: "advance",
      name: "Advance-4 2026",
      cpu: "AMD EPYC 4585PX",
      cores: "16c/32t - 4.3GHz/5.7GHz",
      ram: "64-256 GB",
      storage: "2x960GB hasta 4x7.68TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 236,
    },

    // Storage Series
    {
      category: "storage",
      name: "Advance-STOR 2024",
      cpu: "AMD EPYC 4344P",
      cores: "8c/16t - 3.8GHz/5.3GHz",
      ram: "32-192 GB",
      storage: "2x22TB hasta 8x22TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 202,
    },
    {
      category: "storage",
      name: "Advance-STOR 2026",
      cpu: "AMD EPYC 4345P",
      cores: "8c/16t - 3.8GHz/5.5GHz",
      ram: "32-256 GB",
      storage: "2x24TB hasta 8x24TB",
      bandwidth: "1-5 Gbps público, 25 Gbps privado ilimitado",
      price: 236,
    },
    {
      category: "storage",
      name: "HGR-STOR-1",
      cpu: "Intel Xeon Gold 6554S",
      cores: "36c/72t - 2.2GHz/3GHz",
      ram: "128-768 GB",
      storage: "24x22TB hasta 36x22TB + 2x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1340.99,
    },

    // Scale Series
    {
      category: "scale",
      name: "Scale-i1 2024",
      cpu: "Intel Xeon Gold 6426Y",
      cores: "16c/32t - 2.5GHz/4.1GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 413,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a1 2024",
      cpu: "AMD EPYC GENOA 9124",
      cores: "16c/32t - 3GHz/3.6GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 413,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-i2 2024",
      cpu: "Intel Xeon Gold 6442Y",
      cores: "24c/48t - 2.6GHz/4GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 449,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a2 2024",
      cpu: "AMD EPYC GENOA 9254",
      cores: "24c/48t - 2.9GHz/3.9GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 449,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a1 2026",
      cpu: "AMD EPYC 9135",
      cores: "16c/32t - 3.65GHz/4.3GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 461,
    },
    {
      category: "scale",
      name: "Scale-i3 2024",
      cpu: "Intel Xeon Gold 6438M",
      cores: "32c/64t - 2.2GHz/3.9GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 484,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a3 2024",
      cpu: "AMD EPYC GENOA 9354",
      cores: "32c/64t - 3.25GHz/3.75GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 496,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a2 2026",
      cpu: "AMD EPYC 9255",
      cores: "24c/48t - 3.2GHz/4.3GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 508,
    },
    {
      category: "scale",
      name: "Scale-a4 2024",
      cpu: "AMD EPYC GENOA 9454",
      cores: "48c/96t - 2.75GHz/3.65GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 531,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a3 2026",
      cpu: "AMD EPYC 9355",
      cores: "32c/64t - 3.55GHz/4.4GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 555,
    },
    {
      category: "scale",
      name: "Scale-a5 2024",
      cpu: "AMD EPYC GENOA 9554",
      cores: "64c/128t - 3.1GHz/3.75GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 590,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a4 2026",
      cpu: "AMD EPYC 9455",
      cores: "48c/96t - 3.15GHz/4.4GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 638,
    },
    {
      category: "scale",
      name: "Scale-a6 2024",
      cpu: "AMD EPYC GENOA 9654",
      cores: "96c/192t - 2.4GHz/3.55GHz",
      ram: "128GB-1TB",
      storage: "2x1.92TB hasta 6x7.68TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 685,
      badge: "Toronto",
    },
    {
      category: "scale",
      name: "Scale-a5 2026",
      cpu: "AMD EPYC 9555",
      cores: "64c/128t - 3.2GHz/4.4GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 708,
    },
    {
      category: "scale",
      name: "Scale-a6 2026",
      cpu: "AMD EPYC 9655",
      cores: "96c/192t - 2.6GHz/4.5GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 826,
    },
    {
      category: "scale",
      name: "Scale-a7 2026",
      cpu: "AMD EPYC TURIN 9755",
      cores: "128c/256t - 2.7GHz/4.1GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 956,
    },
    {
      category: "scale",
      name: "Scale-a8 2026",
      cpu: "AMD EPYC TURIN 9965",
      cores: "192c/384t - 2.25GHz/3.7GHz",
      ram: "128GB-3TB",
      storage: "2x1.92TB hasta 6x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1027,
    },
    {
      category: "scale",
      name: "Scale-GPU-1 2024",
      cpu: "AMD EPYC GENOA 9354",
      cores: "32c/64t - 3.25GHz/3.8GHz",
      ram: "192GB-1.125TB",
      storage: "2x1.92TB hasta 2x7.68TB",
      bandwidth: "5-25 Gbps público, 50 Gbps privado",
      price: 1145,
      status: "Próximamente",
    },
    {
      category: "scale",
      name: "Scale-GPU-2 2024",
      cpu: "AMD EPYC GENOA 9454",
      cores: "48c/96t - 2.75GHz/3.8GHz",
      ram: "192GB-1.125TB",
      storage: "2x1.92TB hasta 2x7.68TB",
      bandwidth: "5-25 Gbps público, 50 Gbps privado",
      price: 1180,
      status: "Próximamente",
    },
    {
      category: "scale",
      name: "Scale-GPU-3 2024",
      cpu: "AMD EPYC GENOA 9554",
      cores: "64c/128t - 3.1GHz/3.75GHz",
      ram: "192GB-1.125TB",
      storage: "2x1.92TB hasta 2x7.68TB",
      bandwidth: "5-25 Gbps público, 50 Gbps privado",
      price: 1216,
      status: "Próximamente",
    },

    // High Grade Series
    {
      category: "hgr",
      name: "HGR-HCI-i1",
      cpu: "Dual Intel Xeon Gold 5515+",
      cores: "2x8c/2x16t - 3.2GHz/3.6GHz",
      ram: "256GB-1.5TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 949.99,
    },
    {
      category: "hgr",
      name: "HGR-HCI-i2",
      cpu: "Dual Intel Xeon Gold 6526Y",
      cores: "2x16c/2x32t - 2.8GHz/3.5GHz",
      ram: "256GB-1.5TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1038.99,
    },
    {
      category: "hgr",
      name: "HGR-SDS-1",
      cpu: "Dual Intel Xeon Gold 5515+",
      cores: "2x8c/2x16t - 3.2GHz/3.6GHz",
      ram: "256GB-1.5TB",
      storage: "6x7.68TB hasta 24x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1116.99,
    },
    {
      category: "hgr",
      name: "HGR-HCI-a1",
      cpu: "Dual AMD Epyc 9254",
      cores: "2x24c/2x48t - 2.9GHz/3.9GHz",
      ram: "256GB-2.25TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1116.99,
    },
    {
      category: "hgr",
      name: "HGR-HCI-i3",
      cpu: "Dual Intel Xeon Gold 6542Y",
      cores: "2x24c/2x48t - 2.9GHz/3.6GHz",
      ram: "128GB-1TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1116.99,
    },
    {
      category: "hgr",
      name: "HGR-HCI-i4",
      cpu: "Dual Intel Xeon Gold 6554S",
      cores: "2x36c/2x72t - 2.2GHz/3GHz",
      ram: "128GB-1TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1206.99,
    },
    {
      category: "hgr",
      name: "HGR-SAP-1",
      cpu: "Dual Intel Xeon Gold 6226R",
      cores: "2x16c/2x32t - 2.9GHz/3.9GHz",
      ram: "192-384 GB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-10 Gbps público, 50 Gbps privado",
      price: 1209.99,
    },
    {
      category: "hgr",
      name: "HGR-HCI-a2",
      cpu: "Dual AMD Epyc 9354",
      cores: "2x32c/2x64t - 3.25GHz/3.8GHz",
      ram: "384GB-2.25TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1273.99,
      badge: "Toronto",
    },
    {
      category: "hgr",
      name: "HGR-SDS-2",
      cpu: "Dual Intel Xeon Gold 6542Y",
      cores: "2x24c/2x48t - 2.9GHz/3.6GHz",
      ram: "256GB-1.5TB",
      storage: "6x7.68TB hasta 24x15.36TB",
      bandwidth: "1-25 Gbps público, 50 Gbps privado",
      price: 1284.99,
    },
    {
      category: "hgr",
      name: "HGR-SAP-2",
      cpu: "Dual Intel Xeon Gold 6242R",
      cores: "2x20c/2x40t - 3.1GHz/4.1GHz",
      ram: "384-768 GB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-10 Gbps público, 50 Gbps privado",
      price: 1340.99,
    },
    {
      category: "hgr",
      name: "HGR-SAP-3",
      cpu: "Dual Intel Xeon Gold 6248R",
      cores: "2x24c/2x48t - 3GHz/4GHz",
      ram: "768GB-1.5TB",
      storage: "6x3.84TB hasta 24x3.84TB",
      bandwidth: "1-10 Gbps público, 50 Gbps privado",
      price: 1472.99,
    },
    {
      category: "hgr",
      name: "HGR-AI-2",
      cpu: "Dual AMD Epyc 9354",
      cores: "2x32c/2x64t - 3.25GHz/3.8GHz",
      ram: "384GB-2.25TB",
      storage: "2x3.84TB hasta 4x15.36TB",
      bandwidth: "10-25 Gbps público, 100 Gbps privado",
      price: 3317.99,
      status: "Próximamente",
    },

    // Game Series
    {
      category: "game",
      name: "Game-1 2026",
      cpu: "AMD RYZEN 7 9800X3D",
      cores: "8c/16t - 4.7GHz/5.2GHz",
      ram: "64-256 GB",
      storage: "2x960GB",
      bandwidth: "1 Gbps público",
      price: 154,
    },
    {
      category: "game",
      name: "Game-2 2026",
      cpu: "AMD RYZEN 9 9950X3D",
      cores: "16c/32t - 4.3GHz/5.7GHz",
      ram: "64-256 GB",
      storage: "2x960GB",
      bandwidth: "1 Gbps público",
      price: 201,
    },
  ]

  const filteredServers = allServers.filter((server) => {
    const categoryMatch = activeCategory === "all" || server.category === activeCategory
    const priceMatch =
      priceFilter === "all" ||
      (priceFilter === "budget" && server.price < 150) ||
      (priceFilter === "mid" && server.price >= 150 && server.price < 500) ||
      (priceFilter === "high" && server.price >= 500 && server.price < 1000) ||
      (priceFilter === "enterprise" && server.price >= 1000)
    return categoryMatch && priceMatch
  })

  const faqs = [
    {
      question: "¿Cuánto cuesta un servidor dedicado?",
      answer:
        "El precio de un servidor dedicado depende de diferentes factores como el tipo de servidor, las características del hardware y el sistema operativo. Por ejemplo, un servidor puede ser monoprocesador o tener un doble procesador. Le recomendamos que elija un modelo que disponga de los recursos de hardware necesarios para su proyecto en términos de CPU, RAM, espacio de almacenamiento y red. La cantidad de memoria RAM, el almacenamiento y la potencia de procesamiento necesarios determinarán el coste total de la máquina. Nuestros servidores comienzan desde $61/mes para la serie RISE hasta $3,317/mes para servidores de alto rendimiento HGR con IA.",
    },
    {
      question: "¿Qué sistemas operativos están disponibles?",
      answer:
        "Los servidores dedicados de SATURNO ponen a su disposición una amplia selección de sistemas operativos open source gratuitos, así como licencias de pago para los sistemas más populares. Incluimos distribuciones Linux como Ubuntu, CentOS, Fedora y Debian de forma gratuita. También ofrecemos licencias para Windows Server con costos adicionales según la versión y características requeridas.",
    },
    {
      question: "¿Qué es un servidor Bare Metal?",
      answer:
        "Un servidor Bare Metal es un servidor físico dedicado exclusivamente para un solo cliente. A diferencia de los VPS, no hay virtualización, lo que significa que obtienes acceso directo al hardware completo sin compartir recursos. Esto proporciona el máximo rendimiento, seguridad y control total sobre la configuración del servidor.",
    },
    {
      question: "¿Cuál es la diferencia entre las series?",
      answer:
        "RISE es nuestra línea de entrada con excelente relación precio-rendimiento ($61-$299/mes). Advance ofrece procesadores AMD EPYC con 25 Gbps de red privada ($90-$236/mes). Scale está diseñado para cargas intensivas con hasta 192 cores ($413-$1,216/mes). High Grade (HGR) son servidores enterprise con doble procesador para HCI, SDS, SAP y AI ($949-$3,317/mes). Storage está optimizado para almacenamiento masivo hasta 36x22TB. Game ofrece procesadores X3D optimizados para gaming y streaming.",
    },
    {
      question: "¿Puedo actualizar mi servidor después?",
      answer:
        "Sí, ofrecemos opciones de actualización de RAM y almacenamiento en la mayoría de nuestros servidores. Para cambios de CPU o arquitectura, podemos ayudarte a migrar a un servidor más potente con mínimo tiempo de inactividad. Nuestro equipo técnico te asistirá en todo el proceso de migración.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 px-6 py-3 rounded-full mb-6">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold">Servidores Dedicados Bare Metal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Máximo Rendimiento Dedicado
          </h1>
          {/* Updated description */}
          <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Desarrollamos una infraestructura cloud de alto rendimiento que combina potencia, estabilidad y flexibilidad
            para entornos empresariales modernos. Nuestra plataforma está optimizada para cargas críticas, escalamiento
            dinámico y una gestión eficiente de recursos, ofreciendo una base tecnológica sólida que impulsa la
            innovación y la continuidad operativa. Titanocloud no solo aloja tus sistemas: los acelera, los protege y
            los hace evolucionar con tecnología de nueva generación.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>6 Categorías Disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
              <span>70+ Configuraciones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Desde 6 hasta 192 Cores</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  isActive
                    ? `bg-${cat.color}-500 text-white shadow-lg shadow-${cat.color}-500/50`
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <Filter className="w-5 h-5 text-slate-400" />
          <div className="flex gap-2">
            {[
              { id: "all", label: "Todos los Precios" },
              { id: "budget", label: "< $150" },
              { id: "mid", label: "$150 - $500" },
              { id: "high", label: "$500 - $1000" },
              { id: "enterprise", label: "> $1000" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setPriceFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  priceFilter === filter.id
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{filteredServers.length} Servidores Disponibles</h2>
          <p className="text-slate-400">
            {activeCategory === "all"
              ? "Mostrando todas las categorías"
              : `Categoría: ${categories.find((c) => c.id === activeCategory)?.name}`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServers.map((server, index) => {
            const categoryColor = categories.find((c) => c.id === server.category)?.color || "cyan"
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-${categoryColor}-500/50 transition-all hover:shadow-lg hover:shadow-${categoryColor}-500/20 ${
                  server.popular ? "ring-2 ring-cyan-500" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg text-white">{server.name}</CardTitle>
                    {(server.badge || server.popular || server.status) && (
                      <div className="flex flex-col gap-1">
                        {server.popular && (
                          <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full font-bold">TOP</span>
                        )}
                        {server.badge && (
                          <span
                            className={`text-xs bg-${categoryColor}-500 text-white px-2 py-1 rounded-full font-bold`}
                          >
                            {server.badge}
                          </span>
                        )}
                        {server.status && (
                          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-bold">
                            {server.status}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-slate-400 text-sm">{server.cpu}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pb-3">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-300">
                      <Cpu className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{server.cores}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-300">
                      <Server className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{server.ram}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-300">
                      <HardDrive className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{server.storage}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-300">
                      <Network className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{server.bandwidth}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">${server.price}</span>
                      <span className="text-slate-400 text-sm">/mes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    className={`w-full ${
                      server.popular
                        ? "bg-cyan-500 hover:bg-cyan-600"
                        : `bg-slate-800 hover:bg-${categoryColor}-500 text-white`
                    } ${server.status ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!!server.status}
                  >
                    <a href={server.status ? undefined : "/contacto"}>{server.status || "Configurar"}</a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Todo lo que necesitas saber sobre servidores dedicados</p>
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

      {/* IAC Section */}
      <section id="iac" className="container mx-auto px-4 py-20 bg-slate-950/50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Infrastructure as Code</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Automatiza tu infraestructura con las mejores herramientas</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <Terminal className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Terraform</CardTitle>
              <CardDescription className="text-slate-400">Provisión declarativa de infraestructura</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Módulos pre-configurados
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> State management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Multi-cloud
                </li>
              </ul>
              <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600">Ver Documentación</Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <GitBranch className="w-12 h-12 text-cyan-400 mb-4" />
              <CardTitle className="text-white">Ansible</CardTitle>
              <CardDescription className="text-slate-400">Automatización de configuración</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Playbooks listos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Gestión de inventario
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" /> Idempotencia
                </li>
              </ul>
              <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600">Ver Documentación</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4 text-white">¿Necesitas ayuda para elegir?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Nuestro equipo de expertos puede ayudarte a encontrar el servidor perfecto para tu proyecto
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
              Hablar con un Experto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent px-8"
            >
              Comparar Servidores
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
