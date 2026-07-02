import { errorMessage } from '#/lib/message'
import { requireAuthApiMiddleware } from '#/middleware/require-auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/file')({
  server: {
    middleware: [requireAuthApiMiddleware],
    handlers: {
      POST: async () => {
        try {
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
