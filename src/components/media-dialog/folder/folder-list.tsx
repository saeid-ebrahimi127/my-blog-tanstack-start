import { useFolderCtx } from '#/components/media-dialog/body'
import { FolderCard } from '#/components/media-dialog/folder/folder-card'
import { useFolders } from '#/hooks/use-folders'

export const FolderList = () => {
  const { parentFolderId } = useFolderCtx()

  const { isPending, isError, data: folders } = useFolders({ parentFolderId })

  if (isPending) return null

  if (isError) return null

  return folders.length > 0 ? (
    <div className="flex flex-wrap gap-4">
      {folders.map((folder) => {
        return <FolderCard key={folder.id} folder={folder} />
      })}
    </div>
  ) : (
    <p className="text-muted-foreground text-xs italic">
      هیچ پوشه ای یافت نشد.
    </p>
  )
}
