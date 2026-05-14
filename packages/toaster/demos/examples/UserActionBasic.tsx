import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_USER_ACTION, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const CONTAINER_ID = 'demo-user-action-basic';

export function UserActionBasic() {
  const dismiss = () => toaster.userAction.dismiss({ containerId: CONTAINER_ID });

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          appearance={APPEARANCE.Primary}
          label='Success'
          onClick={() => toaster.userAction.success({ label: 'Скопировано', containerId: CONTAINER_ID })}
        />
        <Button
          appearance={APPEARANCE.Critical}
          label='Error'
          onClick={() => toaster.userAction.error({ label: 'Не удалось', containerId: CONTAINER_ID })}
        />
        <Button
          appearance={APPEARANCE.Neutral}
          label='С отменой'
          onClick={() =>
            toaster.userAction.neutral({
              label: 'Сохранено',
              action: {
                label: 'Отменить',
                onClick: () => {
                  dismiss();
                  toaster.userAction.success({ label: 'Отменено', containerId: CONTAINER_ID });
                },
              },
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
          autoClose={2000}
        />
      </div>
    </PortalContextProvider>
  );
}
