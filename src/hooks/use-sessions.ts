import { authClient } from '#/lib/auth-client'
import { useQuery } from '@tanstack/react-query'

export const sessionsQueryKey = ['sessions']

export const useSessions = () => {
  return useQuery({
    queryKey: sessionsQueryKey,
    async queryFn({ signal }) {
      const [sessionsList, currentSession] = await Promise.all([
        authClient.listSessions({ fetchOptions: { signal } }),
        authClient.getSession({ fetchOptions: { signal } }),
      ])

      if (sessionsList.error) throw new Error('failed to get sessions.')
      if (currentSession.error)
        throw new Error('failed to get current session.')

      return sessionsList.data
        .map((session) => ({
          ...session,
          isCurrent: session.token === currentSession.data?.session.token,
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
    },
    staleTime: Infinity,
    refetchOnMount: true,
    throwOnError: true,
  })
}
