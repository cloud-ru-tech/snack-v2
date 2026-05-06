import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { expect, test } from '#playwright-tooling/fixtures';

import { VIEW } from '../../src/constants';
import { buildStoryOptions, COLLAPSE_BLOCK_TEST_ID, CONTENT_TEST_ID, TITLE_TEST_ID } from './helpers';

test.describe('CollapseBlockSecondary — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toBeVisible();
    await expect(getByTestId(TITLE_TEST_ID)).toBeVisible();
  });

  test('data-component=accordionSecondary', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-component', 'accordionSecondary');
  });

  test.describe('props propagation', () => {
    for (const view of Object.values(VIEW)) {
      test(`view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ view }));

        await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-view', view);
      });
    }

    for (const fill of Object.values(BACKGROUND_PREDEFINED_FILL)) {
      test(`backgroundPredefined=${fill}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ backgroundPredefined: fill }));

        const { appearance, level } = backgroundPredefinedFillToAcrylic(fill);
        await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-acrylic-appearance', appearance);
        await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-acrylic-level', level);
      });
    }
  });

  test('expands on title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ children: 'Secondary content' }));

    await getByTestId(TITLE_TEST_ID).click();

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(CONTENT_TEST_ID)).toContainText('Secondary content');
  });
});
