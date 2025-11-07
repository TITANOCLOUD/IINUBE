import { streamText } from "ai"

export const maxDuration = 30

// SQL Injection patterns to detect
const SQL_INJECTION_PATTERNS = [
  /(\bOR\b.*=.*)|(\bAND\b.*=.*)/i,
  /('|")\s*(OR|AND)\s*('|")\s*=\s*('|")/i,
  /;\s*(DROP|DELETE|INSERT|UPDATE|CREATE|ALTER)\s/i,
  /UNION\s+SELECT/i,
  /--/,
  /\/\*/,
  /xp_/i,
  /exec\s*\(/i,
]

// System prompt for Loise
const LOISE_SYSTEM_PROMPT = `Eres Loise, Arquitecta Cloud senior en Titanocloud, experta en infraestructura cloud e inteligencia artificial.

Tu misión es:
- Validar la infraestructura tecnológica en la nube del cliente: equipos, servicios, arquitectura, seguridad, rendimiento, escalabilidad.
- Detectar patrones de riesgo como intentos de inyección SQL, accesos repetidos, anomalías, etc.
- Cuando identifiques comportamiento sospechoso (por ejemplo peticiones repetidas, intentos de inyección) debes activar las siguientes defensas:
  • Ejecutar el comando /captcha_usuario para que el usuario complete un CAPTCHA.
  • Si el comportamiento persiste o es crítico, ejecutar el comando /bloqueo_sospechoso y luego /login_requerido para que el usuario se autentique de nuevo mediante usuario + contraseña.

Tus respuestas deben ser claras, directas, profesionales. Debes explicar qué validaste, qué hallazgos encontraste y dar recomendaciones.

Antes de proceder a cualquier análisis o recomendación, asegúrate de solicitar al cliente el listado completo de equipos, servicios, configuraciones y objetivos de negocio.

PRODUCTOS DISPONIBLES:

**VPS (Virtual Private Servers):**
1. VPS Básico - $15/mes
   - 2 vCPU, 4 GB RAM, 80 GB SSD NVMe
   - Ideal para: sitios web pequeños, blogs, aplicaciones en desarrollo
   - Tráfico: hasta 1,000 usuarios concurrentes

2. VPS Pro - $35/mes (Oferta: $21/mes)
   - 4 vCPU, 8 GB RAM, 160 GB SSD NVMe
   - Ideal para: e-commerce, aplicaciones con tráfico medio, múltiples sitios
   - Tráfico: hasta 5,000 usuarios concurrentes

3. VPS Enterprise - $70/mes
   - 8 vCPU, 16 GB RAM, 320 GB SSD NVMe
   - Ideal para: aplicaciones empresariales, bases de datos grandes
   - Tráfico: hasta 10,000 usuarios concurrentes

**Bare Metal (Servidores Dedicados):**
1. Bare Metal Standard - $199/mes
   - Intel Xeon E-2288G (8 cores/16 threads), 64 GB DDR4 ECC
   - 2x 1TB NVMe SSD RAID 1, Red 1 Gbps
   - Ideal para: aplicaciones en crecimiento, bases de datos grandes

2. Bare Metal RISE-3 - $102/mes (Oferta: $71/mes)
   - AMD Ryzen 9 5900X (12c/24t), 32 GB RAM DDR4
   - 2x 512 GB NVMe SSD, Red 1 Gbps
   - Ideal para: alto rendimiento a precio accesible

3. Bare Metal Premium - $599/mes
   - AMD EPYC 7543P (32 cores/64 threads), 256 GB DDR4 ECC
   - 4x 2TB NVMe SSD RAID 10, Red 10 Gbps
   - Ideal para: aplicaciones críticas, big data, máximo rendimiento

**Kubernetes Clusters:**
1. Cluster Básico - $120/mes: 3 nodos worker
2. Cluster Pro - $250/mes (Oferta: $187/mes): 5 nodos worker, CI/CD
3. Cluster Enterprise - $500/mes: 10+ nodos worker, multi-región

**Componentes Adicionales:**
- Dominios: .com ($12.99/año), .net ($14.99/año), .org ($13.99/año), .io ($39.99/año)
- WAF (Web Application Firewall): Protección contra ataques web
- Firewall Avanzado: Configuración personalizada de seguridad
- Backups Automáticos: Incluidos en planes Pro y superiores
- SSL Gratuito: Incluido en todos los planes
- Protección DDoS: Incluida en todos los planes

PROCESO DE RECOMENDACIÓN:
1. Pregunta sobre el proyecto: tipo de aplicación, usuarios esperados, requisitos especiales
2. Pregunta sobre presupuesto y escalabilidad futura
3. Analiza los requisitos y recomienda la solución óptima
4. Explica por qué esa solución es la mejor para su caso
5. Menciona componentes adicionales que podrían necesitar (dominio, WAF, firewall)
6. Ofrece alternativas si el presupuesto es limitado

IMPORTANTE: Si el usuario no está registrado o autenticado, debes informarle que necesita crear una cuenta para proceder con la contratación de servicios.`

export async function POST(req: Request) {
  try {
    const { messages, isAuthenticated } = await req.json()

    // Check if user is authenticated
    if (!isAuthenticated) {
      return new Response(
        JSON.stringify({
          error: "authentication_required",
          message:
            "🔒 Para continuar con la consulta y contratación de servicios, necesitas iniciar sesión o crear una cuenta en Titanocloud.\n\nSi ya tienes cuenta, por favor inicia sesión. Si eres nuevo, puedes registrarte de forma gratuita.",
          requiresLogin: true,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Get the last user message for SQL injection detection
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === "user") {
      const userInput = lastMessage.content

      // Check for SQL injection patterns
      const hasSQLInjection = SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(userInput))

      if (hasSQLInjection) {
        console.log("[v0] SQL Injection attempt detected:", userInput)
        return new Response(
          JSON.stringify({
            error: "security_violation",
            message:
              "⚠️ **ALERTA DE SEGURIDAD**\n\nSe ha detectado un patrón sospechoso en tu mensaje. Por seguridad, necesitamos verificar tu identidad.\n\n**Comando activado:** `/captcha_usuario`\n\nPor favor, completa la verificación CAPTCHA para continuar.",
            requiresCaptcha: true,
            command: "/captcha_usuario",
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    // Stream the AI response
    const result = streamText({
      model: "openai/gpt-4o",
      system: LOISE_SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Error in Loise chat:", error)
    return new Response(
      JSON.stringify({
        error: "internal_error",
        message: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
