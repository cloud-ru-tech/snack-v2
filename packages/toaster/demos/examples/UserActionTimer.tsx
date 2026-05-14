import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_USER_ACTION, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const CONTAINER_ID = 'demo-user-action-timer';

export function UserActionTimer() {
  const dismiss = () => toaster.userAction.dismiss({ containerId: CONTAINER_ID });

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          appearance={APPEARANCE.Primary}
          label='Тост с таймером'
          onClick={() =>
            toaster.userAction.success({
              label: 'Скопировано',
              timer: true,
              containerId: CONTAINER_ID,
            })
          }
        />
        <Button
          appearance={APPEARANCE.Neutral}
          label='С таймером и ссылкой'
          onClick={() =>
            toaster.userAction.neutral({
              label: 'Сохранено',
              timer: true,
              action: { label: 'Отменить', onClick: dismiss },
              containerId: CONTAINER_ID,
            })
          }
        />
        <Button appearance={APPEARANCE.Neutral} label='Закрыть все' onClick={dismiss} />
        <ToasterContainer
          type={TOASTER_TYPE.UserAction}
          containerId={CONTAINER_ID}
          position={POSITION_USER_ACTION.BottomCenter}
          limit={2}
          autoClose={4000}
        />
      </div>
    </PortalContextProvider>
  );
}
