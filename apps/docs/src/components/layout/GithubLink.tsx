import { Button } from '@ds/button';
import { GitHubLogo } from '@ds/icons/logos';

import { EXTERNAL_LINKS } from '../../config/external-links';
import { withDocsChrome } from './DocsChromeScope';

function GithubLinkContent() {
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

export const GithubLink = withDocsChrome(GithubLinkContent);
