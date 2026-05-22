import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { expect, test } from '#playwright-tooling/fixtures';

import { VIEW } from '../../src/constants';
import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

const KEY_COMBOS = [
  { view: VIEW.Simple, fill: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level },
  { view: VIEW.Outline, fill: BACKGROUND_PREDEFINED_FILL.PrimaryBackground },
  { view: VIEW.Elevated, fill: BACKGROUND_PREDEFINED_FILL.Transparent },
] as const;

test.describe('CollapseBlockSecondary — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    await expect(getByTestId(TEST_IDS.collapseBlock)).toBeVisible();
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });

  test('data-component=accordionSecondary', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-component', 'accordionSecondary');
  });

  test.describe('props propagation', () => {
    for (const { view, fill } of KEY_COMBOS) {
      test(`view=${view} + backgroundPredefined=${fill}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(
          buildStoryOptions({
            ...PLAYGROUND_DEFAULT_ARGS,
            view,
            backgroundPredefined: fill,
          }),
        );

        const root = getByTestId(TEST_IDS.collapseBlock);
        await expect(root).toHaveAttribute('data-view', view);

        const { appearance, level } = backgroundPredefinedFillToAcrylic(fill);
        await expect(root).toHaveAttribute('data-acrylic-appearance', appearance);
        await expect(root).toHaveAttribute('data-acrylic-level', level);
      });
    }
  });

  test('expands on title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, children: 'Secondary content' }));

    await getByTestId(TEST_IDS.title).click();

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(TEST_IDS.content)).toContainText('Secondary content');
  });
});
