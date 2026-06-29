import { maxPasswordLength, minPasswordLength } from '#/lib/const'
import z from 'zod'

export const passwordZodSchema = z
  .string()
  .trim()
  .min(minPasswordLength, `رمز عبور حداقل باید ${minPasswordLength} حرف باشد.`)
  .max(maxPasswordLength, `رمز عبور حداکثر باید ${maxPasswordLength} حرف باشد.`)
