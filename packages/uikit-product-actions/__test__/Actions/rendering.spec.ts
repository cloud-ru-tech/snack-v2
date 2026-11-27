import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/Actions/testIds';
import { buildStoryOptions } from './helpers';

test('Все действия видны в широком контейнере', async ({ gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions());
  await expect(getByTestId(TEST_IDS.first)).toBeVisible();
  await expect(getByTestId(TEST_IDS.second)).toBeVisible();
  await expect(getByTestId(TEST_IDS.third)).toBeVisible();
});

test('После загрузки действий resize скрывает и возвращает все кнопки', async ({ gotoStory, getByTestId }) => {
  await gotoStory(
    buildStoryOptions(undefined, { name: 'actions-actions-tests-interaction', story: 'interaction-test' }),
  );
  const row = getByTestId(TEST_IDS.root);
  await getByTestId(TEST_IDS.load).click();
  await expect(row).toBeVisible();
  await row.evaluate(el => {
    el.style.width = '40px';
  });
  await expect(getByTestId(TEST_IDS.stateful)).toHaveCount(0);
  await row.evaluate(el => {
    el.style.width = '900px';
  });
  await expect(getByTestId(TEST_IDS.stateful)).toBeVisible();
});

test('Одно расширение возвращает несколько действий', async ({ gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions());
  const row = getByTestId(TEST_IDS.root);
  await row.evaluate(el => {
    el.style.width = '40px';
  });
  await expect(getByTestId(TEST_IDS.first)).toHaveCount(0);
  await row.evaluate(el => {
    el.style.width = '900px';
  });
  await expect(getByTestId(TEST_IDS.first)).toBeVisible();
  await expect(getByTestId(TEST_IDS.second)).toBeVisible();
  await expect(getByTestId(TEST_IDS.third)).toBeVisible();
});

test('Возврат лимита пересчитывает короткие действия без resize', async ({
  gotoStory,
  getByTestId,
  setStoryArgs,
  waitForFonts,
}) => {
  await gotoStory(buildStoryOptions());
  await waitForFonts();
  const row = getByTestId(TEST_IDS.root);
  await row.evaluate(el => {
    el.style.width = '300px';
  });
  const actionIds = [TEST_IDS.first, TEST_IDS.second, TEST_IDS.third];
  await setStoryArgs({
    items: actionIds.map((testId, index) => ({
      id: String(index),
      label: `Продолжить конфигурацию ${index}`,
      'data-test-id': testId,
    })),
    maxVisibleItems: 3,
  });
  await expect(getByTestId(TEST_IDS.first)).toHaveText('Продолжить конфигурацию 0');
  await expect(getByTestId(TEST_IDS.second)).toHaveCount(0);
  await expect(getByTestId(TEST_IDS.third)).toHaveCount(0);

  await setStoryArgs({
    items: actionIds.map((testId, index) => ({
      id: String(index),
      label: `A${index}`,
      'data-test-id': testId,
    })),
    maxVisibleItems: 1,
  });
  await expect(getByTestId(TEST_IDS.first)).toHaveText('A0');
  await expect(getByTestId(TEST_IDS.second)).toHaveCount(0);
  await setStoryArgs({ maxVisibleItems: 3 });

  await expect(getByTestId(TEST_IDS.first)).toBeVisible();
  await expect(getByTestId(TEST_IDS.second)).toBeVisible();
  expect(await row.evaluate(el => el.clientWidth)).toBe(300);
});
