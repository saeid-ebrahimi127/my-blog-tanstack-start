import { db } from '#/db'
import { folderTable } from '#/db/schema'
import { requireAuthMiddleware } from '#/middleware/require-auth'
import { folderNameZodSchema } from '#/zod-schema/folder/name'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

export const createFolder = createServerFn({ method: 'POST' })
  .middleware([requireAuthMiddleware])
  .validator(
    z.object({
      name: folderNameZodSchema,
    }),
  )
  .handler(
    async ({
      context: {
        user: { id: userId },
      },
      data: { name: folderName },
    }) => {
      const [newFolder] = await db
        .insert(folderTable)
        .values({
          name: folderName,
          userId,
        })
        .returning()

      return newFolder
    },
  )
