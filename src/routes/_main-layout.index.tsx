import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import { LayoutDashboardIcon, UserKeyIcon } from 'lucide-react'

export const Route = createFileRoute('/_main-layout/')({ component: Home })

function Home() {
  const { user } = useRouteContext({ from: '/_main-layout' })
  return (
    <MainCenteredLayout>
      <Button type="button" asChild>
        <Link to={user ? '/dashboard' : '/login'}>
          {user ? <LayoutDashboardIcon /> : <UserKeyIcon />}
          {user ? 'پیشخوان' : 'اول وارد شو!'}
        </Link>
      </Button>
    </MainCenteredLayout>
  )
}
