import { LoginForm } from '#/components/form/login'
import { RegisterForm } from '#/components/form/register'
import { CardLayout } from '#/components/layout/card'
import { MainCenteredLayout } from '#/components/layout/main-centered'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { pageTitle } from '#/lib/head'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_main-layout/_guest/login')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle('ورود') }] }
  },
})

function RouteComponent() {
  const [tab, setTab] = useState('login')

  return (
    <MainCenteredLayout>
      <div className="mx-auto w-full max-w-sm">
        <div className="flex-center mb-4">
          <Logo />
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="register">ثبت نام</TabsTrigger>
            <TabsTrigger value="login">ورود</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <CardLayout
              title="ثبت نام"
              description="برای ثبت نام تمامی موارد زیر الزامی است."
            >
              <RegisterForm onSuccess={() => setTab('login')} />
            </CardLayout>
          </TabsContent>
          <TabsContent value="login">
            <CardLayout
              title="ورود"
              description="برای ورود ایمیل و رمز عبور خود را وارد کنید."
            >
              <LoginForm />
            </CardLayout>
          </TabsContent>
        </Tabs>
        <Button type="button" asChild className="mt-6 w-full" variant="outline">
          <Link to="/">
            <ChevronLeftIcon />
            بازگشت به خانه
          </Link>
        </Button>
      </div>
    </MainCenteredLayout>
  )
}
