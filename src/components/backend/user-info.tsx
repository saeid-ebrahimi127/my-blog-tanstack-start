import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { cn } from '#/lib/utils'
import { useRouteContext } from '@tanstack/react-router'

export const BackendUserInfo = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const {
    currentUser: { name, username, image },
  } = useRouteContext({ from: '/_main-layout/_backend' })

  const avatar = (
    <Avatar className={cn({ 'size-12': sidebarOpen })}>
      <AvatarImage src={image || undefined} alt={`${name} avatar`} />
      <AvatarFallback
        className={cn('bg-primary text-white capitalize', {
          'text-xl': sidebarOpen,
          'text-sm': !sidebarOpen,
        })}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )

  const info = (
    <>
      <div className="text-foreground truncate text-sm">{name}</div>
      <div className="text-muted-foreground truncate text-xs" dir="ltr">
        {username}
      </div>
    </>
  )

  if (sidebarOpen)
    return (
      <div className="flex-col-center mt-4 space-y-2 px-4">
        {avatar}
        <div
          className={cn('w-full space-y-1 truncate text-center', {
            hidden: !sidebarOpen,
          })}
        >
          {info}
        </div>
      </div>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-4 cursor-pointer">
        {avatar}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" className="w-48!">
        <DropdownMenuLabel className="flex items-center gap-2">
          {avatar}
          <div className="min-w-0 space-y-1 truncate">{info}</div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
