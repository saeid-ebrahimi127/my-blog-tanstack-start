import { auth } from '#/lib/auth'
import { deleteAvatar, saveAvatar } from '#/lib/avatar.server'
import { errorMessage } from '#/lib/message'
import { requireAuthApiMiddleware } from '#/middleware/require-auth'
import { createFileZodSchema } from '#/zod-schema/field/file'
import { createFileRoute } from '@tanstack/react-router'

const fileMaxSizeBytes = 2 * 1024 * 1024
const fileValidMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

const avatarZodSchema = createFileZodSchema({
  maxSizeBytes: fileMaxSizeBytes,
  validMimes: fileValidMimes,
})

export const Route = createFileRoute('/api/avatar')({
  server: {
    middleware: [requireAuthApiMiddleware],
    handlers: {
      POST: async ({
        request,
        context: {
          user: { image: currentUserImage },
        },
      }) => {
        try {
          const formData = await request.formData()

          const { error, data: file } = avatarZodSchema.safeParse(
            formData.get('file'),
          )

          if (error) {
            return Response.json(
              { error: error.issues[0].message },
              { status: 400 },
            )
          }

          const buffer = Buffer.from(await file.arrayBuffer())

          const { imageURL } = await saveAvatar(buffer)

          await auth.api.updateUser({
            body: {
              image: imageURL,
            },
            headers: request.headers,
          })

          if (currentUserImage) {
            try {
              await deleteAvatar({
                fileName: currentUserImage.split('/').at(-1),
              })
            } catch (e) {
              console.error(e)
            }
          }

          return Response.json({}, { status: 201 })
        } catch {
          return Response.json(
            { error: errorMessage['generic'] },
            { status: 500 },
          )
        }
      },
      DELETE: async ({
        request,
        context: {
          user: { image: userImage },
        },
      }) => {
        try {
          if (!userImage) return new Response(undefined, { status: 204 })

          const result = await deleteAvatar({
            fileName: userImage.split('/').at(-1),
          })

          if (result?.error) {
            return Response.json(
              {
                error: errorMessage[result.error],
              },
              { status: 400 },
            )
          }

          await auth.api.updateUser({
            body: {
              image: null,
            },
            headers: request.headers,
          })

          return new Response(undefined, { status: 204 })
        } catch {
          return Response.json(
            { error: errorMessage['generic'] },
            { status: 500 },
          )
        }
      },
    },
  },
})
