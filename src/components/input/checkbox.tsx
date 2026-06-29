import { Checkbox } from '#/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export const CheckboxInput = <T extends FieldValues>({
  control,
  name,
  label,
  inputProps,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  inputProps?: ComponentProps<typeof Checkbox>
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex gap-2">
              <Checkbox
                {...inputProps}
                {...field}
                checked={value}
                onCheckedChange={onChange}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
