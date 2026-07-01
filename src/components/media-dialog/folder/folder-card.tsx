import { DeleteFolder } from '#/components/media-dialog/folder/delete-folder'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { Folder } from '#/serverfn/folder'
import { EditIcon, FolderIcon } from 'lucide-react'
import { useState } from 'react'

export const FolderCard = ({
  folder,
  foldersRefetching,
}: {
  folder: Folder
  foldersRefetching: boolean
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const card = (
    <button
      type="button"
      onContextMenu={(e) => {
        e.preventDefault()
        setMenuOpen(true)
      }}
      className="hover:border-primary focus:border-primary flex w-28 flex-col items-center gap-2 rounded-xl border p-4 transition-colors duration-200 focus:outline-none"
    >
      <FolderIcon className="size-10 shrink-0 fill-yellow-400 text-yellow-400" />
      <span className="line-clamp-2 w-full px-2 text-center text-xs">
        {folder.name}
      </span>
    </button>
  )

  return foldersRefetching ? (
    card
  ) : (
    <DropdownMenu modal={false} open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>{card}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="left"
        className="min-w-fit *:text-xs"
      >
        <DropdownMenuItem>
          <EditIcon />
          ویرایش
        </DropdownMenuItem>
        <DeleteFolder folderId={folder.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
