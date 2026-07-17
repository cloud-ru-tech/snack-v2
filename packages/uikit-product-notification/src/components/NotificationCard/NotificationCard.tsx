import { Button, ButtonProps } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Link, PickLinkProps } from '@ds/link';
import { StatusIndicator } from '@ds/status';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { KeyboardEventHandler, MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { APPEARANCE, TEST_IDS } from '../../constants';
import { ActionsButton } from '../../helperComponents/ActionsButton';
import { Action, Appearance } from '../../types';
import { stopPropagationClick } from '../../utils';
import { getAppearanceLabel, getIcon } from './helpers';
import styles from './styles.module.scss';

type NotificationButtonProps = Omit<ButtonProps, 'size' | 'appearance' | 'view' | 'data-test-id'>;

export type NotificationCardProps = WithSupportProps<{
  /** Идентификатор уведомления */
  id: string;
  /** Тип уведомления */
  appearance?: Appearance;
  /** Лейбл перед заголовком */
  label?: string;
  /** Управление состоянием прочитано/не прочитано */
  unread?: boolean;
  /** Заголовок уведомления */
  title: string;
  /** Контент уведомления */
  content: ReactNode;
  /** Ссылка (рендерится как `<a href>` через `@ds/link`) */
  link?: PickLinkProps<'a', 'text' | 'insideText' | 'truncateVariant'>;
  /** Дата уведомления */
  date: string;
  /**
   * Колбэк клика по карточке. Делает карточку кликабельной (`role='button'`, фокус с клавиатуры).
   * Активация по карточке срабатывает только при фокусе на самой карточке — вложенные кнопки,
   * ссылка и меню действий активируются независимо.
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Колбэк при попадании карточки в область видимости на 80% */
  onVisible?(cardId: string): void;
  /** Кнопка главного действия у карточки (рендерится как Button view='tonal') */
  primaryButton?: NotificationButtonProps;
  /** Кнопка второстепенного действия у карточки (рендерится как Button view='simple') */
  secondaryButton?: NotificationButtonProps;
  /** Дополнительные действия у карточки */
  actions?: Action[];
  /** CSS-класс */
  className?: string;
}>;

const VISIBILITY_THRESHOLD = 0.8;

/** Карточка уведомления */
export function NotificationCard({
  id,
  appearance = APPEARANCE.Default,
  label,
  unread,
  title,
  content,
  link,
  date,
  onClick,
  primaryButton,
  secondaryButton,
  actions,
  onVisible,
  className,
  ...rest
}: NotificationCardProps) {
  const icon = useMemo(() => getIcon(appearance), [appearance]);

  const [isDroplistOpen, setDroplistOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Держим последний колбэк в ref, чтобы инлайн-стрелка из родителя не пересоздавала
  // IntersectionObserver на каждый ре-рендер списка карточек.
  const onVisibleRef = useRef(onVisible);
  useEffect(() => {
    onVisibleRef.current = onVisible;
  });

  useEffect(() => {
    if (!unread) {
      return;
    }

    const node = cardRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
          onVisibleRef.current?.(id);
          // Срабатываем один раз за время видимости — повторный въезд во viewport
          // не должен слать дубль-колбэк.
          observer.unobserve(node);
        }
      },
      {
        root: null,
        threshold: VISIBILITY_THRESHOLD,
        rootMargin: '0px',
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [id, unread]);

  const showFooter = Boolean(link || date);

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.stopPropagation();
    link?.onClick?.(e);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (!onClick) return;

    // Обрабатываем активацию только при фокусе на самой карточке: Enter/Space на вложенных
    // кнопках/ссылке/меню действий должны активировать их, а не клик по карточке.
    if (e.target !== e.currentTarget) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cardRef.current?.click();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      ref={cardRef}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      {...extractSupportProps(rest)}
      data-appearance={appearance}
      data-unread={unread || undefined}
      data-clickable={Boolean(onClick) || undefined}
      data-droplist-open={isDroplistOpen || undefined}
      className={cn(styles.notificationCard, className)}
    >
      <span className={styles.stateLayer} data-state='regularFilled' aria-hidden />

      {unread && <span className={styles.visuallyHidden}>Непрочитанное уведомление</span>}

      {actions?.length ? (
        <ActionsButton
          className={styles.notificationCardFunction}
          actions={actions}
          open={isDroplistOpen}
          setDroplistOpen={setDroplistOpen}
          icon={<KebabSVG />}
          triggerAriaLabel='Действия с уведомлением'
          testIds={TEST_IDS.card.actions}
        />
      ) : null}

      {label && (
        <Typography variant='body' size='s' as='div' className={styles.notificationCardLabel}>
          <TruncateString maxLines={1} text={label} data-test-id={TEST_IDS.card.label} />
        </Typography>
      )}

      <div className={styles.notificationCardTitle}>
        <div className={styles.notificationCardTitleIcon} role='img' aria-label={getAppearanceLabel(appearance)}>
          {icon}
        </div>

        <Typography variant='label' size='l' as='div' className={styles.notificationCardTitleText}>
          <TruncateString maxLines={2} text={title} data-test-id={TEST_IDS.card.title} />
        </Typography>
      </div>

      {content != null && content !== '' && (
        <Typography
          variant='body'
          size='s'
          as='div'
          className={styles.notificationCardContent}
          data-test-id={TEST_IDS.card.content}
        >
          {content}
        </Typography>
      )}

      {(primaryButton || secondaryButton) && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={styles.notificationCardButtons} onClick={stopPropagationClick}>
          {secondaryButton && (
            <Button
              {...secondaryButton}
              view='simple'
              appearance='neutral'
              size='m'
              data-test-id={TEST_IDS.card.secondaryButton}
            />
          )}

          {primaryButton && (
            <Button
              {...primaryButton}
              view='tonal'
              appearance='neutral'
              size='m'
              data-test-id={TEST_IDS.card.primaryButton}
            />
          )}
        </div>
      )}

      {showFooter && (
        <Typography variant='body' size='s' as='div' className={styles.notificationCardFooter}>
          {link && <Link {...link} onClick={handleLinkClick} appearance='primary' data-test-id={TEST_IDS.card.link} />}

          {date && (
            <Typography
              variant='body'
              size='s'
              as='span'
              className={styles.notificationCardDate}
              data-test-id={TEST_IDS.card.date}
            >
              {date}
            </Typography>
          )}
        </Typography>
      )}

      {unread && (
        <StatusIndicator
          className={styles.statusIndicator}
          size='3xs'
          appearance='green'
          data-test-id={TEST_IDS.card.statusIndicator}
        />
      )}
    </div>
  );
}
