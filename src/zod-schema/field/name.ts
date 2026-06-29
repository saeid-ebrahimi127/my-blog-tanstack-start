import z from 'zod'

export const nameZodSchema = z
  .string()
  .trim()
  .min(1, 'نام الزامی است.')
  .max(30, 'نام حداکثر باید 30 حرف باشد.')
  .regex(
    /^[a-zA-Z\u0600-\u06FF_-\s']+$/,
    "موارد مجاز: حروف انگلیسی و فارسی ، فاصله ، - ، _ و '",
  )
