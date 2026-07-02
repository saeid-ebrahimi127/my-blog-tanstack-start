import { TextInput } from '#/components/input/text'
import { useMediaDialog } from '#/components/media-dialog'
import { SubmitBtn } from '#/components/submit-btn'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { DropdownMenuItem } from '#/components/ui/dropdown-menu'
import { FieldGroup } from '#/components/ui/field'
import { foldersQueryKeyPrefix } from '#/hooks/use-folders'
import { errorMessage } from '#/lib/message'
import type { Folder } from '#/serverfn/folder'
import { updateFolder } from '#/serverfn/folder'
import { folderNameZodSchema } from '#/zod-schema/folder/name'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const UpdateFolder = ({ folder }: { folder: Folder }) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            setOpenDialog(true)
          }}
        >
          <EditIcon />
          ویرایش
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">ویرایش پوشه</DialogTitle>
          <DialogDescription>
            برای ویرایش پوشه ، از فرم زیر استفاده نمایید.
          </DialogDescription>
        </DialogHeader>
        <UpdateFolderForm
          folder={folder}
          closeDialog={() => setOpenDialog(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

const UpdateFolderForm = ({
  folder,
  closeDialog,
}: {
  folder: Folder
  closeDialog: () => void
}) => {
  const { name, id: folderId } = folder

  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: folderNameZodSchema,
      }),
    ),
    defaultValues: {
      name,
    },
  })

  const { handleSubmit, control } = form

  const updateFolderFn = useServerFn(updateFolder)

  const queryClient = useQueryClient()

  const { setPath, pathIds } = useMediaDialog()

  const updateFolderMutation = useMutation({
    mutationFn: (data: { folderId: string; name: string }) =>
      updateFolderFn({ data }),
    onSuccess: (data, { folderId }) => {
      if (data.error) {
        toast.error(data.error)
        return
      }

      setPath((prev) =>
        prev.map((folderCrumb) =>
          folderCrumb.id !== folderId
            ? folderCrumb
            : { ...folderCrumb, name: data.updatedFolder.name },
        ),
      )

      return queryClient.invalidateQueries({
        queryKey: [foldersQueryKeyPrefix, ...pathIds],
        exact: true,
      })
    },
    onError: () => {
      toast.error(errorMessage['generic'])
    },
    onSettled(data) {
      if (data && !data.error) {
        closeDialog()

        toast.success('پوشه آپدیت شد.')
      }
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateFolderMutation.mutate({ ...data, folderId })
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="name"
          label="نام"
          inputProps={{ autoComplete: 'on' }}
        />
        <div className="mr-auto flex w-fit items-center gap-2">
          <Button
            type="button"
            disabled={updateFolderMutation.isPending}
            variant="outline"
            onClick={closeDialog}
          >
            انصراف
          </Button>
          <SubmitBtn disabled={updateFolderMutation.isPending}>ذخیره</SubmitBtn>
        </div>
      </FieldGroup>
    </form>
  )
}
