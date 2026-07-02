import { useEffect, useState } from 'react';

import { GLOBAL_CONTAINER_ID } from '../../constants';

/**
 * Высота страницы сервиса, синхронизированная с глобальным контейнером приложения
 * (`GLOBAL_CONTAINER_ID`) через `ResizeObserver`. При `autoHeight` наблюдение отключается —
 * страница занимает высоту по контенту.
 */
export function usePageHeight(autoHeight?: boolean): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (autoHeight) return;

    const container = document.getElementById(GLOBAL_CONTAINER_ID);

    if (!container) return;

    const observer = new ResizeObserver(entities =>
      entities.forEach(entity => {
        if (entity.target === container) {
          const [{ blockSize }] = entity.contentBoxSize;
          setHeight(Math.floor(blockSize));
        }
      }),
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [autoHeight]);

  return height;
}
