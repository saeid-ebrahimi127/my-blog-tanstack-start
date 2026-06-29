import { ResendVerificationForm } from '#/components/form/resend-account-verification'
import { CardLayout } from '#/components/layout/card'
import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { pageTitle } from '#/lib/head'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const title = 'ارسال مجدد ایمیل تایید حساب کاربری'

export const Route = createFileRoute(
  '/_main-layout/_guest/resend-account-verification',
)({
  component: RouteComponent,
  head() {
    return {
      meta: [{ title: pageTitle(title) }],
    }
  },
})

function RouteComponent() {
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
        <CardLayout title={title} description="ایمیل خود را وارد نمایید.">
          <ResendVerificationForm />
          {backToLogin}
        </CardLayout>
      </div>
    </MainCenteredLayout>
  )
}
