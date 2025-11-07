import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Iniciar Sesión | Titanocloud",
  description: "Acceso a la plataforma de administración de Titanocloud",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
