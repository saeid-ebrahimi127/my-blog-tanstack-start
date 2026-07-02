import { AccountChangePassword } from '#/components/backend/account/change-password'
import { AccountPublicInfo } from '#/components/backend/account/public-info'
import { AccountSessions } from '#/components/backend/account/sessions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { pageTitle } from '#/lib/head'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_backend/account')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle('حساب کاربری') }] }
  },
})

function RouteComponent() {
  return (
    <>
      <div className="border-b bg-white p-4">
        <h1 className="text-xl font-semibold">حساب کاربری</h1>
      </div>
      <div className="p-4">
        <Tabs defaultValue="public-info">
          <TabsList className="h-full! flex-wrap">
            <TabsTrigger value="public-info">اطلاعات عمومی</TabsTrigger>
            <TabsTrigger value="change-password">تغییر رمز عبور</TabsTrigger>
            <TabsTrigger value="sessions">نشست ها (sessions)</TabsTrigger>
          </TabsList>
          <TabsContent value="public-info">
            <AccountPublicInfo />
          </TabsContent>
          <TabsContent value="change-password">
            <AccountChangePassword />
          </TabsContent>
          <TabsContent value="sessions">
            <AccountSessions />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
