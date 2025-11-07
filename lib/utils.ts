import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(usdPrice: number): string {
  const mxnPrice = usdPrice * 20 // 1 USD = 20 MXN
  return `$${mxnPrice.toFixed(2)} MXN`
}

export function convertToMXN(usdPrice: number): number {
  return usdPrice * 20
}
