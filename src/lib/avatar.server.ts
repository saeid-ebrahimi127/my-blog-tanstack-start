import { serverEnv } from '#/lib/env.server'
import { processImage } from '#/lib/image.server'
import { fileNameZodSchema } from '#/zod-schema/field/file'
import { nanoid } from 'nanoid'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const avatarsDir = resolve(process.cwd(), 'upload', 'avatar')

const ensureAvatarDirExists = async () => {
  await mkdir(avatarsDir, {
    recursive: true,
  })
}

const env = serverEnv()

export const saveAvatar = async (buffer: Buffer) => {
  const processedImage = await processImage(buffer)

  await ensureAvatarDirExists()

  const fileName = `${nanoid()}.webp`

  await writeFile(resolve(avatarsDir, fileName), processedImage)

  return {
    imageURL: new URL(`/api/avatar/${fileName}`, env.APP_URL).toString(),
  }
}

export const readAvatar = async (fileName: string) => {
  await ensureAvatarDirExists()

  try {
    return await readFile(resolve(avatarsDir, fileName))
  } catch {
    return null
  }
}

export const deleteAvatar = async (arg: { fileName?: string }) => {
  const { error, data: fileName } = fileNameZodSchema.safeParse(arg.fileName)

  if (error) return { error: 'fileNameInvalid' } as const

  await ensureAvatarDirExists()

  await rm(resolve(avatarsDir, fileName), {
    force: true,
  })
}
