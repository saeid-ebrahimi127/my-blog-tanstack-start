import { useSpToast } from '#/hooks/use-sp-toast'
import { getAppBootstrapData } from '#/serverfn/app-bootstrap'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/_main-layout')({
  component: RouteComponent,
  async beforeLoad() {
    const { user } = await getAppBootstrapData()
    return { user }
  },
  validateSearch: z.object({
    error: z.string().optional(),
    success: z.string().optional(),
  }),
})

function RouteComponent() {
  const { error, success } = Route.useSearch()

  useSpToast({ error, success })

  return <Outlet />
}
