import Link from "next/link"
import { Logo } from "@/components/logo"
import { Server, Globe, Mail, Phone, MapPin, Activity, Youtube, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Company Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Company Info - Left Side */}
          <div>
            <Logo variant="minimal" className="mb-4" />
            <p className="text-slate-300 text-sm mb-4 leading-relaxed max-w-2xl">
              IINBUE desarrolla infraestructura cloud de alto rendimiento
              <br />
              que combina potencia, estabilidad y flexibilidad
              <br />
              para entornos empresariales modernos.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00c4cc]" />
                <span>Global Data Centers</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00c4cc]" />
                <a href="tel:+17868225999" className="hover:text-[#00c4cc] transition-colors">
                  +1 786 822 5999 <span className="text-xs text-slate-500">(Miami)</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00c4cc]" />
                <span>support@iinbue.com</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@servidoresvirtuales-nube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#00c4cc] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/servidoresvirtualesnube/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#00c4cc] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/servidoresvirtualesnube/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#00c4cc] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Menus - Right Side: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Products */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Server className="w-4 h-4 text-[#00c4cc]" />
                Productos
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/bare-metal" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Bare Metal Servers
                  </Link>
                </li>
                <li>
                  <Link href="/vps" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Virtual Private Servers
                  </Link>
                </li>
                <li>
                  <Link href="/clusters" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Kubernetes Clusters
                  </Link>
                </li>
                <li>
                  <Link href="/nube-publica" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Nube Pública
                  </Link>
                </li>
                <li>
                  <Link href="/nube-privada" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Nube Privada Alojada
                  </Link>
                </li>
              </ul>
            </div>

            {/* Herramientas */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00c4cc]" />
                Herramientas
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/detector-caidas"
                    className="text-slate-300 hover:text-[#00c4cc] transition-colors flex items-center gap-2"
                  >
                    <Activity className="w-3 h-3" />
                    Detector de Caídas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/speedtest"
                    className="text-slate-300 hover:text-[#00c4cc] transition-colors flex items-center gap-2"
                  >
                    <Activity className="w-3 h-3" />
                    Medidor de Velocidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00c4cc]" />
                Empresa
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/acerca-de" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="/ecosistema" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Ecosistema
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © 2025 IINBUE Cloud Solutions. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/cookies" className="text-slate-300 hover:text-[#00c4cc] transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
