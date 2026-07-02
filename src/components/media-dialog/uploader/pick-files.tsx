import {
  convertBytes,
  FILE_MAX_SIZE_BYTES,
  FILE_VALID_MIMES,
} from '#/components/media-dialog/uploader/lib'
import { useMediaDialogUploader } from '#/components/media-dialog/uploader/media-dialog-uploader-provider'
import { ReadableFileMimes } from '#/components/media-dialog/uploader/readable-file-mimes'
import { UploadCloudIcon } from 'lucide-react'
import { useRef } from 'react'
import type { ChangeEvent } from 'react'

export const PickFiles = () => {
  const { selectFilesHandler } = useMediaDialogUploader()

  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files?.length) return

    selectFilesHandler([...files])
  }

  return (
    <>
      <div
        onClick={() => {
          inputRef.current?.click()
        }}
        className="group hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors duration-200"
      >
        <UploadCloudIcon className="text-primary size-8 transition-transform duration-200 group-hover:-translate-y-1" />
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
