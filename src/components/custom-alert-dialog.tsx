import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { ComponentProps, ReactNode } from 'react'

export const CustomAlertDialog = ({
  alertDialogTrigger,
  alertDialogActionText,
  alertDialogActionOnClick,
  alertDialogDescription,
  alertDialogActionVariant = 'destructive',
  ...props
}: {
  alertDialogTrigger: ReactNode
  alertDialogActionText: string
  alertDialogActionOnClick: () => void
  alertDialogDescription: string
  alertDialogActionVariant?: ComponentProps<typeof AlertDialogAction>['variant']
} & (
  | { withTooltip?: false }
  | {
      withTooltip: true
      tooltipContent: string
      tooltipSide?: ComponentProps<typeof TooltipContent>['side']
    }
)) => {
  const trigger = (
    <AlertDialogTrigger asChild>{alertDialogTrigger}</AlertDialogTrigger>
  )

  return (
    <AlertDialog>
      {props.withTooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent side={props.tooltipSide}>
            {props.tooltipContent}
          </TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            {alertDialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction
            variant={alertDialogActionVariant}
            onClick={alertDialogActionOnClick}
          >
            {alertDialogActionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
