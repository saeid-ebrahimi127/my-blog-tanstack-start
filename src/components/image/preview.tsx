import type { ImagePreviewState } from '#/hooks/use-image-preview'

export const ImagePreview = ({ preview }: { preview: ImagePreviewState }) => {
  if (preview.status !== 'ready') return null
  return <img src={preview.url} alt="پیش نمایش عکس" />
}
