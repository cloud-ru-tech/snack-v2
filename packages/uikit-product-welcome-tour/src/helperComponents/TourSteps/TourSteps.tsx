import { PaginationSlider } from '@ds/pagination';
import { useEffect, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type TourStepsProps = {
  /** Общее количество шагов. */
  total: number;
  /** Индекс текущего шага (с нуля). */
  current: number;
};

function noop() {}

/**
 * Индикатор прогресса тура. Неинтерактивен: навигация идёт кнопками подсказки.
 *
 * Точки `PaginationSlider` — кнопки, режима «только индикатор» у него нет и заводить его
 * под единственного потребителя не планируется. Поэтому после монтирования точки
 * переводятся в `disabled`: focus-trap движка собирает узлы селектором
 * `button:not([disabled])`. `tabIndex = -1` селектор не учитывает, `inert` зацикливает
 * трап на себе и делает кнопку «Далее» недостижимой с клавиатуры.
 *
 * Клики снимает `pointer-events: none`, озвучку — `aria-hidden` (позицию в туре
 * скринридеру сообщает скрытый текст в `TourHint`).
 */
export function TourSteps({ current, total }: TourStepsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.querySelectorAll('button').forEach(button => {
      button.disabled = true;
    });
    // `current` в зависимостях защитно: сейчас точки кешируются по номеру страницы и
    // переживают смену шага, но React про мутацию не знает и не восстановит её, если
    // пагинация начнёт пересоздавать узлы.
  }, [total, current]);

  return (
    <div ref={rootRef} className={styles.steps} aria-hidden>
      <PaginationSlider data-test-id={TEST_IDS.steps} page={current + 1} total={total} onChange={noop} />
    </div>
  );
}
