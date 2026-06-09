import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('CardVacancy — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Backend Engineer' }));

      await expect(getByTestId(TEST_IDS.title)).toContainText('Backend Engineer');
    });

    test('renders description text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ description: 'Hybrid Contract' }));

      await expect(getByTestId(TEST_IDS.description)).toContainText('Hybrid Contract');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-cv' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-cv/);
    });
  });

  test.describe('props propagation', () => {
    test('appearance=neutral → data-appearance', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance: 'neutral' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-appearance', 'neutral');
    });

    test('appearance=primary → data-appearance', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance: 'primary' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-appearance', 'primary');
    });

    test('mobile=true → data-mobile', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mobile: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-mobile', 'true');
    });

    test('mobile=false → no data-mobile', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mobile: false }));

      const root = getByTestId(TEST_IDS.root);
      const hasAttr = await root.evaluate(el => el.hasAttribute('data-mobile'));
      expect(hasAttr).toBe(false);
    });

    test('href propagated to anchor', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ href: 'vacancy-42' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('href', 'vacancy-42');
    });
  });
});
