import { Button } from '#/components/ui/button'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { RefreshCwIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const ReactQueryErrorBoundary = ({
  errorMessage,
  children,
}: {
  errorMessage: string
  children: ReactNode
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="space-y-2">
              <p className="text-destructive italic">{errorMessage}</p>
              <Button onClick={() => resetErrorBoundary()} variant="outline">
                <RefreshCwIcon />
                دوباره تلاش کن!
              </Button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
