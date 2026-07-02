import { PresetItem, Range } from '../../types';
import { PeriodPresetsList } from '../PeriodPresetsList';

export type MobilePresetsScreenProps = {
  items: PresetItem[];
  onSelect(range: Range): void;
};

/**
 * Под-экран пресетов (date-range): список быстрого выбора периода. Тап по пресету выставляет значение
 * и возвращает на экран календаря (логика возврата — в `MobileCalendar`).
 */
export function MobilePresetsScreen({ items, onSelect }: MobilePresetsScreenProps) {
  return <PeriodPresetsList items={items} onChange={onSelect} />;
}
