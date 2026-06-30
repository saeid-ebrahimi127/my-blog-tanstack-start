import z from 'zod'

const displayType: Record<string, string> = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/webp': 'Webp',
  'image/avif': 'Avif',
}

export const readableMimes = (mimes: string[]) => {
  return mimes.map((m) => displayType[m]).join(' ، ')
}

export const createFileZodSchema = ({
  maxSizeBytes,
  validMimes,
}: {
  maxSizeBytes: number
  validMimes: string[]
}) =>
  z
    .instanceof(File, { message: 'فایلی انتخاب نشده است.' })
    .refine((file) => file.size > 0, 'فایل خالی است.')
    .refine(
      (file) => file.size <= maxSizeBytes,
      `حجم فایل بیشتر از ${maxSizeBytes / 1024 / 1024} مگابایت است.`,
    )
    .refine(
      (file) => validMimes.includes(file.type),
      `موارد مجاز: ${readableMimes(validMimes)}`,
    )

export const avatarMaxSizeBytes = 2 * 1024 * 1024
export const avatarValidMimes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]

export const avatarZodSchema = createFileZodSchema({
  maxSizeBytes: avatarMaxSizeBytes,
  validMimes: avatarValidMimes,
})

export const fileNameZodSchema = z
  .string()
  .min(1, 'Filename cannot be empty')
  .max(255, 'Filename is too long (max 255 characters)')
  .refine((name) => name.trim() === name, {
    message: 'Filename cannot have leading or trailing whitespace',
  })
  .refine((name) => name !== '.' && name !== '..', {
    message: "Filename cannot be '.' or '..'",
  })
  .refine(
    // eslint-disable-next-line no-control-regex -- intentionally rejecting control chars in filenames
    (name) => !/[<>:"/\\|?*\x00-\x1F]/.test(name),
    {
      message:
        'Filename cannot contain: < > : " / \\ | ? * or control characters',
    },
  )
  .refine((name) => !/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i.test(name), {
    message: 'Filename cannot be a reserved Windows name (CON, PRN, AUX, etc.)',
  })
  .refine((name) => !name.endsWith('.'), {
    message: 'Filename cannot end with a period',
  })
