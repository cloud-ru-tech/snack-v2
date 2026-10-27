import { Page } from '@playwright/test';

import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { AI_HISTORY_LINE_TEST_ID, buildStoryOptions } from './helpers';

const ALIGNED_ITEMS = ['request-setup', 'agent-markdown', 'tools-apply', 'checkpoint-logic'];

function lineDeltas(page: Page) {
  return page.evaluate(
    ids =>
      ids.map(id => {
        const item = document.getElementById(id);
        const indicator = item?.querySelector<HTMLElement>('[data-test-id="ai-history-line__indicator"]');
        const content = item?.querySelector<HTMLElement>('[data-test-id="ai-history-line__content"]');
        if (!item || !indicator || !content) return Number.POSITIVE_INFINITY;

        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            if (!(node.textContent ?? '').trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent || parent.closest('svg, [hidden]')) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        });
        const text = walker.nextNode();
        if (!text) return Number.POSITIVE_INFINITY;

        const range = document.createRange();
        range.selectNodeContents(text);
        const line = [...range.getClientRects()].find(rect => rect.width > 0 && rect.height > 0);
        if (!line) return Number.POSITIVE_INFINITY;

        const mark = indicator.getBoundingClientRect();
        return Math.abs(mark.top + mark.height / 2 - (line.top + line.height / 2));
      }),
    ALIGNED_ITEMS,
  );
}

test.describe('AiHistoryLine — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(AI_HISTORY_LINE_TEST_ID)).toBeVisible();
  });

  test('uses a transparent well for the avatar and a surface well for the checkpoint', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());

    const avatar = page.locator('#request-setup').getByTestId(TEST_IDS.indicator);
    const checkpoint = page.locator('#checkpoint-logic').getByTestId(TEST_IDS.indicator);

    await expect(avatar).toHaveAttribute('data-background', 'false');
    await expect(avatar).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(checkpoint).toHaveAttribute('data-background', 'true');
  });

  test('aligns the indicator center with the first line', async ({ gotoStory, page, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    await expect.poll(async () => Math.max(...(await lineDeltas(page)))).toBeLessThan(1);
  });
});
