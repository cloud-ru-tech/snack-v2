import { ButtonGroup } from '@ds/button';
import { Divider } from '@ds/divider';
import { UpdateSVG } from '@ds/icons';
import { InfoBlock } from '@ds/info-block';
import { Spinner } from '@ds/loader';
import { PopoverPrivate, PopoverPrivateProps } from '@ds/popover-private';
import { excludeSupportProps, extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { STATE } from './constants';
import { dropdownLocale } from './locale';
import styles from './styles.module.scss';
import { DropdownState } from './types';

export type DropdownProps = WithSupportProps<
  PropsWithChildren<{
    /** Содержимое внутри поповера (body) */
    content: ReactNode;
    /** Заголовок в шапке (topBar) */
    headline?: ReactNode;
    /** Подсказка-иконка рядом с заголовком (потребитель собирает, напр. `<QuestionTooltip />`) */
    headlineHint?: ReactNode;
    /** Слот поиска в шапке (topBar) */
    search?: ReactNode;
    /** Слот футера (bottomBar) */
    footer?: ReactNode;
    /** Divider между шапкой и body */
    headerDivider?: boolean;
    /** Divider между body и футером */
    footerDivider?: boolean;
    /** Состояние */
    state?: DropdownState;
    /** CSS-класс */
    className?: string;
    /**
     * CSS-класс контентной обёртки (bodyWrapper). Позволяет потребителю переопределить
     * паддинги body — например, список (`@ds/list`) задаёт собственные паддинги айтемов
     * и обнуляет паддинг bodyWrapper.
     */
    contentClassName?: string;
  }> &
    Pick<
      PopoverPrivateProps,
      | 'triggerClassName'
      | 'open'
      | 'onOpenChange'
      | 'hoverDelayOpen'
      | 'hoverDelayClose'
      | 'widthStrategy'
      | 'offset'
      | 'closeOnEscapeKey'
      | 'triggerClickByKeys'
      | 'triggerRef'
      | 'outsideClick'
      | 'fallbackPlacements'
      | 'disableSpanWrapper'
      | 'closeOnPopstate'
      | 'container'
    > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;

function DropdownBody({
  state,
  children,
  contentClassName,
}: Pick<DropdownProps, 'children' | 'state' | 'contentClassName'>) {
  const { t } = dropdownLocale.useTranslations();

  switch (state?.type) {
    case STATE.Loading:
      return (
        <div className={styles.loaderWrapper}>
          <Spinner size='m' />
        </div>
      );
    case STATE.NotFound:
      return (
        <InfoBlock
          className={styles.infoBlock}
          description={state.description || t('states.notFound.title')}
          footer={
            state.onActionClick ? (
              <ButtonGroup
                size='s'
                tertiaryAction={{
                  label: state.actionLabel || t('states.notFound.action'),
                  view: 'simple',
                  appearance: 'neutral',
                  icon: <UpdateSVG />,
                  iconPosition: 'after',
                }}
              />
            ) : null
          }
        />
      );

    case STATE.NoData:
      return (
        <InfoBlock
          className={styles.infoBlock}
          description={state.description || t('states.noData.title')}
          icon={state.icon}
          footer={
            state.onActionClick ? (
              <ButtonGroup
                size='s'
                tertiaryAction={{
                  label: state.actionLabel || t('states.noData.action'),
                  view: 'simple',
                  appearance: 'neutral',
                  icon: <UpdateSVG />,
                  iconPosition: 'after',
                }}
              />
            ) : null
          }
        />
      );

    case STATE.DataError:
      return (
        <InfoBlock
          className={styles.infoBlock}
          description={state.description || t('states.dataError.title')}
          icon={state.icon}
          footer={
            state.onActionClick ? (
              <ButtonGroup
                size='s'
                tertiaryAction={{
                  label: state.actionLabel || t('states.dataError.action'),
                  view: 'simple',
                  appearance: 'neutral',
                  icon: <UpdateSVG />,
                  iconPosition: 'after',
                }}
              />
            ) : null
          }
        />
      );

    default:
      return <div className={cn(styles.bodyWrapper, contentClassName)}>{children}</div>;
  }
}

/**
 * Dropdown компонент
 */
export function Dropdown({
  className,
  children,
  content,
  headline,
  headlineHint,
  search,
  footer,
  headerDivider,
  footerDivider,
  state,
  contentClassName,
  trigger = 'click',
  placement = 'bottom-start',
  triggerRef,
  widthStrategy = 'gte',
  triggerClassName,
  ...rest
}: DropdownProps) {
  if (!children && !triggerRef) {
    return null;
  }

  const hasTopBar = Boolean(headline || headlineHint || search);

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={
        <div
          className={cn(styles.root, className)}
          {...extractSupportProps(rest)}
          data-acrylic-appearance='neutral'
          data-acrylic-level='2Level'
        >
          <div className={styles.acrylic} />
          <div className={styles.dropdownContent}>
            {hasTopBar && (
              <div className={styles.topBar}>
                {(headline || headlineHint) && (
                  <div className={styles.headlineWrapper}>
                    {headline}
                    {headlineHint}
                  </div>
                )}
                {search}
              </div>
            )}
            {hasTopBar && headerDivider && <Divider className={styles.dividerWrapper} />}
            <DropdownBody state={state} contentClassName={contentClassName}>
              {content}
            </DropdownBody>
            {footer && footerDivider && <Divider className={styles.dividerWrapper} />}
            {footer && <div className={styles.bottomBar}>{footer}</div>}
          </div>
        </div>
      }
      trigger={trigger}
      triggerRef={triggerRef}
      hasArrow={false}
      widthStrategy={widthStrategy}
      triggerClassName={cn(styles.defaultTriggerClassName, triggerClassName)}
      {...excludeSupportProps(rest)}
    >
      {children}
    </PopoverPrivate>
  );
}
