import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  dropdown: 'dropdown',
  buttonWithDropdown: 'button-with-dropdown',
};

const getElementWidth = async (locator: Locator): Promise<number> => {
  const box = await locator.boundingBox();
  return box?.width ?? 0;
};

test.describe('Dropdown', () => {
  test('Should be rendered by click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'dropdown',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.dropdown,
        trigger: 'click',
      },
    });

    await expect(getByTestId(TEST_IDS.dropdown)).not.toBeVisible();
    await getByTestId(TEST_IDS.buttonWithDropdown).click();
    await expect(getByTestId(TEST_IDS.dropdown)).toBeVisible();
  });

  test('Should render with width equals button width when widthStrategy is eq', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'dropdown',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.dropdown,
        trigger: 'click',
        widthStrategy: 'eq',
      },
    });

    await getByTestId(TEST_IDS.buttonWithDropdown).click();
    const dropdownWidth = await getElementWidth(getByTestId(TEST_IDS.dropdown));
    const buttonWidth = await getElementWidth(getByTestId(TEST_IDS.buttonWithDropdown));
    await expect(dropdownWidth).toBe(buttonWidth);
  });

  test('Should render with width equals or greater than button width when widthStrategy is gte', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'dropdown',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.dropdown,
        trigger: 'click',
        widthStrategy: 'gte',
      },
    });

    await getByTestId(TEST_IDS.buttonWithDropdown).click();
    const dropdownWidth = await getElementWidth(getByTestId(TEST_IDS.dropdown));
    const buttonWidth = await getElementWidth(getByTestId(TEST_IDS.buttonWithDropdown));
    await expect(dropdownWidth).toBeGreaterThanOrEqual(buttonWidth);
  });

  test('Should close by "esc" button', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'dropdown',
      story: 'playground',
      props: {
        'data-test-id': TEST_IDS.dropdown,
        trigger: 'click',
      },
    });

    await expect(getByTestId(TEST_IDS.dropdown)).not.toBeVisible();
    await getByTestId(TEST_IDS.buttonWithDropdown).click();
    await expect(getByTestId(TEST_IDS.dropdown)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.dropdown)).not.toBeVisible();
  });
});
