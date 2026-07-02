export const FILE_MAX_SIZE_BYTES = 10 * 1024 * 1024
export const FILE_VALID_MIMES = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/webp': 'Webp',
  'image/avif': 'Avif',
  'image/gif': 'GIF',
  'image/svg+xml': 'SVG',
  'image/bmp': 'BMP',
}
export type FILE_VALID_MIMES = keyof typeof FILE_VALID_MIMES
