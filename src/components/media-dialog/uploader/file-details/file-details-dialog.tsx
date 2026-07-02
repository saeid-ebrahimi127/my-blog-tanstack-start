import { ImageDimensions } from '#/components/image/dimensions'
import { ImagePreview } from '#/components/image/preview'
import { formatBytes } from '#/components/media-dialog/uploader/lib/'
import { getFileType } from '#/components/media-dialog/uploader/lib/type'
import { Dialog, DialogContent } from '#/components/ui/dialog'
import { useImagePreview } from '#/hooks/use-image-preview'
import { toPersianDateTime } from '#/lib/date'

export const FileDetailsDialog = ({
  file,
  open,
  setOpen,
}: {
  file: File
  open: boolean
  setOpen: (value: boolean) => void
}) => {
  const isImage = file.type.startsWith('image/')
  const preview = useImagePreview(file)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="space-y-1.5">
          <p>
            <strong className="font-medium">نام فایل:</strong> {file.name}
          </p>
          <p>
            <strong className="font-medium">حجم فایل:</strong>{' '}
            {formatBytes(file.size)}
          </p>
          <p>
            <strong className="font-medium">نوع فایل:</strong>{' '}
            {getFileType(file)}
          </p>
          {isImage && (
            <p>
              <strong className="font-medium">سایز تصویر:</strong>{' '}
              <ImageDimensions preview={preview} />
            </p>
          )}
          <p>
            <strong className="font-medium">آخرین تغییرات در:</strong>{' '}
            {toPersianDateTime(file.lastModified)}
          </p>
          {isImage && <ImagePreview preview={preview} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
