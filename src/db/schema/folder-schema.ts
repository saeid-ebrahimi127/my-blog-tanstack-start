import { userTable } from '#/db/schema/auth-schema'
import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import type { AnyPgColumn } from 'drizzle-orm/pg-core'

export const folderTable = pgTable('folder', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuidv7()`),
  name: text('name').notNull(),
  parentFolderId: uuid('parent_folder_id').references(
    (): AnyPgColumn => folderTable.id,
    { onDelete: 'cascade' },
  ),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})
