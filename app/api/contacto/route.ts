import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // In production, integrate with an email service like Resend, SendGrid, or Nodemailer
    // For now, we'll just log the data and return success
    console.log("[v0] Contact form submission:", formData)

    // Example email content
    const emailContent = `
      Nueva solicitud de contacto de Titanocloud

      Información del Cliente:
      - Nombre: ${formData.nombre}
      - Usuario: ${formData.usuario}
      - NIT/Registro Tributario: ${formData.nit}
      - Teléfono: ${formData.telefono}
      - Correo: ${formData.correo}
      - Correo Alternativo: ${formData.correoAlternativo || "N/A"}
      - País: ${formData.pais}
      - Ciudad: ${formData.ciudad}
      - Dirección: ${formData.direccion}
      
      Mensaje:
      ${formData.mensaje || "Sin mensaje adicional"}
    `

    // TODO: Send email to datacenter@titanocloud.com using your preferred email service
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'no-reply@titanocloud.com',
    //   to: 'datacenter@titanocloud.com',
    //   subject: `Nueva solicitud de contacto - ${formData.nombre}`,
    //   text: emailContent,
    // })

    console.log("[v0] Email content that would be sent:", emailContent)

    return NextResponse.json({ success: true, message: "Formulario enviado correctamente" })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, message: "Error al procesar la solicitud" }, { status: 500 })
  }
}
