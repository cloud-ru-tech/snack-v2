import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button, VIEW } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps, Item } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import { quotaLocale } from '@ds/uikit-product-quota';
import { useDynamicList } from '@ds/utils';
import cn from 'classnames';
import { MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';

import { BUTTON_TYPE, TEST_IDS } from '../../constants';
import { actionsLocale } from '../../locale';
import styles from '../../shared/styles.module.scss';
import { ActionsProps } from '../../types';
import { disableItems, getActionKey, hasVisibleActions } from '../../utils';
import { ActionView } from '../ActionView';
import { QuotaModal } from '../QuotaModal';

/** Узкий тип action'а-кнопки внутри droplist'а: читаем только используемые слоты. */
type SimpleButtonAction = {
  label?: string;
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  loading?: boolean;
  'data-test-id'?: string;
  onClick?(event: MouseEvent<HTMLElement>): void;
};

export function OverflowActions({
  items,
  maxVisibleItems,
  className,
  groupDividers = true,
  moreButtonProps,
  'data-test-id': testId,
}: ActionsProps) {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);
  const actionKeys = useMemo(() => new Map(items.map((item, index) => [item, getActionKey(item, index)])), [items]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openQuotaKey, setOpenQuotaKey] = useState<string>();
  const activeAction =
    openQuotaKey === undefined ? undefined : items.find((item, index) => getActionKey(item, index) === openQuotaKey);
  const openQuota = activeAction?.variant === BUTTON_TYPE.Quota ? activeAction : undefined;
  const availableItems = useMemo(() => items.filter(item => !item.hidden), [items]);
  const { visibleItems, hiddenItems } = useDynamicList({
    parentContainerRef: containerRef,
    items: availableItems,
    maxVisibleItems,
  });

  const { t } = actionsLocale.useTranslations();
  const { t: tQuota } = quotaLocale.useTranslations();

  const handleQuotaClose = () => setOpenQuotaKey(undefined);

  if (!hasVisibleActions(items)) {
    return null;
  }

  const overflowItems = hiddenItems.concat(visibleItems.filter(action => action.variant === BUTTON_TYPE.Kebab));
  const visibleActions = visibleItems.filter(action => action.variant !== BUTTON_TYPE.Kebab);

  const droplistItems = overflowItems.reduce<Item[]>((acc, action) => {
    if (action.variant === 'custom') {
      const { asListItem } = action.render();
      acc.push({
        ...asListItem,
        onClick: (event: MouseEvent<HTMLElement>) => {
          setIsOpen(false);
          if ('onClick' in asListItem) asListItem.onClick?.(event);
        },
      });
      return acc;
    }
    switch (action.variant) {
      case BUTTON_TYPE.Tonal:
      case BUTTON_TYPE.Simple:
      case BUTTON_TYPE.Outline:
      case BUTTON_TYPE.Function:
      case BUTTON_TYPE.Filled:
      case undefined: {
        const simpleAction = action as SimpleButtonAction;

        acc.push({
          content: { label: simpleAction.label ?? '' },
          'data-test-id': simpleAction['data-test-id'],
          onClick: event => {
            setIsOpen(false);
            simpleAction.onClick?.(event);
          },
          disabled: simpleAction.disabled || simpleAction.loading,
          beforeContent: simpleAction.icon,
          itemWrapRender: item => {
            const node =
              simpleAction.href && !simpleAction.disabled && !simpleAction.loading ? (
                <a
                  href={simpleAction.href}
                  target={simpleAction.target}
                  rel={simpleAction.target === '_blank' ? 'noopener noreferrer' : simpleAction.rel}
                >
                  {item}
                </a>
              ) : (
                item
              );

            return action.tooltip ? <Tooltip {...action.tooltip}>{node}</Tooltip> : node;
          },
        });
        break;
      }
      case BUTTON_TYPE.Quota: {
        acc.push({
          content: { label: action.buttonProps?.label ?? tQuota('quotas') },
          disabled: action.buttonProps?.disabled,
          onClick: () => {
            setIsOpen(false);
            setOpenQuotaKey(actionKeys.get(action));
            action.onWidgetOpen?.();
          },
        });
        break;
      }
      case BUTTON_TYPE.Droplist:
      case BUTTON_TYPE.Kebab: {
        const needDivider = Boolean(action.variant === BUTTON_TYPE.Droplist && action.button?.label) || acc.length > 0;

        acc.push({
          type: 'group',
          label: action.variant === BUTTON_TYPE.Droplist ? action.button?.label : undefined,
          divider: groupDividers && needDivider,
          items: (action.button?.disabled || action.button?.loading
            ? disableItems(action.list.items)
            : action.list.items
          ).map(item => ({
            ...item,
            onClick: event => {
              setIsOpen(false);
              (item as { onClick?(e: MouseEvent<HTMLElement>): void }).onClick?.(event);
            },
          })),
        });
        break;
      }
      case BUTTON_TYPE.Dropdown: {
        // Dropdown-вариант — ButtonDropdown (droplist по items): разворачиваем items в группу, как Droplist/Kebab.
        acc.push({
          type: 'group',
          label: action.label,
          divider: groupDividers && acc.length > 0,
          items: (action.disabled || action.loading ? disableItems(action.items) : action.items).map(item => ({
            ...item,
            onClick: event => {
              setIsOpen(false);
              (item as { onClick?(e: MouseEvent<HTMLElement>): void }).onClick?.(event);
            },
          })),
        });
        break;
      }
      default: {
        break;
      }
    }

    return acc;
  }, []) satisfies DroplistProps['items'];

  return (
    <div
      className={cn(styles.overflowActionsWrapper, className)}
      ref={containerRef}
      data-mobile={mobile || undefined}
      data-test-id={testId ?? TEST_IDS.root}
    >
      {openQuota && <QuotaModal quota={openQuota} onClose={handleQuotaClose} />}

      {[...visibleActions].reverse().map(action => (
        <div key={actionKeys.get(action)} className={styles.actionCell}>
          <ActionView
            {...action}
            commonProps={{
              className: styles.button,
              size: mobile ? 'm' : undefined,
              fullWidth: mobile,
            }}
          />
        </div>
      ))}
      {droplistItems.length > 0 && (
        <Droplist size='m' open={isOpen} onOpenChange={setIsOpen} items={droplistItems}>
          <Button
            className={styles.button}
            view={VIEW.Outline}
            appearance='neutral'
            icon={<KebabSVG />}
            aria-label={t('more')}
            size='m'
            {...moreButtonProps}
            data-test-id={moreButtonProps?.['data-test-id'] ?? TEST_IDS.trigger}
          />
        </Droplist>
      )}
    </div>
  );
}
