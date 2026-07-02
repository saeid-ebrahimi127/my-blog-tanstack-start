import { CreateFolderForm } from '#/components/form/folder/create-folder'
import { FolderBreadcrumbs } from '#/components/media-dialog/folder/folder-breadcrumbs'
import { FolderList } from '#/components/media-dialog/folder/folder-list'
import { ReactQueryErrorBoundary } from '#/components/react-query-error-boundary'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, use, useState } from 'react'

export const MediaDialogBody = () => {
  return (
    <div className="flex-1 scrollbar-thin overflow-y-auto p-4">
      <Folders />
    </div>
  )
}

const Folders = () => {
  return (
    <FolderProvider>
      <CreateFolderForm />
      <ReactQueryErrorBoundary
        errorMessage="خطا در دریافت پوشه ها!"
        textSize="text-xs"
      >
        <FolderBreadcrumbs />
        <FolderList />
      </ReactQueryErrorBoundary>
    </FolderProvider>
  )
}

export type FolderCrumb = { id: string; name: string }

const FolderCtx = createContext<{
  path: FolderCrumb[]
  parentFolderId: string | null
  setPath: Dispatch<SetStateAction<FolderCrumb[]>>
  navigateToFolder: (folder: FolderCrumb) => void
  navigateToCrumb: (index: number) => void
} | null>(null)

const FolderProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState<FolderCrumb[]>([])

  const parentFolderId = path.length > 0 ? path[path.length - 1].id : null

  const navigateToFolder = (folder: FolderCrumb) => {
    setPath((prev) => [...prev, folder])
  }

  const navigateToCrumb = (index: number) => {
    setPath((prev) => (index === -1 ? [] : prev.slice(0, index + 1)))
  }

  return (
    <FolderCtx
      value={{
        path,
        parentFolderId,
        setPath,
        navigateToFolder,
        navigateToCrumb,
      }}
    >
      <div className="space-y-6">{children}</div>
    </FolderCtx>
  )
}

export const useFolderCtx = () => {
  const ctx = use(FolderCtx)

  if (!ctx)
    throw new Error('useFolderCtx must be used inside of FolderProvider.')

  return ctx
}
