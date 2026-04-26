import { ButtonGroup } from '@ds/button';
import { UpdateSVG } from '@ds/icons';
import { InfoBlock } from '@ds/info-block';
import { Spinner } from '@ds/loader';
import { useLocale } from '@ds/locale';
import { PopoverPrivate, PopoverPrivateProps } from '@ds/popover-private';
import { excludeSupportProps, extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { STATE } from './constants';
import styles from './styles.module.scss';
import { DropdownState } from './types';

export type DropdownProps = WithSupportProps<
  PropsWithChildren<{
    /** Содержимое внутри поповера */
    content: ReactNode;
    /** Состояние */
    state?: DropdownState;
    /** CSS-класс */
    className?: string;
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
    > &
    Partial<Pick<PopoverPrivateProps, 'trigger' | 'placement'>>
>;

function DropdownContent({ state, children }: Pick<DropdownProps, 'children' | 'state'>) {
  const { t } = useLocale('Dropdown');

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
      return children;
  }
}

/**
 * Dropdown компонент
 */
export function Dropdown({
  className,
  children,
  content,
  state,
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

  return (
    <PopoverPrivate
      placement={placement}
      popoverContent={
        <div
          className={cn(styles.root, className)}
          {...extractSupportProps(rest)}
          data-acrylic-appearance='neutral'
          data-acrylic-level='1Level'
        >
          <div className={styles.acrylic} />
          <div className={styles.dropdownContent}>
            <DropdownContent state={state}>{content}</DropdownContent>
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
