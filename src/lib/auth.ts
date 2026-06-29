import { APP_NAME_EN, maxPasswordLength, minPasswordLength } from '#/lib/const'
import { serverEnv } from '#/lib/env.server'
import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

const env = serverEnv()

export const auth = betterAuth({
  appName: APP_NAME_EN,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength,
    maxPasswordLength,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  plugins: [tanstackStartCookies()],
  advanced: {
    database: {
      generateId: false,
    },
  },
})
