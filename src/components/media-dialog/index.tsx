import { MediaDialogMyFiles } from '#/components/media-dialog/my-files'
import { MediaDialogUploader } from '#/components/media-dialog/uploader'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { ImageIcon, MousePointerClickIcon, XIcon } from 'lucide-react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, use, useState } from 'react'

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
        <div className="flex-1 scrollbar-thin overflow-y-auto p-4">
          <MediaDialogProvider>
            <MyTabs />
          </MediaDialogProvider>
        </div>
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

const MyTabs = () => {
  const { tab, setTab } = useMediaDialog()

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="my-files">فایل های من</TabsTrigger>
        <TabsTrigger value="uploader">بارگذاری فایل</TabsTrigger>
      </TabsList>
      <div className="py-1">
        <TabsContent value="my-files">
          <MediaDialogMyFiles />
        </TabsContent>
        <TabsContent value="uploader">
          <MediaDialogUploader />
        </TabsContent>
      </div>
    </Tabs>
  )
}

export type FolderCrumb = { id: string; name: string }

const MediaDialogCtx = createContext<{
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  path: FolderCrumb[]
  pathIds: string[]
  parentFolderId: string | null
  setPath: Dispatch<SetStateAction<FolderCrumb[]>>
  navigateToFolder: (folder: FolderCrumb) => void
  navigateToCrumb: (index: number) => void
} | null>(null)

const MediaDialogProvider = ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState('my-files')

  const [path, setPath] = useState<FolderCrumb[]>([])

  const pathIds = path.map((crumb) => crumb.id)
  const parentFolderId = path.length > 0 ? path[path.length - 1].id : null

  const navigateToFolder = (folder: FolderCrumb) => {
    setPath((prev) => [...prev, folder])
  }

  const navigateToCrumb = (index: number) => {
    setPath((prev) => (index === -1 ? [] : prev.slice(0, index + 1)))
  }

  return (
    <MediaDialogCtx
      value={{
        tab,
        setTab,
        path,
        pathIds,
        parentFolderId,
        setPath,
        navigateToFolder,
        navigateToCrumb,
      }}
    >
      {children}
    </MediaDialogCtx>
  )
}

export const useMediaDialog = () => {
  const ctx = use(MediaDialogCtx)

  if (!ctx)
    throw new Error(
      'useMediaDialog must be used inside of MediaDialogProvider.',
    )

  return ctx
}
