import type { FILE_VALID_MIMES } from '#/components/media-dialog/uploader/lib/const'

export type FileCategory = 'تصویر' | 'نامشخص'

const MIME_MAP: Record<FILE_VALID_MIMES, FileCategory> = {
  'image/png': 'تصویر',
  'image/jpeg': 'تصویر',
  'image/webp': 'تصویر',
  'image/avif': 'تصویر',
  'image/gif': 'تصویر',
  'image/svg+xml': 'تصویر',
  'image/bmp': 'تصویر',
}

export const getFileType = (file: File): FileCategory => {
  if (file.type in MIME_MAP) return MIME_MAP[file.type as FILE_VALID_MIMES]
  return 'نامشخص'
}
