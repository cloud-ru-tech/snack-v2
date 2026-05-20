import { TEST_IDS } from '../../src/AiSuggestionParent/constants';

export { TEST_IDS };

export function matrixCellTestId(size: string, expanded: boolean) {
  return `${TEST_IDS.root}-${size}-${expanded ? 'expanded' : 'collapsed'}`;
}
