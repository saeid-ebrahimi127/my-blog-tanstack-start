import { useFolderCtx } from '#/components/media-dialog/body'
import { FolderCard } from '#/components/media-dialog/folder/folder-card'
import { useFolders } from '#/hooks/use-folders'
import { Suspense } from 'react'

export const FolderList = () => {
  return (
    <Suspense fallback={<div></div>}>
      <FolderListSuspense />
    </Suspense>
  )
}

const FolderListSuspense = () => {
  const { parentFolderId } = useFolderCtx()

  const { data: folders } = useFolders({ parentFolderId })

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
