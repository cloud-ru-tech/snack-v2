import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { Button, VIEW } from '@ds/button';
import { KebabSVG } from '@ds/icons/interface/system';
import { Droplist, DroplistProps, Item } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import { quotaLocale, QuotaWidget } from '@ds/uikit-product-quota';
import { useDynamicList } from '@ds/utils';
import { MouseEvent, ReactNode, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { ActionView } from './ActionView';
import { BUTTON_TYPE } from './constants';
import styles from './styles.module.scss';
import { ActionsProps } from './types';
import { hasVisibleActions } from './utils';

/** Узкий тип action'а-кнопки внутри droplist'а: читаем только используемые слоты. */
type SimpleButtonAction = {
  label?: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?(event: MouseEvent<HTMLElement>): void;
};

function MobileActionsBase({ items, maxVisibleItems }: ActionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const { visibleItems, hiddenItems } = useDynamicList({ parentContainerRef: containerRef, items, maxVisibleItems });

  const { t: tQuota } = quotaLocale.useTranslations();

  if (!hasVisibleActions(items)) {
    return null;
  }

  const hiddenItemsWithKebab = hiddenItems.concat(visibleItems.filter(item => item.variant === BUTTON_TYPE.Kebab));
  const visibleItemsWithoutKebab = visibleItems.filter(item => item.variant !== BUTTON_TYPE.Kebab);

  const droplistItems = hiddenItemsWithKebab.reduce<Item[]>((acc, action) => {
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
          onClick: event => {
            setIsOpen(false);
            simpleAction.onClick?.(event);
          },
          beforeContent: simpleAction.icon,
          itemWrapRender: item => {
            const node =
              simpleAction.href && !simpleAction.disabled ? (
                <a href={simpleAction.href} target='_blank' rel='noreferrer'>
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
        // QuotaWidget самодостаточен (свой триггер + dropdown) — рендерим инлайн как inactive-айтем.
        const quotaWidget = <QuotaWidget {...action} buttonProps={{ size: 'm', fullWidth: true }} />;

        acc.push({
          type: 'group',
          label: tQuota('quotas'),
          divider: acc.length > 0,
          items: [
            {
              inactive: true,
              content: action.tooltip ? <Tooltip {...action.tooltip}>{quotaWidget}</Tooltip> : quotaWidget,
            },
          ],
        });
        break;
      }
      case BUTTON_TYPE.Droplist:
      case BUTTON_TYPE.Kebab: {
        const needDivider = Boolean(action.variant === BUTTON_TYPE.Droplist && action.button?.label) || acc.length > 0;

        acc.push({
          type: 'group',
          label: action.variant === BUTTON_TYPE.Droplist ? action.button?.label : undefined,
          divider: needDivider,
          items: action.list.items.map(item => ({
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
          divider: acc.length > 0,
          items: action.items.map(item => ({
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
    <div className={styles.mobileActionsWrapper} ref={containerRef} data-test-id={TEST_IDS.mobileActions.root}>
      {droplistItems.length > 0 && (
        <Droplist size='m' open={isOpen} onOpenChange={setIsOpen} items={droplistItems}>
          <Button
            className={styles.button}
            view={VIEW.Outline}
            appearance='neutral'
            icon={<KebabSVG />}
            size='m'
            data-test-id={TEST_IDS.mobileActions.trigger}
          />
        </Droplist>
      )}

      {visibleItemsWithoutKebab.map((action, index) => (
        <ActionView
          {...action}
          key={index}
          commonProps={{
            className: styles.button,
            size: 'm',
            fullWidth: true,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Мобильная панель действий. Форсирует `mobile`-раскладку через `withLayoutType`, чтобы вложенные
 * адаптивные `@ds`-примитивы (`ButtonDropdown`/`ButtonKebab`/`ButtonDroplist`) рендерили
 * bottom-sheet даже под desktop-провайдером.
 */
export const MobileActions = withLayoutType(MobileActionsBase, LAYOUT_TYPE.Mobile);
