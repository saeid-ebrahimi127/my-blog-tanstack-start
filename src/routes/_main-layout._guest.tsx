import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_guest')({
  component: RouteComponent,
  beforeLoad({ context: { user }, search: { error, success } }) {
    if (user)
      throw redirect({ to: '/', replace: true, search: { error, success } })
  },
})

function RouteComponent() {
  return <Outlet />
}
