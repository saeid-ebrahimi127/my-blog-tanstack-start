import { TextInput } from '#/components/input/input'
import { CardLayout } from '#/components/layout/card'
import { SubmitBtn } from '#/components/submit-btn'
import { FieldGroup } from '#/components/ui/field'
import { authClient } from '#/lib/auth-client'
import {
  betterAuthToastError,
  errorMessage,
  successMessage,
} from '#/lib/message'
import { passwordZodSchema } from '#/zod-schema/field/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const AccountChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        currentPassword: passwordZodSchema,
        newPassword: passwordZodSchema,
      }),
    ),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  return (
    <CardLayout
      title="تغییر رمز عبور"
      description="رمز عبور فعلی و جدید خود را وارد کنید."
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          if (data.currentPassword === data.newPassword) {
            toast.error(errorMessage['newPasswordUnchanged'])

            return
          }

          try {
            const { error } = await authClient.changePassword({
              ...data,
              revokeOtherSessions: true,
            })

            if (error) {
              betterAuthToastError(error)

              return
            }

            form.reset()

            toast.success(successMessage['accountPasswordChanged'])
          } catch {
            toast.error(errorMessage['generic'])
          }
        })}
      >
        <FieldGroup className="max-w-sm">
          <TextInput
            control={control}
            name="currentPassword"
            label="رمز عبور فعلی"
            inputProps={{
              type: 'password',
              autoComplete: 'on',
            }}
          />
          <TextInput
            control={control}
            name="newPassword"
            label="رمز عبور جدید"
            inputProps={{
              type: 'password',
              autoComplete: 'on',
            }}
          />
        </FieldGroup>
        <div className="mt-6 mr-auto w-fit">
          <SubmitBtn disabled={isSubmitting}>تغییر رمز عبور</SubmitBtn>
        </div>
      </form>
    </CardLayout>
  )
}
