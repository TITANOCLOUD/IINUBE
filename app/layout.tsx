import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssistantWidget } from "@/components/assistant-widget"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IINUBE CLOUD - TIENDA DE VPS CLOUD",
  description:
    "IINUBE CLOUD ofrece VPS, Bare Metal, Kubernetes y hosting cloud en México. Precios en pesos mexicanos, soporte 24/7 en español.",
  generator: "IINUBE",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    "cloud",
    "VPS",
    "bare metal",
    "kubernetes",
    "infraestructura",
    "hosting México",
    "servidores dedicados",
    "VPS México",
    "hosting en pesos",
    "iinube",
    "IINUBE",
  ],
  authors: [{ name: "IINUBE" }],
  openGraph: {
    title: "IINUBE CLOUD - TIENDA DE VPS CLOUD",
    description: "VPS, Bare Metal y Kubernetes en México. Precios en pesos mexicanos.",
    type: "website",
    locale: "es_MX",
    siteName: "IINUBE",
  },
  twitter: {
    card: "summary_large_image",
    title: "IINUBE CLOUD - TIENDA DE VPS CLOUD",
    description: "VPS, Bare Metal y Kubernetes en México. Precios en pesos mexicanos.",
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
        <Header />
        {children}
        <Footer />
        <AssistantWidget />
        <Analytics />
      </body>
    </html>
  )
}
