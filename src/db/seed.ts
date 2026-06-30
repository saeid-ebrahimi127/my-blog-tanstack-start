import { serverEnv } from '#/lib/env.server'
import { flushAppRedisKeys } from '#/lib/redis.server'
import { hashPassword } from 'better-auth/crypto'
import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { db } from '.'
import { accountTable, userTable, verificationTable } from './schema'

const env = serverEnv()

if (env.NODE_ENV === 'production') {
  console.error('refusing to run seed script in production.')
  process.exit(1)
}

try {
  console.log('removing log and upload folders...')

  await Promise.all([
    rm(resolve(process.cwd(), 'log'), { force: true, recursive: true }),
    rm(resolve(process.cwd(), 'upload'), { force: true, recursive: true }),
  ])

  console.log('log and upload folders removed.')

  await flushAppRedisKeys()

  console.log('wiping tables...')

  await Promise.all([db.delete(verificationTable), db.delete(userTable)])

  console.log('tables wiped.')

  const [saeid, dave] = await db
    .insert(userTable)
    .values([
      {
        name: 'سعید',
        email: 'saeid@example.com',
        emailVerified: true,
        username: 'saeid123',
      },
      {
        name: 'dave',
        email: 'dave@example.com',
        emailVerified: false,
        username: 'dave123',
      },
    ])
    .returning()

  const password = await hashPassword('password123456')

  await db.insert(accountTable).values([
    {
      accountId: saeid.id,
      userId: saeid.id,
      providerId: 'credential',
      password,
    },
    {
      accountId: dave.id,
      userId: dave.id,
      providerId: 'credential',
      password,
    },
  ])

  console.log('seed users:', await db.query.userTable.findMany())

  process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
