import { Button } from '@ds/button';

import { getStorybookBaseUrl } from '../../lib/storybook-url';
import { StorybookLogo } from './logo/StorybookLogo';

export function StorybookLink() {
  return (
    <Button
      as='a'
      href={`${getStorybookBaseUrl()}/`}
      target='_blank'
      size='m'
      view='outline'
      appearance='neutral'
      icon={<StorybookLogo size={18} />}
      aria-label='Storybook'
    />
  );
}
