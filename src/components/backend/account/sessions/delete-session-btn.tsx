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
import { Loader2Icon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

export const DeleteSessionBtn = ({ token }: { token: string }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn({ token }: { token: string }) {
      return authClient.revokeSession({
        token,
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
    onSettled(data) {
      if (data && !data.error) {
        toast.success('نشست حذف شد.')
      }
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
            mutation.mutate({ token })
          }}
        >
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>حذف</TooltipContent>
    </Tooltip>
  )
}
