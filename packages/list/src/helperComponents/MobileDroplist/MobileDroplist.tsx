import { BottomSheet } from '@ds/bottom-sheet';
import { usePortalContext } from '@ds/portal-context';
import { useValueControl } from '@ds/utils';
import { cloneElement, isValidElement, MouseEvent, useMemo, useRef, useState } from 'react';

import { ItemId, NextListItem } from '../../components/Items';
import { OnChangeHandler } from '../../components/Lists/contexts';
import { List } from '../../components/Lists/List';
import { BaseDroplistProps, MobileDroplistProps } from '../../components/Lists/types';
import { TEST_IDS } from '../../constants';
import styles from './MobileDroplist.module.scss';
import { buildLevelItems, nextListOption } from './utils';

/**
 * Mobile-вариант `Droplist`: рендерит `List` (size `l`) внутри `BottomSheet` из `@ds/bottom-sheet`.
 * Триггер (`children`) клонируется для открытия sheet'а по клику/Enter/Space. `next-list`-айтемы на mobile
 * не открывают вложенный popover, а навигируют внутри sheet'а (drill-down): клик уводит на уровень
 * вложенного списка, в шапке появляется его заголовок и кнопка «назад». Internal — наружу не реэкспортится;
 * рендерится адаптивным `Droplist` на `layoutType='mobile'`.
 */
