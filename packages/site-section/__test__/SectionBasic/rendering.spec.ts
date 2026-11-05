import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('SectionBasic — rendering', () => {
  test('renders all slots', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ id: 'services' }));

    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('id', 'services');

    for (const slot of [
      TEST_IDS.title,
      TEST_IDS.description,
      TEST_IDS.tabs,
      TEST_IDS.filters,
      TEST_IDS.pagination,
      TEST_IDS.moreButton,
    ]) {
      await test.step(slot, async () => {
        await expect(getByTestId(slot)).toBeVisible();
      });
    }
  });

  test('optional slots are not rendered', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());

    await test.step('without tabs and filters', async () => {
      await setStoryArgs({ showTabs: false, showFilters: false });
      await expect(getByTestId(TEST_IDS.tabs)).toHaveCount(0);
      await expect(getByTestId(TEST_IDS.filters)).toHaveCount(0);
    });

    await test.step('without pagination and more button → no footer', async () => {
      await setStoryArgs({ showPagination: false, showMoreButton: false });
      await expect(getByTestId(TEST_IDS.footer)).toHaveCount(0);
    });

    await test.step('without title and description', async () => {
      await setStoryArgs({ title: undefined, description: undefined });
      await expect(getByTestId(TEST_IDS.title)).toHaveCount(0);
    });

    // `containerType` — story-контрол, Playground собирает из него `containerBackground`.
    await test.step('containerBackground.type=image → decorative <img>', async () => {
      await setStoryArgs({ containerType: 'image' });
      const background = getByTestId(TEST_IDS.containerBackground);
      await expect(background).toHaveJSProperty('tagName', 'IMG');
      await expect(background).toHaveAttribute('alt', '');
    });
  });

  test('container propagates to data-container', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    for (const container of ['new', 'old']) {
      await test.step(container, async () => {
        await setStoryArgs({ container });
        await expect(root).toHaveAttribute('data-container', container);
      });
    }
  });

  test('titleTag sets the heading tag', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ titleTag: 'h3' }));

    await expect(getByTestId(TEST_IDS.title)).toHaveJSProperty('tagName', 'H3');
  });

  // Сценарий `/catalog?tab=ai`: выбранная вкладка приходит снаружи.
  test('tabBarValue selects the tab', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ tabBarValue: 'ai' }));

    await expect(getByTestId(`${TEST_IDS.tabPrefix}-ai`)).toHaveAttribute('aria-selected', 'true');
    await expect(getByTestId(`${TEST_IDS.tabPrefix}-infrastructure`)).toHaveAttribute('aria-selected', 'false');
  });
});
