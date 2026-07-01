import { CustomAlertDialog } from '#/components/custom-alert-dialog'
import { Button } from '#/components/ui/button'
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
    <CustomAlertDialog
      alertDialogTrigger={
        <Button
          type="button"
          disabled={mutation.isPending}
          variant="destructive"
          size="icon"
        >
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
      }
      alertDialogActionText="بله"
      alertDialogDescription="آیا مطمئن هستید می خواهید این نشست را حذف کنید؟"
      alertDialogActionOnClick={() => {
        mutation.mutate({ token })
      }}
      withTooltip
      tooltipContent="حذف"
    />
  )
}
