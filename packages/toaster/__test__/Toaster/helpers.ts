import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// E2E helpers импортят TEST_IDS из stories/testIds, а не из entry `@ds/toaster` —
// entry тащит CSS-модули, что ломает playwright-compile.
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

const PG = (story: string): StoryRef => ({ name: 'toaster', group: 'toaster', story });
const EX = (sub: string, story: string): StoryRef => ({ name: `toaster-examples-${sub}`, group: 'toaster', story });
const TS = (sub: string, story: string): StoryRef => ({ name: `toaster-tests-${sub}`, group: 'toaster', story });

export const TOASTER_STORIES = {
  playground: PG('playground'),
  visualMatrix: PG('visual-matrix'),
  imperativeApi: EX('imperativeapi', 'imperative-api'),
  composition: EX('composition', 'composition'),
  interactionTest: TS('interaction', 'interaction-test'),
} as const satisfies Record<string, StoryRef>;

export type ToasterStoryRef = StoryRef;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = TOASTER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
  };
}

// Ключевая выборка комбинаций для параметризованных props-propagation тестов.
// Не декартово произведение всех осей — по 1 представителю каждого значения.
export const TOASTER_KEY_COMBOS = [
  { position: 'top-left' },
  { position: 'top-right' },
  { position: 'bottom-left' },
  { position: 'bottom-right' },
] as const;

export const TOASTER_TYPE_KEY_VALUES = ['systemEvent', 'userAction', 'upload'] as const;
