import { pageTitle } from '#/lib/head'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_backend/dashboard')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: pageTitle('پیشخوان') }] }
  },
})

function RouteComponent() {
  return null
}
