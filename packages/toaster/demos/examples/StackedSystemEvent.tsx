import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_SYSTEM_EVENT, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';
import { useRef } from 'react';

const CONTAINER_ID = 'demo-stacked-system-event';

export function StackedSystemEvent() {
  const counter = useRef(0);

  const fire = () => {
    counter.current += 1;
    toaster.systemEvent.neutral({
      title: `Уведомление #${counter.current}`,
      description: 'Hover по стопке разворачивает её',
      containerId: CONTAINER_ID,
    });
  };

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button appearance={APPEARANCE.Primary} label='Добавить тост' onClick={fire} />
        <Button
          appearance={APPEARANCE.Neutral}
          label='Закрыть все'
          onClick={() => toaster.systemEvent.dismiss({ containerId: CONTAINER_ID })}
        />
        <ToasterContainer
          type={TOASTER_TYPE.SystemEvent}
          containerId={CONTAINER_ID}
          position={POSITION_SYSTEM_EVENT.BottomRight}
          limit={5}
          autoClose={5000}
          stacked
          displayCloseAllButton
        />
      </div>
    </PortalContextProvider>
  );
}
