import { getFolders } from '#/serverfn/folder'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const foldersQueryKeyPrefix = 'folders'

export const useFolders = ({
  parentFolderId = null,
}: {
  parentFolderId?: string | null
} = {}) => {
  const getFoldersFn = useServerFn(getFolders)

  return useQuery({
    queryKey: [foldersQueryKeyPrefix, { parentFolderId }],
    async queryFn({ signal }) {
      const folders = await getFoldersFn({
        signal,
        data: { parentFolderId },
      })

      return folders
    },
    staleTime: Infinity,
    refetchOnMount: true,
    throwOnError: true,
    placeholderData: keepPreviousData,
  })
}
