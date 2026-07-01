import { pageTitle } from '#/lib/head'
import { createFileRoute } from '@tanstack/react-router'

const title = 'رسانه'

export const Route = createFileRoute('/_main-layout/_backend/media')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle(title) }] }
  },
})

function RouteComponent() {
  return (
    <div className="border-b bg-white p-4">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}
