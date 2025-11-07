"use server"

interface ServiceStatus {
  name: string
  logo: string
  status: "operational" | "degraded" | "down"
  reports: number
  lastIncident: string
  uptimeData: number[]
  responseTime?: number
}

// Function to check if a service is reachable
async function checkServiceHealth(
  url: string,
): Promise<{ status: "operational" | "degraded" | "down"; responseTime: number }> {
  try {
    const startTime = Date.now()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    })

    clearTimeout(timeoutId)
    const responseTime = Date.now() - startTime

    if (response.ok) {
      // Good response time: < 500ms = operational, 500-2000ms = degraded
      return {
        status: responseTime < 500 ? "operational" : responseTime < 2000 ? "degraded" : "degraded",
        responseTime,
      }
    } else {
      return { status: "degraded", responseTime }
    }
  } catch (error) {
    return { status: "down", responseTime: 0 }
  }
}

// Generate realistic uptime data based on current status
function generateUptimeData(status: "operational" | "degraded" | "down"): number[] {
  const data: number[] = []
  for (let i = 0; i < 8; i++) {
    if (status === "operational") {
      data.push(Math.random() > 0.1 ? 100 : Math.floor(Math.random() * 10) + 90)
    } else if (status === "degraded") {
      data.push(Math.floor(Math.random() * 30) + 60)
    } else {
      data.push(Math.floor(Math.random() * 40) + 10)
    }
  }
  return data
}

export async function checkAllServices(): Promise<ServiceStatus[]> {
  const services = [
    { name: "YouTube", url: "https://www.youtube.com", logo: "https://www.youtube.com/favicon.ico" },
    { name: "Facebook", url: "https://www.facebook.com", logo: "https://www.facebook.com/favicon.ico" },
    { name: "Instagram", url: "https://www.instagram.com", logo: "https://www.instagram.com/favicon.ico" },
    { name: "WhatsApp", url: "https://www.whatsapp.com", logo: "https://www.whatsapp.com/favicon.ico" },
    { name: "X (Twitter)", url: "https://twitter.com", logo: "https://abs.twimg.com/favicons/twitter.3.ico" },
    { name: "TikTok", url: "https://www.tiktok.com", logo: "https://www.tiktok.com/favicon.ico" },
    { name: "Netflix", url: "https://www.netflix.com", logo: "https://www.netflix.com/favicon.ico" },
    { name: "Spotify", url: "https://www.spotify.com", logo: "https://www.spotify.com/favicon.ico" },
    {
      name: "Amazon AWS",
      url: "https://aws.amazon.com",
      logo: "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
    },
    {
      name: "Google Cloud",
      url: "https://cloud.google.com",
      logo: "https://www.gstatic.com/devrel-devsite/prod/v2210deb8920cd4a55bd580441aa58e7853afc04b39a9d9ac4198e1cd7fbe04ef/cloud/images/favicons/onecloud/favicon.ico",
    },
    { name: "Microsoft Azure", url: "https://azure.microsoft.com", logo: "https://azure.microsoft.com/favicon.ico" },
    { name: "OVHcloud", url: "https://www.ovhcloud.com", logo: "https://www.ovhcloud.com/favicon.ico" },
    {
      name: "Discord",
      url: "https://discord.com",
      logo: "https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.ico",
    },
    { name: "Reddit", url: "https://www.reddit.com", logo: "https://www.reddit.com/favicon.ico" },
    { name: "Microsoft 365", url: "https://www.office.com", logo: "https://www.office.com/favicon.ico" },
    { name: "Cloudflare", url: "https://www.cloudflare.com", logo: "https://www.cloudflare.com/favicon.ico" },
  ]

  // Check all services in parallel
  const results = await Promise.all(
    services.map(async (service) => {
      const health = await checkServiceHealth(service.url)
      const uptimeData = generateUptimeData(health.status)

      // Generate realistic reports based on status
      const reports =
        health.status === "operational"
          ? Math.floor(Math.random() * 50)
          : health.status === "degraded"
            ? Math.floor(Math.random() * 300) + 100
            : Math.floor(Math.random() * 500) + 300

      // Generate last incident time
      const lastIncident =
        health.status === "operational"
          ? `Hace ${Math.floor(Math.random() * 48) + 1} horas`
          : health.status === "degraded"
            ? `Hace ${Math.floor(Math.random() * 60) + 1} min`
            : "Ahora"

      return {
        name: service.name,
        logo: service.logo,
        status: health.status,
        reports,
        lastIncident,
        uptimeData,
        responseTime: health.responseTime,
      }
    }),
  )

  return results
}
