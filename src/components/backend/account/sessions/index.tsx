import { SessionsList } from '#/components/backend/account/sessions/session-list'
import { CardLayout } from '#/components/layout/card'

export const AccountSessions = () => {
  return (
    <CardLayout
      title="نشست ها"
      description="در اینجا می توانید نشست های خود را مدیریت کنید."
    >
      <SessionsList />
    </CardLayout>
  )
}
