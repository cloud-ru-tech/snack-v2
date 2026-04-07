import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/constants';

const collapseBlockPlayground = (name: 'collapseblockprimary' | 'collapseblocksecondary' | 'collapseblocktertiary') =>
  ({
    group: 'accordion' as const,
    name,
    story: 'playground' as const,
  }) as const;

(['collapseblockprimary', 'collapseblocksecondary', 'collapseblocktertiary'] as const).forEach(name => {
  test.describe(name, () => {
    test('компонент отрендерился', async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        ...collapseBlockPlayground(name),
      });
      await expect(getByTestId(TEST_IDS.collapseBlock)).toBeVisible();
    });

    test('компонент открылся по клику и закрылся по клику', async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        ...collapseBlockPlayground(name),
      });
      await expect(getByTestId(TEST_IDS.content)).toBeHidden();
      await getByTestId(TEST_IDS.title).click();
      await expect(getByTestId(TEST_IDS.content)).toBeVisible();
      await getByTestId(TEST_IDS.title).click();
      await expect(getByTestId(TEST_IDS.content)).toBeHidden();
    });

    test('при keepMounted=true закрытый блок оставляет контент в DOM', async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        ...collapseBlockPlayground(name),
        props: { keepMounted: true },
      });
      await expect(getByTestId(TEST_IDS.content)).toBeAttached();
    });

    test('при keepMounted=false закрытый блок не оставляет контент в DOM', async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        ...collapseBlockPlayground(name),
        props: { keepMounted: false },
      });
      await expect(getByTestId(TEST_IDS.content)).toHaveCount(0);
    });
  });
});
