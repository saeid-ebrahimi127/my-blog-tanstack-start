import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { PasswordInput } from '#/components/ui/password-input'
import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  inputProps,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  inputProps?: ComponentProps<typeof Input>
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {inputProps?.type === 'password' ? (
              <PasswordInput
                {...inputProps}
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
            ) : (
              <Input
                {...inputProps}
                {...field}
                type={inputProps?.type || 'text'}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
