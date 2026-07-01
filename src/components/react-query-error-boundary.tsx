import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { cn } from '#/lib/utils'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { RefreshCwIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const ReactQueryErrorBoundary = ({
  errorMessage,
  children,
  textSize,
}: {
  errorMessage: string
  children: ReactNode
  textSize?: string
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="space-y-2">
              <p className={cn('text-destructive italic', textSize)}>
                {errorMessage}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => resetErrorBoundary()}
                    variant="outline"
                    size="icon"
                  >
                    <RefreshCwIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>تلاش دوباره!</TooltipContent>
              </Tooltip>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
