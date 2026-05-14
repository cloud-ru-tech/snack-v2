import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_SYSTEM_EVENT, SystemEventPosition, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const POSITIONS: SystemEventPosition[] = Object.values(POSITION_SYSTEM_EVENT);

const containerIdFor = (position: SystemEventPosition) => `demo-system-event-position-${position}`;

export function SystemEventPositions() {
  const fire = (position: SystemEventPosition) =>
    toaster.systemEvent.neutral({
      title: `Тост в ${position}`,
      description: 'Каждое положение — свой контейнер',
      containerId: containerIdFor(position),
    });

  const dismissAll = () =>
    POSITIONS.forEach(position => toaster.systemEvent.dismiss({ containerId: containerIdFor(position) }));

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {POSITIONS.map(position => (
          <Button key={position} appearance={APPEARANCE.Primary} label={position} onClick={() => fire(position)} />
        ))}
        <Button appearance={APPEARANCE.Neutral} label='Закрыть все' onClick={dismissAll} />
        {POSITIONS.map(position => (
          <ToasterContainer
            key={position}
            type={TOASTER_TYPE.SystemEvent}
            containerId={containerIdFor(position)}
            position={position}
            limit={3}
            autoClose={4000}
            stacked={false}
            displayCloseAllButton={false}
          />
        ))}
      </div>
    </PortalContextProvider>
  );
}
