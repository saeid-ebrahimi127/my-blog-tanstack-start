import { getAppBootstrapData } from '#/serverfn/app-bootstrap'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout')({
  component: RouteComponent,
  async beforeLoad() {
    const { user } = await getAppBootstrapData()
    return { user }
  },
})

function RouteComponent() {
  return <Outlet />
}
