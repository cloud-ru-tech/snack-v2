import { ChevronRightSVG, MoreSVG } from '@ds/icons';
import { Droplist, DroplistProps, ItemProps } from '@ds/list';
import { useLocale } from '@ds/locale';
import { usePortalContext } from '@ds/portal-context';
import { Tooltip } from '@ds/tooltip';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import { TEST_IDS, TOOLBAR_ITEM, toolbarButtonTestId } from '../../constants';
import {
  ButtonHeading,
  Buttons,
  ButtonsDivider,
  ButtonsGroup,
  CustomizeTableModal,
  ImageModal,
  LinkModal,
  LinkProps,
  PrivateButton,
  PrivateButtonProps,
  TableSelectSettingsGrid,
} from '../../helperComponents';
import { ToolbarApi } from '../../toolbarApi';
import { ToolbarItemId } from '../../types';
import { BUTTONS, GROUPS } from './constants';
import { useToolbarHotkeys, useToolbarOverflow } from './hooks';
import styles from './styles.module.scss';

type ToolbarProps = {
  /** Бэкенд команд: WYSIWYG (TipTap) в preview-режиме либо markdown-исходник (textarea) в raw-режиме. */
  api: ToolbarApi;
  items: ToolbarItemId[];
};

export function Toolbar({ api, items }: ToolbarProps) {
  const portalContext = usePortalContext();
  const { t } = useLocale('Markdown');

  // Overflow тулбара (сколько кнопок видно, остальные — в «Ещё») вынесен в хук.
  const { rootRef, moreButtonRef, visibleCount } = useToolbarOverflow(items);
  const [moreOpen, setMoreOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [linkInitial, setLinkInitial] = useState<LinkProps | undefined>(undefined);

  const [toolbarItemModal, setToolbarItemModal] = useState<'image' | 'link' | 'table'>();

  // Закрывает оба table-picker'а и открывает модалку настройки размеров.
  const openCustomize = useCallback(() => {
    setTableOpen(false);
    setMoreOpen(false);
    setToolbarItemModal('table');
  }, []);

  const openLink = useCallback(() => {
    setMoreOpen(false);

    // raw-режим: ссылка добавляется как сырой markdown-шаблон прямо в textarea, без модалки.
    if (api.mode === 'raw') {
      api.setLink({});
      return;
    }

    setLinkInitial({
      href: api.getLinkHref(),
      title: api.getLinkTitle(),
    });
    setToolbarItemModal('link');
  }, [api]);

  const openImage = useCallback(() => {
    setMoreOpen(false);
    setToolbarItemModal('image');
  }, []);

  const closeToolbarItemModal = () => {
    setToolbarItemModal(undefined);
    api.focus();
  };

  // Принудительный re-render тулбара на selection/transaction → переключаются checked-стейты кнопок.
  const [, setTick] = useState(0);
  useEffect(() => api.subscribe(() => setTick(n => n + 1)), [api]);

  useToolbarHotkeys({ rootRef, items, api, onLink: openLink, onImage: openImage });

  const toolbarTableItems = useMemo<DroplistProps['items']>(
    () => [
      {
        content: (
          <TableSelectSettingsGrid
            onPick={(rows, cols) => {
              api.insertTable(rows, cols);
              setTableOpen(false);
              setMoreOpen(false);
            }}
          />
        ),
        inactive: true,
      },
      { type: 'group', content: '', divider: true },
      {
        content: {
          option: t('table.customize'),
          className: styles.tableCustomizeOption,
        },
        onClick: openCustomize,
        afterContent: <ChevronRightSVG />,
        'data-test-id': TEST_IDS.tableCustomize,
      },
    ],
    [api, t, openCustomize],
  );

  const renderItem = (id: ToolbarItemId) => {
    const spec = BUTTONS[id];

    if (!spec) {
      return null;
    }

    const name = t(spec.nameKey);

    const commonButtonProps: PrivateButtonProps = {
      id,
      icon: spec.icon,
      'data-test-id': toolbarButtonTestId(id),
      'aria-label': name,
      tip: { title: name, caption: spec.hotkey },
      checked: api.isActive(id),
      onClick: () => api.toggle(id),
    };

    if (id === TOOLBAR_ITEM.Heading) {
      return <ButtonHeading key={id} api={api} />;
    }

    if (id === TOOLBAR_ITEM.Link && spec) {
      commonButtonProps.onClick = openLink;
    }

    if (id === TOOLBAR_ITEM.Image) {
      commonButtonProps.onClick = openImage;
    }

    if (id === TOOLBAR_ITEM.Table && spec) {
      return (
        <Droplist
          size='m'
          container={portalContext}
          key={id}
          open={tableOpen}
          onOpenChange={setTableOpen}
          placement='bottom-start'
          triggerClassName={styles.tooltipTrigger}
          items={toolbarTableItems}
        >
          <PrivateButton key={id} {...commonButtonProps} />
        </Droplist>
      );
    }

    return <PrivateButton key={id} {...commonButtonProps} />;
  };

  // Решаем, какие items видимы, группируем под GROUPS, рисуем дивайдеры между группами.
  const visibleItems = new Set(items.slice(0, visibleCount));
  const overflowItems = items.slice(visibleCount);
  const presentGroups = GROUPS.map(group => group.filter(id => visibleItems.has(id))).filter(g => g.length > 0);

  const handleMoreSelect = (id: ToolbarItemId) => {
    if (id === TOOLBAR_ITEM.Table) {
      // Table-picker открывается вторым уровнем, якорь — More-кнопка (childless Dropdown + triggerRef).
      setTableOpen(true);
      return;
    }

    if (id === TOOLBAR_ITEM.Link) {
      openLink();
    } else if (id === TOOLBAR_ITEM.Image) {
      openImage();
    } else {
      setMoreOpen(false);
      api.toggle(id);
    }
  };

  const handleSubmitCustomizeTable: ToolbarApi['insertTable'] = (rows, cols) => {
    api.insertTable(rows, cols);
    closeToolbarItemModal();
    setMoreOpen(false);
  };

  const handleLinkSubmit: ToolbarApi['setLink'] = linkProps => {
    api.setLink(linkProps);
    closeToolbarItemModal();
  };

  const handleImageSubmit: ToolbarApi['insertImage'] = (url, alt) => {
    api.insertImage(url, alt);
    closeToolbarItemModal();
  };

  // Строки More-списка: иконка + подпись + хоткей справа (caption).
  const moreItems = overflowItems.flatMap((id): ItemProps[] => {
    const spec = BUTTONS[id];

    if (!spec) return [];

    const base = {
      id,
      beforeContent: spec?.icon,
      content: { option: t(spec.nameKey), caption: spec.hotkey },
      onClick: () => handleMoreSelect(id),
      'data-test-id': toolbarButtonTestId(id),
    };

    if (id === TOOLBAR_ITEM.Table) {
      return [
        {
          ...base,
          type: 'next-list',
          items: toolbarTableItems,
        },
      ];
    }

    return [
      {
        ...base,
        beforeContent: spec.icon,
        content: { option: t(spec.nameKey), caption: spec.hotkey },
        checked: api.isActive(id),
      },
    ];
  });

  return (
    <div ref={rootRef} className={styles.root}>
      <Buttons>
        {presentGroups.map((group, gi) => (
          <Fragment key={`g-${gi}`}>
            {gi > 0 && <ButtonsDivider />}
            <ButtonsGroup>{group.map(renderItem)}</ButtonsGroup>
          </Fragment>
        ))}

        {overflowItems.length > 0 && (
          <>
            <ButtonsDivider />

            <Droplist
              size='m'
              container={portalContext}
              open={moreOpen}
              onOpenChange={setMoreOpen}
              placement='bottom-end'
              marker={false}
              items={moreItems}
              triggerElemRef={moreButtonRef}
              triggerClassName={styles.tooltipTrigger}
              data-test-id={TEST_IDS.toolbarMoreList}
            >
              <Tooltip tip={t('toolbar.more')} triggerClassName={styles.tooltipTrigger}>
                <PrivateButton
                  icon={<MoreSVG />}
                  data-test-id={TEST_IDS.toolbarMore}
                  aria-label={t('toolbar.more')}
                  aria-haspopup='menu'
                  aria-expanded={moreOpen}
                />
              </Tooltip>
            </Droplist>
          </>
        )}
      </Buttons>

      <CustomizeTableModal
        open={toolbarItemModal === 'table'}
        onClose={closeToolbarItemModal}
        onSubmit={handleSubmitCustomizeTable}
      />

      <LinkModal
        open={toolbarItemModal === 'link'}
        initial={linkInitial}
        onClose={closeToolbarItemModal}
        onSubmit={handleLinkSubmit}
      />

      <ImageModal open={toolbarItemModal === 'image'} onClose={closeToolbarItemModal} onSubmit={handleImageSubmit} />
    </div>
  );
}
