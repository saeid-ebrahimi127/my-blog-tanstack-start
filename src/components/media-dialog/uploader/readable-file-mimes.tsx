import { FILE_VALID_MIMES } from '#/components/media-dialog/uploader/lib'
import { Badge } from '#/components/ui/badge'

export const ReadableFileMimes = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(FILE_VALID_MIMES).map((mime) => (
        <Badge key={mime} variant="outline">
          {mime}
        </Badge>
      ))}
    </div>
  )
}
