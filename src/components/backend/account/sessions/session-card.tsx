import { DeleteSessionBtn } from '#/components/backend/account/sessions/delete-session-btn'
import {
  getOsIcon,
  getOsName,
} from '#/components/backend/account/sessions/helpers'
import type { Session } from 'better-auth'

export const SessionCard = ({
  session,
}: {
  session: Session & { isCurrent: boolean }
}) => {
  const Icon = getOsIcon(session.userAgent)

  return (
    <div
      key={session.id}
      className="flex items-start justify-between gap-4 rounded-xl border p-4"
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <div className="rounded-full border p-2">
          <Icon className="size-5" />
        </div>
        <div className="text-muted-foreground space-y-1 text-xs sm:text-sm">
          <div className="text-sm font-medium text-black sm:text-base">
            {getOsName(session.userAgent)}{' '}
            {session.isCurrent && (
              <span className="text-primary">(فعلی)</span>
            )}{' '}
          </div>
          <div>آی پی: {session.ipAddress}</div>
          <div>
            تاریخ و زمان ایجاد:{' '}
            {new Date(session.createdAt).toLocaleDateString('fa-IR')}
            {' ، '}
            {new Date(session.createdAt).toLocaleTimeString('fa-IR')}
          </div>
          <div className="mt-2 sm:hidden">
            {!session.isCurrent && <DeleteSessionBtn token={session.token} />}
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        {!session.isCurrent && <DeleteSessionBtn token={session.token} />}
      </div>
    </div>
  )
}
