import { DeleteSelectedFile } from '#/components/media-dialog/uploader/delete-selected-file'
import { FileDetails } from '#/components/media-dialog/uploader/file-details'
import type { SelectedFile } from '#/components/media-dialog/uploader/types'

export const ShowSelectedFile = ({
  selectedFile,
}: {
  selectedFile: SelectedFile
}) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border p-2">
      <p className="truncate">{selectedFile.name}</p>
      <div className="flex items-center gap-2">
        <FileDetails fileName={selectedFile.name} />
        <DeleteSelectedFile fileName={selectedFile.name} />
      </div>
    </div>
  )
}
