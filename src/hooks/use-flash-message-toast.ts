import type { ErrorMessageKeys, SuccessMessageKeys } from '#/lib/message'
import { errorMessage, successMessage } from '#/lib/message'
import type { FlashMessage } from '#/lib/session.server'
import { clearFlashMessage } from '#/serverfn/session'
import { useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useFlashMessageToast = ({
  flashMessage,
}: {
  flashMessage?: FlashMessage
}) => {
  const clearFlashMessageFn = useServerFn(clearFlashMessage)

  const navigate = useNavigate()
  const shown = useRef(false)

  useEffect(() => {
    if (!flashMessage || !Object.keys(flashMessage).length || shown.current)
      return

    if (!flashMessage.error && !flashMessage.success) return

    shown.current = true

    if (flashMessage.error) {
      toast.error(
        errorMessage[flashMessage.error as ErrorMessageKeys] ||
          errorMessage['generic'],
      )
    } else if (flashMessage.success) {
      const message = successMessage[flashMessage.success as SuccessMessageKeys]

      if (message) {
        toast.success(message)
      }
    }

    clearFlashMessageFn()
  }, [clearFlashMessageFn, flashMessage, navigate])
}
