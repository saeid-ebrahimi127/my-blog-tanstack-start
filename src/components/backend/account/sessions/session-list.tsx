import { RefetchSessions } from '#/components/backend/account/sessions/refetch-sessions'
import { SessionCard } from '#/components/backend/account/sessions/session-card'
import { SessionListSkeleton } from '#/components/backend/account/sessions/session-list-skeleton'
import { useSessions } from '#/hooks/use-sessions'

export const SessionsList = () => {
  const {
    data: sessions,
    isError,
    refetch,
    isRefetching,
    isPending,
  } = useSessions()

  if (isPending) return <SessionListSkeleton />

  if (isError) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="mr-auto">
        <RefetchSessions isRefetching={isRefetching} refetch={refetch} />
      </div>
      <div className="space-y-4">
        {sessions.map((session) => (
          <SessionCard
            session={session}
            key={session.id}
            sessionsRefetching={isRefetching}
          />
        ))}
      </div>
    </div>
  )
}
