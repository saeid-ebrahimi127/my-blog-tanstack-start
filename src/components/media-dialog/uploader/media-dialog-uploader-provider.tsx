import { PickFiles } from '#/components/media-dialog/uploader/pick-files'
import { ShowSelectedFiles } from '#/components/media-dialog/uploader/show-selected-files'
import type { SelectedFile } from '#/components/media-dialog/uploader/types'
import { createContext, use, useState } from 'react'

const MediaDialogUploaderCtx = createContext<{
  selectedFiles: SelectedFile[]
  removeSelectedFile: (fileName: string) => void
  selectFilesHandler: (files: File[]) => void
} | null>(null)

export const useMediaDialogUploader = () => {
  const ctx = use(MediaDialogUploaderCtx)

  if (!ctx)
    throw new Error(
      'useMediaDialogUploader must be used inside of MediaDialogUploaderProvider.',
    )

  return ctx
}

const isDuplicate = (a: File, b: File) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified

export const MediaDialogUploaderUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])

  const selectFilesHandler = (files: File[]) => {
    setSelectedFiles((prevSelectedFiles) => {
      const uniqueFiles = files
        .filter((file) =>
          prevSelectedFiles.every(
            (prevFile) => !isDuplicate(prevFile.file, file),
          ),
        )
        .map((file): SelectedFile => ({
          name: file.name,
          file,
          status: 'idle',
        }))

      return [...prevSelectedFiles, ...uniqueFiles]
    })
  }

  const removeSelectedFile = (fileName: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== fileName),
    )
  }

  return (
    <MediaDialogUploaderCtx
      value={{ selectedFiles, removeSelectedFile, selectFilesHandler }}
    >
      <div className="space-y-4">
        <PickFiles />
        <ShowSelectedFiles />
      </div>
    </MediaDialogUploaderCtx>
  )
}
