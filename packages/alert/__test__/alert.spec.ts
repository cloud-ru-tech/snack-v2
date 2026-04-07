import { expect, test } from '../../../playwright/fixtures';
import { ALIGN, APPEARANCE, APPEARANCE_TO_THEME_COLOR, SIZE } from '../src/constants';
import { alertPlaygroundGotoOptions, E2E_ALERT_ROOT_TEST_ID } from './helpers';

const TITLE_TEST_ID = 'alert__title';
const DESCRIPTION_TEST_ID = 'alert__description';
const CLOSE_BUTTON_TEST_ID = 'alert__close-button';
const ICON_TEST_ID = 'alert__icon';

test.describe('Alert', () => {
  test('should render with role alert and inline variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(alertPlaygroundGotoOptions());

    const root = getByTestId(E2E_ALERT_ROOT_TEST_ID);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'alert');
    await expect(root).toHaveAttribute('data-variant', 'inline');
  });

  test.describe('Sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(alertPlaygroundGotoOptions({ size }));

        const root = getByTestId(E2E_ALERT_ROOT_TEST_ID);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('Align', () => {
    for (const align of Object.values(ALIGN)) {
      test(`should render with align ${align}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(alertPlaygroundGotoOptions({ align }));

        const root = getByTestId(E2E_ALERT_ROOT_TEST_ID);
        await expect(root).toHaveAttribute('data-align', align);
      });
    }
  });

  test.describe('Appearances', () => {
    for (const appearance of Object.values(APPEARANCE)) {
      test(`should map appearance ${appearance} to data-color`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(alertPlaygroundGotoOptions({ appearance }));

        const root = getByTestId(E2E_ALERT_ROOT_TEST_ID);
        await expect(root).toHaveAttribute('data-color', APPEARANCE_TO_THEME_COLOR[appearance]);
      });
    }
  });

  test('should show title and description text', async ({ gotoStory, getByTestId }) => {
    const title = 'E2E title';
    const description = 'E2E description body';

    await gotoStory(alertPlaygroundGotoOptions({ title, description }));

    await expect(getByTestId(TITLE_TEST_ID)).toHaveText(title);
    await expect(getByTestId(DESCRIPTION_TEST_ID)).toContainText(description);
  });

  test('should show close button when onClose is set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(alertPlaygroundGotoOptions({ showClose: true }));

    await expect(getByTestId(CLOSE_BUTTON_TEST_ID)).toBeVisible();
  });

  test('should hide close button when showClose is false', async ({ gotoStory, page }) => {
    await gotoStory(alertPlaygroundGotoOptions({ showClose: false }));

    await expect(page.locator(`[data-test-id="${CLOSE_BUTTON_TEST_ID}"]`)).toHaveCount(0);
  });

  test('should show icon when icon is true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(alertPlaygroundGotoOptions({ icon: true }));

    await expect(getByTestId(ICON_TEST_ID)).toBeVisible();
  });

  test('should hide icon when icon is false', async ({ gotoStory, page }) => {
    await gotoStory(alertPlaygroundGotoOptions({ icon: false }));

    await expect(page.locator(`[data-test-id="${ICON_TEST_ID}"]`)).toHaveCount(0);
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'alert-e2e-custom-class';

    await gotoStory(alertPlaygroundGotoOptions({ className: customClass }));

    const root = getByTestId(E2E_ALERT_ROOT_TEST_ID);
    await expect(root).toHaveClass(new RegExp(customClass));
  });

  test('should expand collapsible alert on root click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      alertPlaygroundGotoOptions({
        align: ALIGN.Vertical,
        collapsible: true,
      }),
    );

    const root = getByTestId(E2E_ALERT_ROOT_TEST_ID);
    const expandedRegion = root.locator('[data-expanded]');

    await expect(expandedRegion).toHaveCount(0);
    await root.click();
    await expect(expandedRegion).toHaveCount(1);
  });
});
