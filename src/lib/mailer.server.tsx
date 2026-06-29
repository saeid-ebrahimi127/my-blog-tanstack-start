import AccountVerification from '#/components/email/account-verification'
import ChangePassword from '#/components/email/change-password'
import PasswordChanged from '#/components/email/password-changed'
import { APP_NAME } from '#/lib/const'
import { logAppMessage, logEmailLink } from '#/lib/utils.server'
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

const homeURL = env.APP_URL

export const sendAccountVerificationEmail = async ({
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

  const title = 'تایید حساب کاربری'

  const accountVerification = (
    <AccountVerification
      title={title}
      name={name}
      verificationURL={verificationURL}
      homeURL={homeURL}
    />
  )

  const [html, text] = await Promise.all([
    render(accountVerification),
    render(accountVerification, { plainText: true }),
  ])

  return mailer.sendMail({
    from,
    to: to,
    subject: title,
    html,
    text,
  })
}

export const sendChangePasswordEmail = async ({
  to,
  name,
  changePasswordURL,
}: {
  to: string
  name: string
  changePasswordURL: string
}) => {
  if (env.NODE_ENV !== 'production') {
    await logEmailLink({ to, link: changePasswordURL })

    return
  }

  const title = 'تغییر رمز عبور'

  const changePassword = (
    <ChangePassword
      title={title}
      name={name}
      changePasswordURL={changePasswordURL}
      homeURL={homeURL}
    />
  )

  const [html, text] = await Promise.all([
    render(changePassword),
    render(changePassword, { plainText: true }),
  ])

  return mailer.sendMail({
    from,
    to: to,
    subject: title,
    html,
    text,
  })
}

export const sendPasswordChangedEmail = async ({
  to,
  name,
}: {
  to: string
  name: string
}) => {
  if (env.NODE_ENV !== 'production') {
    await logAppMessage({ message: `${to} => password changed.` })

    return
  }

  const title = 'رمز عبور شما تغییر یافت'

  const passwordChanged = (
    <PasswordChanged title={title} name={name} homeURL={homeURL} />
  )

  const [html, text] = await Promise.all([
    render(passwordChanged),
    render(passwordChanged, { plainText: true }),
  ])

  return mailer.sendMail({
    from,
    to: to,
    subject: title,
    html,
    text,
  })
}
