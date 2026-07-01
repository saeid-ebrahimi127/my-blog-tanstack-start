import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group'
import type { ComponentProps, ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export const CustomInputGroup = <T extends FieldValues>({
  control,
  name,
  label,
  inputGroupInputProps,
  inputGroupAddon,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  inputGroupInputProps?: ComponentProps<typeof InputGroupInput>
  inputGroupAddon?: ReactNode
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
            <InputGroup className="overflow-hidden">
              <InputGroupInput
                {...inputGroupInputProps}
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="inline-end">
                {inputGroupAddon}
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