export function MobileDroplist({
  items,
  selection,
  open: openProp,
  onOpenChange,
  children,
  search,
  label,
  actionButton,
  slotAfterHeadline,
  onBackButtonClick,
  virtualized,
  closeDroplistOnItemClick,
  scroll,
  container,
  closeOnPopstate,
  // `header` / `footer` + `headerDivider` / `footerDivider` НЕ деструктурируем — они уходят в `...rest`
  // на корневой `List` (он рендерит шапку/футер и их divider'ы). В отличие от desktop'а, где их
  // рисует контейнер-popover, в sheet'е это делает сам список — иначе footerDivider некуда применить.
  ...rest
}: MobileDroplistProps) {
  const portalContext = usePortalContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open = false, setIsOpen] = useValueControl({ value: openProp, onChange: onOpenChange });

  // Стек заходов во вложенные next-list'ы. Пустой — корневой уровень.
  const [path, setPath] = useState<NextListItem[]>([]);

  const handleClose = () => {
    setIsOpen(false);
    setPath([]);
  };

  const handleSelectionChange: OnChangeHandler<ItemId | ItemId[]> = value => {
    if (selection?.mode !== 'multiple' && closeDroplistOnItemClick) {
      handleClose();
    }

    if (selection?.mode === 'multiple' && Array.isArray(value)) {
      selection.onChange?.(value);
      return;
    }

    if (selection?.mode !== 'multiple' && !Array.isArray(value)) {
      selection?.onChange?.(value);
    }
  };

  let listSelection: BaseDroplistProps['selection'];

  if (selection) {
    listSelection = { ...selection, onChange: handleSelectionChange };
  }

  const closeOnClick = Boolean(closeDroplistOnItemClick && !selection);

  const trigger = useMemo(() => {
    const handleOpen = () => setIsOpen(true);

    if (isValidElement(children)) {
      return cloneElement(children, {
        onClick: (event: MouseEvent<HTMLElement>) => {
          children.props.onClick?.(event);
          handleOpen();
        },
      } as Partial<typeof children.props>);
    }

    if (typeof children === 'function') {
      const element = children({
        onKeyDown: event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpen();
          }
        },
      });

      if (isValidElement(element)) {
        return cloneElement(element, {
          onClick: (event: MouseEvent<HTMLElement>) => {
            element.props.onClick?.(event);
            handleOpen();
          },
        } as Partial<typeof element.props>);
      }

      return element;
    }

    return (
      <span
        role='button'
        tabIndex={0}
        data-test-id={TEST_IDS.mobileDroplistTrigger}
        onClick={handleOpen}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpen();
          }
        }}
      >
        {children}
      </span>
    );
  }, [children, setIsOpen]);

  const containerRef = portalContext.current ?? undefined;

  // Каскад sheet'ов: корень + по одному sheet'у на каждый заход в next-list. Каждый накладывается
  // поверх предыдущего (свой backdrop), а не заменяет его содержимое. Назад — закрывает верхний.
  const sheets = [{ source: items, title: label, item: undefined as NextListItem | undefined }].concat(
    path.map(item => ({ source: item.items, title: nextListOption(item), item })),
  );

  return (
    <>
      {trigger}
      {sheets.map(({ source, title, item }, levelIndex) => {
        const isRoot = levelIndex === 0;
        // На этом уровне видны только его айтемы; next-list уводит на следующий уровень каскада.
        const levelItems = buildLevelItems(
          source,
          next => setPath(prev => [...prev.slice(0, levelIndex), next]),
          handleClose,
          closeOnClick,
        );
        // Поиск/виртуализация/footer/actions — только на корне; sublists всегда статичны по контенту.
        const searchable = isRoot && Boolean(search);
        const expanded = searchable || (isRoot && virtualized);

        const scrollable = isRoot && (virtualized || scroll);

        const content = (
          <div
            className={styles.listWrapper}
            data-test-id={isRoot ? TEST_IDS.mobileDroplistRoot : undefined}
            data-fill={scrollable || undefined}
          >
            <List
              items={levelItems}
              selection={listSelection}
              size='l'
              search={searchable ? search : undefined}
              loading={isRoot ? undefined : item?.loading}
              dataError={isRoot ? undefined : item?.dataError}
              dataFiltered={isRoot ? undefined : item?.dataFiltered}
              noDataState={rest.noDataState}
              noResultsState={rest.noResultsState}
              errorDataState={rest.errorDataState}
              {...(isRoot ? rest : null)}
              // Контролируемые scroll-пропсы — ПОСЛЕ `...rest`, чтобы их не перебило значениями с
              // десктопа. В sheet'е список заполняет body и скроллится внутри себя (`sheetScroll`,
              // height:100%); фиксированный desktop-cap `limitedScrollHeight` (max-height 384px) не
              // используем — иначе на full-height sheet под капнутым списком зияет пустота.
              scrollRef={scrollable ? scrollRef : undefined}
              scroll={scrollable || undefined}
              virtualized={isRoot && virtualized}
              limitedScrollHeight={false}
              scrollContainerClassName={scrollable ? styles.sheetScroll : undefined}
            />
          </div>
        );

        // Уход с уровня вверх по стеку (для глубже-корня sheet'ов).
        const popLevel = () => setPath(prev => prev.slice(0, levelIndex - 1));
        // «Назад»: на корне — `onBackButtonClick` (или закрытие при `label`); глубже — снять верхний sheet.
        const handleBack = isRoot ? (onBackButtonClick ?? (label ? handleClose : undefined)) : popLevel;

        return (
          <BottomSheet
            key={isRoot ? 'root' : String(item?.id ?? levelIndex)}
            // Потребительский `container` (portal-override) приоритетнее `PortalContext` — как на desktop.
            container={container?.current ?? containerRef}
            open={isRoot ? open : true}
            // Dismiss (backdrop / swipe / Esc): на корне — закрыть весь droplist; глубже — вернуться на уровень вверх,
            // как ждёт пользователь на mobile (а не закрывать всю цепочку разом).
            onClose={isRoot ? handleClose : popLevel}
            title={title}
            onBackButtonClick={handleBack}
            actionButton={isRoot ? actionButton : undefined}
            slotAfterHeadline={isRoot ? slotAfterHeadline : undefined}
            content={content}
            snapPoints={expanded ? [1] : undefined}
            withDividers={false}
            closeOnPopstate={closeOnPopstate ?? true}
          />
        );
      })}
    </>
  );
}
