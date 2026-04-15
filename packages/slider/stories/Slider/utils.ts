import { getSortedMarkValues } from '../../src/components/utils';
import { LINEAR_MARKS, MARK_PRESETS } from './constants';
import type { StoryProps } from './types';

export function defaultSingle(keys: number[]): number {
  if (keys.length === 0) {
    return 0;
  }
  return keys[Math.floor(keys.length / 2)] ?? keys[0];
}

export function defaultRange(keys: number[]): [number, number] {
  if (keys.length < 2) {
    const v = keys[0] ?? 0;
    return [v, v];
  }
  if (keys.length === 2) {
    return [keys[0], keys[1]];
  }
  return [keys[1], keys[keys.length - 2]];
}

export function formatStateValue(value: number | [number, number]): string {
  if (Array.isArray(value)) {
    return `[${value[0]}, ${value[1]}]`;
  }
  return String(value);
}

export function computeValueFromArgs(args: StoryProps): number | [number, number] {
  const { marksPreset, range, showMarks, defaultValue } = args;

  if (marksPreset === 'linear') {
    if (!showMarks) {
      if (range) {
        if (Array.isArray(defaultValue) && defaultValue.length >= 2) {
          return [defaultValue[0], defaultValue[1]];
        }
        return [20, 40];
      }
      return typeof defaultValue === 'number' ? defaultValue : 30;
    }
    const k = getSortedMarkValues(LINEAR_MARKS);
    if (range) {
      if (Array.isArray(defaultValue) && defaultValue.length >= 2) {
        return [defaultValue[0], defaultValue[1]];
      }
      return defaultRange(k);
    }
    return typeof defaultValue === 'number' ? defaultValue : defaultSingle(k);
  }

  if (!showMarks) {
    if (range) {
      if (Array.isArray(defaultValue) && defaultValue.length >= 2) {
        return [defaultValue[0], defaultValue[1]];
      }
      return [20, 40];
    }
    return typeof defaultValue === 'number' ? defaultValue : 30;
  }

  const k = getSortedMarkValues(MARK_PRESETS[marksPreset]);
  if (range) {
    if (Array.isArray(defaultValue) && defaultValue.length >= 2) {
      return [defaultValue[0], defaultValue[1]];
    }
    return defaultRange(k);
  }
  return typeof defaultValue === 'number' ? defaultValue : defaultSingle(k);
}
