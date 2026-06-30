import { getUser } from '#/lib/user.server'
import { createMiddleware } from '@tanstack/react-start'

export const requireAuthApiMiddleware = createMiddleware({
  type: 'request',
}).server(async ({ next }) => {
  const user = await getUser()

  if (!user) return Response.json({}, { status: 401 })

  return next({ context: { user: { id: user.id, image: user.image } } })
})
