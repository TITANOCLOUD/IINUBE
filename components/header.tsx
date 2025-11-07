"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe, Menu, X } from "lucide-react"

export function Header() {
  const [currency, setCurrency] = useState("MXN")
  const [language, setLanguage] = useState("ES")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`border-b border-slate-800 bg-black sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 shadow-lg shadow-[#00c4cc]/10" : "py-8"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Logo className="transition-all duration-300" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 text-white hover:text-[#00c4cc] transition-colors text-base font-medium">
              <span>Bare Metal & VPS</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-black border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                href="/vps"
                className="block px-4 py-3 text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors first:rounded-t-lg"
              >
                VPS
              </Link>
              <Link
                href="/bare-metal"
                className="block px-4 py-3 text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors"
              >
                Bare Metal
              </Link>
              <Link
                href="/clusters"
                className="block px-4 py-3 text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors"
              >
                Clusters
              </Link>
              <Link
                href="/calculadora"
                className="block px-4 py-3 text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors last:rounded-b-lg"
              >
                Calculadora de VPS
              </Link>
            </div>
          </div>

          <Link
            href="/dominios"
            className="text-white hover:text-[#00c4cc] transition-colors text-base font-medium whitespace-nowrap"
          >
            Dominios, Hosting y Email
          </Link>

          <Link
            href="/nube-publica"
            className="text-white hover:text-[#00c4cc] transition-colors text-base font-medium whitespace-nowrap"
          >
            Nube Pública
          </Link>

          <Link
            href="/nube-privada"
            className="text-white hover:text-[#00c4cc] transition-colors text-base font-medium whitespace-nowrap"
          >
            Nube Privada Alojada
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-white hover:text-[#00c4cc] transition-colors text-base font-medium">
              <span>{currency}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-black border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setCurrency("MXN")}
                className="w-full px-4 py-2 text-left text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors first:rounded-t-lg"
              >
                MXN $
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className="w-full px-4 py-2 text-left text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors"
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className="w-full px-4 py-2 text-left text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors last:rounded-b-lg"
              >
                EUR €
              </button>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 text-white hover:text-[#00c4cc] transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-lg">{language === "ES" ? "🇪🇸" : "🇺🇸"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-black border border-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setLanguage("ES")}
                className="w-full px-4 py-2 text-left text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors flex items-center gap-2 first:rounded-t-lg"
              >
                <span className="text-lg">🇪🇸</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className="w-full px-4 py-2 text-left text-white hover:bg-slate-900 hover:text-[#00c4cc] transition-colors flex items-center gap-2 last:rounded-b-lg"
              >
                <span className="text-lg">🇺🇸</span>
                <span>English</span>
              </button>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-[#00c4cc] text-[#00c4cc] hover:bg-[#00c4cc] hover:text-black bg-transparent font-semibold"
          >
            <a href="/contacto">REGISTRAR</a>
          </Button>

          <Button asChild variant="default" className="bg-[#00c4cc] hover:bg-[#00b3b8] text-black font-semibold ml-2">
            <Link href="/login">INGRESAR</Link>
          </Button>
        </div>

        <button
          className="lg:hidden text-white hover:text-[#00c4cc]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-black">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/vps"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VPS
            </Link>
            <Link
              href="/bare-metal"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bare Metal
            </Link>
            <Link
              href="/clusters"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clusters
            </Link>
            <Link
              href="/calculadora"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculadora de VPS
            </Link>
            <Link
              href="/dominios"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dominios, Hosting y Email
            </Link>
            <Link
              href="/nube-publica"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nube Pública
            </Link>
            <Link
              href="/nube-privada"
              className="text-white hover:text-[#00c4cc] transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nube Privada Alojada
            </Link>
            <Button
              asChild
              variant="outline"
              className="border-[#00c4cc] text-[#00c4cc] hover:bg-[#00c4cc] hover:text-black bg-transparent w-full font-semibold"
            >
              <a href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                REGISTRAR
              </a>
            </Button>
            <Button
              asChild
              variant="default"
              className="bg-[#00c4cc] hover:bg-[#00b3b8] text-black font-semibold w-full mt-2"
            >
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                INGRESAR
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
