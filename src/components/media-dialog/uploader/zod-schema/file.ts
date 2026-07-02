import {
  convertBytes,
  FILE_MAX_SIZE_BYTES,
  FILE_VALID_MIMES,
} from '#/components/media-dialog/uploader/lib'
import z from 'zod'

export const fileZodSchema = z
  .instanceof(File, {
    error: 'فایلی انتخاب نشده است.',
  })
  .refine((file) => file.size > 0, { error: 'فایل خالی است.' })
  .refine((file) => file.size <= FILE_MAX_SIZE_BYTES, {
    error: `فایل بیشتر از ${convertBytes(FILE_MAX_SIZE_BYTES, 'MB')} مگابایت است.`,
  })
  .refine((file) => Object.keys(FILE_VALID_MIMES).includes(file.type), {
    error: 'فرمت فایل مجاز نیست.',
  })
