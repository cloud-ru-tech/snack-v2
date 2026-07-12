import { expect, test } from '#playwright-tooling/fixtures';

import { CONTROLS_VISIBILITY } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Carousel — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders arrows by default', async ({ gotoStory, getByTestId }) => {
      // `infiniteScroll: true` — иначе arrowPrev не рендерится на первой странице
      // (компонент скрывает «prev» когда page === 0 и infiniteScroll выключен).
      await gotoStory(buildStoryOptions({ arrows: true, infiniteScroll: true }));
      await expect(getByTestId(TEST_IDS.arrowNext)).toBeAttached();
      await expect(getByTestId(TEST_IDS.arrowPrev)).toBeAttached();
    });

    test('renders pagination when enabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ pagination: true }));
      await expect(getByTestId(TEST_IDS.pagination)).toBeVisible();
    });

    // Регрессия: при mouse-swipe нативный HTML5 drag контента слайдов (`<img>`)
    // должен гаситься, иначе браузер тащит картинку-призрак вместо переключения слайда.
    test('native drag of slide content is prevented on the track', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      const track = getByTestId(TEST_IDS.trackLine);
      const prevented = await track.evaluate(el => {
        const event = new DragEvent('dragstart', { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() });
        // dispatchEvent → false, если кто-то вызвал preventDefault (наш onDragStart).
        return !el.dispatchEvent(event);
      });
      expect(prevented).toBe(true);
    });
  });

  test.describe('props propagation', () => {
    test(`controlsVisibility=${CONTROLS_VISIBILITY.always}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ controlsVisibility: CONTROLS_VISIBILITY.always }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-controls-visibility', CONTROLS_VISIBILITY.always);
    });

    test(`controlsVisibility=${CONTROLS_VISIBILITY.hover}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ controlsVisibility: CONTROLS_VISIBILITY.hover }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-controls-visibility', CONTROLS_VISIBILITY.hover);
    });
  });
});
