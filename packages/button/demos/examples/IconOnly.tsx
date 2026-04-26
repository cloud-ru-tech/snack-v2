import { Button } from '@ds/button'
import { SettingsSVG } from '@ds/icons'

export function IconOnly() {
  return <Button view='function' icon={<SettingsSVG />} aria-label='Настройки' />
}
