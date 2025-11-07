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
        src="/logo-iinbue.png"
        alt="IINBUE Cloud Infrastructure"
        width={162}
        height={162}
        className="object-contain"
        priority
      />
    </div>
  )
}
