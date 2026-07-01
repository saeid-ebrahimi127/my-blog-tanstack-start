import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import type { ReactNode } from 'react'

export const CardLayout = ({
  title,
  description,
  children,
}: {
  title?: ReactNode
  description?: string
  children: ReactNode
}) => {
  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
