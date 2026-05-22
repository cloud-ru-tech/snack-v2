import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SIZE, TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const COLOR_PICKER_STORIES = {
  playground: { name: 'colorpicker', story: 'playground' },
  visualMatrix: { name: 'colorpicker', story: 'visual-matrix' },
  interactionTest: { name: 'colorpicker-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type ColorPickerStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ColorPickerStoryProps,
  ref: StoryRef = COLOR_PICKER_STORIES.playground,
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

export const KEY_SIZES = [SIZE.S, SIZE.M, SIZE.L] as const;

// Локальная копия `segmentTestId` из `@ds/segment-control/src/constants` —
// кросс-пакетный импорт в spec'ах запрещён (entry-point тянет CSS-модули,
// которые ломают playwright-compile). Если convention сменится — синхронизируй
// руками; контракт фиксированный (см. segment-control/src/constants.ts).
export function segmentTestId(value: string | number): string {
  return `section-${value}`;
}
