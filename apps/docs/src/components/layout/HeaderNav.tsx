import { Link } from '@ds/link';

import { withBase } from '../../lib/base-url';

export function HeaderNav() {
  return (
    <nav className='header-nav' aria-label='Header navigation'>
      <Link text='Components' href={withBase('/components/button')} target='_self' appearance='neutral' />
      <Link text='Patterns' href={withBase('/patterns/composition-patterns')} target='_self' appearance='neutral' />
    </nav>
  );
}
