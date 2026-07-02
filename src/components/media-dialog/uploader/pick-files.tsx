import {
  convertBytes,
  FILE_MAX_SIZE_BYTES,
  FILE_VALID_MIMES,
} from '#/components/media-dialog/uploader/lib'
import { useMediaDialogUploader } from '#/components/media-dialog/uploader/media-dialog-uploader-provider'
import { ReadableFileMimes } from '#/components/media-dialog/uploader/readable-file-mimes'
import { cn } from '#/lib/utils'
import { UploadCloudIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useRef, useState } from 'react'

export const PickFiles = () => {
  const { selectFilesHandler } = useMediaDialogUploader()

  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files?.length) return

    selectFilesHandler([...files])
  }

  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          inputRef.current?.click()
        }}

        className={cn(
          'focus-visible:border-primary group hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors duration-200 focus-visible:outline-none',
          {
            'border-primary': isDragging,
          },
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault()

          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          const relatedTarget = e.relatedTarget
          const currentTarget = e.currentTarget

          if (
            !(relatedTarget instanceof HTMLElement) ||
            (currentTarget instanceof HTMLElement &&
              !currentTarget.contains(relatedTarget))
          ) {
            setIsDragging(false)
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={(e) => {
          e.preventDefault()

          setIsDragging(false)

          const files = [...e.dataTransfer.files]

          if (!files.length) return

          selectFilesHandler([...files])
        }}
      >
        <UploadCloudIcon
          className={cn(
            'text-primary size-8 transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1',
            {
              '-translate-y-1': isDragging,
            },
          )}
        />
        <div className="text-muted-foreground mt-3 space-y-2 text-center">
          <p>فایل های خود را انتخاب کرده یا به اینجا بکشید.</p>
          <p className="text-xs">
            حداکثر حجم مجاز برای هر فایل:{' '}
            <span className="text-black">
              {convertBytes(FILE_MAX_SIZE_BYTES, 'MB')} مگابایت
            </span>
          </p>
          <div className="mt-3 space-y-2">
            <p className="text-xs">فرمت های مجاز:</p>
            <div className="flex items-center justify-center">
              <ReadableFileMimes />
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        accept={Object.keys(FILE_VALID_MIMES).join(',')}
        multiple
        onChange={onChangeHandler}
        className="sr-only"
      />
    </>
  )
}
