import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { HTMLProps, ReactNode, Ref } from 'react';

import { DRAG_MODE } from '../../constants';
import { DragMode } from '../../types';
import styles from './styles.module.scss';

export type DragGhostProps = WithSupportProps<
  {
    /** Сущность переносится прямо сейчас. По умолчанию: false */
    dragging?: boolean;
    /**
     * Режим переноса: `static` — соседи стоят на месте, сущность приглушается, точку вставки
     * показывает `DropIndicator`; `dynamic` — соседи расступаются сразу, а слот сущности пустеет
     * и сам показывает точку вставки (линия в этом режиме не нужна). По умолчанию: static
     */
    mode?: DragMode;
    /** Сущность, остающаяся на своей позиции на время переноса. */
    children?: ReactNode;
    /** CSS-класс */
    className?: string;
    /** Ref на корневой элемент — к нему привязывается sortable-узел DnD-библиотеки. */
    innerRef?: Ref<HTMLDivElement>;
  } & Omit<HTMLProps<HTMLDivElement>, 'ref'>
>;

/**
 * Исходная сущность на время переноса, пока за курсором едет её копия (`DragPreview`).
 *
 * Вид на время переноса задаёт `mode`: в `static` сущность остаётся на месте приглушённой,
 * в `dynamic` — становится невидимой, сохраняя своё место в раскладке, поэтому на месте
 * попадания получается пустой слот.
 *
 * Заменяет собой обёртку сущности, а не добавляет уровень вложенности: принимает `innerRef`,
 * `className` и остальные атрибуты `<div>`. Создаёт контекст позиционирования, поэтому линию
 * вставки (`DropIndicator` с `placement`) можно рендерить прямо внутри.
 */
export function DragGhost({
  dragging = false,
  mode = DRAG_MODE.Static,
  children,
  className,
  innerRef,
  ...rest
}: DragGhostProps) {
  return (
    <div
      ref={innerRef}
      className={cn(styles.dragGhost, className)}
      data-dragging={dragging || undefined}
      data-mode={mode}
      {...rest}
    >
      {children}
    </div>
  );
}

withInnerRefSupport(DragGhost);
