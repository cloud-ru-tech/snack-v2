import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_SYSTEM_EVENT, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';

const CONTAINER_ID = 'demo-system-event-with-action';

export function SystemEventWithAction() {
  const dismiss = () => toaster.systemEvent.dismiss({ containerId: CONTAINER_ID });

  // `autoClose: false` — тост висит, пока пользователь не нажмёт action или
  // close. Используется, когда от пользователя ждут явного решения.
  const openSticky = () =>
    toaster.systemEvent.warning({
      title: 'Подтвердите действие',
      description: 'Удалить этот файл без возможности восстановления?',
      action: [
        { label: 'Удалить', onClick: dismiss },
        { label: 'Отмена', onClick: dismiss },
      ],
      autoClose: false,
      containerId: CONTAINER_ID,
    });

  // Без `autoClose: false` — тост закроется по таймеру контейнера (autoClose
  // = 5000ms). Action остаётся как «удобный сокращённый путь», но решение
  // не блокирующее.
  const openAutoClosing = () =>
    toaster.systemEvent.warning({
      title: 'Файл будет удалён через 5 секунд',
      description: 'Нажмите «Отменить», чтобы прервать.',
      action: [{ label: 'Отменить', onClick: dismiss }],
      containerId: CONTAINER_ID,
    });

  return (
    <PortalContextProvider>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button appearance={APPEARANCE.Critical} label='Sticky (autoClose: false)' onClick={openSticky} />
        <Button
          appearance={APPEARANCE.Primary}
          label='С таймером (autoClose из контейнера)'
          onClick={openAutoClosing}
        />
        <Button appearance={APPEARANCE.Neutral} label='Закрыть все' onClick={dismiss} />
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
