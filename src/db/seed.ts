import { serverEnv } from '#/lib/env.server'
import { hashPassword } from 'better-auth/crypto'
import { db } from '.'
import { accountTable, userTable, verificationTable } from './schema'

const env = serverEnv()

if (env.NODE_ENV === 'production') {
  console.error('refusing to run seed script in production.')
  process.exit(1)
}

try {
  console.log('wiping tables...')

  await Promise.all([db.delete(verificationTable), db.delete(userTable)])

  console.log('tables wiped.')

  const [newUser] = await db
    .insert(userTable)
    .values({
      name: 'سعید',
      email: 'saeid@example.com',
      emailVerified: true,
      username: 'saeid123',
    })
    .returning()

  await db.insert(accountTable).values({
    accountId: newUser.id,
    userId: newUser.id,
    providerId: 'credential',
    password: await hashPassword('password123456'),
  })

  console.log('seed user:', newUser)

  process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
