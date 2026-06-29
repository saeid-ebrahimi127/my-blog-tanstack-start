import { APP_NAME } from '#/lib/const'
import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import { PencilLineIcon } from 'lucide-react'

export const Logo = ({
  iconClassName = 'size-5',
  appNameClassName = 'text-xl',
}: {
  iconClassName?: string
  appNameClassName?: string
}) => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <PencilLineIcon className={iconClassName} />
      <span className={cn(appNameClassName, 'font-medium')}>{APP_NAME}</span>
    </Link>
  )
}
