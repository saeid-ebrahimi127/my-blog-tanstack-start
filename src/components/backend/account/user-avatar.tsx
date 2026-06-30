import { CardLayout } from '#/components/layout/card'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import { useHandleAxiosError } from '#/hooks/use-handle-axios-error'
import { errorMessage, successMessage } from '#/lib/message'
import {
  avatarMaxSizeBytes,
  avatarValidMimes,
  avatarZodSchema,
  readableMimes,
} from '#/zod-schema/field/file'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'
import {
  ImageIcon,
  Loader2Icon,
  TrashIcon,
  UploadCloudIcon,
  XCircleIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export const AccountUserAvatar = () => {
  const { currentUser } = useRouteContext({ from: '/_main-layout/_backend' })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [filePreview, setFilePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedFile) return

    const preview = URL.createObjectURL(selectedFile)

    setFilePreview(preview)

    return () => URL.revokeObjectURL(preview)
  }, [selectedFile])

  const inputRef = useRef<HTMLInputElement | null>(null)

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const [isPending, setIsPending] = useState(false)

  const abortControllerRef = useRef<InstanceType<
    typeof AbortController
  > | null>(null)

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  const router = useRouter()

  const { handleAxiosError } = useHandleAxiosError()

  const handleUploadOrDelete = async ({
    method,
    file,
  }: { method: 'post'; file: File } | { method: 'delete'; file?: never }) => {
    try {
      setIsPending(true)

      abortControllerRef.current = new AbortController()

      if (method === 'post') {
        const formData = new FormData()
        formData.set('file', file)

        await axios.post('/api/avatar', formData, {
          signal: abortControllerRef.current.signal,
        })

        clearInput()

        clearSelectedFile()
      }

      if (method === 'delete') {
        if (!confirm('آیا مطمئن هستید می خواهید تصویر کاربری خود را حذف کنید؟'))
          return

        await axios.delete('/api/avatar', {
          signal: abortControllerRef.current.signal,
        })
      }

      router.invalidate()

      toast.success(
        successMessage[method === 'post' ? 'avatarSaved' : 'avatarDeleted'],
      )
    } catch (e) {
      if (e instanceof AxiosError) {
        await handleAxiosError(e)
      } else {
        toast.error(errorMessage['generic'])
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <CardLayout
      title="تصویر کاربری"
      description="در اینجا می توانید تصویر کاربری خود را آپلود ، ویرایش و یا حذف کنید."
    >
      <div className="flex flex-col items-center justify-center">
        {filePreview ? (
          <div className="size-32 rounded-full">
            <img
              src={filePreview}
              alt="avatar preview"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        ) : (
          <Avatar className="size-32">
            <AvatarImage
              src={currentUser.image || undefined}
              alt={`${currentUser.name} avatar`}
            />
            <AvatarFallback className="bg-primary text-3xl text-white capitalize">
              {currentUser.name[0]}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="text-muted-foreground mt-3 space-y-1 text-center">
          <p>حداکثر حجم مجاز: {avatarMaxSizeBytes / 1024 / 1024} مگابایت</p>
          <p>موارد مجاز: {readableMimes(avatarValidMimes)}</p>
        </div>
        <Button
          type="button"
          disabled={isPending}
          variant="outline"
          className="mt-3 px-6"
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          <ImageIcon />
          انتخاب تصویر
        </Button>
        {selectedFile && (
          <Button
            type="button"
            disabled={isPending}
            className="mt-3 px-6"
            onClick={async () => {
              await handleUploadOrDelete({ method: 'post', file: selectedFile })
            }}
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <UploadCloudIcon />
            )}
            {isPending ? 'صبر کنید...' : 'آپلود'}
          </Button>
        )}
        {currentUser.image && (
          <Button
            type="button"
            disabled={isPending}
            variant="destructive"
            className="mt-3 px-6"
            onClick={async () => {
              await handleUploadOrDelete({ method: 'delete' })
            }}
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            {isPending ? 'صبر کنید...' : 'حذف تصویر کاربری'}
          </Button>
        )}
        {filePreview && (
          <Button
            type="button"
            disabled={isPending}
            variant="destructive"
            className="mt-3 px-6"
            onClick={() => {
              clearInput()

              clearSelectedFile()
            }}
          >
            <XCircleIcon />
            حذف تصویر انتخاب شده
          </Button>
        )}
      </div>
      <input
        type="file"
        disabled={isPending}
        ref={inputRef}
        className="sr-only"
        onChange={(e) => {
          const chosenFile = e.target.files?.[0]

          if (!chosenFile) return

          const { error, data: avatar } = avatarZodSchema.safeParse(chosenFile)

          if (error) {
            toast.error(error.issues[0].message)

            return
          }

          setSelectedFile(avatar)
        }}
        accept={avatarValidMimes.join(',')}
      />
    </CardLayout>
  )
}
