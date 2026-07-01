import z from 'zod'

export const serverEnv = () =>
  z
    .object({
      DATABASE_URL: z.string().url(),
      BETTER_AUTH_URL: z.string().url(),
      BETTER_AUTH_SECRET: z.string().min(64),
      APP_URL: z.string().url(),
      NODE_ENV: z
        .literal(['development', 'production', 'text'])
        .optional()
        .default('development'),
      REDIS_URL: z.string().url(),
      SMTP_HOST: z.string().min(1),
      SMTP_PORT: z.coerce.number().int().positive(),
      SMTP_SECURE: z
        .enum(['true', 'false'])
        .optional()
        .default('false')
        .transform((val) => val === 'true'),
      SMTP_USER: z.string().optional(),
      SMTP_PASS: z.string().optional(),
      SESSION_SECRET: z.string().min(64),
    })
    .parse(process.env)
