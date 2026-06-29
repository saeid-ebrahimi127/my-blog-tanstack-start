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
  maxUsernameLength,
  minPasswordLength,
  minUsernameLength,
} from '#/lib/const'
import { serverEnv } from '#/lib/env.server'
import { errorMessageKeys } from '#/lib/message'
import { redisClient } from '#/lib/redis.server'
import { usernameZodSchema } from '#/zod-schema/field/username'
import { db } from '@/db'
import { redisStorage } from '@better-auth/redis-storage'
import type { BetterAuthOptions } from 'better-auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { customSession, username } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789-_', 15)

const env = serverEnv()

const options = {
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
  plugins: [
    username({
      minUsernameLength,
      maxUsernameLength,
      usernameValidator(value) {
        return usernameZodSchema.safeParse(value).success
      },
    }),
  ],
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
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          return { data: { ...user, username: `user_${nanoid()}` } }
        },
      },
    },
  },
  secondaryStorage: redisStorage({
    client: redisClient,
    keyPrefix: 'better-auth:',
  }),
  verification: {
    disableCleanup: false,
    storeIdentifier: 'hashed',
    storeInDatabase: false,
  },
} satisfies BetterAuthOptions

export const auth = betterAuth({
  ...options,
  plugins: [
    ...options.plugins,
    customSession(async ({ user, session }) => {
      const { displayUsername: _, username, ...userRest } = user
      return { user: { ...userRest, username: username as string }, session }
    }, options),
    tanstackStartCookies(),
  ],
})
