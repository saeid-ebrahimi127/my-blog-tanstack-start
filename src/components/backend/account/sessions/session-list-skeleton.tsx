import { Skeleton } from '#/components/ui/skeleton'

const SessionCardSkeleton = () => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <Skeleton className="size-9 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 sm:h-5" />
          <Skeleton className="h-2 w-28 sm:h-4 sm:w-32" />
          <Skeleton className="h-2 w-32 sm:h-4 sm:w-40" />
          <Skeleton className="mt-2 size-8 rounded-full sm:hidden" />
        </div>
      </div>
      <Skeleton className="hidden size-8 rounded-full sm:block" />
    </div>
  )
}

export const SessionListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <SessionCardSkeleton key={i} />
      ))}
    </div>
  )
}
