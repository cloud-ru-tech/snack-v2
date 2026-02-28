import { expect, test } from '../../../playwright/fixtures';
import { PAGINATION_SIZE, VARIANT } from '../src/constants';

const TEST_ID = 'pagination';

test.describe('Pagination', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 10,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('aria-label', 'Pagination');
  });

  test('should show current page and navigation buttons', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 10,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav.locator('[data-test-id="page-prev-button"]')).toBeDisabled();
    await expect(nav.locator('[data-test-id="page-next-button"]')).toBeEnabled();
    await expect(nav.locator('[data-test-id="page-number-button-1"]')).toHaveAttribute('aria-current', 'page');
  });

  test('should go to next page on next button click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 10,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    await nav.locator('[data-test-id="page-next-button"]').click();
    await expect(nav.locator('[data-test-id="page-number-button-2"]')).toHaveAttribute('aria-current', 'page');
  });

  test('should go to previous page on prev button click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 10,
        page: 2,
      },
    });

    const nav = getByTestId(TEST_ID);
    await nav.locator('[data-test-id="page-prev-button"]').click();
    await expect(nav.locator('[data-test-id="page-number-button-1"]')).toHaveAttribute('aria-current', 'page');
  });

  test('should go to page on number click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 10,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    await nav.locator('[data-test-id="page-number-button-3"]').click();
    await expect(nav.locator('[data-test-id="page-number-button-3"]')).toHaveAttribute('aria-current', 'page');
  });

  test.describe('Sizes', () => {
    for (const size of Object.values(PAGINATION_SIZE)) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'pagination-pagination',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            total: 5,
            page: 1,
            size,
          },
        });

        const nav = getByTestId(TEST_ID);
        await expect(nav).toBeVisible();
        await expect(nav.locator('ul[data-size]')).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('Variants', () => {
    for (const variant of Object.values(VARIANT)) {
      test(`should render with variant ${variant}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          name: 'pagination-pagination',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            total: 5,
            page: 1,
            variant,
          },
        });

        const nav = getByTestId(TEST_ID);
        await expect(nav).toBeVisible();
      });
    }
  });

  test('should disable next on last page', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 10,
        page: 10,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav.locator('[data-test-id="page-next-button"]')).toBeDisabled();
    await expect(nav.locator('[data-test-id="page-prev-button"]')).toBeEnabled();
  });

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-pagination-class';

    await gotoStory({
      group: 'pagination',
      name: 'pagination',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 5,
        page: 1,
        className: customClass,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav).toHaveClass(new RegExp(customClass));
  });
});
