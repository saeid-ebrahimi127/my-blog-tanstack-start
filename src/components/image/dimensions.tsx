import type { ImagePreviewState } from '#/hooks/use-image-preview'

export const ImageDimensions = ({
  preview,
}: {
  preview: ImagePreviewState
}) => {
  if (preview.status === 'loading') return <span>صبر کنید...</span>
  if (preview.status === 'error') return null
  return (
    <span dir="ltr">
      {preview.dimensions.width} * {preview.dimensions.height}
    </span>
  )
}
