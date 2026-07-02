import { useEffect, useState } from 'react'

type Dimensions = { width: number; height: number }

export type ImagePreviewState =
  | { status: 'loading'; url: null; dimensions: null; error: null }
  | { status: 'error'; url: null; dimensions: null; error: Error }
  | { status: 'ready'; url: string; dimensions: Dimensions; error: null }

const NOT_IMAGE_ERROR = new Error('Not an image')

export const useImagePreview = (file: File): ImagePreviewState => {
  const [state, setState] = useState<ImagePreviewState>(() =>
    file.type.startsWith('image/')
      ? { status: 'loading', url: null, dimensions: null, error: null }
      : {
          status: 'error',
          url: null,
          dimensions: null,
          error: NOT_IMAGE_ERROR,
        },
  )

  useEffect(() => {
    if (!file.type.startsWith('image/')) {
      setState({
        status: 'error',
        url: null,
        dimensions: null,
        error: NOT_IMAGE_ERROR,
      })
      return
    }

    setState({ status: 'loading', url: null, dimensions: null, error: null })

    let cancelled = false
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      if (cancelled) return
      setState({
        status: 'ready',
        url: objectUrl,
        dimensions: { width: img.naturalWidth, height: img.naturalHeight },
        error: null,
      })
    }

    img.onerror = () => {
      if (cancelled) return
      setState({
        status: 'error',
        url: null,
        dimensions: null,
        error: new Error('Failed to load image'),
      })
      URL.revokeObjectURL(objectUrl)
    }

    img.src = objectUrl

    return () => {
      cancelled = true
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return state
}
