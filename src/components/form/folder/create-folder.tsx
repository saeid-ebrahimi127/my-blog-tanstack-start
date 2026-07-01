import { TextInput } from '#/components/input/input'
import { useFolderCtx } from '#/components/media-dialog/body'
import { SubmitBtn } from '#/components/submit-btn'
import { FieldGroup } from '#/components/ui/field'
import { foldersQueryKeyPrefix } from '#/hooks/use-folders'
import { errorMessage } from '#/lib/message'
import { createFolder } from '#/serverfn/folder'
import { folderNameZodSchema } from '#/zod-schema/folder/name'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { PlusIcon } from 'lucide-react'
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

  return (
    <form
      onSubmit={handleSubmit((data) => {
        createFolderMutation.mutate(data)
      })}
    >
      <FieldGroup className="gap-2">
        <TextInput
          control={control}
          name="name"
          inputProps={{
            autoComplete: 'on',
            className: 'max-w-sm',
            placeholder: 'نام پوشه...',
          }}
        />
        <SubmitBtn disabled={createFolderMutation.isPending} className="w-fit">
          <span className="flex items-center gap-1.5">
            <PlusIcon />
            افزودن پوشه
          </span>
        </SubmitBtn>
      </FieldGroup>
    </form>
  )
}
