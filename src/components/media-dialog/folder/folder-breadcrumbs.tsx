import { useFolderCtx } from '#/components/media-dialog/body'
import { ChevronLeftIcon, HomeIcon } from 'lucide-react'
import { Fragment } from 'react'

export const FolderBreadcrumbs = () => {
  const { path, navigateToCrumb } = useFolderCtx()

  if (path.length === 0) return null

  return (
    <nav className="flex flex-wrap items-center gap-1 text-xs">
      <button
        type="button"
        onClick={() => navigateToCrumb(-1)}
        className="hover:text-primary text-muted-foreground flex items-center gap-1"
      >
        <HomeIcon className="size-3.5" />
        خانه
      </button>
      {path.map((crumb, index) => {
        const isLast = index === path.length - 1

        return (
          <Fragment key={crumb.id}>
            <ChevronLeftIcon className="text-muted-foreground size-3.5" />
            <button
              type="button"
              disabled={isLast}
              onClick={() => navigateToCrumb(index)}
              className="hover:text-primary text-muted-foreground disabled:text-foreground disabled:hover:text-foreground disabled:font-medium"
            >
              {crumb.name}
            </button>
          </Fragment>
        )
      })}
    </nav>
  )
}
