import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STORIES, TEST_IDS } from './helpers';

test.describe('SiteVideo — rendering', () => {
  test('renders an accessible video region', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.player)).toHaveAttribute('role', 'region');
    await expect(getByTestId(TEST_IDS.nativeVideo)).toBeAttached();
  });
  test('controls=false removes the overlay', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ controls: false }));
    await expect(getByTestId(TEST_IDS.playButton)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.poster)).toBeVisible();
  });
  test('autoplay is muted and looping attributes propagate', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ autoPlay: true, loop: true }));
    await expect(getByTestId(TEST_IDS.nativeVideo)).toHaveJSProperty('muted', true);
    await expect(getByTestId(TEST_IDS.nativeVideo)).toHaveJSProperty('loop', true);
    await expect(getByTestId(TEST_IDS.player)).toHaveAttribute('data-playing', 'true');
  });
  test('accepts a custom player element', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STORIES.custom));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.playButton)).toHaveCount(0);
  });
  test.describe('provider source isolation', () => {
    for (const provider of ['youtube', 'rutube']) {
      test(
        provider + ' loads only after activation and accepts its own messages',
        async ({ page, gotoStory, getByTestId }) => {
          const origin = provider === 'youtube' ? 'https://www.youtube.com' : 'https://rutube.ru';
          const data =
            provider === 'youtube'
              ? { event: 'onStateChange', info: 1 }
              : { type: 'player:changeState', data: { state: 'playing' } };
          await page.route(origin + '/**', route =>
            route.fulfill({
              contentType: 'text/html',
              body:
                '<html><body><script>setTimeout(() => parent.postMessage(' +
                JSON.stringify(JSON.stringify(data)) +
                ', "*"), 100)</script></body></html>',
            }),
          );
          await gotoStory(buildStoryOptions({ source: provider }));
          await expect(getByTestId(TEST_IDS.embed)).toHaveCount(0);
          await getByTestId(TEST_IDS.playButton).click();
          await expect(getByTestId(TEST_IDS.embed)).toHaveAttribute('src', new RegExp('^' + origin));
          await expect(getByTestId(TEST_IDS.player)).toHaveAttribute('data-playing', 'true');
        },
      );
    }
  });
});
