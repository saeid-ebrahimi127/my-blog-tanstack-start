import { ChangePasswordForm } from '#/components/form/change-password'
import { CardLayout } from '#/components/layout/card'
import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { pageTitle } from '#/lib/head'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import z from 'zod'

const title = 'تغییر رمز عبور'

export const Route = createFileRoute('/_main-layout/_guest/change-password')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle(title) }] }
  },
  validateSearch: z.object({ token: z.string().min(1) }),
  onError() {
    throw redirect({ to: '/login', replace: true })
  },
})

function RouteComponent() {
  const { token } = Route.useSearch()

  const backToLogin = (
    <Button type="button" asChild className="mt-6 w-full" variant="outline">
      <Link to="/login">
        <ChevronLeftIcon />
        بازگشت به صفحه ی ورود
      </Link>
    </Button>
  )

  return (
    <MainCenteredLayout>
      <div className="mx-auto w-full max-w-sm">
        <div className="flex-center mb-4">
          <Logo />
        </div>
        <CardLayout title={title} description="رمز عبور جدید خود را وارد کنید.">
          <ChangePasswordForm token={token} />
          {backToLogin}
        </CardLayout>
      </div>
    </MainCenteredLayout>
  )
}
