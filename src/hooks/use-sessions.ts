import { authClient } from '#/lib/auth-client'
import { useSuspenseQuery } from '@tanstack/react-query'

export const sessionsQueryKey = ['sessions']

export const useSessions = () => {
  return useSuspenseQuery({
    queryKey: sessionsQueryKey,
    async queryFn({ signal }) {
      const [{ data, error }, { data: current }] = await Promise.all([
        authClient.listSessions({ fetchOptions: { signal } }),
        authClient.getSession({ fetchOptions: { signal } }),
      ])

      if (error) throw new Error('failed to get sessions.')

      return data.map((session) => ({
        ...session,
        isCurrent: session.token === current?.session.token,
      }))
    },
    staleTime: Infinity,
  })
}
