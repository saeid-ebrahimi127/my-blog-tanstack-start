import { MediaDialogBody } from '#/components/media-dialog/body'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { ImageIcon, MousePointerClickIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

export const MediaDialog = () => {
  const [open, setOpen] = useState(false)

  const closeMediaDialog = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <ImageIcon />
          مدیریت رسانه
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement

          if (target.closest('[data-sonner-toaster]')) {
            e.preventDefault()
          }
        }}
        className="flex h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)]! flex-col gap-0 p-0"
      >
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-xl">مدیریت رسانه</DialogTitle>
          <DialogDescription>
            در اینجا می توانید فایل های خود را مدیریت کنید.
          </DialogDescription>
        </DialogHeader>
        <MediaDialogBody />
        <DialogFooter className="border-t p-4">
          <Button type="button" onClick={closeMediaDialog} variant="outline">
            <XIcon />
            بستن
          </Button>
          <Button type="button" disabled>
            <MousePointerClickIcon />
            انتخاب فایل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
