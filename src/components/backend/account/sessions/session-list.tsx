import { RefetchSessions } from '#/components/backend/account/sessions/refetch-sessions'
import { SessionCard } from '#/components/backend/account/sessions/session-card'
import { SessionListSkeleton } from '#/components/backend/account/sessions/session-list-skeleton'
import { ReactQueryErrorBoundary } from '#/components/react-query-error-boundary'
import { useSessions } from '#/hooks/use-sessions'
import { Suspense } from 'react'

export const SessionsList = () => {
  return (
    <ReactQueryErrorBoundary errorMessage="خطا در دریافت لیست نشست ها!">
      <Suspense fallback={<SessionListSkeleton />}>
        <SessionsListSuspense />
      </Suspense>
    </ReactQueryErrorBoundary>
  )
}

const SessionsListSuspense = () => {
  const { data: sessions, refetch, isRefetching } = useSessions()

  return (
    <div className="flex flex-col gap-3">
      <div className="mr-auto">
        <RefetchSessions isRefetching={isRefetching} refetch={refetch} />
      </div>
      <div className="space-y-4">
        {sessions.map((session) => (
          <SessionCard session={session} key={session.id} />
        ))}
      </div>
    </div>
  )
}
