import { ResendVerificationForm } from '#/components/form/resend-verification'
import { CardLayout } from '#/components/layout/card'
import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { pageTitle } from '#/lib/head'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

export const Route = createFileRoute(
  '/_main-layout/_guest/resend-verification',
)({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle('ارسال مجدد ایمیل تایید') }] }
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
          title="ارسال مجدد ایمیل تایید"
          description="ایمیل خود را وارد نمایید."
        >
          <ResendVerificationForm />
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
