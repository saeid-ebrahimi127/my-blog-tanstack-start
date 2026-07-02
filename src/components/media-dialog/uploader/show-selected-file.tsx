import { DeleteSelectedFile } from '#/components/media-dialog/uploader/delete-selected-file'
import { FileDetails } from '#/components/media-dialog/uploader/file-details'
import type { SelectedFile } from '#/components/media-dialog/uploader/types'
import { fileZodSchema } from '#/components/media-dialog/uploader/zod-schema/file'
import { useEffect, useState } from 'react'

export const ShowSelectedFile = ({
  selectedFile,
}: {
  selectedFile: SelectedFile
}) => {
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    const { error } = fileZodSchema.safeParse(selectedFile.file)

    if (error) {
      setValidationError(error.issues[0].message)
    }
  }, [selectedFile.file])

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border p-2">
      <div className="space-y-1 truncate">
        <p className="truncate">{selectedFile.name}</p>
        {validationError && (
          <p className="text-destructive truncate text-xs">{validationError}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!validationError && <FileDetails fileName={selectedFile.name} />}
        <DeleteSelectedFile fileName={selectedFile.name} />
      </div>
    </div>
  )
}
