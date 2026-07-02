import { PresetItem, Range } from '../../types';
import { PeriodPresetsList } from '../PeriodPresetsList';

export type MobilePresetsScreenProps = {
  items: PresetItem[];
  onSelect(range: Range): void;
};

export function MobilePresetsScreen({ items, onSelect }: MobilePresetsScreenProps) {
  return <PeriodPresetsList items={items} onChange={onSelect} />;
}
