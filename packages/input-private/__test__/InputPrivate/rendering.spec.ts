import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, INPUT_PRIVATE_STORIES, TEST_IDS } from './helpers';

test.describe('InputPrivate — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('scrolls long text to the caret while focused', async ({ gotoStory, getByTestId, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chromium caret scrolling regression');
    await gotoStory(buildStoryOptions({ value: 'Long input text '.repeat(30) }));
    const input = getByTestId(TEST_IDS.root);
    await expect(input).toHaveCSS('text-overflow', 'ellipsis');

    await input.press('End');
    await expect(input).toHaveCSS('text-overflow', 'clip');
    await expect.poll(() => input.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);

    await input.blur();
    await expect(input).toHaveCSS('text-overflow', 'ellipsis');
  });

  test('shows the beginning of the email after a registration error', async ({
    gotoStory,
    getByTestId,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'Chromium email scrolling regression');
    await gotoStory(buildStoryOptions(undefined, INPUT_PRIVATE_STORIES.registrationError));

    const input = getByTestId(TEST_IDS.root);
    await input.press('End');
    await expect.poll(() => input.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);

    await getByTestId(TEST_IDS.registrationSubmit).click();
    await expect(getByTestId(TEST_IDS.registrationError)).toBeVisible();
    await expect.poll(() => input.evaluate(element => element.scrollLeft)).toBe(0);

    await expect(input).not.toBeFocused();
    await input.evaluate(
      element =>
        new Promise<void>(resolve => {
          element.addEventListener('scroll', () => requestAnimationFrame(() => resolve()), { once: true });
          element.scrollLeft = 50;
        }),
    );
    await expect.poll(() => input.evaluate(element => element.scrollLeft)).toBe(0);

    await input.press('End');
    await expect(input).toBeFocused();
    await expect.poll(() => input.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  });

  test.describe('props propagation', () => {
    test('autoComplete=true → autocomplete="on"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoComplete: true }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('autocomplete', 'on');
    });

    // autoComplete=false — это дефолт пропа, покрывается Playground.play.

    test('autoComplete="email" → autocomplete="email"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoComplete: 'email' }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('autocomplete', 'email');
    });

    test('disabled=true → disabled attribute set', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      await expect(getByTestId(TEST_IDS.root)).toBeDisabled();
    });

    test('readonly=true → readonly attribute set', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ readonly: true }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('readonly', '');
    });
  });
});
