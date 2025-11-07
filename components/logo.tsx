import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "minimal"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Proyecto%20nuevo%287%29-C6MSnedoMTGqk3c84cDkMYqpbS3cKL.png"
        alt="IINUBE Cloud Infrastructure"
        width={180}
        height={180}
        className="object-contain"
        priority
      />
    </div>
  )
}
