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
    })
    .parse(process.env)
