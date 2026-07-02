import { useMediaDialog } from '#/components/media-dialog'
import { DeleteFolder } from '#/components/media-dialog/folder/delete-folder'
import { UpdateFolder } from '#/components/media-dialog/folder/update-folder'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { Folder } from '#/serverfn/folder'
import { FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useState } from 'react'

export const FolderCard = ({
  folder,
  foldersRefetching,
}: {
  folder: Folder
  foldersRefetching: boolean
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const { navigateToFolder } = useMediaDialog()

  const card = (
    <button
      type="button"
      onContextMenu={(e) => {
        e.preventDefault()
        setMenuOpen(true)
      }}
      onDoubleClick={() => {
        navigateToFolder({ id: folder.id, name: folder.name })
      }}
      className="hover:border-primary focus:border-primary flex w-28 flex-col items-center gap-2 rounded-xl border p-4 transition-colors duration-200 focus:outline-none"
    >
      <FolderIcon className="size-10 shrink-0 fill-yellow-400 text-yellow-400" />
      <span className="line-clamp-2 w-full px-2 text-center text-xs">
        {folder.name}
      </span>
    </button>
  )

  if (foldersRefetching) return card

  return (
    <div className="relative">
      {card}
      <DropdownMenu modal={false} open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger className="pointer-events-none absolute inset-0" />
        <DropdownMenuContent
          align="start"
          side="left"
          className="min-w-fit *:text-xs"
        >
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              navigateToFolder({ id: folder.id, name: folder.name })
            }}
          >
            <FolderOpenIcon />
            باز کردن
          </DropdownMenuItem>
          <UpdateFolder folder={folder} />
          <DeleteFolder folderId={folder.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
