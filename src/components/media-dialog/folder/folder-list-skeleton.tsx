import { Skeleton } from '#/components/ui/skeleton'

export const FolderCardSkeleton = () => {
  return (
    <div className="flex w-28 flex-col items-center gap-2 rounded-xl border p-4">
      <Skeleton className="size-10 shrink-0 rounded-md" />
      <div className="flex w-full flex-col items-center gap-1 px-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}

export const FolderListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <FolderCardSkeleton key={i} />
      ))}
    </div>
  )
}
