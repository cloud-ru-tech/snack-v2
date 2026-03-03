import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'promo-tag';

test.describe('PromoTag', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promotag',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    await expect(getByTestId(TEST_ID).first()).toBeVisible();
  });

  test('Should have children text', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promotag',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        text: 'Super promo tag',
      },
    });
    await expect(getByTestId(TEST_ID).first()).toHaveText('Super promo tag');
  });

  test('Should have before node', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promotag',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        beforeContent: true,
        size: 'xs',
      },
    });
    await expect(getByTestId('before-node').first()).toBeVisible();
    await expect(getByTestId('after-node').first()).toBeHidden();
  });

  test('Should have after node', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promotag',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        afterContent: true,
        size: 'xs',
      },
    });
    await expect(getByTestId('after-node').first()).toBeVisible();
    await expect(getByTestId('before-node').first()).toBeHidden();
  });

  test('Should have before and after node', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'promotag',
      story: 'playground',
      props: {
        'data-test-id': TEST_ID,
        beforeContent: true,
        afterContent: true,
        size: 'xs',
      },
    });
    await expect(getByTestId('after-node').first()).toBeVisible();
    await expect(getByTestId('before-node').first()).toBeVisible();
  });
});
