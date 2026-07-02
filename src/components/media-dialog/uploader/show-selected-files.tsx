import { useMediaDialogUploader } from '#/components/media-dialog/uploader/media-dialog-uploader-provider'
import { ShowSelectedFile } from '#/components/media-dialog/uploader/show-selected-file'

export const ShowSelectedFiles = () => {
  const { selectedFiles } = useMediaDialogUploader()

  return (
    selectedFiles.length > 0 && (
      <div className="space-y-3">
        {selectedFiles.map((selectedFile) => (
          <ShowSelectedFile
            selectedFile={selectedFile}
            key={selectedFile.name}
          />
        ))}
      </div>
    )
  )
}
