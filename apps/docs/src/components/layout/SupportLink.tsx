import { Button } from '@ds/button';

import { EXTERNAL_LINKS } from '../../config/external-links';

function ChatIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
    </svg>
  );
}

export function SupportLink() {
  return (
    <Button
      as='a'
      href={EXTERNAL_LINKS.support}
      target='_blank'
      size='m'
      view='outline'
      appearance='neutral'
      icon={<ChatIcon />}
      aria-label='Обратиться в поддержку'
    />
  );
}
