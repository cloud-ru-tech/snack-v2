import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { HTMLProps, ReactNode, Ref } from 'react';

import styles from './styles.module.scss';

export type DropTargetProps = WithSupportProps<
  {
    /** Зона принимает перетаскиваемую сущность прямо сейчас — включает рамку и заливку. По умолчанию: false */
    active?: boolean;
    /** Содержимое зоны */
    children?: ReactNode;
    /** CSS-класс */
    className?: string;
    /** Ref на корневой элемент — к нему привязывается droppable-узел DnD-библиотеки. */
    innerRef?: Ref<HTMLDivElement>;
  } & Omit<HTMLProps<HTMLDivElement>, 'ref'>
>;

/**
 * Зона приёма: рамка и заливка вокруг области, куда приедет перетаскиваемая сущность.
 *
 * Рамка — признак **переноса между зонами**: она включается, когда сущность взяли в одной зоне,
 * а отпускают в другой (перенос из списка в список, из колонки в колонку). Перестановка внутри
 * своей зоны рамкой не сопровождается — там всё показывают линия вставки (`DropIndicator`)
 * либо расступившиеся соседи, а лишняя подсветка только шумит.
 *
 * Рендерится постоянно и включается пропом `active` — например, когда `@dnd-kit` сообщает, что
 * курсор над этой зоной, а сущность взята в другой. Без `active` зона невидима и не влияет
 * на раскладку: обводка рисуется внутрь элемента и соседей не двигает.
 */
export function DropTarget({ active = false, children, className, innerRef, ...rest }: DropTargetProps) {
  return (
    <div ref={innerRef} className={cn(styles.dropTarget, className)} data-active={active || undefined} {...rest}>
      {children}
    </div>
  );
}

withInnerRefSupport(DropTarget);
