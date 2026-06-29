import { auth } from '#/lib/auth'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const getUser = async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  return session?.user
}
