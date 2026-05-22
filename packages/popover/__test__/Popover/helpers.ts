import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Источник истины — `packages/popover/stories/Popover/testIds.ts`.
// Этот файл .ts не тянет SCSS-модули и совместим с playwright-compile.
import { TEST_IDS } from '../../stories/Popover/testIds';

export { TEST_IDS };

export const POPOVER_STORIES = {
  playground: { name: 'popover', story: 'playground' },
  visualMatrix: { name: 'popover', story: 'visual-matrix' },
  interactionTest: { name: 'popover-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type PopoverStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: PopoverStoryProps,
  ref: StoryRef = POPOVER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

// Key combinations: 1 representative per axis value, not cartesian product.
// trigger × placement свёрнуты в выборку для props-propagation rendering checks.
export const POPOVER_KEY_COMBOS = [
  { trigger: 'click', placement: 'top' },
  { trigger: 'click', placement: 'bottom' },
  { trigger: 'hover', placement: 'left' },
  { trigger: 'focus', placement: 'right' },
] as const;
