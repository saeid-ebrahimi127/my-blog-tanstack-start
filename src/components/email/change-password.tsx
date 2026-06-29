import { EmailLogo } from '#/components/email-logo'
import { CHANGE_PASSWORD_EXPIRES_IN_MINUTES } from '#/lib/const'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from 'react-email'

export default function ChangePassword({
  title,
  name,
  changePasswordURL,
  homeURL,
}: {
  title: string
  name: string
  changePasswordURL: string
  homeURL: string
}) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            fontFamily: {
              sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
            },
          },
        },
      }}
    >
      <Html lang="fa-IR" dir="rtl">
        <Head>
          <title>{title}</title>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');`}
          </style>
        </Head>
        <Preview>{title}</Preview>
        <Body className="bg-gray-100 text-right font-sans" dir="rtl">
          <Container className="mt-16 rounded-xl border border-gray-300 bg-white p-4 px-8">
            <EmailLogo href={homeURL} />
            <Heading as="h1" className="text-xl">
              {title}
            </Heading>
            <Text className="text-base font-medium">سلام {name} 👋</Text>
            <Text>برای تغییر رمز عبور خود روی دکمه ی زیر کلیک کنید.</Text>
            <div className="text-center">
              <Link
                href={changePasswordURL}
                target="_blank"
                className="inline-block rounded-xl bg-sky-600 px-6 py-3 text-white"
              >
                {title}
              </Link>
            </div>
            <Text>
              لینک مورد نظر فقط تا {CHANGE_PASSWORD_EXPIRES_IN_MINUTES} دقیقه ی
              دیگر قابل استفاده خواهد بود.
            </Text>
            <Hr />
            <Text className="text-xs text-gray-600">
              در صورتی که این ایمیل به اشتباه برای شما ارسال شده است ، آن را
              نادیده بگیرید.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
