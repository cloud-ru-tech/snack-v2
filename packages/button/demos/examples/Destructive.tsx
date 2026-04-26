import { Button } from '@ds/button'
import { TrashSVG } from '@ds/icons'

export function Destructive() {
  return <Button appearance='critical' view='filled' icon={<TrashSVG />} label='Удалить' />
}
