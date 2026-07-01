import { CreateFolderForm } from '#/components/form/folder/create-folder'
import { FolderList } from '#/components/media-dialog/folder/folder-list'
import { ReactQueryErrorBoundary } from '#/components/react-query-error-boundary'
import type { ReactNode } from 'react'
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
        <FolderList />
      </ReactQueryErrorBoundary>
    </FolderProvider>
  )
}

const FolderCtx = createContext<{ parentFolderId: string | null } | null>(null)

const FolderProvider = ({ children }: { children: ReactNode }) => {
  const [parentFolderId] = useState<string | null>(null)

  return (
    <FolderCtx value={{ parentFolderId }}>
      <div className="space-y-4">{children}</div>
    </FolderCtx>
  )
}

export const useFolderCtx = () => {
  const ctx = use(FolderCtx)

  if (!ctx)
    throw new Error('useFolderCtx must be used inside of FolderProvider.')

  return ctx
}
