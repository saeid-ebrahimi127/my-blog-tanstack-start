import { CreateFolderForm } from '#/components/form/folder/create-folder'

export const MediaDialogBody = () => {
  return (
    <div className="flex-1 scrollbar-thin overflow-y-auto p-4">
      <Folders />
    </div>
  )
}

const Folders = () => {
  return (
    <div className="space-y-4">
      <CreateFolderForm />
    </div>
  )
}
