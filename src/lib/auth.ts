import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from '#/db/schema'
import {
  APP_NAME_EN,
  CHANGE_PASSWORD_EXPIRES_IN_SECONDS,
  EMAIL_VERIFICATION_EXPIRES_IN_SECONDS,
  maxPasswordLength,
  maxUsernameLength,
  minPasswordLength,
  minUsernameLength,
} from '#/lib/const'
import { serverEnv } from '#/lib/env.server'
import {
  sendAccountVerificationEmail,
  sendChangePasswordEmail,
  sendPasswordChangedEmail,
} from '#/lib/mailer.server'
import { errorMessageKeys } from '#/lib/message'
import { redisClient } from '#/lib/redis.server'
import { flashMessage } from '#/lib/session.server'
import {
  extractErrorFromRedirect,
  getCallbackURLFromRequest,
} from '#/lib/utils.server'
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
    async sendResetPassword(data) {
      sendChangePasswordEmail({
        to: data.user.email,
        name: data.user.name,
        changePasswordURL: data.url,
      }).catch(console.error)
    },
    resetPasswordTokenExpiresIn: CHANGE_PASSWORD_EXPIRES_IN_SECONDS,
    revokeSessionsOnPasswordReset: true,
    async onPasswordReset(data) {
      sendPasswordChangedEmail({
        to: data.user.email,
        name: data.user.name,
      }).catch(console.error)
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: EMAIL_VERIFICATION_EXPIRES_IN_SECONDS,
    sendOnSignUp: true,
    sendOnSignIn: false,
    async sendVerificationEmail({ user, url }) {
      sendAccountVerificationEmail({
        to: user.email,
        name: user.name,
        verificationURL: url,
      }).catch(console.error)
    },
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
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/verify-email') {
        const returned = ctx.context.returned

        const errorQueryParam = extractErrorFromRedirect(
          returned,
          ctx.context.baseURL,
        )

        if (errorQueryParam) {
          await flashMessage({ error: errorQueryParam })

          return
        }

        const callbackURLQueryParam = getCallbackURLFromRequest(
          ctx.request?.url,
        )

        if (callbackURLQueryParam === '/login') {
          await flashMessage({ success: 'accountVerified' })
        }
      }

      if (ctx.path === '/change-password') {
        if (ctx.context.returned instanceof APIError) return

        const user = ctx.context.session?.user

        if (!user) return

        sendPasswordChangedEmail({
          to: user.email,
          name: user.name,
        }).catch(console.error)
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
  rateLimit: { enabled: false },
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
