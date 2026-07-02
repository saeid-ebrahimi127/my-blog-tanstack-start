import { useMediaDialogUploader } from '#/components/media-dialog/uploader/media-dialog-uploader-provider'
import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { XCircleIcon } from 'lucide-react'

export const DeleteSelectedFile = ({ fileName }: { fileName: string }) => {
  const { removeSelectedFile } = useMediaDialogUploader()

  const btn = (
    <Button
      type="button"
      variant="destructive"
      size="icon"
      onClick={() => removeSelectedFile(fileName)}
    >
      <XCircleIcon />
    </Button>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{btn}</TooltipTrigger>
      <TooltipContent>حذف</TooltipContent>
    </Tooltip>
  )
}
