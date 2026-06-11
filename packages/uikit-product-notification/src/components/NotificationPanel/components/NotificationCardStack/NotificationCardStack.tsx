import { Button } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG, KebabSVG } from '@ds/icons';
import { TruncateString } from '@ds/truncate-string';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { Children, CSSProperties, ReactNode, useMemo, useState } from 'react';

import { TEST_IDS } from '../../../../constants';
import { ActionsButton } from '../../../../helperComponents/ActionsButton';
import { Action } from '../../../../types';
import { StackTail } from '../../helperComponents/StackTail';
import { useAnimatedOpening } from './hooks';
import styles from './styles.module.scss';
import { cloneCard } from './utils';

const ANIMATION_DURATION = 0.3;

export type NotificationCardStackProps = WithSupportProps<{
  /** Заголовок стопки карточек */
  title: string;
  /** Состояние открыт/закрыт по умолчанию */
  defaultOpen?: boolean;
  /** Колбек смены состояния открыт/закрыт */
  onOpenChanged?(open: boolean): void;
  /** Карточки в стопке, видна первая карточка, остальные схлопываются под нее. */
  children: Iterable<ReactNode>;
  /** Список действий в выпадающем меню */
  actions?: Action[];
  /** Состояние непрочитанных карточек */
  unread?: boolean;
}>;

export function NotificationCardStack({
  children,
  defaultOpen,
  onOpenChanged,
  title,
  actions,
  unread,
  ...rest
}: NotificationCardStackProps) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const { open, toggleOpen, isVisible } = useAnimatedOpening({
    defaultOpen,
    onOpenChanged,
    duration: ANIMATION_DURATION * 1000,
  });

  const [first, ...stack] = useMemo(() => Children.toArray(children), [children]);

  if (!first) {
    return null;
  }

  if (!stack.length) {
    return (
      <div data-test-id={TEST_IDS.panel.cardStack.wrapper} {...extractSupportProps(rest)}>
        {first}
      </div>
    );
  }

  const firstCardElement = open
    ? first
    : cloneCard(first, componentProps => ({
        ...componentProps,
        onClick: toggleOpen,
        unread: unread || componentProps.unread,
      }));

  return (
    <div
      className={styles.container}
      style={{ '--snack-notification-stack-animation-duration': `${ANIMATION_DURATION}s` } as CSSProperties}
      data-test-id={TEST_IDS.panel.cardStack.wrapper}
      {...extractSupportProps(rest)}
    >
      <div className={styles.header} data-test-id={TEST_IDS.panel.cardStack.headline}>
        <Typography
          variant='label'
          size='l'
          as='div'
          className={styles.title}
          onClick={toggleOpen}
          aria-expanded={open}
        >
          <TruncateString data-test-id={TEST_IDS.panel.cardStack.title} text={title} />
        </Typography>

        <div className={styles.right}>
          {actions && actions.length > 0 && (
            <ActionsButton
              actions={actions}
              open={actionsOpen}
              setDroplistOpen={setActionsOpen}
              icon={<KebabSVG />}
              triggerAriaLabel='Действия со стопкой'
              testIds={TEST_IDS.panel.cardStack.actions}
            />
          )}

          <Button
            view='function'
            appearance='neutral'
            size='m'
            onClick={toggleOpen}
            aria-label={open ? 'Свернуть стопку' : 'Развернуть стопку'}
            aria-expanded={open}
            data-test-id={TEST_IDS.panel.cardStack.openButton}
            icon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
          />
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.first}>
          {/* column-reverse: хвост стопки рисуется под первой карточкой, но её
              focus-outline остаётся поверх хвоста */}
          <StackTail open={open} count={stack.length} />
          {firstCardElement}
        </div>
        <div className={styles.stack} data-open={open || undefined} data-tail-size={stack.length}>
          <div className={styles.animationContainer}>{isVisible ? stack : []}</div>
        </div>
      </div>
    </div>
  );
}
