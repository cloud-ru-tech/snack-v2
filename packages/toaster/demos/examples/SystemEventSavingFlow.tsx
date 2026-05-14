import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_SYSTEM_EVENT, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const CONTAINER_ID = 'demo-system-event-saving-flow';
const PENDING_DELAY_MS = 1500;

export function SystemEventSavingFlow() {
  const run = async () => {
    const id = await toaster.systemEvent.neutral({
      title: 'Сохранение…',
      description: 'Не закрывайте окно',
      autoClose: false,
      progressBar: false,
      closable: false,
      containerId: CONTAINER_ID,
    });

    setTimeout(() => {
      toaster.systemEvent.update.success(id, {
        title: 'Сохранено',
        description: 'Все изменения зафиксированы',
        autoClose: 3000,
        containerId: CONTAINER_ID,
      });
    }, PENDING_DELAY_MS);
  };

  const fail = async () => {
    const id = await toaster.systemEvent.neutral({
      title: 'Отправка…',
      description: 'Ждём ответа сервера',
      autoClose: false,
      progressBar: false,
      closable: false,
      containerId: CONTAINER_ID,
    });

    setTimeout(() => {
      toaster.systemEvent.update.error(id, {
        title: 'Ошибка соединения',
        description: 'Попробуйте ещё раз',
        autoClose: 5000,
        closable: true,
        containerId: CONTAINER_ID,
      });
    }, PENDING_DELAY_MS);
  };

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button appearance={APPEARANCE.Primary} label='Сохранить → success' onClick={run} />
        <Button appearance={APPEARANCE.Critical} label='Сохранить → error' onClick={fail} />
        <Button
          appearance={APPEARANCE.Neutral}
          label='Закрыть все'
          onClick={() => toaster.systemEvent.dismiss({ containerId: CONTAINER_ID })}
        />
        <ToasterContainer
          type={TOASTER_TYPE.SystemEvent}
          containerId={CONTAINER_ID}
          position={POSITION_SYSTEM_EVENT.BottomRight}
          limit={3}
          autoClose={5000}
          stacked={false}
          displayCloseAllButton={false}
        />
      </div>
    </PortalContextProvider>
  );
}
