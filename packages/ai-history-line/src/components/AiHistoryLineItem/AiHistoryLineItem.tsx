import { useToggleGroup } from '@ds/toggles';
import { PolymorphicRef, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, MouseEvent, MouseEventHandler, ReactElement, ReactNode, useCallback, useId, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { PolymorphicProps } from '../../types';
import { AiHistoryLineIndicator, AiHistoryLineIndicatorProps } from '../AiHistoryLineIndicator';
import { AiHistoryLineStepper } from '../AiHistoryLineStepper';
import styles from './styles.module.scss';
import { useIndicatorOffset } from './useIndicatorOffset';
import { resolveOffset } from './utils';

type IndicatorInGroupProps = Omit<AiHistoryLineIndicatorProps, 'active'> & {
  /** Значение в `ToggleGroup` ленты. Без него индикатор не выбирается. */
  id?: string;
};

function IndicatorInGroup({ id, onClick, href, ...rest }: IndicatorInGroupProps): ReactElement {
  const fallbackId = useId();
  const selectable = Boolean(id);
  const { isChecked, handleClick } = useToggleGroup({ value: id ?? fallbackId });
  const handleIndicatorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || !selectable) return;
      handleClick();
    },
    [handleClick, onClick, selectable],
  );
  const interactive = Boolean(href) || Boolean(onClick) || selectable;

  return (
    <AiHistoryLineIndicator
      {...rest}
      href={href}
      active={selectable && isChecked}
      onClick={interactive ? handleIndicatorClick : undefined}
    />
  );
}

export type AiHistoryLineItemProps<T extends ElementType = 'li'> = PolymorphicProps<
  T,
  {
    /** Узел в колодце 24×24. Иконку собирает потребитель. */
    indicator: ReactNode;
    /** Подложка индикатора. `false` для аватара: без заливки и внутренней обводки. */
    indicatorBackground?: boolean;
    /**
     * Доступное имя интерактивного индикатора.
     * Имеет смысл у кнопки выбора (`id`) и у ссылки (`href`).
     */
    indicatorLabel?: string;
    /**
     * Делает индикатор ссылкой.
     * Переход, запись адреса и прокрутка остаются на стороне потребителя.
     */
    href?: string;
    /**
     * Дополнительный обработчик клика.
     * Сюда потребитель ставит запись хеша и прокрутку, если они нужны.
     */
    onIndicatorClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    /** Значение в группе активного индикатора. С `id` индикатор становится кнопкой выбора. */
    id?: string;
    /** Первая строка. Верхний коннектор остаётся и держит смещение, линия не видна. */
    firstItem?: boolean;
    /** Последняя строка. Нижний коннектор скрыт. */
    lastItem?: boolean;
    /** Тело строки. */
    children?: ReactNode;
    /** Дополнительный класс корня. */
    className?: string;
    /** Полиморфный тег корня. По умолчанию `li`. */
    as?: T;
    /** Ref на корневой элемент. */
    innerRef?: PolymorphicRef<T>;
  }
>;

export function AiHistoryLineItem<T extends ElementType = 'li'>({
  as,
  id,
  href,
  innerRef,
  className,
  indicator,
  indicatorBackground = true,
  indicatorLabel,
  onIndicatorClick,
  firstItem,
  lastItem,
  children,
  'data-test-id': dataTestId = TEST_IDS.item,
  ...rest
}: AiHistoryLineItemProps<T>): ReactElement {
  const Component = (as || 'li') as ElementType;
  const itemRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const offset = useIndicatorOffset(itemRef, contentRef, children);

  const handleItemRef = useCallback(
    (node: HTMLElement | null) => {
      itemRef.current = node;

      if (typeof innerRef === 'function') {
        innerRef(node);
      } else if (innerRef) {
        Object.assign(innerRef, { current: node });
      }
    },
    [innerRef],
  );

  return (
    <Component {...rest} id={id} ref={handleItemRef} data-test-id={dataTestId} className={cn(styles.root, className)}>
      <AiHistoryLineStepper
        showLeadingConnector={!firstItem}
        showClosingConnector={!lastItem}
        offset={resolveOffset(offset)}
      >
        <IndicatorInGroup
          id={id}
          href={href}
          background={indicatorBackground}
          indicatorLabel={indicatorLabel}
          onClick={onIndicatorClick}
        >
          {indicator}
        </IndicatorInGroup>
      </AiHistoryLineStepper>
      <div ref={contentRef} className={styles.content} data-test-id={TEST_IDS.content}>
        {children}
      </div>
    </Component>
  );
}

withInnerRefSupport(AiHistoryLineItem);
