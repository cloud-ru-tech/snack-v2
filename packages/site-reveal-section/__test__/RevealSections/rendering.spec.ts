import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, REVEAL_SECTIONS_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('RevealSections — rendering', () => {
  test('renders every section when disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.revealSections.first)).toBeVisible();
    await expect(getByTestId(TEST_IDS.revealSections.second)).toBeVisible();
    await expect(getByTestId(TEST_IDS.revealSections.third)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const props of REVEAL_SECTIONS_KEY_COMBOS) {
      test(`every wrapper receives duration=${props.duration}, delay=${props.delay}`, async ({
        gotoStory,
        getByTestId,
      }) => {
        await gotoStory(
          buildStoryOptions({
            ...props,
            skipFirst: false,
            disabled: true,
            className: 'custom-group-wrapper',
            style: { maxWidth: '320px' },
          }),
        );

        for (const id of [
          TEST_IDS.revealSections.first,
          TEST_IDS.revealSections.second,
          TEST_IDS.revealSections.third,
        ]) {
          // У группы нет отдельного DOM-корня: публичные className/style относятся к родителю каждой секции.
          const values = await getByTestId(id).evaluate(element => {
            const wrapper = element.parentElement;
            return {
              customClass: wrapper?.classList.contains('custom-group-wrapper'),
              maxWidth: wrapper?.style.maxWidth,
              duration: wrapper?.style.getPropertyValue('--reveal-duration'),
              delay: wrapper?.style.getPropertyValue('--reveal-delay'),
              offset: wrapper?.style.getPropertyValue('--reveal-offset'),
              easing: wrapper?.style.getPropertyValue('--reveal-easing'),
            };
          });

          expect(values).toEqual({
            customClass: true,
            maxWidth: '320px',
            duration: `${props.duration}ms`,
            delay: `${props.delay}ms`,
            offset: `${props.offset}px`,
            easing: props.easing,
          });
        }
      });
    }
  });
});
