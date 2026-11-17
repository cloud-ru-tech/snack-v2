import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, HIDDEN_ROOT_MARGIN, REVEAL_SECTION_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('RevealSection — rendering', () => {
  test('renders content and forwards HTML attributes', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true, id: 'services', 'aria-label': 'Services' }));
    const root = getByTestId(TEST_IDS.revealSection.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('id', 'services');
    await expect(root).toHaveAttribute('aria-label', 'Services');
  });

  test.describe('props propagation', () => {
    for (const props of REVEAL_SECTION_KEY_COMBOS) {
      test(`duration=${props.duration}, delay=${props.delay}, offset=${props.offset}`, async ({
        gotoStory,
        getByTestId,
      }) => {
        await gotoStory(buildStoryOptions({ ...props, disabled: true }));
        const values = await getByTestId(TEST_IDS.revealSection.root).evaluate(element => ({
          duration: element.style.getPropertyValue('--reveal-duration'),
          delay: element.style.getPropertyValue('--reveal-delay'),
          offset: element.style.getPropertyValue('--reveal-offset'),
          easing: element.style.getPropertyValue('--reveal-easing'),
        }));
        expect(values).toEqual({
          duration: `${props.duration}ms`,
          delay: `${props.delay}ms`,
          offset: `${props.offset}px`,
          easing: props.easing,
        });
      });
    }

    test('style overrides animation variables and className reaches the root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          disabled: true,
          className: 'custom-reveal',
          style: { '--reveal-offset': '12px' },
        }),
      );
      const root = getByTestId(TEST_IDS.revealSection.root);
      await expect(root).toHaveClass(/custom-reveal/);
      expect(await root.evaluate(element => element.style.getPropertyValue('--reveal-offset'))).toBe('12px');
    });
  });

  test('reduced motion displays content before intersection without a transition', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await gotoStory(buildStoryOptions({ rootMargin: HIDDEN_ROOT_MARGIN }));
    const root = getByTestId(TEST_IDS.revealSection.root);
    await expect(root).toHaveAttribute('data-revealed', 'false');
    await expect(root).toBeVisible();
    await expect(root).toHaveCSS('transform', 'none');
    await expect(root).toHaveCSS('transition-property', 'none');
  });
});
