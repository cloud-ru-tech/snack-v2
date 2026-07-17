import { ChevronLeftSVG } from '@ds/icons/interface/system';
import { ITEM_TYPE, ItemProps } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import cn from 'classnames';
import { MouseEvent, ReactNode, useMemo } from 'react';

import { SIDEBAR_HEADER_TYPE, SIDEBAR_ITEM_TYPE } from '../../../constants';
import { pageLayoutLocale } from '../../../locale';
import { useSearchContext } from '../contexts';
import { SidebarSearch } from '../helperComponents/SidebarSearch';
import { SidebarSearchToggle } from '../helperComponents/SidebarSearchToggle';
import { SidebarTitle } from '../helperComponents/SidebarTitle';
import styles from '../styles.module.scss';
import { HeaderProps, SidebarItem } from '../types';

const EMPTY_LIST: ItemProps[] = [];

export function useTopPinnedContent(
  header?: HeaderProps,
  hasSearch?: boolean,
): { title?: ReactNode; pinTop: ItemProps[] } {
  const { t } = pageLayoutLocale.useTranslations();
  const { searchOpened } = useSearchContext();

  return useMemo(() => {
    switch (header?.type) {
      case SIDEBAR_HEADER_TYPE.Title:
        return {
          pinTop: [
            {
              // Кнопка поиска живёт в `content` рядом с заголовком/полем, а не в `afterContent`:
              // отдельный слот `afterContent` центрируется по-своему и ломает вертикальное
              // выравнивание кнопки с полем.
              content: (
                <div
                  className={cn(styles.pinnedHeaderSlot, hasSearch && searchOpened && styles.pinnedHeaderSlotSearch)}
                >
                  <div className={styles.pinnedHeaderContent}>
                    {
                      // При открытом поиске строка заголовка заменяется полем поиска (без наложения).
                      hasSearch && searchOpened ? (
                        <SidebarSearch />
                      ) : (
                        <SidebarTitle title={header.label} icon={header.icon} afterContent={header.afterContent} />
                      )
                    }
                  </div>
                  {hasSearch && <SidebarSearchToggle />}
                </div>
              ),
              inactive: true,
            },
          ],
        };
      case SIDEBAR_HEADER_TYPE.Back:
        return {
          pinTop: [
            {
              content: { option: `${t('PageSidebar.backTo')} ${header.label}` },
              beforeContent: <ChevronLeftSVG />,
              onClick: header.href ? undefined : header.onClick,
              itemWrapRender: header.href
                ? item => (
                    <a href={header.href} onClick={header.onClick}>
                      {item}
                    </a>
                  )
                : undefined,
            },
          ],
        };
      default:
        return { pinTop: EMPTY_LIST };
    }
  }, [header, t, hasSearch, searchOpened]);
}

export function useItemsContent(items: SidebarItem[], onSelect?: (id: string | number) => void): ItemProps[] {
  return useMemo(() => {
    const getItemsContent = (items: SidebarItem[], onSelect?: (id: string | number) => void) =>
      items.map(
        ({
          id,
          label,
          beforeContent,
          onClick,
          afterContent,
          disabledReason,
          disabledReasonPlacement,
          ...rest
        }): ItemProps => {
          const href = 'href' in rest ? rest.href : undefined;
          const newItems = 'items' in rest ? rest.items : undefined;
          const type = 'type' in rest ? rest.type : undefined;

          const clickHandler = (event: MouseEvent<HTMLElement>) => {
            if (href && (event?.metaKey || event?.button === 1)) {
              return;
            }

            event.preventDefault();
            onClick?.(event);
            onSelect?.(id);
          };

          if (type === SIDEBAR_ITEM_TYPE.Group) {
            return {
              ...rest,
              label,
              type: ITEM_TYPE.Group,
              items: getItemsContent(newItems || [], onSelect),
            };
          }

          const newItem = {
            id,
            content: { option: label },
            itemWrapRender: (item: ReactNode) => {
              if (!disabledReason) {
                return href ? (
                  <a href={href} onClick={clickHandler}>
                    {item}
                  </a>
                ) : (
                  item
                );
              }

              return (
                <Tooltip
                  hoverDelayOpen={500}
                  open={disabledReason ? undefined : false}
                  tip={disabledReason}
                  placement={disabledReasonPlacement}
                >
                  {item}
                </Tooltip>
              );
            },

            onClick: href ? undefined : clickHandler,
            beforeContent,
            afterContent,
            disabled: Boolean(disabledReason),
          };

          if (newItems?.length) {
            return {
              ...newItem,
              type: ITEM_TYPE.Collapse,
              items: getItemsContent(newItems || [], onSelect),
            };
          }

          return newItem;
        },
      );

    return getItemsContent(items, onSelect);
  }, [items, onSelect]);
}
