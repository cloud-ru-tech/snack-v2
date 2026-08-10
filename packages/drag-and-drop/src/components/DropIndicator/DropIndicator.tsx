import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { HTMLProps, Ref } from 'react';

import { ORIENTATION } from '../../constants';
import { Orientation, Placement } from '../../types';
import styles from './styles.module.scss';

export type DropIndicatorProps = WithSupportProps<
  {
    /** Ориентация линии: horizontal — вставка между строками, vertical — между колонками. По умолчанию: horizontal */
    orientation?: Orientation;
    /**
     * Край элемента-цели, у которого стоит линия. Задан — линия позиционируется абсолютно по этому
     * краю и центрируется на границе с соседом; не задан — линия остаётся в потоке, и её размещает
     * потребитель. Требует `position` на элементе-цели.
     */
    placement?: Placement;
    /**
     * Линия стоит у края зоны приёма (первая или последняя позиция). Смещает её внутрь зоны, иначе
     * линия ложится на обводку зоны либо обрезается скроллом. Работает вместе с `placement`.
     * По умолчанию: false
     */
    atEdge?: boolean;
    /** CSS-класс */
    className?: string;
    /** Ref на корневой элемент */
    innerRef?: Ref<HTMLDivElement>;
  } & Omit<HTMLProps<HTMLDivElement>, 'ref' | 'children'>
>;

/**
 * Пунктирная линия позиции вставки: показывает, куда встанет сущность, если отпустить её сейчас.
 *
 * Нужна в статическом переносе (`DragGhost` с `mode='static'`), где соседи стоят на месте.
 * В динамическом соседи расступаются сами, точку вставки показывает пустой слот — линию там
 * не рисуют.
 *
 * Растягивается по ширине (для `horizontal`) либо по высоте (для `vertical`) родителя; собственных
 * размеров вдоль своей оси не имеет. С `placement` сама встаёт по нужному краю элемента-цели.
 */
export function DropIndicator({
  orientation = ORIENTATION.Horizontal,
  placement,
  atEdge = false,
  className,
  innerRef,
  ...rest
}: DropIndicatorProps) {
  return (
    <div
      ref={innerRef}
      role='presentation'
      className={cn(styles.dropIndicator, className)}
      data-orientation={orientation}
      data-placement={placement}
      data-at-edge={atEdge || undefined}
      {...rest}
    />
  );
}

withInnerRefSupport(DropIndicator);
