import { serverEnv } from '#/lib/env.server'
import { useSession } from '@tanstack/react-start/server'

export type FlashMessage = {
  error?: string
  success?: string
}

type SessionData = {
  flashMessage: FlashMessage
}

const env = serverEnv()

export const useAppSession = () => {
  return useSession<SessionData>({
    name: 'app-session',
    password: env.SESSION_SECRET,
    cookie: {
      maxAge: 60 * 60 * 24 * 30,
      secure: env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    },
  })
}

export const flashMessage = async (message: FlashMessage) => {
  const session = await useAppSession()

  await session.update({ flashMessage: message })
}

export const peekFlashMessage = async () => {
  const session = await useAppSession()

  return session.data.flashMessage
}
