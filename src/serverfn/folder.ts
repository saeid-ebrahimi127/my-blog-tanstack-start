import { db } from '#/db'
import { folderTable } from '#/db/schema'
import { requireAuthMiddleware } from '#/middleware/require-auth'
import { folderNameZodSchema } from '#/zod-schema/folder/name'
import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq, isNull } from 'drizzle-orm'
import z from 'zod'

export const createFolder = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware])
  .validator(
    z.object({
      name: folderNameZodSchema,
      parentFolderId: z.string().uuid().nullable(),
    }),
  )
  .handler(
    async ({
      context: {
        user: { id: userId },
      },
      data: { name: folderName, parentFolderId },
    }) => {
      const [newFolder] = await db
        .insert(folderTable)
        .values({
          name: folderName,
          parentFolderId,
          userId,
        })
        .returning()

      return newFolder
    },
  )

export const getFolders = createServerFn({ method: 'GET' })
  .middleware([requireAuthMiddleware])
  .validator(
    z.object({
      parentFolderId: z.string().uuid().nullable(),
    }),
  )
  .handler(
    async ({
      context: {
        user: { id: userId },
      },
    }) => {
      const folders = await db.query.folderTable.findMany({
        where: and(
          eq(folderTable.userId, userId),
          isNull(folderTable.parentFolderId),
        ),
        orderBy: desc(folderTable.createdAt),
      })

      return folders
    },
  )

export const deleteFolder = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware])
  .validator(
    z.object({
      folderId: z.string().uuid(),
    }),
  )
  .handler(
    async ({
      context: {
        user: { id: userId },
      },
      data: { folderId },
    }) => {
      const folder = await db.query.folderTable.findFirst({
        where: and(
          eq(folderTable.id, folderId),
          eq(folderTable.userId, userId),
        ),
      })

      if (!folder) return { error: 'پوشه یافت نشد.' }

      await db.delete(folderTable).where(eq(folderTable.id, folderId))

      return { error: null }
    },
  )

export type Folder = Awaited<ReturnType<typeof getFolders>>[number]
