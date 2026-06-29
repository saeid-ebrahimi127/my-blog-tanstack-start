import type { Logo } from '#/components/logo'
import { APP_NAME } from '#/lib/const'
import { cn } from '#/lib/utils'
import { PencilLineIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

export const EmailLogo = ({
  href,
  iconClassName = 'size-5',
  appNameClassName = 'text-xl',
}: { href: string } & ComponentProps<typeof Logo>) => {
  return (
    <div className="my-2 flex items-center justify-center">
      <a
        href={href}
        target="_blank"
        className="flex items-center gap-2 text-black"
        style={{ textDecoration: 'none' }}
      >
        <PencilLineIcon className={iconClassName} />
        <span className={cn(appNameClassName, 'font-medium')}>{APP_NAME}</span>
      </a>
    </div>
  )
}
