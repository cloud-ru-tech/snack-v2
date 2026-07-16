import { GroupSelectItemProps } from '@ds/list';

import { tableLocale } from '../../../../../locale';
import { sortColumnDefinitions } from '../../../utils';
import { PinnedGroupsState } from '../../../utils/getPinnedGroups';
import { createColumnsSettingsOption, isColumnsSettingsMenuItem } from './createColumnsSettingsOption';

type PrepareColumnsSettingsProps<TData extends object> = {
  pinnedGroups: PinnedGroupsState<TData>;
  columnOrder: string[];
  areAllColumnsEnabled: boolean;
  t: ReturnType<typeof tableLocale.useTranslations>['t'];
};

/**
 * Отвечает за создание списка колонок в настройках с учётом порядка и всех групп.
 * Неактивные колонки (`mode: locked` / без `columnSettings`) — disabled + checked.
 */
export function prepareColumnsSettings<TData extends object>({
  pinnedGroups,
  columnOrder,
  areAllColumnsEnabled,
  t,
}: PrepareColumnsSettingsProps<TData>): [GroupSelectItemProps] {
  const createGroupOptions = (group: (typeof pinnedGroups)['left']) =>
    group.filter(isColumnsSettingsMenuItem).sort(sortColumnDefinitions(columnOrder)).map(createColumnsSettingsOption);

  return [
    {
      divider: false,
      items: [
        {
          divider: false,
          items: createGroupOptions(pinnedGroups.left),
          type: 'group',
        },
        {
          divider: true,
          items: createGroupOptions(pinnedGroups.unpinned),
          type: 'group',
        },
        {
          divider: true,
          items: createGroupOptions(pinnedGroups.right),
          type: 'group',
        },
      ],
      selectButtonLabel: areAllColumnsEnabled ? t('groupSelectButton.hide') : t('groupSelectButton.show'),
      label: t('settingsHeaderLabel'),
      type: 'group-select',
    },
  ];
}
