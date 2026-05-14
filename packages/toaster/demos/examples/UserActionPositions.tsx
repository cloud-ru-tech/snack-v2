import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_USER_ACTION, toaster, TOASTER_TYPE, ToasterContainer, UserActionPosition } from '@ds/toaster';

const POSITIONS: UserActionPosition[] = Object.values(POSITION_USER_ACTION);

const containerIdFor = (position: UserActionPosition) => `demo-user-action-position-${position}`;

export function UserActionPositions() {
  const fire = (position: UserActionPosition) =>
    toaster.userAction.success({
      label: `Тост в ${position}`,
      containerId: containerIdFor(position),
    });

  const dismissAll = () =>
    POSITIONS.forEach(position => toaster.userAction.dismiss({ containerId: containerIdFor(position) }));

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
            type={TOASTER_TYPE.UserAction}
            containerId={containerIdFor(position)}
            position={position}
            limit={2}
            autoClose={3000}
          />
        ))}
      </div>
    </PortalContextProvider>
  );
}
