import { CheckboxInput } from '#/components/input/checkbox'
import { TextInput } from '#/components/input/input'
import { SubmitBtn } from '#/components/submit-btn'
import { FieldGroup } from '#/components/ui/field'
import { authClient } from '#/lib/auth-client'
import {
  betterAuthToastError,
  errorMessage,
  successMessage,
} from '#/lib/message'
import { emailZodSchema } from '#/zod-schema/field/email'
import { passwordZodSchema } from '#/zod-schema/field/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: emailZodSchema,
        password: passwordZodSchema,
        rememberMe: z.boolean('مقدار اشتباه.'),
      }),
    ),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
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
          const { error } = await authClient.signIn.email(data)

          if (error) {
            betterAuthToastError(error)

            return
          }

          form.reset()

          await navigate({ to: '/', replace: true })

          toast.success(successMessage['loginSuccess'])
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
        <TextInput
          control={control}
          name="password"
          label="رمز عبور"
          inputProps={{ type: 'password', autoComplete: 'on' }}
        />
        <CheckboxInput
          control={control}
          name="rememberMe"
          label="مرا به یاد آور؟"
        />
        <SubmitBtn disabled={isSubmitting}>ورود</SubmitBtn>
      </FieldGroup>
    </form>
  )
}
