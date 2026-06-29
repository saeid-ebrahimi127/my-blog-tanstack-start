import { BackendMenus } from '#/components/backend/menus'
import { BackendUserInfo } from '#/components/backend/user-info'
import { Logo } from '#/components/logo'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { cn } from '#/lib/utils'
import { PanelRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'backend-sidebar-open'

export const BackendSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const backendSidebarOpen = localStorage.getItem(STORAGE_KEY)
    return !backendSidebarOpen
      ? true
      : !['true', 'false'].includes(backendSidebarOpen)
        ? true
        : backendSidebarOpen === 'true'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, sidebarOpen ? 'true' : 'false')
  }, [sidebarOpen])

  return (
    <div
      className={cn(
        'h-screen scrollbar-thin overflow-y-auto border-l bg-white',
        {
          'w-72': sidebarOpen,
          'flex w-22 flex-col items-center': !sidebarOpen,
        },
      )}
    >
      <div className="mt-4 flex items-center justify-between px-4">
        <div
          className={cn({
            hidden: !sidebarOpen,
          })}
        >
          <Logo iconClassName="size-4" appNameClassName="text-lg" />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <PanelRightIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {sidebarOpen ? 'بستن پنل' : 'باز کردن پنل'}
          </TooltipContent>
        </Tooltip>
      </div>
      <BackendUserInfo sidebarOpen={sidebarOpen} />
      <div className="w-full px-4">
        <Separator className="mt-4" />
      </div>
      <BackendMenus sidebarOpen={sidebarOpen} />
    </div>
  )
}
