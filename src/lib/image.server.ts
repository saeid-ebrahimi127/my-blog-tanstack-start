import sharp from 'sharp'
import type { FitEnum, GravityEnum } from 'sharp'

export const processImage = async (
  buffer: Buffer,
  width = 300,
  height = 300,
  position?: keyof GravityEnum,
  fit?: keyof FitEnum,
): Promise<Buffer> => {
  return sharp(buffer)
    .resize(width, height, {
      fit: fit ?? 'cover',
      position: position ?? 'center',
    })
    .webp({ quality: 90 })
    .toBuffer()
}
