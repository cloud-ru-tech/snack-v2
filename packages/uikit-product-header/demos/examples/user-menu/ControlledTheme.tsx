import { UserMenu } from '@ds/uikit-product-header';
import { useState } from 'react';

import { SETTING_ITEMS } from '../../../stories/demoData';

export function ControlledTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  return (
    <UserMenu
      profile={{ fullName: 'Ivan Petrov', email: 'ipetrov@cloud.ru' }}
      theme={{ value: theme, onChange: setTheme }}
      settingItems={SETTING_ITEMS}
      data-test-id='header-user-menu-theme'
    />
  );
}
