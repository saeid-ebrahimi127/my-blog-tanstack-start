import { errorMessage } from '#/lib/message'
import { useNavigate } from '@tanstack/react-router'
import { isCancel } from 'axios'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useHandleAxiosError = () => {
  const navigate = useNavigate()

  const handleAxiosError = async (e: AxiosError) => {
    if (isCancel(e)) {
      toast.error(errorMessage['requestCancelled'])

      return
    }

    const status = e.response?.status

    if (status === 401) {
      await navigate({ to: '/login', replace: true })

      return
    }

    const data = e.response?.data

    if (
      typeof data === 'object' &&
      data !== null &&
      'error' in data &&
      typeof data.error === 'string'
    ) {
      toast.error(data.error)

      return
    }
  }

  return { handleAxiosError }
}
