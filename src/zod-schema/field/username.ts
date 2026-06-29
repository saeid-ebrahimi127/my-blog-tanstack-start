import { maxUsernameLength, minUsernameLength } from '#/lib/const'
import z from 'zod'

export const usernameZodSchema = z
  .string()
  .trim()
  .min(
    minUsernameLength,
    `نام کاربری حداقل باید ${minUsernameLength} حرف باشد.`,
  )
  .max(
    maxUsernameLength,
    `نام کاربری حداکثر باید ${maxUsernameLength} حرف باشد.`,
  )
  .regex(/^[a-z0-9_-]+$/, 'موارد مجاز: حروف کوچک انگلیسی ، اعداد ، _ و -')
