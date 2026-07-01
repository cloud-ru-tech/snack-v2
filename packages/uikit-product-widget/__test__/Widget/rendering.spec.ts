import { expect, test } from '#playwright-tooling/fixtures';

import { WIDGET_STATE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS, WIDGET_KEY_COMBOS, WIDGET_STORIES, WIDGET_TEST_ID } from './helpers';

test.describe('Widget — rendering', () => {
  test.describe('render', () => {
    test('playground renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(WIDGET_TEST_ID)).toBeVisible();
    });

    test('default content example renders header', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, WIDGET_STORIES.defaultContent));
      await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    });

    test('with actions example renders actions block', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, WIDGET_STORIES.withActions));
      await expect(getByTestId(TEST_IDS.actions)).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('loading sets data-state and header data-loading', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ state: WIDGET_STATE.Loading }));
      await expect(getByTestId(WIDGET_TEST_ID)).toHaveAttribute('data-state', WIDGET_STATE.Loading);
      await expect(getByTestId(TEST_IDS.header)).toHaveAttribute('data-loading', 'true');
    });

    test('error sets data-state and renders retry button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ state: WIDGET_STATE.Error }));
      await expect(getByTestId(WIDGET_TEST_ID)).toHaveAttribute('data-state', WIDGET_STATE.Error);
      await expect(getByTestId(TEST_IDS.errorRetry)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { state, wide, layoutType } of WIDGET_KEY_COMBOS) {
      test(`${state} + wide=${wide} + layoutType=${layoutType}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ state, wide }, WIDGET_STORIES.playground, { layoutType }));
        const root = getByTestId(WIDGET_TEST_ID);
        await expect(root).toHaveAttribute('data-state', state);

        const expectWide = wide && layoutType !== 'mobile';
        if (expectWide) {
          await expect(root).toHaveAttribute('data-wide', 'true');
        } else {
          const hasWide = await root.evaluate(el => el.hasAttribute('data-wide'));
          expect(hasWide).toBe(false);
        }
      });
    }
  });
});
