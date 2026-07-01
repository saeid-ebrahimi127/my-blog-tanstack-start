import { useFolderCtx } from '#/components/media-dialog/body'
import { DropdownMenuItem } from '#/components/ui/dropdown-menu'
import { foldersQueryKeyPrefix } from '#/hooks/use-folders'
import { errorMessage } from '#/lib/message'
import { deleteFolder } from '#/serverfn/folder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Loader2Icon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

export const DeleteFolder = ({ folderId }: { folderId: string }) => {
  const { parentFolderId } = useFolderCtx()

  const deleteFolderFn = useServerFn(deleteFolder)

  const queryClient = useQueryClient()

  const deleteFolderMutation = useMutation({
    mutationFn: (data: { folderId: string }) => deleteFolderFn({ data }),
    onSuccess: ({ error }) => {
      if (error) {
        toast.error(error)

        return
      }

      return queryClient.invalidateQueries({
        queryKey: [foldersQueryKeyPrefix, { parentFolderId }],
        exact: true,
      })
    },
    onError: () => {
      toast.error(errorMessage['generic'])
    },
    onSettled(data) {
      if (data && !data.error) {
        toast.success('پوشه حذف شد.')
      }
    },
  })

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={deleteFolderMutation.isPending}
      onSelect={(e) => {
        e.preventDefault()

        deleteFolderMutation.mutate({ folderId })
      }}
    >
      {deleteFolderMutation.isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <TrashIcon />
      )}
      {deleteFolderMutation.isPending ? 'در حال حذف کردن...' : 'حذف'}
    </DropdownMenuItem>
  )
}
