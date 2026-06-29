import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_backend')({
  component: RouteComponent,
  beforeLoad({ context: { user } }) {
    if (!user) throw redirect({ to: '/login', replace: true })
    return { currentUser: user }
  },
})

function RouteComponent() {
  return <Outlet />
}
