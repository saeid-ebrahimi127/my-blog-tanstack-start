import { drizzle } from 'drizzle-orm/node-postgres'

import { serverEnv } from '#/lib/env.server.ts'
import * as schema from './schema/index.ts'

export const db = drizzle(serverEnv().DATABASE_URL, { schema })
