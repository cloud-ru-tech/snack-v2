import { expect, test } from '../../../playwright/fixtures';
import { ORIENTATION, VARIANT } from '../src/constants';
import { buildStoryOptions, DIVIDER_TEST_ID } from './helpers';

test.describe('Divider', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const divider = getByTestId(DIVIDER_TEST_ID);
    await expect(divider).toBeVisible();
  });

  test('should expose role="separator"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const divider = getByTestId(DIVIDER_TEST_ID);
    await expect(divider).toHaveAttribute('role', 'separator');
  });

  test.describe('Variants', () => {
    const variants = Object.values(VARIANT);

    for (const variant of variants) {
      test(`should render with variant ${variant}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ variant }));

        const divider = getByTestId(DIVIDER_TEST_ID);
        await expect(divider).toBeVisible();
        await expect(divider).toHaveAttribute('data-variant', variant);
      });
    }
  });

  test.describe('Orientations', () => {
    const orientations = Object.values(ORIENTATION);

    for (const orientation of orientations) {
      test(`should render with orientation ${orientation}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ orientation }));

        const divider = getByTestId(DIVIDER_TEST_ID);
        await expect(divider).toBeVisible();
        await expect(divider).toHaveAttribute('data-orientation', orientation);
        await expect(divider).toHaveAttribute('aria-orientation', orientation);
      });
    }
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-divider-class';

    await gotoStory(buildStoryOptions({ className: customClass }));

    const divider = getByTestId(DIVIDER_TEST_ID);
    await expect(divider).toHaveClass(new RegExp(customClass));
  });
});
