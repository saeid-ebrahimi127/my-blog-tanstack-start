import { TextInput } from '#/components/input/input'
import { SubmitBtn } from '#/components/submit-btn'
import { FieldGroup } from '#/components/ui/field'
import { errorMessage } from '#/lib/message'
import { createFolder } from '#/serverfn/folder'
import { folderNameZodSchema } from '#/zod-schema/folder/name'
import { zodResolver } from '@hookform/resolvers/zod'
import { useServerFn } from '@tanstack/react-start'
import { PlusIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
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

  const abortController = useRef<InstanceType<typeof AbortController> | null>(
    null,
  )

  useEffect(() => {
    return () => abortController.current?.abort()
  }, [])

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const createFolderFn = useServerFn(createFolder)

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          abortController.current = new AbortController()

          await createFolderFn({
            data,
            signal: abortController.current.signal,
          })

          form.reset()

          toast.success('پوشه ایجاد شد.')
        } catch {
          toast.error(errorMessage['generic'])
        }
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
        <SubmitBtn disabled={isSubmitting} className="w-fit">
          <span className="flex items-center gap-1.5">
            <PlusIcon />
            افزودن پوشه
          </span>
        </SubmitBtn>
      </FieldGroup>
    </form>
  )
}
