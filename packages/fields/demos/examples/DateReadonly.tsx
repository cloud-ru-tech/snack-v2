import { FieldDate } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';

export function DateReadonly() {
  return (
    <PortalContextProvider>
      <FieldDate label='Дата создания' readonly defaultValue={new Date(2026, 4, 17)} />
    </PortalContextProvider>
  );
}
