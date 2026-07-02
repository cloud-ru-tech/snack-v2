import { APPEARANCE, Button, VIEW } from '@ds/button';
import { ProductIcons } from '@ds/icons';
import { List, ListProps } from '@ds/list';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { TEST_IDS } from '../../constants';
import { SearchContextProvider } from './contexts';
import { useItemsContent, useTopPinnedContent } from './hooks/useItemsCreator';
import { useSearchFilter } from './hooks/useSearchFilter';
import styles from './styles.module.scss';
import { Documentation, HeaderProps, SidebarItem } from './types';

export type PageSidebarProps = WithSupportProps<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChanged?(open: boolean): void;
  items: SidebarItem[];
  footerItems?: SidebarItem[];
  header?: HeaderProps;
  selected?: string | number;
  onSelect?(id: string | number): void;
  className?: string;
  /** Зарезервировано, в текущей реализации не используется. */
  documentation?: Documentation;
  /** Зарезервировано, в текущей реализации не используется. */
  pageContainerId?: string;
  hasSearch?: boolean;
  collapse?: ListProps['collapse'];
}>;

function PrivateSideBar({
  open: openProp,
  defaultOpen,
  onOpenChanged,
  className,
  items,
  footerItems = [],
  header,
  selected,
  onSelect,
  hasSearch,
  collapse,
  // documentation / pageContainerId — зарезервированы, в текущей реализации не используются.
  // Деструктурируем, чтобы не попадали в otherProps и не ломали extractSupportProps.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  documentation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageContainerId,
  ...otherProps
}: PageSidebarProps) {
  const [open, setOpenState] = useUncontrolledProp(openProp, defaultOpen || true, onOpenChanged);
  const [hoverOff, setHoverOff] = useState(false);

  const toggleOpen = useCallback(
    (newValue: boolean = !open) => {
      if (newValue === open) {
        return;
      }

      if (!newValue) {
        /* кнопка сворачивания внутри сайдбара, а он раскрывается по ховеру — после клика
        на время отключаем ховер, чтобы дать ему свернуться */
        setHoverOff(true);
        setTimeout(() => setHoverOff(false), 300);
      }

      setOpenState(newValue);
    },
    [open, setOpenState],
  );

  const { filteredList, searchValue, searchCollapseState } = useSearchFilter(items);
  const list = useItemsContent(filteredList, onSelect);
  const footerList = useItemsContent(footerItems);
  const { pinTop } = useTopPinnedContent(header, hasSearch);

  return (
    <div
      {...extractSupportProps(otherProps)}
      data-collapsed={!open || undefined}
      className={cn(styles.wrapper, className)}
    >
      {!open && (
        <Button
          view={VIEW.Elevated}
          appearance={APPEARANCE.Neutral}
          className={styles.expandButton}
          data-test-id={TEST_IDS.sidebarToggle.expand}
          icon={<ProductIcons.VerticalMenuOpenSVG />}
          onClick={() => toggleOpen(true)}
        />
      )}

      <div
        data-collapsed={!open || undefined}
        data-hover-off={hoverOff || undefined}
        data-has-search={hasSearch || undefined}
        className={styles.body}
      >
        <div className={styles.content} data-collapsed={!open || undefined}>
          <div className={styles.list}>
            <List
              selection={{ mode: 'single', value: selected }}
              size='m'
              items={list}
              pinTop={pinTop}
              pinBottom={footerList}
              scroll
              scrollToSelectedItem
              collapse={searchValue ? searchCollapseState : collapse}
              // Пустой список при активном поиске — это «ничего не найдено» (noResultsState),
              // а не «нет данных» (noDataState). Флаг переключает empty-state в @ds/list.
              dataFiltered={Boolean(searchValue)}
              barHideStrategy='leave'
            />
          </div>
          {open && (
            <div className={styles.toggler}>
              <Button
                view={VIEW.Elevated}
                appearance={APPEARANCE.Neutral}
                icon={<ProductIcons.VerticalMenuCloseSVG />}
                className={styles.button}
                data-test-id={TEST_IDS.sidebarToggle.collapse}
                onClick={() => toggleOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PageSidebar(props: PageSidebarProps) {
  return (
    <SearchContextProvider>
      <PrivateSideBar {...props} />
    </SearchContextProvider>
  );
}
