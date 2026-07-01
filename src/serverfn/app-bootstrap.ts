import { peekFlashMessage } from '#/lib/session.server'
import { getUser } from '#/lib/user.server'
import { createServerFn } from '@tanstack/react-start'

export const getAppBootstrapData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await getUser()
    const flashMessage = await peekFlashMessage()
    return { user, flashMessage }
  },
)
