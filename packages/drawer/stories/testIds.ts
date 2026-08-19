// Stories-level test-id'ы для пакета `@ds/drawer`.
//
// Объединяет публичные id из `src/constants.ts::TEST_IDS` (что компонент
// сам ставит на свои слоты — closeButton, header, title, body, footer,
// image, tooltip, subtitle, nestedDrawer, overlay, contentWrapper) и
// stories-level id (триггеры открытия / VisualMatrix-кнопки).
//
// Stories и `__test__/Drawer/helpers.ts` импортируют единый объект отсюда.

import { TEST_IDS as PUBLIC_TEST_IDS } from '../src/constants';

export const TEST_IDS = {
  ...PUBLIC_TEST_IDS,
  drawer: {
    root: 'drawer',
    triggerOpen: 'drawer-trigger',
    placementTrigger: {
      left: 'drawer-trigger-left',
      right: 'drawer-trigger-right',
      top: 'drawer-trigger-top',
      bottom: 'drawer-trigger-bottom',
    },
    nestedTrigger: 'drawer-nested-trigger',
    /** Modal → Drawer: скролл тела дровера поверх открытой модалки. */
    inModal: {
      modal: { root: 'drawer-in-modal-modal', triggerOpen: 'drawer-in-modal-modal-trigger' },
      drawer: { root: 'drawer-in-modal-drawer', triggerOpen: 'drawer-in-modal-drawer-trigger' },
    },
    /** Корень родительского Drawer в NestedDrawer-сценарии. */
    parent: 'drawer-parent',
    parentState: 'drawer-parent-state',
  },
  drawerCustom: {
    root: 'drawer-custom',
    triggerOpen: 'drawer-custom-trigger',
  },
  drawerVm: {
    trigger: (key: string) => `drawer-vm-${key}`,
    dismiss: 'drawer-vm-dismiss',
  },
} as const;
