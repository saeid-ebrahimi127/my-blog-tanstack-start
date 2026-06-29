import z from 'zod'

export const emailZodSchema = z
  .string()
  .trim()
  .email('ایمیل معتبر الزامی است.')
  .max(50, 'ایمیل حداکثر باید 50 حرف باشد.')
  .refine(
    (email) => email === email.toLowerCase(),
    'ایمیل فقط باید حاوی حروف کوچک باشد.',
  )
