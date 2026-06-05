import { LAYOUT_TYPE } from '@ds/utils';

import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  TEST_IDS,
  TOOLBAR_COMPONENT_TEST_IDS,
  TOOLBAR_KEY_COMBOS,
  TOOLBAR_STORIES,
} from './helpers';

test.describe('Toolbar — rendering', () => {
  test.describe('render', () => {
    test('playground renders root with search and refresh (desktop)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.search)).toBeVisible();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton)).toBeVisible();
    });

    test('bulk actions example renders checkbox and actions', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TOOLBAR_STORIES.bulkActions));
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.checkbox)).toBeVisible();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.bulkActions)).toBeVisible();
    });

    test('with filters example renders filter button and filter row', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TOOLBAR_STORIES.withFilters));
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.filterButton)).toBeVisible();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.filterRow)).toBeVisible();
    });

    test('mobile example renders mobile toolbar', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ 'data-test-id': TEST_IDS.mobile }, TOOLBAR_STORIES.mobile));
      await expect(getByTestId(TEST_IDS.mobile)).toBeVisible();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton)).toBeHidden();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.moreActionsButton)).toBeVisible();
    });

    test('adaptive example renders desktop and mobile toolbars', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, TOOLBAR_STORIES.adaptive));
      await expect(getByTestId(TEST_IDS.adaptiveDesktop)).toBeVisible();
      await expect(getByTestId(TEST_IDS.adaptiveMobile)).toBeVisible();
      await expect(
        getByTestId(TEST_IDS.adaptiveDesktop).getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton),
      ).toBeVisible();
      await expect(
        getByTestId(TEST_IDS.adaptiveMobile).getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton),
      ).toBeHidden();
    });
  });

  test.describe('states', () => {
    test('filter open propagates data-filter-open on filter button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          showFilterRow: true,
          filterOpen: true,
          showMoreActions: false,
        }),
      );
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.filterButton)).toHaveAttribute('data-filter-open', 'true');
    });

    test('desktop bulk selection renders inline bulk actions', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          showBulkActions: true,
          bulkChecked: true,
          layoutType: LAYOUT_TYPE.Desktop,
        }),
      );
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.bulkActions)).toBeVisible();
    });

    test('mobile bulk selection renders bottom sheet', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          showBulkActions: true,
          bulkChecked: true,
          layoutType: LAYOUT_TYPE.Mobile,
        }),
      );
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.mobileBulkActionsSheet)).toBeVisible();
    });

    test('mobile hides refresh and after slots in toolbar row', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          layoutType: LAYOUT_TYPE.Mobile,
          showRefresh: true,
          showMoreActions: true,
          showExtraSlot: true,
        }),
      );

      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton)).toBeHidden();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.after)).toBeHidden();
      await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.moreActionsButton)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const combo of TOOLBAR_KEY_COMBOS) {
      const label = [
        combo.layoutType,
        'outline' in combo ? `outline=${combo.outline}` : null,
        'filterOpen' in combo && combo.filterOpen ? 'filterOpen' : null,
        'showExtraSlot' in combo && combo.showExtraSlot ? 'extraSlot' : null,
      ]
        .filter(Boolean)
        .join(' + ');

      test(label, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ ...combo }));
        await expect(getByTestId(TEST_IDS.root)).toBeVisible();

        if ('filterOpen' in combo && combo.filterOpen) {
          await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.filterButton)).toHaveAttribute(
            'data-filter-open',
            'true',
          );
        }

        if (combo.showRefresh) {
          if (combo.layoutType === LAYOUT_TYPE.Mobile) {
            await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton)).toBeHidden();
          } else {
            await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshButton)).toBeVisible();
          }
        }

        if ('showExtraSlot' in combo && combo.showExtraSlot) {
          await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.after)).toBeHidden();
        }
      });
    }
  });
});
