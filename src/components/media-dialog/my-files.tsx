import { CreateFolderForm } from '#/components/form/folder/create-folder'
import { FolderBreadcrumbs } from '#/components/media-dialog/folder/folder-breadcrumbs'
import { FolderList } from '#/components/media-dialog/folder/folder-list'
import { ReactQueryErrorBoundary } from '#/components/react-query-error-boundary'

export const MediaDialogMyFiles = () => {
  return (
    <div className="space-y-6">
      <CreateFolderForm />
      <FolderBreadcrumbs />
      <ReactQueryErrorBoundary
        errorMessage="خطا در دریافت پوشه ها!"
        textSize="text-xs"
      >
        <FolderList />
      </ReactQueryErrorBoundary>
    </div>
  )
}
