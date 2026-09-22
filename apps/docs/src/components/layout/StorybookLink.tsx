import { Button } from '@ds/button';

import { getStorybookBaseUrl } from '../../lib/storybook-url';
import { withDocsChrome } from './DocsChromeScope';
import { StorybookLogo } from './logo/StorybookLogo';

function StorybookLinkContent() {
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

export const StorybookLink = withDocsChrome(StorybookLinkContent);
