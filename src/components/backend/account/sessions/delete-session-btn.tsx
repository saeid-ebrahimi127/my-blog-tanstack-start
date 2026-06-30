import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { sessionsQueryKey } from '#/hooks/use-sessions'
import { authClient } from '#/lib/auth-client'
import { betterAuthToastError, errorMessage } from '#/lib/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const DeleteSessionBtn = ({ token }: { token: string }) => {
  const abortControllerRef = useRef<InstanceType<
    typeof AbortController
  > | null>(null)

  const queryClient = useQueryClient()

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  const mutation = useMutation({
    onMutate() {
      abortControllerRef.current = new AbortController()
    },
    mutationFn({ token }: { token: string }) {
      return authClient.revokeSession({
        token,
        fetchOptions: { signal: abortControllerRef.current?.signal },
      })
    },
    onSuccess(data) {
      if (data.error) {
        betterAuthToastError(data.error)

        return
      }

      return queryClient.invalidateQueries({
        queryKey: sessionsQueryKey,
        exact: true,
      })
    },
    onError() {
      toast.error(errorMessage['generic'])
    },
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          disabled={mutation.isPending}
          variant="destructive"
          size="icon"
          onClick={() => {
            if (!confirm('آیا مطمئن هستید می خواهید این نشست را حذف کنید؟'))
              return

            mutation.mutate({ token })
          }}
        >
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>حذف</TooltipContent>
    </Tooltip>
  )
}
