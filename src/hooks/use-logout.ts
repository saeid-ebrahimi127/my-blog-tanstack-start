import { authClient } from '#/lib/auth-client'
import {
  betterAuthToastError,
  errorMessage,
  successMessage,
} from '#/lib/message'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()

  const handler = async () => {
    try {
      setIsPending(true)

      const { error } = await authClient.signOut()

      if (error) {
        betterAuthToastError(error)

        return
      }

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
