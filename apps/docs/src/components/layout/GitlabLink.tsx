import { Button } from '@ds/button';

import { EXTERNAL_LINKS } from '../../config/external-links';

function GitlabIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.387 9.452.044 13.587a.924.924 0 00.331 1.023L12 23.054l11.625-8.443a.924.924 0 00.33-1.024' />
    </svg>
  );
}

export function GitlabLink() {
  return (
    <Button
      as='a'
      href={EXTERNAL_LINKS.repo}
      target='_blank'
      size='m'
      view='outline'
      appearance='neutral'
      icon={<GitlabIcon />}
      aria-label='GitLab repository'
    />
  );
}
