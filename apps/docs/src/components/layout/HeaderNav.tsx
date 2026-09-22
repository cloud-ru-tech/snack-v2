import { Button } from '@ds/button';

import { withBase } from '../../lib/base-url';
import { withDocsChrome } from './DocsChromeScope';

function HeaderNavContent() {
  return (
    <nav className='header-nav' aria-label='Header navigation'>
      {/* <Button as='a' label='Components' href={withBase('/components/button')} appearance='neutral' view='outline' /> */}
      <Button
        as='a'
        label='Contribution Guide'
        href={withBase('/patterns/contribution-guide')}
        size='m'
        appearance='neutral'
        view='outline'
      />
    </nav>
  );
}

export const HeaderNav = withDocsChrome(HeaderNavContent);
