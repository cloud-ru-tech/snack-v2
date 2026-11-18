import { expect, test } from '#playwright-tooling/fixtures';

import { AI_QUEUE_STEP_STATE } from '../../src/constants';
import { AiQueueStep } from '../../src/types';
import { buildStoryOptions, TEST_IDS } from './helpers';

const shortSteps: AiQueueStep[] = [
  { id: 'short-1', label: 'Step 1', state: AI_QUEUE_STEP_STATE.Done },
  { id: 'short-2', label: 'Step 2', state: AI_QUEUE_STEP_STATE.Error },
  { id: 'short-3', label: 'Step 3', state: AI_QUEUE_STEP_STATE.Progress },
  { id: 'short-4', label: 'Step 4', state: AI_QUEUE_STEP_STATE.Planned },
];

const states = [
  AI_QUEUE_STEP_STATE.Planned,
  AI_QUEUE_STEP_STATE.Progress,
  AI_QUEUE_STEP_STATE.Done,
  AI_QUEUE_STEP_STATE.Error,
] as const;

const longSteps: AiQueueStep[] = Array.from({ length: 12 }, (_, index) => ({
  id: `long-${index + 1}`,
  label: `Step ${index + 1}`,
  state: states[index % states.length],
}));

test.describe('AiQueue — rendering', () => {
  test('does not show effective scroll for short list', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions({ open: true, steps: shortSteps }));

    const content = page.getByTestId(TEST_IDS.content);
    await expect(content).toBeVisible();

    // Viewport создаётся OverlayScrollbars и не поддерживает data-test-id.
    const viewport = content.locator('[data-overlayscrollbars-viewport]');
    await expect(viewport).toBeVisible();
    await expect.poll(() => viewport.evaluate(node => node.scrollHeight > node.clientHeight)).toBe(false);
  });

  test('becomes scrollable for long list', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions({ open: true, steps: longSteps }));

    const content = page.getByTestId(TEST_IDS.content);
    await expect(content).toBeVisible();

    // Viewport создаётся OverlayScrollbars и не поддерживает data-test-id.
    const viewport = content.locator('[data-overlayscrollbars-viewport]');
    await expect(viewport).toBeVisible();
    await expect(viewport).toHaveCSS('overflow-y', /^(auto|scroll)$/);
    await expect.poll(() => viewport.evaluate(node => node.scrollHeight > node.clientHeight)).toBe(true);
  });
});
