import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { AI_HISTORY_LINE_ACCORDION_STORIES, buildStoryOptions, FORCE_OPEN_TEST_ID } from './helpers';

test.describe('AiHistoryLineAccordion — interaction', () => {
  test('opens from outside and closes from the header', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(AI_HISTORY_LINE_ACCORDION_STORIES.controlled));

    const header = getByTestId(TEST_IDS.accordionHeader);
    const content = getByTestId(TEST_IDS.accordionContent);

    await expect(header).toHaveAttribute('aria-expanded', 'false');
    await expect(header).toHaveCSS('align-items', 'center');
    await expect(header).toHaveCSS('gap', '4px');
    await expect(content).toBeHidden();

    await getByTestId(FORCE_OPEN_TEST_ID).click();
    await expect(header).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
    await expect(content).toHaveCSS('padding-bottom', '8px');

    await header.press('Enter');
    await expect(header).toHaveAttribute('aria-expanded', 'false');

    await header.press('Space');
    await expect(header).toHaveAttribute('aria-expanded', 'true');
  });
});
