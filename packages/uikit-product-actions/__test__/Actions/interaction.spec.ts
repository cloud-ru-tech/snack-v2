import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../stories/Actions/testIds';
import { buildStoryOptions } from './helpers';

test('Статические меню закрываются кликом вне портала', async ({ gotoStory, getByTestId }) => {
  await gotoStory(
    buildStoryOptions(undefined, { name: 'actions-actions-tests-staticinteraction', story: 'static-interaction-test' }),
  );
  const ids = TEST_IDS.staticActions;
  for (const trigger of [ids.droplist, ids.filledDroplist, ids.kebab, ids.dropdown]) {
    await test.step(trigger, async () => {
      await getByTestId(trigger).click();
      await expect(getByTestId(ids.menuItem)).toBeVisible();
      await getByTestId(ids.outside).click();
      await expect(getByTestId(ids.menuItem)).toHaveCount(0);
      await expect(getByTestId(trigger)).toBeVisible();
    });
  }
});
