import { ChipChoice } from '@ds/chips';

export function ChoiceDateRangeUncontrolled() {
  return <ChipChoice.DateRange label='Период' defaultValue={[new Date(2024, 0, 15), new Date(2024, 0, 22)]} />;
}
