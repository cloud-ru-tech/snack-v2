import type { SliderProps } from '../../src';
import { MARK_PRESETS } from './constants';

export type MarksPresetId = 'linear' | keyof typeof MARK_PRESETS;

export type StoryProps = SliderProps & {
  /** Для E2E (`gotoStory` / Playwright). */
  'data-test-id'?: string;
  /** Только при пресете меток `linear`: показывать `LINEAR_MARKS` (10…50). */
  showMarks: boolean;
  /**
   * `linear` — шкала по `min` / `max` / `step` и опциональные линейные метки;
   * иначе нелинейный демонстрационный набор.
   */
  marksPreset: MarksPresetId;
};
