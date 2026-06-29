import type { ReactNode } from 'react'

export const MainCenteredLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-8">
      {children}
    </main>
  )
}
