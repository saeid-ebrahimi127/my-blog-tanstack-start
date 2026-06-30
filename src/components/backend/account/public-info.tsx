import { TextInput } from '#/components/input/input'
import { CardLayout } from '#/components/layout/card'
import { SubmitBtn } from '#/components/submit-btn'
import { Button } from '#/components/ui/button'
import { FieldGroup } from '#/components/ui/field'
import { authClient } from '#/lib/auth-client'
import { betterAuthToastError, successMessage } from '#/lib/message'
import { nameZodSchema } from '#/zod-schema/field/name'
import { usernameZodSchema } from '#/zod-schema/field/username'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const AccountPublicInfo = () => {
  const {
    currentUser: { name, username },
  } = useRouteContext({ from: '/_main-layout/_backend' })

  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: nameZodSchema,
        username: usernameZodSchema,
      }),
    ),
    defaultValues: {
      name,
      username,
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const router = useRouter()

  return (
    <CardLayout
      title="اطلاعات عمومی"
      description="از طریق فرم زیر می توانید اطلاعات عمومی خود را بروزرسانی کنید."
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          const actualData: Partial<typeof data> = {}

          if (data.username !== username) {
            actualData['username'] = data.username
          }

          if (data.name !== name) {
            actualData['name'] = data.name
          }

          if (Object.values(actualData).every((value) => !value)) {
            toast.success(successMessage['changesSaved'])

            return
          }

          const { error } = await authClient.updateUser(actualData)

          if (error) {
            betterAuthToastError(error)

            return
          }

          router.invalidate()

          form.reset({
            name: actualData.name ?? data.name,
            username: actualData.username ?? data.username,
          })

          toast.success(successMessage['changesSaved'])
        })}
      >
        <FieldGroup>
          <TextInput
            control={control}
            name="name"
            label="نام"
            inputProps={{ autoComplete: 'on', className: 'max-w-sm' }}
          />
          <TextInput
            control={control}
            name="username"
            label="نام کاربری"
            inputProps={{ autoComplete: 'on', className: 'max-w-sm' }}
          />
          <div className="mr-auto w-fit space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              پاک کردن
            </Button>
            <SubmitBtn disabled={isSubmitting}>ذخیره</SubmitBtn>
          </div>
        </FieldGroup>
      </form>
    </CardLayout>
  )
}
