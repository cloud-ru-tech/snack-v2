import { Button } from '@ds/button';
import { GitHubLogo } from '@ds/icons/logos';

import { EXTERNAL_LINKS } from '../../config/external-links';

export function GithubLink() {
  return (
    <Button
      as='a'
      href={EXTERNAL_LINKS.repo}
      target='_blank'
      size='m'
      view='outline'
      appearance='neutral'
      icon={<GitHubLogo size={18} />}
      aria-label='GitHub repository'
    />
  );
}
