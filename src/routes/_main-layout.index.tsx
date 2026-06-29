import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import { LayoutDashboardIcon, UserKeyIcon } from 'lucide-react'

export const Route = createFileRoute('/_main-layout/')({ component: Home })

function Home() {
  const { user } = useRouteContext({ from: '/_main-layout' })
  return (
    <MainCenteredLayout>
      <div className="mx-auto w-full max-w-sm text-center">
        <div className="flex-col-center gap-1">
          <Logo />
          <p className="text-sm">مکانی برای نوشتن و دیده شدن</p>
        </div>
        <Button type="button" asChild className="mt-4">
          <Link to={user ? '/dashboard' : '/login'}>
            {user ? <LayoutDashboardIcon /> : <UserKeyIcon />}
            {user ? 'پیشخوان' : 'اول وارد شو!'}
          </Link>
        </Button>
      </div>
    </MainCenteredLayout>
  )
}
