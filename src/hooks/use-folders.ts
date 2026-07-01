import { getFolders } from '#/serverfn/folder'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const foldersQueryKeyPrefix = 'folders'

export const useFolders = ({
  parentFolderId = null,
}: {
  parentFolderId?: string | null
} = {}) => {
  const getFoldersFn = useServerFn(getFolders)

  return useSuspenseQuery({
    queryKey: [foldersQueryKeyPrefix, { parentFolderId }],
    async queryFn({ signal }) {
      const folders = await getFoldersFn({ signal, data: { parentFolderId } })

      return folders
    },
    staleTime: Infinity,
  })
}
