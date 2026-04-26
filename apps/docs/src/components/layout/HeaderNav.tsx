import { Button } from '@ds/button';

import { withBase } from '../../lib/base-url';

export function HeaderNav() {
  return (
    <nav className='header-nav' aria-label='Header navigation'>
      {/* <Button as='a' label='Components' href={withBase('/components/button')} appearance='neutral' view='outline' /> */}
      <Button
        as='a'
        label='Contribution Guide'
        href={withBase('/patterns/contribution-guide')}
        appearance='neutral'
        view='outline'
      />
    </nav>
  );
}
