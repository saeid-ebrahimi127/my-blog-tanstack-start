import { useFolderCtx } from '#/components/media-dialog/body'
import { DropdownMenuItem } from '#/components/ui/dropdown-menu'
import { foldersQueryKeyPrefix } from '#/hooks/use-folders'
import { errorMessage } from '#/lib/message'
import { deleteFolder } from '#/serverfn/folder'
import { useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Loader2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export const DeleteFolder = ({ folderId }: { folderId: string }) => {
  const [isPending, setIsPending] = useState(false)

  const { parentFolderId } = useFolderCtx()

  const deleteFolderFn = useServerFn(deleteFolder)

  const queryClient = useQueryClient()

  const abortControllerRef = useRef(new AbortController())

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort()
    }
  }, [])

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onSelect={async (e) => {
        e.preventDefault()

        if (
          !confirm(
            'با اینکار تمامی پوشه ها و فایل های داخل این پوشه از بین می روند. ادامه می دهید؟',
          )
        )
          return false

        try {
          setIsPending(true)

          abortControllerRef.current = new AbortController()

          const { error } = await deleteFolderFn({
            data: { folderId },
            signal: abortControllerRef.current.signal,
          })

          if (error) {
            toast.error(error)

            return
          }

          queryClient.invalidateQueries({
            queryKey: [foldersQueryKeyPrefix, { parentFolderId }],
            exact: true,
          })

          toast.success('پوشه حذف شد.')
        } catch {
          toast.error(errorMessage['generic'])
        } finally {
          setIsPending(false)
        }
      }}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <TrashIcon />}
      {isPending ? 'در حال حذف کردن...' : 'حذف'}
    </DropdownMenuItem>
  )
}
