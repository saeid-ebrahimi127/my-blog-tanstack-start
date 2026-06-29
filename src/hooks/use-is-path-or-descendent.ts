import { useRouterState } from '@tanstack/react-router'
import type { NavigateOptions } from '@tanstack/react-router'

export const useIsPathOrDescendent = (path: NavigateOptions['to']) => {
  return useRouterState({
    select(state) {
      if (!path) return false

      const { pathname } = state.location

      if (path === '/') {
        return pathname === '/'
      }

      const prefix = path.endsWith('/') ? path : `${path}/`
      return pathname === path || pathname.startsWith(prefix)
    },
  })
}
