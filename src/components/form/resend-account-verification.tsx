import { TextInput } from '#/components/input/text'
import { SubmitBtn } from '#/components/submit-btn'
import { FieldGroup } from '#/components/ui/field'
import { authClient } from '#/lib/auth-client'
import {
  betterAuthToastError,
  errorMessage,
  successMessage,
} from '#/lib/message'
import { emailZodSchema } from '#/zod-schema/field/email'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const ResendVerificationForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: emailZodSchema,
      }),
    ),
    defaultValues: {
      email: '',
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
          const { error } = await authClient.sendVerificationEmail({
            ...data,
            callbackURL: '/login',
          })

          if (error) {
            betterAuthToastError(error)

            return
          }

          form.reset()

          await navigate({ to: '/login' })

          toast.success(successMessage['accountVerificationResent'])
        } catch {
          toast.error(errorMessage['generic'])
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="email"
          label="ایمیل"
          inputProps={{ type: 'email', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting}>ارسال</SubmitBtn>
      </FieldGroup>
    </form>
  )
}
