import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_USER_ACTION, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const CONTAINER_ID = 'demo-user-action-loading';
const OPERATION_MS = 1500;

export function UserActionLoading() {
  const run = async () => {
    const id = await toaster.userAction.neutral({
      label: 'Загрузка…',
      loading: true,
      containerId: CONTAINER_ID,
    });
    setTimeout(() => {
      toaster.userAction.update.success(id, { label: 'Готово!', containerId: CONTAINER_ID });
    }, OPERATION_MS);
  };

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button appearance={APPEARANCE.Primary} label='Запустить операцию' onClick={run} />
        <Button
          appearance={APPEARANCE.Neutral}
          label='Закрыть все'
          onClick={() => toaster.userAction.dismiss({ containerId: CONTAINER_ID })}
        />
        <ToasterContainer
          type={TOASTER_TYPE.UserAction}
          containerId={CONTAINER_ID}
          position={POSITION_USER_ACTION.BottomCenter}
          limit={2}
          autoClose={2000}
        />
      </div>
    </PortalContextProvider>
  );
}
