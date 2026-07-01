import { foldersQueryKeyPrefix } from '#/hooks/use-folders'
import { sessionsQueryKey } from '#/hooks/use-sessions'
import { authClient } from '#/lib/auth-client'
import {
  betterAuthToastError,
  errorMessage,
  successMessage,
} from '#/lib/message'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const handler = async () => {
    try {
      setIsPending(true)

      const { error } = await authClient.signOut()

      if (error) {
        betterAuthToastError(error)

        return
      }

      queryClient.removeQueries({
        queryKey: sessionsQueryKey,
        exact: true,
      })

      queryClient.removeQueries({
        queryKey: [foldersQueryKeyPrefix],
        exact: true,
      })

      await navigate({ to: '/login', replace: true })

      toast.success(successMessage['logoutSuccess'])
    } catch {
      toast.error(errorMessage['generic'])
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handler }
}
