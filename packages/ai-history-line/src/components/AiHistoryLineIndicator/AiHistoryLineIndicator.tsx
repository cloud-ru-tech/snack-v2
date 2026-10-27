import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler, ReactElement, ReactNode, Ref } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type AiHistoryLineIndicatorProps = WithSupportProps<{
  /** Кольцо выбора. Компонент его не переключает. */
  active?: boolean;
  /** Подложка колодца. `false` убирает заливку и внутреннюю обводку, кольцо выбора остаётся. */
  background?: boolean;
  /** Содержимое колодца 24×24: аватар или иконка. */
  children?: ReactNode;
  /** Делает индикатор ссылкой. Переход выполняет потребитель. */
  href?: string;
  /** Клик по индикатору. Без `href` рендерит кнопку. */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** Доступное имя кнопки или ссылки. */
  indicatorLabel?: string;
  /** Дополнительный класс корня. */
  className?: string;
  /** Ref на корневой элемент. */
  innerRef?: Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>;
}>;

export function AiHistoryLineIndicator({
  active = false,
  background = true,
  children,
  href,
  onClick,
  indicatorLabel,
  className,
  innerRef,
  'data-test-id': dataTestId = TEST_IDS.indicator,
}: AiHistoryLineIndicatorProps): ReactElement {
  const shared = {
    className: cn(styles.root, className),
    'aria-label': indicatorLabel,
    'data-test-id': dataTestId,
    'data-active': active ? 'true' : undefined,
    'data-background': background ? 'true' : 'false',
  };

  if (href) {
    return (
      <a {...shared} href={href} ref={innerRef as Ref<HTMLAnchorElement>} onClick={onClick}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button {...shared} type='button' ref={innerRef as Ref<HTMLButtonElement>} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <span {...shared} ref={innerRef as Ref<HTMLSpanElement>}>
      {children}
    </span>
  );
}

withInnerRefSupport(AiHistoryLineIndicator);
