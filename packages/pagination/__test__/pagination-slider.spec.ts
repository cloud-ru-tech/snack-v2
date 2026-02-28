import { expect, test } from '../../../playwright/fixtures';
import { PAGINATION_SLIDER_SIZE } from '../src/constants';

const TEST_ID = 'pagination-slider';

test.describe('PaginationSlider', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination-slider',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 5,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav).toBeVisible();
    await expect(nav).toHaveAttribute('aria-label', 'Pagination slider');
  });

  test('should show correct number of dots', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination-slider',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 5,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    const dots = nav.locator('[data-test-id^="page-button-slider-"]');
    await expect(dots).toHaveCount(5);
  });

  test('should mark current page dot as active', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination-slider',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 5,
        page: 3,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav.locator('[data-test-id="page-button-slider-3"]')).toHaveAttribute('aria-current', 'true');
  });

  test('should switch page on dot click', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'pagination',
      name: 'pagination-slider',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 5,
        page: 1,
      },
    });

    const nav = getByTestId(TEST_ID);
    await nav.locator('[data-test-id="page-button-slider-4"]').click();
    await expect(nav.locator('[data-test-id="page-button-slider-4"]')).toHaveAttribute('aria-current', 'true');
  });

  test.describe('Sizes', () => {
    for (const size of Object.values(PAGINATION_SLIDER_SIZE)) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory({
          group: 'pagination',
          name: 'pagination-slider',
          story: 'playground',
          props: {
            'data-test-id': TEST_ID,
            total: 3,
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

  test('should apply custom className', async ({ gotoStory, getByTestId }) => {
    const customClass = 'custom-slider-class';

    await gotoStory({
      group: 'pagination',
      name: 'pagination-slider',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        total: 3,
        page: 1,
        className: customClass,
      },
    });

    const nav = getByTestId(TEST_ID);
    await expect(nav).toHaveClass(new RegExp(customClass));
  });
});
