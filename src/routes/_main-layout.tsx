import { useFlashMessageToast } from '#/hooks/use-flash-message-toast'
import { getAppBootstrapData } from '#/serverfn/app-bootstrap'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout')({
  component: RouteComponent,
  async beforeLoad() {
    const { user, flashMessage } = await getAppBootstrapData()
    return { user, flashMessage }
  },
})

function RouteComponent() {
  const { flashMessage } = Route.useRouteContext()

  useFlashMessageToast({ flashMessage })

  return <Outlet />
}
