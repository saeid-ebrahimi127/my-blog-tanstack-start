export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB'

const UNITS: SizeUnit[] = ['B', 'KB', 'MB', 'GB', 'TB']

const UNIT_LABELS_FA: Record<SizeUnit, string> = {
  B: 'بایت',
  KB: 'کیلوبایت',
  MB: 'مگابایت',
  GB: 'گیگابایت',
  TB: 'ترابایت',
}

const validateBytes = (bytes: number): void => {
  if (!Number.isFinite(bytes) || bytes < 0) {
    throw new RangeError(
      `bytes must be a finite, non-negative number. Received: ${bytes}`,
    )
  }
}

export const convertBytes = (
  bytes: number,
  unit: SizeUnit = 'MB',
  precision = 2,
): number => {
  validateBytes(bytes)

  const exponent = UNITS.indexOf(unit)
  if (exponent === -1) {
    throw new RangeError(
      `unit must be one of ${UNITS.join(', ')}. Received: ${unit}`,
    )
  }

  const divisor = 1024 ** exponent
  const factor = 10 ** precision

  return Math.round((bytes / divisor) * factor) / factor
}

export const formatBytes = (bytes: number, precision = 2): string => {
  validateBytes(bytes)

  if (bytes === 0) {
    return `0 ${UNIT_LABELS_FA.B}`
  }

  let value = bytes
  let exponent = 0

  while (value >= 1024 && exponent < UNITS.length - 1) {
    value /= 1024
    exponent++
  }

  const factor = 10 ** precision
  let rounded = Math.round(value * factor) / factor

  if (rounded >= 1024 && exponent < UNITS.length - 1) {
    exponent++
    rounded = Math.round((rounded / 1024) * factor) / factor
  }

  return `${rounded} ${UNIT_LABELS_FA[UNITS[exponent]]}`
}
