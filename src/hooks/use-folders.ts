import { getFolders } from '#/serverfn/folder'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

export const foldersQueryKeyPrefix = 'folders'

export const useFolders = ({ path = [] }: { path?: string[] } = {}) => {
  const getFoldersFn = useServerFn(getFolders)
  const parentFolderId = path.length > 0 ? path[path.length - 1] : null

  return useQuery({
    queryKey: [foldersQueryKeyPrefix, ...path],
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
