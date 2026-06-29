import { EmailLogo } from '#/components/email-logo'
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

export default function PasswordChanged({
  title,
  name,
  homeURL,
}: {
  title: string
  name: string
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
            <Text>رمز عبور شما تغییر یافت.</Text>
            <Text>
              در صورتی که این تغییر به خواست شما انجام نشده است ، فورا با{' '}
              <Link
                href={new URL('/contact-us', homeURL).toString()}
                target="_blank"
                className="text-sky-600 underline underline-offset-6"
              >
                پشتیبانی
              </Link>{' '}
              تماس بگیرید.
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
