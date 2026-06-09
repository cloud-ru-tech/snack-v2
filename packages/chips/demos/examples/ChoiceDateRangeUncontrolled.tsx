import { ChipChoice } from '@ds/chips';
import { PortalContextProvider } from '@ds/portal-context';

export function ChoiceDateRangeUncontrolled() {
  return (
    <PortalContextProvider>
      <ChipChoice.DateRange label='Период' defaultValue={[new Date(2024, 0, 15), new Date(2024, 0, 22)]} />
    </PortalContextProvider>
  );
}
