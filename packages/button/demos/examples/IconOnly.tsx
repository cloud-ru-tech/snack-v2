import { Button } from '@ds/button';
import { SettingsSVG } from '@ds/icons/interface/system';

export function IconOnly() {
  return <Button view='function' icon={<SettingsSVG />} aria-label='Настройки' />;
}
