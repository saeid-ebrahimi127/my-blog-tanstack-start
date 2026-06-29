import { toast } from 'sonner'

export const errorMessage = {
  INVALID_EMAIL_OR_PASSWORD: 'ایمیل یا رمز عبور اشتباه است.',
  generic: 'خطایی رخ داده!',
  EMAIL_EXISTS: 'ایمیل مورد نظر قبلا استفاده شده است.',
  EMAIL_NOT_VERIFIED: 'ایمیل شما تایید نشده است.',
  INVALID_TOKEN: 'توکن اشتباه بوده یا منقضی شده است. دوباره درخواست لینک کنید.',
}

export type ErrorMessageKeys = keyof typeof errorMessage

export const errorMessageKeys = Object.keys(
  errorMessage,
) as Array<ErrorMessageKeys>

export const successMessage = {
  loginSuccess: 'شما وارد شدید.',
  registerSuccess:
    'ثبت نام انجام شد. پیامی جهت تایید ایمیل برای شما ارسال گردید.',
  emailVerified: 'ایمیل شما تایید شد. خوش آمدید.',
}

export type SuccessMessageKeys = keyof typeof successMessage

export const betterAuthToastError = (error: {
  code?: string | undefined
  message?: string | undefined
  status: number
  statusText: string
}) => {
  toast.error(error.code && errorMessage[error.code as ErrorMessageKeys]) ||
    error.message ||
    errorMessage['generic']
}
