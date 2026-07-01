import { accountTable, sessionTable, userTable } from '#/db/schema/auth-schema'
import { folderTable } from '#/db/schema/folder-schema'
import { relations } from 'drizzle-orm'

export * from './auth-schema'
export * from './folder-schema'

export const userRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
  accounts: many(accountTable),
  folders: many(folderTable),
}))

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}))

export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}))

export const folderRelations = relations(folderTable, ({ one }) => ({
  user: one(userTable, {
    fields: [folderTable.userId],
    references: [userTable.id],
  }),
}))
