import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { StarsMagicSVG } from '@ds/icons/interface/web';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler, ReactElement } from 'react';

import { ACTION_ICON_SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type NewNavigationBannerProps = WithSupportProps<{
  /** Заголовок (Figma title/s). */
  title: string;
  /** Описание (Figma body/s). */
  description: string;
  /** Текст кнопки действия. */
  actionLabel: string;
  /** Обработчик клика по кнопке «Переключиться». */
  onActionClick?: MouseEventHandler<HTMLButtonElement>;
  /** Отключённое состояние кнопки. */
  disabled?: boolean;
  /** CSS-класс корневого контейнера. */
  className?: string;
}>;

/**
 * Баннер «Новая навигация» (Figma: `newNavigation`).
 *
 * Информационная карточка с CTA для переключения на новую навигацию.
 */
export function NewNavigationBanner({
  title,
  description,
  actionLabel,
  onActionClick,
  disabled = false,
  className,
  ...rest
}: NewNavigationBannerProps): ReactElement {
  return (
    <aside className={cn(styles.root, className)} data-test-id={TEST_IDS.root} {...extractSupportProps(rest)}>
      <div className={styles.text}>
        <p className={styles.title} data-test-id={TEST_IDS.title}>
          {title}
        </p>
        <p className={styles.description} data-test-id={TEST_IDS.description}>
          {description}
        </p>
      </div>

      <Button
        className={styles.switchButton}
        appearance={APPEARANCE.Primary}
        view={VIEW.Filled}
        size={SIZE.S}
        fullWidth
        label={actionLabel}
        icon={<StarsMagicSVG size={ACTION_ICON_SIZE} />}
        disabled={disabled}
        onClick={onActionClick}
        data-test-id={TEST_IDS.action}
      />
    </aside>
  );
}
