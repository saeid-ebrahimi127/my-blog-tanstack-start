import { AppleIcon, LaptopIcon, SmartphoneIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const getOsName = (userAgent: string | null | undefined): string => {
  if (!userAgent) return 'نامشخص'

  if (/Windows/i.test(userAgent)) return 'Windows'
  if (/Mac OS X|Macintosh/i.test(userAgent)) return 'macOS'
  if (/iPhone|iPad|iOS/i.test(userAgent)) return 'iOS'
  if (/Android/i.test(userAgent)) return 'Android'
  if (/Linux/i.test(userAgent)) return 'Linux'

  return 'نامشخص'
}

export const getOsIcon = (userAgent: string | null | undefined): LucideIcon => {
  if (!userAgent) return LaptopIcon

  if (/Windows/i.test(userAgent)) return LaptopIcon
  if (/Mac OS X|Macintosh/i.test(userAgent)) return AppleIcon
  if (/iPhone|iPad|iOS/i.test(userAgent)) return AppleIcon
  if (/Android/i.test(userAgent)) return SmartphoneIcon
  if (/Linux/i.test(userAgent)) return LaptopIcon

  return LaptopIcon
}
