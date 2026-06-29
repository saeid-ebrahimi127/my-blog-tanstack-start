import { BackendSidebar } from '#/components/backend/sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_backend')({
  component: RouteComponent,
  beforeLoad({ context: { user } }) {
    if (!user) throw redirect({ to: '/login', replace: true })
    return { currentUser: user }
  },
  ssr: false,
})

function RouteComponent() {
  return (
    <main className="flex">
      <BackendSidebar />
      <div className="h-screen flex-1 scrollbar-thin overflow-y-auto">
        <Outlet />
      </div>
    </main>
  )
}
