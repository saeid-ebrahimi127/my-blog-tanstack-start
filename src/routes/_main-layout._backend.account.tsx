import { AccountPublicInfo } from '#/components/backend/account/public-info'
import { AccountUserAvatar } from '#/components/backend/account/user-avatar'
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
          <TabsList>
            <TabsTrigger value="public-info">اطلاعات عمومی</TabsTrigger>
            <TabsTrigger value="user-avatar">تصویر کاربری</TabsTrigger>
          </TabsList>
          <TabsContent value="public-info">
            <AccountPublicInfo />
          </TabsContent>
          <TabsContent value="user-avatar">
            <AccountUserAvatar />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
