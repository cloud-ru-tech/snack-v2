import { Decorator } from '@storybook/react';
import { addons } from 'storybook/preview-api';

import { resolvePkgFromTitle } from '../shared/pkgFromTitle';
import { EVENT_SET } from './constants';

const readmeModules = import.meta.glob('../../../../../packages/*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const readmesByPkg: Record<string, string> = {};
for (const [filePath, content] of Object.entries(readmeModules)) {
  const m = filePath.match(/\/packages\/([^/]+)\/README\.md$/);
  if (m) readmesByPkg[m[1]] = content;
}

type ReadmeParam = { disable?: boolean; content?: string } | undefined;

export const decorators: Decorator[] = [
  (Story, ctx) => {
    const param = (ctx.parameters as { readme?: ReadmeParam }).readme;
    if (param?.disable) {
      addons.getChannel().emit(EVENT_SET, null);
      return Story();
    }
    const resolved = resolvePkgFromTitle(ctx.title, readmesByPkg);
    const content = param?.content ?? (resolved ? readmesByPkg[resolved.pkg] : null);
    addons.getChannel().emit(EVENT_SET, content ?? null);
    return Story();
  },
];
