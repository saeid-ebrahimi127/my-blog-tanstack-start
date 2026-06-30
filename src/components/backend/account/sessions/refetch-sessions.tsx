import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { Loader2Icon, RefreshCwIcon } from 'lucide-react'

export const RefetchSessions = ({
  isRefetching,
  refetch,
}: {
  isRefetching: boolean
  refetch: () => void
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          disabled={isRefetching}
          onClick={() => {
            refetch()
          }}
          size="icon"
        >
          {isRefetching ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <RefreshCwIcon />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>بروزرسانی</TooltipContent>
    </Tooltip>
  )
}
