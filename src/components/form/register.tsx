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
import { nameZodSchema } from '#/zod-schema/field/name'
import { passwordZodSchema } from '#/zod-schema/field/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: nameZodSchema,
        email: emailZodSchema,
        password: passwordZodSchema,
      }),
    ),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const { error } = await authClient.signUp.email({
            ...data,
            callbackURL: '/login',
          })

          if (error) {
            betterAuthToastError(error)

            return
          }

          form.reset()

          onSuccess()

          toast.success(successMessage['registerSuccess'])
        } catch {
          toast.error(errorMessage['generic'])
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="name"
          label="نام"
          inputProps={{ autoComplete: 'on' }}
        />
        <TextInput
          control={control}
          name="email"
          label="ایمیل"
          inputProps={{ type: 'email', autoComplete: 'on' }}
        />
        <TextInput
          control={control}
          name="password"
          label="رمز عبور"
          inputProps={{ type: 'password', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting}>ثبت نام</SubmitBtn>
      </FieldGroup>
    </form>
  )
}
