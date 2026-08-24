import { UserMenu } from '@ds/uikit-product-header';

import { SETTING_ITEMS } from '../../../stories/demoData';

export function Basic() {
  return (
    <UserMenu
      profile={{ fullName: 'Ivan Petrov', email: 'ipetrov@cloud.ru', inviteCount: 1 }}
      theme={{ value: 'light' }}
      settingItems={SETTING_ITEMS}
      items={[{ content: { label: 'Option 1' } }, { content: { label: 'Option 2' } }]}
      data-test-id='header-user-menu-basic'
    />
  );
}
