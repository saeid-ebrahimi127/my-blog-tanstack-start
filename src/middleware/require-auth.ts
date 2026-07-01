import { getUser } from '#/lib/user.server'
import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

export const requireAuthApiMiddleware = createMiddleware({
  type: 'request',
}).server(async ({ next }) => {
  const user = await getUser()

  if (!user) return Response.json({}, { status: 401 })

  return next({ context: { user: { id: user.id, image: user.image } } })
})

export const requireAuthMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  const user = await getUser()

  if (!user) {
    throw redirect({ to: '/login', replace: true })
  }

  return next({ context: { user: { id: user.id, image: user.image } } })
})
