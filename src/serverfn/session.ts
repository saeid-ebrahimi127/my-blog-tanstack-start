import { useAppSession } from '#/lib/session.server'
import { createServerFn } from '@tanstack/react-start'

export const clearFlashMessage = createServerFn({ method: 'POST' }).handler(
  async () => {
    const session = await useAppSession()

    await session.update({ flashMessage: {} })
  },
)
