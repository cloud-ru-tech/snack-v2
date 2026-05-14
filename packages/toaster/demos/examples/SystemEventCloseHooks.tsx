import { APPEARANCE, Button } from '@ds/button';
import { PortalContextProvider } from '@ds/portal-context';
import { POSITION_SYSTEM_EVENT, toaster, TOASTER_TYPE, ToasterContainer } from '@ds/toaster';
import { useState } from 'react';

import styles from './styles.module.scss';

const CONTAINER_ID = 'demo-system-event-close-hooks';

export function SystemEventCloseHooks() {
  const [log, setLog] = useState<string[]>([]);
  const push = (line: string) => setLog(prev => [line, ...prev].slice(0, 4));

  const open = () => {
    toaster.systemEvent.warning({
      title: 'Несохранённые изменения',
      description: 'Закрыть тост?',
      containerId: CONTAINER_ID,
      onCloseClick: (_e, close) => {
        if (window.confirm('Закрыть уведомление?')) {
          push('onCloseClick → close()');
          close?.();
        } else {
          push('onCloseClick → отменено');
        }
      },
      onClose: id => push(`onClose(${String(id)})`),
    });
  };

  return (
    <PortalContextProvider>
      <div className={styles.uploadFrame}>
        <Button appearance={APPEARANCE.Primary} label='Показать тост' onClick={open} />
        <Button appearance={APPEARANCE.Neutral} label='Очистить лог' onClick={() => setLog([])} />
        <ul className={styles.eventLog} aria-label='Лог событий'>
          {log.length === 0 ? <li>Лог пуст</li> : log.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
        <ToasterContainer
          type={TOASTER_TYPE.SystemEvent}
          containerId={CONTAINER_ID}
          position={POSITION_SYSTEM_EVENT.BottomRight}
          limit={3}
          autoClose={false}
        />
      </div>
    </PortalContextProvider>
  );
}
