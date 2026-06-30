import { readAvatar } from '#/lib/avatar.server'
import { errorMessage } from '#/lib/message'
import { fileNameZodSchema } from '#/zod-schema/field/file'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/avatar_/$fileName')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const { error, data: fileName } = fileNameZodSchema.safeParse(
            params.fileName,
          )

          if (error)
            return Response.json(
              { error: errorMessage['fileNameInvalid'] },
              { status: 400 },
            )

          const buffer = await readAvatar(fileName)

          if (!buffer) return Response.json({}, { status: 404 })

          return new Response(buffer, {
            headers: {
              'content-type': 'image/webp',
              'content-disposition': `inline; filename="${fileName}"`,
              'cache-control': 'public, max-age=31536000, immutable',
            },
          })
        } catch {
          return Response.json({}, { status: 404 })
        }
      },
    },
  },
})
