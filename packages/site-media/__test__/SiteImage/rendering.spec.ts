import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions } from './helpers';

test('SiteImage propagates image and accessibility attributes', async ({ gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions({ src: 'example', alt: 'Example image', loading: 'eager', width: 320 }));
  const image = getByTestId('site-image-story');
  await expect(image).toHaveAttribute('src', 'example');
  await expect(image).toHaveAttribute('alt', 'Example image');
  await expect(image).toHaveAttribute('loading', 'eager');
  await expect(image).toHaveAttribute('width', '320');
});
