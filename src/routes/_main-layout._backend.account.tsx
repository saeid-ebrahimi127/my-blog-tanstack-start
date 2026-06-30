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
    <div className="border-b bg-white p-4">
      <h1 className="text-xl font-semibold">حساب کاربری</h1>
    </div>
  )
}
