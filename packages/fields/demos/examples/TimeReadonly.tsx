import { FieldTime } from '@ds/fields';
import { PortalContextProvider } from '@ds/portal-context';

export function TimeReadonly() {
  return (
    <PortalContextProvider>
      <FieldTime label='Время выполнения' readonly defaultValue={{ hours: 23, minutes: 59, seconds: 59 }} />
    </PortalContextProvider>
  );
}
