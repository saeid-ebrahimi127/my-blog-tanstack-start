import { appendFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export const logEmailLink = async ({
  to,
  link,
}: {
  to: string
  link: string
}) => {
  const logDir = resolve(process.cwd(), 'log')

  await mkdir(logDir, { recursive: true })

  const timestamp = new Date().toISOString()
  const line = `[${timestamp}] to=${to} link=${link}\n`

  await appendFile(resolve(logDir, 'email_link.log'), line, {
    encoding: 'utf-8',
  })
}

export const logAppMessage = async ({ message }: { message: string }) => {
  const logDir = resolve(process.cwd(), 'log')

  await mkdir(logDir, { recursive: true })

  const timestamp = new Date().toISOString()
  const line = `[${timestamp}] ${message}\n`

  await appendFile(resolve(logDir, 'app.log'), line, {
    encoding: 'utf-8',
  })
}
