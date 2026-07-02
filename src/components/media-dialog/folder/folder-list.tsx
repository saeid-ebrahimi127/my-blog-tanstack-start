import { useMediaDialog } from '#/components/media-dialog'
import { FolderCard } from '#/components/media-dialog/folder/folder-card'
import { FolderListSkeleton } from '#/components/media-dialog/folder/folder-list-skeleton'
import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { useFolders } from '#/hooks/use-folders'
import { cn } from '#/lib/utils'
import { Loader2Icon, RefreshCwIcon } from 'lucide-react'

export const FolderList = () => {
  const { pathIds } = useMediaDialog()

  const {
    isPending,
    isError,
    data: folders,
    isFetching: foldersFetching,
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
            disabled={foldersFetching}
            onClick={() => {
              refetch()
            }}
            size="icon"
          >
            {foldersFetching ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <RefreshCwIcon />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>بروزرسانی</TooltipContent>
      </Tooltip>
      <div
        className={cn({
          'opacity-50': foldersFetching,
        })}
      >
        {folders.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {folders.map((folder) => {
              return (
                <FolderCard
                  foldersFetching={foldersFetching}
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
    </div>
  )
}
