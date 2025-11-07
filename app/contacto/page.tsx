"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    nit: "",
    telefono: "",
    correo: "",
    correoAlternativo: "",
    pais: "",
    ciudad: "",
    direccion: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          nombre: "",
          usuario: "",
          nit: "",
          telefono: "",
          correo: "",
          correoAlternativo: "",
          pais: "",
          ciudad: "",
          direccion: "",
          mensaje: "",
        })
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/30">
          <CardHeader className="text-center">
            <CheckCircle2 className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
            <CardTitle className="text-3xl text-white">¡Mensaje Enviado!</CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Gracias por contactarnos. Nuestro equipo se comunicará contigo pronto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsSuccess(false)} className="w-full bg-cyan-500 hover:bg-cyan-600">
              Enviar otro mensaje
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 rounded-full mb-6">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold">Formulario de Contacto</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            ¿Estás interesado en que <span className="text-cyan-400">te contactemos?</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo para ayudarte con tu proyecto
          </p>
        </div>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Información de Contacto</CardTitle>
            <CardDescription className="text-slate-300">
              Proporciona tus datos y te contactaremos lo antes posible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-white">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usuario" className="text-white">
                    Usuario *
                  </Label>
                  <Input
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="juanperez"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nit" className="text-white">
                    NIT o Registro Tributario *
                  </Label>
                  <Input
                    id="nit"
                    name="nit"
                    value={formData.nit}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="123456789-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-white">
                    Número de Contacto *
                  </Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="correo" className="text-white">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="correo@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correoAlternativo" className="text-white">
                    Correo Alternativo
                  </Label>
                  <Input
                    id="correoAlternativo"
                    name="correoAlternativo"
                    type="email"
                    value={formData.correoAlternativo}
                    onChange={handleChange}
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="alternativo@empresa.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pais" className="text-white">
                    País *
                  </Label>
                  <Input
                    id="pais"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="México"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad" className="text-white">
                    Ciudad *
                  </Label>
                  <Input
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                    className="bg-slate-950 border-slate-700 text-white"
                    placeholder="Ciudad de México"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion" className="text-white">
                  Dirección *
                </Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="bg-slate-950 border-slate-700 text-white"
                  placeholder="Calle Principal #123, Colonia Centro"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje" className="text-white">
                  Mensaje Adicional (Opcional)
                </Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="bg-slate-950 border-slate-700 text-white"
                  placeholder="Cuéntanos sobre tu proyecto o necesidades específicas..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Send className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Solicitud
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
