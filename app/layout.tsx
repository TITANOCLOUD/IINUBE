import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssistantWidget } from "@/components/assistant-widget"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IINUBE CLOUD - TIENDA DE VPS CLOUD | Hosting Empresarial México y LATAM",
  description:
    "IINUBECLOUD INTERNATIONAL ofrece cloud hosting, VPS, bare metal, Ceph y soporte 24/7 en español para México, LATAM y global. Servidores NVMe, Kubernetes, GPU y soluciones cloud con IA integrada.",
  generator: "IINUBE",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    // Keywords Generales de Hosting
    "web hosting",
    "alojamiento web",
    "hosting empresarial",
    "enterprise web hosting",
    "cloud hosting",
    "alojamiento en la nube",
    "VPS hosting",
    "alojamiento VPS",
    "servidor dedicado",
    "dedicated server hosting",
    "bare metal hosting",
    "alojamiento bare metal",
    "cluster hosting",
    "alojamiento en clúster",
    "hosting compartido",
    "shared hosting",
    "hosting gestionado",
    "managed hosting",
    "alojamiento revendedor",
    "reseller hosting",
    "hosting ilimitado",
    "unlimited hosting",
    "hosting WordPress",
    "alojamiento WordPress",
    "hosting cPanel",
    "alojamiento con cPanel",
    "hosting Plesk",
    "alojamiento Plesk",
    "hosting SSD",
    "alojamiento con discos SSD",
    "NVMe hosting",
    "alojamiento con NVMe",
    "hosting para ecommerce",
    "alojamiento para comercio electrónico",
    "hosting para startups",
    "alojamiento para startups",
    "hosting profesional",
    "professional hosting",
    "hosting empresarial México",
    "business hosting Mexico",

    // Hosting Avanzado y de Infraestructura
    "bare metal servers",
    "servidores bare metal",
    "bare metal cloud",
    "nube bare metal",
    "Ceph cluster hosting",
    "alojamiento con clúster Ceph",
    "Proxmox hosting",
    "alojamiento con Proxmox",
    "Kubernetes hosting",
    "alojamiento Kubernetes",
    "container hosting",
    "alojamiento en contenedores",
    "docker hosting",
    "alojamiento Docker",
    "high performance hosting",
    "alojamiento de alto rendimiento",
    "GPU hosting",
    "alojamiento con GPU",
    "HPC hosting",
    "alojamiento de alto cómputo",
    "AI hosting",
    "alojamiento para inteligencia artificial",
    "machine learning hosting",
    "alojamiento para aprendizaje automático",
    "big data hosting",
    "alojamiento para Big Data",
    "edge hosting",
    "alojamiento perimetral",
    "hybrid cloud hosting",
    "alojamiento en nube híbrida",
    "multi-cloud hosting",
    "alojamiento multinube",
    "cloud native hosting",
    "alojamiento cloud native",
    "cluster redundant hosting",
    "alojamiento redundante",
    "hosting con balanceo de carga",
    "load-balanced hosting",

    // Competidores y Nubes Globales
    "AWS hosting",
    "Amazon Web Services hosting",
    "AWS bare metal servers",
    "servidores bare metal AWS",
    "AWS EC2 hosting",
    "alojamiento EC2",
    "AWS Cloud comparison",
    "comparación AWS Cloud",
    "Azure hosting",
    "Microsoft Azure hosting",
    "Azure bare metal servers",
    "servidores bare metal Azure",
    "Azure VM hosting",
    "alojamiento Azure VM",
    "Oracle Cloud hosting",
    "alojamiento Oracle Cloud",
    "Oracle Cloud Infrastructure",
    "OCI",
    "infraestructura Oracle Cloud",
    "Alibaba Cloud hosting",
    "alojamiento Alibaba Cloud",
    "Alibaba ECS hosting",
    "servidores ECS Alibaba",
    "Huawei Cloud hosting",
    "alojamiento Huawei Cloud",
    "Huawei bare metal cloud",
    "servidores bare metal Huawei Cloud",
    "OVHcloud hosting",
    "alojamiento OVHcloud",
    "OVHcloud bare metal",
    "servidores bare metal OVHcloud",
    "OVHcloud Public Cloud",
    "nube pública OVHcloud",
    "OVHcloud VPS",
    "VPS OVHcloud",
    "OVHcloud storage hosting",
    "hosting de almacenamiento OVHcloud",

    // Keywords Comparativas
    "AWS vs Azure hosting",
    "AWS vs Google Cloud",
    "AWS vs Oracle Cloud",
    "AWS vs OVHcloud",
    "Azure vs Oracle Cloud",
    "Azure vs OVHcloud",
    "Oracle Cloud vs AWS",
    "Oracle Cloud vs Azure",
    "OVHcloud vs AWS",
    "OVHcloud vs Azure",

    // Seguridad, Cumplimiento y Recuperación
    "hosting seguro",
    "secure web hosting",
    "DDoS protected hosting",
    "alojamiento con protección DDoS",
    "hosting con firewall avanzado",
    "advanced firewall hosting",
    "anti ransomware hosting",
    "alojamiento anti ransomware",
    "backup hosting",
    "alojamiento con respaldo",
    "hosting con snapshots",
    "alojamiento con instantáneas",
    "disaster recovery hosting",
    "alojamiento con recuperación ante desastres",
    "hosting con SLA garantizado",
    "SLA guaranteed hosting",
    "hosting ISO 27001 compliant",
    "alojamiento conforme a ISO 27001",
    "GDPR compliant hosting",
    "alojamiento conforme a GDPR",
    "SOC2 compliant hosting",
    "alojamiento con cumplimiento SOC2",
    "business continuity hosting",
    "continuidad de negocio en la nube",

    // Keywords por Región
    "cloud hosting México",
    "alojamiento en la nube México",
    "hosting LATAM",
    "alojamiento Latinoamérica",
    "data center México",
    "centro de datos México",
    "VPS cloud México",
    "VPS en la nube México",
    "bare metal México",
    "servidores bare metal México",
    "hosting Colombia",
    "alojamiento Colombia",
    "hosting Chile",
    "alojamiento Chile",
    "hosting Argentina",
    "alojamiento Argentina",
    "hosting Perú",
    "alojamiento Perú",
    "cloud hosting Spain",
    "alojamiento en la nube España",
    "cloud hosting Latin America",
    "hosting cloud en América Latina",
    "hosting con soporte en español",
    "hosting with Spanish support",
    "low latency cloud Mexico",
    "nube de baja latencia México",
    "cloud provider LATAM",
    "proveedor de nube LATAM",
    "cloud edge Latin America",
    "nube edge Latinoamérica",

    // Keywords de IA, Innovación y DevOps
    "AI-powered hosting",
    "alojamiento impulsado por IA",
    "hosting con inteligencia artificial",
    "AI hosting en español",
    "machine learning servers",
    "servidores para machine learning",
    "hosting DevOps ready",
    "alojamiento preparado para DevOps",
    "container orchestration hosting",
    "alojamiento con orquestación",
    "CI/CD hosting",
    "alojamiento con pipelines CI/CD",
    "automation hosting",
    "alojamiento automatizado",
    "infrastructure as code hosting",
    "alojamiento con IaC",
    "observability hosting",
    "alojamiento con monitoreo avanzado",
    "hosting con Grafana",
    "hosting con visualización Grafana",
    "Ceph storage hosting",
    "alojamiento Ceph",
    "cluster NVMe Ceph hosting",
    "alojamiento NVMe Ceph",

    // Keywords Long-Tail
    "mejores proveedores de cloud hosting en Latinoamérica",
    "hosting con servidores NVMe dedicados",
    "alternativas a AWS y Azure en México",
    "cloud local con soporte 24/7 en español",
    "hosting Ceph con respaldo automático",
    "servidores bare metal con SLA garantizado",
    "cloud híbrida con VMware y Ceph",
    "comparativa entre AWS Azure OVHcloud y Oracle",
    "mejores clústeres Ceph administrados",
    "servidores GPU cloud para IA",
    "hosting con firewall backup y monitoreo",
    "hosting multinube para PyMES",
    "hosting con facturación flexible y escalable",
    "servidores dedicados en México y LATAM",
    "iinube",
    "IINUBE",
    "IINUBECLOUD",
    "IINUBECLOUD INTERNATIONAL",
  ],
  authors: [{ name: "IINUBECLOUD INTERNATIONAL" }],
  openGraph: {
    title: "IINUBE CLOUD - TIENDA DE VPS CLOUD | Hosting Empresarial México",
    description:
      "Soluciones cloud con inteligencia artificial. VPS, Bare Metal, Ceph, Kubernetes y GPU con soporte 24/7 en español. Precios en pesos mexicanos.",
    url: "https://iinube.com",
    siteName: "IINUBECLOUD INTERNATIONAL",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://iinube.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IINUBE CLOUD - Infraestructura Cloud Empresarial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IINUBE CLOUD - TIENDA DE VPS CLOUD",
    description:
      "Hosting cloud optimizado con IA: VPS, servidores NVMe, Ceph, GPU y Kubernetes con soporte 24/7 en español. Precios en pesos mexicanos.",
    images: ["https://iinube.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://iinube.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-5JM3RZ2CLE" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5JM3RZ2CLE');
            `,
          }}
        />
        <Header />
        {children}
        <Footer />
        <AssistantWidget />
        <Analytics />
      </body>
    </html>
  )
}
