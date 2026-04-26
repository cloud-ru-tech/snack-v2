import { Button } from '@ds/button'
import { DownloadSVG } from '@ds/icons'

export function Loading() {
  return (
    <Button
      appearance='primary'
      view='filled'
      icon={<DownloadSVG />}
      label='Скачать отчёт'
      loading
    />
  )
}
