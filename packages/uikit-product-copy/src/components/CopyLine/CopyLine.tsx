import { Button } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { useCopyToClipboard } from '../../hooks';
import { isStringOrNumber } from '../../utils';
import { COPY_BUTTON_HIDE_STRATEGY } from './constants';
import styles from './styles.module.scss';
import { CopyButtonHideStrategy } from './types';

const ICON_SIZE = 16;

export type CopyLineProps = WithSupportProps<{
  /** Отображаемое содержимое. Если это строка/число — автоматически truncated и используется как значение для копирования по-умолчанию. */
  content: ReactNode;
  /** Значение, которое попадёт в буфер при клике. По-умолчанию равно content, если он string/number. */
  valueToCopy?: string | number;
  /** Дополнительный класс корневого элемента. */
  className?: string;
  /** Обработчик клика по строке. */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Стратегия показа кнопки копирования: hover — только по наведению, never — всегда. */
  copyButtonHideStrategy?: CopyButtonHideStrategy;
}>;

export function CopyLine({
  content,
  className,
  valueToCopy: valueToCopyProp,
  onClick,
  copyButtonHideStrategy = COPY_BUTTON_HIDE_STRATEGY.Hover,
  ...rest
}: CopyLineProps) {
  const valueToCopy = valueToCopyProp ?? (isStringOrNumber(content) ? String(content) : '');
  const { isChecked, copy } = useCopyToClipboard();

  const handleClick: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation();
    if (valueToCopy) copy(String(valueToCopy));
    onClick?.(event);
  };

  return (
    <div
      className={cn(styles.copyLine, className)}
      onClick={handleClick}
      role='presentation'
      data-copy-button-hide-strategy={copyButtonHideStrategy}
      {...extractSupportProps(rest)}
    >
      <span className={styles.content}>
        {isStringOrNumber(content) ? <TruncateString text={String(content)} maxLines={1} /> : content}
      </span>
      <Button
        className={styles.copyButton}
        view='function'
        appearance='neutral'
        size='s'
        type='button'
        aria-label='Copy'
        data-test-id={TEST_IDS.copyLine.copyButton}
        icon={isChecked ? <CheckSVG size={ICON_SIZE} /> : <CopySVG size={ICON_SIZE} />}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          if (valueToCopy) copy(String(valueToCopy));
        }}
      />
    </div>
  );
}
