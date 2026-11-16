import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, Locator, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

test.describe('Stepper — rendering', () => {
  test('renders playground', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeVisible();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders mobile layout', async ({ gotoStory, getByTestId }) => {
    // Адаптивная раскладка — тулбар-глобал `layoutType`, форсим mobile через URL-globals.
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.playground, { layoutType: 'mobile' }));

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });
});

async function getRightEdge(locator: Locator): Promise<number> {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element has no bounding box');
  }
  return box.x + box.width;
}

async function getLeftEdge(locator: Locator): Promise<number> {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element has no bounding box');
  }
  return box.x;
}

test.describe('Stepper — long step text', () => {
  test('desktop: title and description are truncated within step width', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.visualMatrix));

    const ids = TEST_IDS.longText.desktop;
    const title = getByTestId(ids.title).first();
    const description = getByTestId(ids.description).first();
    const nextStep = getByTestId(ids.step).nth(1);

    await expect(title).toBeVisible();

    const nextStepLeft = await getLeftEdge(nextStep);
    expect(await getRightEdge(title)).toBeLessThanOrEqual(nextStepLeft);
    expect(await getRightEdge(description)).toBeLessThanOrEqual(nextStepLeft);

    expect(await title.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
    expect(await description.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  });

  test('mobile: current step title and description are truncated within stepper width', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.visualMatrix));

    const ids = TEST_IDS.longText.mobile;
    const root = getByTestId(ids.root);
    const title = getByTestId(ids.title);
    const description = getByTestId(ids.description);

    await expect(title).toBeVisible();

    const rootRight = await getRightEdge(root);
    expect(await getRightEdge(title)).toBeLessThanOrEqual(rootRight);
    expect(await getRightEdge(description)).toBeLessThanOrEqual(rootRight);

    expect(await title.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
    expect(await description.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  });
});
