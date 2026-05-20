import { TEST_IDS } from '../../src/AiSuggestionSimple/constants';

export { TEST_IDS };

export function matrixCellTestId(appearance: string, size: string) {
  return `${TEST_IDS.root}-${appearance}-${size}`;
}
