import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, VIEW } from '../../src/Button/constants';
import { BUTTON_GROUP_LABELS } from '../../stories/ButtonGroup/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS, BUTTON_GROUP_LABELS };

export const BUTTON_GROUP_PACKAGE_NAME = 'button';
export const BUTTON_GROUP_STORY_NAME = 'buttongroup';

const PG = (story: string): StoryRef => ({
  name: BUTTON_GROUP_STORY_NAME,
  group: BUTTON_GROUP_PACKAGE_NAME,
  story,
});
const FX = (story: string): StoryRef => ({
  name: 'buttongroup-tests-interaction',
  group: BUTTON_GROUP_PACKAGE_NAME,
  story,
});

export const BUTTON_GROUP_STORIES = {
  playground: PG('playground'),
  visualMatrix: PG('visual-matrix'),
  // Baked-args fixtures in tests/ButtonGroup.InteractionTest.stories.tsx
  // (URL args can't encode nested action objects reliably).
  disabledPrimaryFixture: FX('disabled-primary-fixture'),
  criticalPrimaryFixture: FX('critical-primary-fixture'),
  threeActionsFixture: FX('three-actions-fixture'),
} as const satisfies Record<string, StoryRef>;

export type ButtonGroupStoryProps = Record<string, unknown>;

const DEFAULT_PRIMARY = {
  label: BUTTON_GROUP_LABELS.primary,
  appearance: APPEARANCE.Primary,
  view: VIEW.Filled,
  'data-test-id': TEST_IDS.buttonGroup.primary,
};
const DEFAULT_SECONDARY = {
  label: BUTTON_GROUP_LABELS.secondary,
  appearance: APPEARANCE.Neutral,
  view: VIEW.Outline,
  'data-test-id': TEST_IDS.buttonGroup.secondary,
};

export function buildButtonGroupStoryOptions(
  props?: ButtonGroupStoryProps,
  ref: StoryRef = BUTTON_GROUP_STORIES.playground,
): StorybookUrlOptions {
  // Default args only apply to Playground; baked-arg fixtures own their own args.
  const isPlayground = ref === BUTTON_GROUP_STORIES.playground;
  const base: Record<string, unknown> = isPlayground
    ? {
        'data-test-id': TEST_IDS.buttonGroup.root,
        primaryAction: DEFAULT_PRIMARY,
        secondaryAction: DEFAULT_SECONDARY,
      }
    : { 'data-test-id': TEST_IDS.buttonGroup.root };
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { ...base, ...props },
  };
}
