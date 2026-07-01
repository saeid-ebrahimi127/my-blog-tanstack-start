import { TextInput } from '#/components/input/text'
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
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const ChangePasswordForm = ({ token }: { token: string }) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        newPassword: passwordZodSchema,
        token: z.string().min(1),
      }),
    ),
    defaultValues: {
      newPassword: '',
      token,
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const navigate = useNavigate()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const { error } = await authClient.resetPassword({
            ...data,
          })

          if (error) {
            betterAuthToastError(error)

            return
          }

          form.reset()

          await navigate({ to: '/login', replace: true })

          toast.success(successMessage['passwordChanged'])
        } catch {
          toast.error(errorMessage['generic'])
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="newPassword"
          label="رمز عبور جدید"
          inputProps={{ type: 'password', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting}>تغییر رمز عبور</SubmitBtn>
      </FieldGroup>
    </form>
  )
}
