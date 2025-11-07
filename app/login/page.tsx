"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === "admin" && password === "Admin*2020") {
      localStorage.setItem("isAuthenticated", "true")

      // Get the returnTo parameter from URL
      const params = new URLSearchParams(window.location.search)
      const returnTo = params.get("returnTo") || "/dashboard"

      router.push(returnTo)
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-slate-950 items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
        <Image
          src="/futuristic-cyborg-robot-standing-in-server-room-wi.jpg"
          alt="Futuristic Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-white">
            AI <span className="text-cyan-400">+</span> Innovation <span className="text-cyan-400">+</span> Development{" "}
            <span className="text-cyan-400">=</span>
          </h1>
          <h2 className="text-6xl font-bold text-cyan-400 mb-8">Building the Next Era of Cloud Technology</h2>
          <div className="flex items-center gap-3 mt-12">
            <span className="text-slate-400">Powered by</span>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-logoWHI-U4g3b0uwpZ2MefpUxtA4JDuq0yC2Fh.png"
              alt="Titano Cloud Developer"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
            <p className="mt-2 text-gray-600">Por favor inicia sesión para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese el usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese la contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Iniciar sesión
            </Button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ¿Olvidó la contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
