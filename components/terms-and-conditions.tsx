"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText } from "lucide-react"

export function TermsAndConditions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs bg-transparent">
          <FileText className="w-3 h-3 mr-1" />
          Términos y Condiciones
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-cyan-400">Términos y Condiciones - IINUBE</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm">
          {/* 1. CONTRATACIÓN Y TIEMPOS DE ENTREGA */}
          <section>
            <h3 className="font-bold text-cyan-400 text-base mb-3">1. CONTRATACIÓN Y TIEMPOS DE ENTREGA</h3>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong>1.1.-</strong> El servidor virtual debe ser contratado mediante el formulario publicado en:{" "}
                <a href="https://iinube.com/solicitud/" className="text-cyan-400 underline">
                  https://iinube.com/solicitud/
                </a>
              </p>
              <p>
                <strong>1.2.-</strong> Enviado el acuerdo de consola por correo, todo cambio llevará el costo adicional
                según lo nuevo que se solicite.
              </p>
              <p>
                <strong>1.3.-</strong> Los Servidores VPSi se entregan en un lapso de{" "}
                <strong>5 horas laborables</strong> a partir de la recepción del formulario.
              </p>
              <p>
                <strong>1.4.-</strong> Los Servidores DEDICADOS se entregan en un lapso de{" "}
                <strong>10 horas laborables</strong> a partir de la recepción del formulario.
              </p>
              <p>
                <strong>1.5.-</strong> Entregado el servidor virtual es responsabilidad del cliente o distribuidor la
                asistencia técnica de los Proyectos y Aplicaciones del usuario.
              </p>
            </div>
          </section>

          {/* 2. FACTURACIÓN */}
          <section>
            <h3 className="font-bold text-cyan-400 text-base mb-3">2. FACTURACIÓN</h3>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong>2.1.-</strong> La primera factura de la renta mensual se realizará el mismo día de la
                contratación del servidor virtual y esta será por un mes completo, la cual debe pagarse dentro de las{" "}
                <strong>72 horas hábiles</strong>.
              </p>
              <p>
                <strong>2.2.-</strong> La segunda factura con ajuste en días se realizará únicamente por los días
                restantes del mes calendario posteriores a la fecha de corte, esta factura se generará con{" "}
                <strong>10 días de anticipación</strong> para pagar la renta mensual y evitar suspensión en el servicio.
              </p>
              <p>
                <strong>2.3.-</strong> La tercera factura y subsiguientes serán con fecha de corte del día 01 de cada
                mes, esta factura se generará con <strong>10 días de anticipación</strong> para pagar la renta mensual y
                evitar suspensión en el servicio.
              </p>
              <p>
                <strong>2.4.-</strong> Los servidores virtuales contratados anual o semestral, las fechas de cortes se
                indicará dentro de la factura según su periodicidad, esta factura se generará con{" "}
                <strong>15 días de anticipación</strong> para pagar la renta anual o semestral y evitar suspensión en el
                servicio. Solo se realizará el ajuste en días SÍ en la siguiente renovación se cambia a rentas
                mensuales.
              </p>
            </div>
          </section>

          {/* 3. CANCELACIÓN Y DESTRUCCIÓN */}
          <section>
            <h3 className="font-bold text-cyan-400 text-base mb-3">3. CANCELACIÓN Y DESTRUCCIÓN</h3>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong>3.1.-</strong> Los servidores virtuales no tienen un plazo forzoso de contratación, por lo cual
                se puede cancelar en cualquier momento, cumpliendo el periodo de facturación contratado y siguiendo el
                procedimiento.
              </p>
              <p>
                <strong>3.2.-</strong> Los servidores virtuales y complementos contratados en modalidades distintas a la
                mensual (incluyendo planes trimestrales, semestrales, anuales u otros){" "}
                <strong>no son reembolsables</strong>, independientemente del uso, aprovechamiento o tiempo restante del
                servicio. El Cliente acepta esta condición al momento de realizar la contratación, renunciando
                expresamente a cualquier solicitud de devolución o cancelación posterior.
              </p>
              <p>
                <strong>3.3.-</strong> La cancelación lleva consigo la destrucción del servidor y su información, una
                vez destruido el servidor no podrá recuperarse ninguna información, por ello es de suma importancia
                anticiparse y resguardar su información en medios externos al servidor virtual.
              </p>
              <p>
                <strong>3.4.-</strong> Para cancelar un servidor virtual se requiere de lo siguiente:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Mandar un correo a{" "}
                  <a href="mailto:administracion@iinube.com" className="text-cyan-400">
                    administracion@iinube.com
                  </a>{" "}
                  y{" "}
                  <a href="mailto:distribuidores@iinube.com" className="text-cyan-400">
                    distribuidores@iinube.com
                  </a>{" "}
                  con la solicitud de cancelación, indicando el nombre y DNS del servidor, en un horario laborable de
                  9:00am a 4:00pm de lunes a viernes.
                </li>
                <li>
                  En caso de su factura, sea semestral o anual, la solicitud de cancelación debe enviarse{" "}
                  <strong>5 días antes</strong> de la próxima fecha de corte.
                </li>
                <li>
                  Cuando la solicitud de cancelación NO se envíe 5 días antes de la fecha de corte, el servicio se
                  suspende al día siguiente de la fecha de corte, su información queda resguardada por{" "}
                  <strong>7 días</strong>.
                </li>
                <li>
                  Los servidores cancelados que requieran bajar su información posterior a la fecha de corte, cuentan
                  con máximo <strong>7 días naturales</strong> y se hará un cobro del <strong>25%</strong> del valor de
                  la mensualidad del servidor contratado, que tiene que ser pagado previo a la reactivación, teniendo
                  como límite 7 días naturales a partir de la fecha de corte.
                </li>
                <li>
                  Los servidores cancelados al <strong>octavo día</strong> después de su fecha de corte serán destruidos
                  con toda su información contenida.
                </li>
                <li>
                  En caso de reactivar el servicio regular, se genera la factura del próximo mes inmediato, considerando
                  que la fecha de corte se mantendrá el mismo día del acuerdo original.
                </li>
              </ul>
            </div>
          </section>

          {/* Important notes */}
          <section className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="font-bold text-cyan-400 mb-2">⚠️ Notas Importantes:</h4>
            <ul className="space-y-1 text-slate-300 text-xs">
              <li>• TSPlus Advanced Security: actualización anual del 21% del valor del producto</li>
              <li>• El precio del software NO incluye servicios, capacitación o instalación</li>
              <li>• Horario de oficina: Lunes a Viernes de 9:00am a 3:00pm y 4:00pm a 6:00pm</li>
              <li>• Precios sujetos a cambio sin previo aviso</li>
              <li>• Todos los precios son más IVA y en moneda nacional (MXN)</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
