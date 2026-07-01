import { CustomInputGroup } from '#/components/input/custom-input-group'
import { useFolderCtx } from '#/components/media-dialog/body'
import { foldersQueryKeyPrefix } from '#/hooks/use-folders'
import { errorMessage } from '#/lib/message'
import { createFolder } from '#/serverfn/folder'
import { folderNameZodSchema } from '#/zod-schema/folder/name'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { FolderPlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const CreateFolderForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: folderNameZodSchema,
      }),
    ),
    defaultValues: { name: '' },
  })

  const { handleSubmit, control } = form

  const { parentFolderId } = useFolderCtx()

  const createFolderFn = useServerFn(createFolder)

  const queryClient = useQueryClient()

  const createFolderMutation = useMutation({
    mutationFn: (data: { name: string }) => createFolderFn({ data }),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [foldersQueryKeyPrefix, { parentFolderId }],
        exact: true,
      })
    },
    onError: () => {
      toast.error(errorMessage['generic'])
    },
    onSettled(data) {
      if (data) {
        form.reset()

        toast.success('پوشه ایجاد شد.')
      }
    },
  })

  const onSubmitHandler = handleSubmit((data) => {
    createFolderMutation.mutate(data)
  })

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="max-w-sm">
        <CustomInputGroup
          control={control}
          name="name"
          inputGroupAddon={<FolderPlusIcon />}
          inputGroupInputProps={{
            autoComplete: 'on',
            placeholder: 'نام پوشه ی جدید + Enter',
            disabled: createFolderMutation.isPending,
          }}
        />
      </div>
    </form>
  )
}
