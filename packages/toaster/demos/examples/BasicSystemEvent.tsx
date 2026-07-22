import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_SYSTEM_EVENT, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const CONTAINER_ID = 'demo-basic-system-event';

export function BasicSystemEvent() {
  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          appearance={APPEARANCE.Primary}
          label='Success'
          onClick={() =>
            toaster.systemEvent.success({
              title: 'Изменения сохранены',
              description: 'Все данные синхронизированы',
              containerId: CONTAINER_ID,
            })
          }
        />
        <Button
          appearance={APPEARANCE.Critical}
          label='Error'
          onClick={() =>
            toaster.systemEvent.error({
              title: 'Не удалось сохранить',
              description: 'Попробуйте ещё раз',
              link: { label: 'Подробнее', href: '#' },
              containerId: CONTAINER_ID,
            })
          }
        />
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
          stacked={false}
          displayCloseAllButton={false}
        />
      </div>
    </PortalContextProvider>
  );
}
