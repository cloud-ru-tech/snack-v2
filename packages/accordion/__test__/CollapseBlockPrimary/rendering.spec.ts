import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { expect, test } from '#playwright-tooling/fixtures';

import { CHEVRON, VIEW } from '../../src/constants';
import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

const KEY_COMBOS = [
  { view: VIEW.Simple, fill: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level, chevron: CHEVRON.After },
  { view: VIEW.Outline, fill: BACKGROUND_PREDEFINED_FILL.PrimaryBackground, chevron: CHEVRON.Before },
  { view: VIEW.Elevated, fill: BACKGROUND_PREDEFINED_FILL.Transparent, chevron: CHEVRON.After },
] as const;

test.describe('CollapseBlockPrimary — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

      await expect(getByTestId(TEST_IDS.collapseBlock)).toBeVisible();
      await expect(getByTestId(TEST_IDS.title)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, title: 'Custom title' }));

      await expect(getByTestId(TEST_IDS.title)).toContainText('Custom title');
    });

    test('hides title when title is not provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, title: '' }));
      await expect(getByTestId(TEST_IDS.title)).toHaveCount(0);
    });

    test('renders block without title', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, title: '' }));
      await expect(getByTestId(TEST_IDS.collapseBlock)).toBeVisible();
    });

    test('renders subTitle when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, subTitle: 'Custom subtitle' }));

      await expect(getByTestId(TEST_IDS.subTitle)).toContainText('Custom subtitle');
    });

    test('renders chevron by default', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

      await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
    });

    test('hides chevron when showChevron=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, showChevron: false }));

      await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
    });

    test('renders afterTitle slot when enabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterTitleSlot: true }));

      await expect(getByTestId(TEST_IDS.afterTitle)).toBeVisible();
    });

    test('hides afterTitle slot when disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showAfterTitleSlot: false }));

      await expect(getByTestId(TEST_IDS.afterTitle)).toHaveCount(0);
    });

    test('content is hidden in DOM by default (keepMounted=false)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, keepMounted: false }));

      await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);
    });

    test('content is mounted when keepMounted=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          ...PLAYGROUND_DEFAULT_ARGS,
          keepMounted: true,
          children: 'Hello content',
        }),
      );

      await expect(getByTestId(TEST_IDS.content)).toContainText('Hello content');
    });
  });

  test.describe('props propagation', () => {
    for (const { view, fill, chevron } of KEY_COMBOS) {
      test(`view=${view} + backgroundPredefined=${fill} + chevron=${chevron}`, async ({
        gotoStory,
        getByTestId,
        page,
      }) => {
        await gotoStory(
          buildStoryOptions({
            ...PLAYGROUND_DEFAULT_ARGS,
            view,
            backgroundPredefined: fill,
            chevron,
          }),
        );

        const root = getByTestId(TEST_IDS.collapseBlock);
        await expect(root).toHaveAttribute('data-view', view);

        const { appearance, level } = backgroundPredefinedFillToAcrylic(fill);
        await expect(root).toHaveAttribute('data-acrylic-appearance', appearance);
        await expect(root).toHaveAttribute('data-acrylic-level', level);

        await expect(page.locator(`[data-chevron="${chevron}"]`)).toBeVisible();
      });
    }

    test('data-component=accordionPrimary', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

      await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-component', 'accordionPrimary');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, className: 'custom-collapse' }));

      await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveClass(/custom-collapse/);
    });
  });

  test.describe('states', () => {
    test('collapsed by default — data-expanded=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

      await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'false');
    });
  });
});
