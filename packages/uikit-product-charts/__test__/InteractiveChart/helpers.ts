import { TEST_IDS } from '../../stories/testIds';
import { createBuildStoryOptions } from '../storybookHelpers';

export { TEST_IDS };

export const INTERACTIVE_CHART_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: { name: 'interactivechart-tests-interaction', story: 'interaction-test' },
} as const;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: 'uikit-product',
  group: 'charts',
  storyName: 'interactivechart',
  testId: TEST_IDS.interactiveChart.root,
});

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = INTERACTIVE_CHART_STORIES.playground,
) {
  return buildStoryOptionsBase(props ?? {}, story);
}

export function buildTestStoryOptions(name: string, story: string, props?: Record<string, unknown>) {
  return { ...buildStoryOptionsBase(props ?? {}, story), name };
}
