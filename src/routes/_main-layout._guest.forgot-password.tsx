import { ForgotPasswordForm } from '#/components/form/forgot-password'
import { CardLayout } from '#/components/layout/card'
import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { pageTitle } from '#/lib/head'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const title = 'فراموشی رمز عبور'

export const Route = createFileRoute('/_main-layout/_guest/forgot-password')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle(title) }] }
  },
})

function RouteComponent() {
  return (
    <MainCenteredLayout>
      <div className="mx-auto w-full max-w-sm">
        <div className="flex-center mb-4">
          <Logo />
        </div>
        <CardLayout
          title={title}
          description="ایمیل خود را وارد کنید تا ایمیل تغییر رمز عبور برای شما ارسال گردد."
        >
          <ForgotPasswordForm />
        </CardLayout>
        <Button type="button" asChild className="mt-6 w-full" variant="outline">
          <Link to="/login">
            <ChevronLeftIcon />
            بازگشت به صفحه ی ورود
          </Link>
        </Button>
      </div>
    </MainCenteredLayout>
  )
}
