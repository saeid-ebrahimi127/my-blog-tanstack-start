import { Button, buttonVariants } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { useLogout } from '#/hooks/use-logout'
import { cn } from '#/lib/utils'
import type { NavigateOptions } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import {
  FileTextIcon,
  HomeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  Loader2Icon,
  LogOutIcon,
  MessagesSquareIcon,
  TagsIcon,
  UserKeyIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

const MenuItem = ({
  to,
  icon,
  text,
  sidebarOpen,
}: {
  to: NavigateOptions['to']
  icon: ReactNode
  text: string
  sidebarOpen: boolean
}) => {
  const listItem = (
    <li>
      <Link
        activeProps={{ className: 'bg-primary-foreground text-primary' }}
        to={to}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'hover:bg-primary-foreground hover:text-primary size-full py-3',
          {
            'w-full justify-start rounded-xl': sidebarOpen,
            'rounded-full': !sidebarOpen,
          },
        )}
      >
        {icon}
        <span
          className={cn({
            hidden: !sidebarOpen,
          })}
        >
          {text}
        </span>
      </Link>
    </li>
  )

  if (sidebarOpen) return listItem

  return (
    <Tooltip>
      <TooltipTrigger asChild>{listItem}</TooltipTrigger>
      <TooltipContent side="left">{text}</TooltipContent>
    </Tooltip>
  )
}

export const BackendMenus = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  return (
    <>
      <ul className="mt-4 space-y-1 px-4">
        {sidebarOpen && (
          <MenuItem
            to="/"
            icon={<HomeIcon />}
            text="خانه"
            sidebarOpen={sidebarOpen}
          />
        )}
        <MenuItem
          to="/dashboard"
          icon={<LayoutDashboardIcon />}
          text="پیشخوان"
          sidebarOpen={sidebarOpen}
        />
        <MenuItem
          to="/"
          icon={<FileTextIcon />}
          text="نوشته ها"
          sidebarOpen={sidebarOpen}
        />
        <MenuItem
          to="/media"
          icon={<ImageIcon />}
          text="رسانه"
          sidebarOpen={sidebarOpen}
        />
        <MenuItem
          to="/"
          icon={<TagsIcon />}
          text="برچسب ها"
          sidebarOpen={sidebarOpen}
        />
        <MenuItem
          to="/"
          icon={<MessagesSquareIcon />}
          text="دیدگاه ها"
          sidebarOpen={sidebarOpen}
        />
      </ul>
      <div className="w-full px-4">
        <Separator className="mt-4" />
      </div>
      <ul className="my-4 space-y-1 px-4">
        <MenuItem
          to="/account"
          icon={<UserKeyIcon />}
          text="حساب کاربری"
          sidebarOpen={sidebarOpen}
        />
        <Logout sidebarOpen={sidebarOpen} />
      </ul>
    </>
  )
}

const Logout = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const { handler, isPending } = useLogout()

  const listItem = (
    <li>
      <Button
        type="button"
        disabled={isPending}
        variant="destructive"
        onClick={async () => {
          await handler()
        }}
        className={cn('size-full py-3', {
          'w-full justify-start rounded-xl': sidebarOpen,
          'rounded-full': !sidebarOpen,
        })}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : <LogOutIcon />}
        <span
          className={cn({
            hidden: !sidebarOpen,
          })}
        >
          {isPending ? 'در حال خروج...' : 'خروج'}
        </span>
      </Button>
    </li>
  )

  if (sidebarOpen) return listItem

  return (
    <Tooltip>
      <TooltipTrigger asChild>{listItem}</TooltipTrigger>
      <TooltipContent side="left">خروج</TooltipContent>
    </Tooltip>
  )
}
