import { errorMessage, successMessage } from '#/lib/message'
import type { ErrorMessageKeys, SuccessMessageKeys } from '#/lib/message'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useSpToast = ({
  error,
  success,
}: {
  error?: string
  success?: string
}) => {
  const navigate = useNavigate()
  const shown = useRef(false)

  useEffect(() => {
    if (shown.current) return
    if (!error && !success) return

    shown.current = true

    if (error) {
      toast.error(
        errorMessage[error as ErrorMessageKeys] || errorMessage['generic'],
      )
    } else if (success) {
      const message = successMessage[success as SuccessMessageKeys]

      if (message) {
        toast.success(message)
      }
    }

    navigate({ to: '.', search: {}, replace: true })
  }, [success, error, navigate])
}
