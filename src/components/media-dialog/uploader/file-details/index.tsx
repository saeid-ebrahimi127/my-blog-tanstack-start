import { FileDetailsDialog } from '#/components/media-dialog/uploader/file-details/file-details-dialog'
import { useMediaDialogUploader } from '#/components/media-dialog/uploader/media-dialog-uploader-provider'
import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'

export const FileDetails = ({ fileName }: { fileName: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { selectedFiles } = useMediaDialogUploader()

  const selectedFile = selectedFiles.find((file) => file.name === fileName)

  if (!selectedFile) return

  const btn = (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setDialogOpen(true)}
    >
      <EyeIcon />
    </Button>
  )

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent>جزئیات</TooltipContent>
      </Tooltip>
      <FileDetailsDialog
        file={selectedFile.file}
        open={dialogOpen}
        setOpen={(value) => setDialogOpen(value)}
      />
    </>
  )
}
