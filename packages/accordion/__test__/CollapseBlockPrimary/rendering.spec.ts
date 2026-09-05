import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { expect, test } from '#playwright-tooling/fixtures';

import { CHEVRON_POSITION, VIEW } from '../../src/constants';
import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

const KEY_COMBOS = [
  {
    view: VIEW.Simple,
    fill: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
    chevronPosition: CHEVRON_POSITION.After,
  },
  { view: VIEW.Outline, fill: BACKGROUND_PREDEFINED_FILL.PrimaryBackground, chevronPosition: CHEVRON_POSITION.Before },
  { view: VIEW.Elevated, fill: BACKGROUND_PREDEFINED_FILL.Transparent, chevronPosition: CHEVRON_POSITION.After },
] as const;

test.describe('CollapseBlockPrimary — rendering', () => {
  test('render, props propagation and states', async ({ gotoStory, getByTestId, page, setStoryArgs }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    const root = getByTestId(TEST_IDS.collapseBlock);

    await test.step('render: default props', async () => {
      await expect(root).toBeVisible();
      await expect(getByTestId(TEST_IDS.title)).toBeVisible();
      await expect(getByTestId(TEST_IDS.chevron)).toBeVisible();
      await expect(root).toHaveAttribute('data-component', 'accordionPrimary');
      await expect(root).toHaveAttribute('data-expanded', 'false');
    });

    await test.step('render: title text', async () => {
      await setStoryArgs({ title: 'Custom title' });
      await expect(getByTestId(TEST_IDS.title)).toContainText('Custom title');
    });

    await test.step('render: block without title when title is empty', async () => {
      await setStoryArgs({ title: '' });
      await expect(getByTestId(TEST_IDS.title)).toHaveCount(0);
      await expect(root).toBeVisible();
    });

    await test.step('render: subTitle when provided', async () => {
      await setStoryArgs({ title: undefined, subTitle: 'Custom subtitle' });
      await expect(getByTestId(TEST_IDS.subTitle)).toContainText('Custom subtitle');
    });

    await test.step('render: hides chevron when showChevron=false', async () => {
      await setStoryArgs({ subTitle: undefined, showChevron: false });
      await expect(getByTestId(TEST_IDS.chevron)).toHaveCount(0);
    });

    await test.step('render: afterTitle slot toggles with showAfterTitleSlot', async () => {
      await setStoryArgs({ showChevron: undefined, showAfterTitleSlot: true });
      await expect(getByTestId(TEST_IDS.afterTitle)).toBeVisible();

      await setStoryArgs({ showAfterTitleSlot: false });
      await expect(getByTestId(TEST_IDS.afterTitle)).toHaveCount(0);
    });

    await test.step('render: content mounts only with keepMounted=true', async () => {
      await setStoryArgs({ showAfterTitleSlot: undefined, keepMounted: false });
      await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);

      await setStoryArgs({ keepMounted: true, children: 'Hello content' });
      await expect(getByTestId(TEST_IDS.content)).toContainText('Hello content');
    });

    await test.step('render: applies custom className', async () => {
      await setStoryArgs({ keepMounted: undefined, children: undefined, className: 'custom-collapse' });
      await expect(root).toHaveClass(/custom-collapse/);
    });

    for (const { view, fill, chevronPosition } of KEY_COMBOS) {
      await test.step(`props propagation: view=${view} + backgroundPredefined=${fill} + chevronPosition=${chevronPosition}`, async () => {
        await setStoryArgs({ className: undefined, view, backgroundPredefined: fill, chevronPosition });

        await expect(root).toHaveAttribute('data-view', view);

        const { appearance, level } = backgroundPredefinedFillToAcrylic(fill);
        await expect(root).toHaveAttribute('data-acrylic-appearance', appearance);
        await expect(root).toHaveAttribute('data-acrylic-level', level);

        await expect(page.locator(`[data-chevron-position="${chevronPosition}"]`)).toBeVisible();
      });
    }
  });
});
