import EmailVerification from '#/components/email/email-verification'
import { APP_NAME } from '#/lib/const'
import { appendFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createTransport } from 'nodemailer'
import { render } from 'react-email'
import { serverEnv } from './env.server'

const env = serverEnv()

declare global {
  var mailer: ReturnType<typeof createTransport> | undefined
}

const getMailer = () => {
  if (!globalThis.mailer) {
    globalThis.mailer = createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: env.SMTP_USER
        ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
        : undefined,
    })
  }

  return globalThis.mailer
}

export const mailer = getMailer()

const from = `"${APP_NAME}" <no-reply@${new URL(env.APP_URL).hostname}>`

const logEmailLink = async ({ to, link }: { to: string; link: string }) => {
  const logDir = resolve(process.cwd(), 'log')

  await mkdir(logDir, { recursive: true })

  const timestamp = new Date().toISOString()
  const line = `[${timestamp}] to=${to} link=${link}\n`

  await appendFile(resolve(logDir, 'email_link.log'), line, {
    encoding: 'utf-8',
  })
}

const homeURL = env.APP_URL

export const sendEmailVerificationMail = async ({
  to,
  name,
  verificationURL,
}: {
  to: string
  name: string
  verificationURL: string
}) => {
  if (env.NODE_ENV !== 'production') {
    await logEmailLink({ to, link: verificationURL })

    return
  }

  const title = 'تایید ایمیل'

  const emailVerification = (
    <EmailVerification
      title={title}
      name={name}
      verificationURL={verificationURL}
      homeURL={homeURL}
    />
  )

  const [html, text] = await Promise.all([
    render(emailVerification),
    render(emailVerification, { plainText: true }),
  ])

  return mailer.sendMail({
    from,
    to: to,
    subject: title,
    html,
    text,
  })
}
