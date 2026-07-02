import { useFolderCtx } from '#/components/media-dialog/body'
import { FolderCard } from '#/components/media-dialog/folder/folder-card'
import { FolderListSkeleton } from '#/components/media-dialog/folder/folder-list-skeleton'
import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { useFolders } from '#/hooks/use-folders'
import { Loader2Icon, RefreshCwIcon } from 'lucide-react'

export const FolderList = () => {
  const { pathIds } = useFolderCtx()

  const {
    isPending,
    isError,
    data: folders,
    isRefetching,
    refetch,
  } = useFolders({ path: pathIds })

  if (isPending) return <FolderListSkeleton />

  if (isError) return null

  return (
    <div className="space-y-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            disabled={isRefetching}
            onClick={() => {
              refetch()
            }}
            size="icon"
          >
            {isRefetching ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <RefreshCwIcon />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>بروزرسانی</TooltipContent>
      </Tooltip>
      {folders.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {folders.map((folder) => {
            return (
              <FolderCard
                foldersRefetching={isRefetching}
                key={folder.id}
                folder={folder}
              />
            )
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-xs italic">
          هیچ پوشه ای یافت نشد.
        </p>
      )}
    </div>
  )
}
