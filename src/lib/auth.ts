import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from '#/db/schema'
import {
  APP_NAME_EN,
  EMAIL_VERIFICATION_EXPIRES_IN_SECONDS,
  maxPasswordLength,
  minPasswordLength,
} from '#/lib/const'
import { serverEnv } from '#/lib/env.server'
import { errorMessageKeys } from '#/lib/message'
import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

const env = serverEnv()

export const auth = betterAuth({
  appName: APP_NAME_EN,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userTable,
      session: sessionTable,
      verification: verificationTable,
      account: accountTable,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength,
    maxPasswordLength,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    expiresIn: EMAIL_VERIFICATION_EXPIRES_IN_SECONDS,
    sendOnSignUp: true,
    sendOnSignIn: false,
    async sendVerificationEmail() {},
  },
  plugins: [tanstackStartCookies()],
  advanced: {
    database: {
      generateId: false,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== '/sign-up/email') return

      const email = ctx.body?.email as string

      if (!email) return

      const emailExists = await ctx.context.adapter.findOne({
        model: 'user',
        where: [
          { field: 'email', operator: 'eq', value: email, mode: 'insensitive' },
        ],
      })

      if (emailExists) {
        const code = errorMessageKeys.find((e) => e === 'EMAIL_EXISTS')!

        throw new APIError('BAD_REQUEST', {
          code,
        })
      }
    }),
  },
})
