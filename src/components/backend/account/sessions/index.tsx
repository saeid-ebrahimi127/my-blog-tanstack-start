import { SessionsList } from '#/components/backend/account/sessions/session-list'
import { CardLayout } from '#/components/layout/card'
import { ReactQueryErrorBoundary } from '#/components/react-query-error-boundary'

export const AccountSessions = () => {
  return (
    <CardLayout
      title="نشست ها"
      description="در اینجا می توانید نشست های خود را مدیریت کنید."
    >
      <ReactQueryErrorBoundary errorMessage="خطا در دریافت نشست ها!">
        <SessionsList />
      </ReactQueryErrorBoundary>
    </CardLayout>
  )
}
