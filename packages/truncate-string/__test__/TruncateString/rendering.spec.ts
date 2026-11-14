import { expect, test } from '#playwright-tooling/fixtures';

import { VARIANT } from '../../src/constants';
import { buildStoryOptions, KEY_VARIANTS, TEST_IDS } from './helpers';

test.describe('TruncateString — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders provided text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ text: 'Custom text content' }));

    await expect(getByTestId(TEST_IDS.root)).toContainText('Custom text content');
  });

  test('shows the tooltip when overflow rounds to the same integer width', async ({ gotoStory, getByTestId, page }) => {
    const text = 'Fractional overflow';
    await gotoStory(buildStoryOptions({ text }));
    const label = getByTestId(TEST_IDS.root);

    await page.evaluate(() => document.fonts.ready);
    await label.evaluate(element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      element.style.fontFamily = 'monospace';
      element.style.fontSize = '16px';
      const textWidth = range.getBoundingClientRect().width;
      const delta = textWidth - Math.round(textWidth) + 0.49;
      const container = element.parentElement;
      if (container) {
        container.style.fontFamily = 'monospace';
        container.style.fontSize = '16px';
        container.style.width = `${textWidth - Math.min(0.25, delta)}px`;
      }
    });
    await expect.poll(() => label.evaluate(element => element.scrollWidth - element.clientWidth)).toBe(0);

    await label.hover();
    await expect(page.getByRole('tooltip')).toHaveText(text);
  });

  test('props propagation across key variants', async ({ gotoStory, getByTestId }) => {
    for (const variant of KEY_VARIANTS) {
      await gotoStory(buildStoryOptions({ variant }));
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      // Middle variant renders fullText/truncatedText slots; End variant does not.
      if (variant === VARIANT.Middle) {
        await expect(getByTestId(TEST_IDS.fullText)).toBeAttached();
        await expect(getByTestId(TEST_IDS.truncatedText)).toBeAttached();
      } else {
        await expect(getByTestId(TEST_IDS.fullText)).toHaveCount(0);
      }
    }
  });
});
