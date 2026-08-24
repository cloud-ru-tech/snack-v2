import { defineLocale, defineMessages } from '@ds/locale';

const HEADER_MESSAGES = defineMessages({
  'en-GB': {
    searchByServices: 'Search by services and their sections',
    services: 'Services',
    user: 'User',
    logout: 'Log out',
    noData: 'No data',
    noDataFound: 'Nothing found',
    dragGroup: 'Drag group',
    themeModeLabel: 'Theme',
    themeModeLight: 'Light',
    themeModeDark: 'Dark',
    themeModeSystem: 'System',
    contentExpandAllGroups: 'Expand all groups',
    contentCollapseAllGroups: 'Collapse all groups',
    favorite: {
      title: 'Favorites',
      emptyDesktop: 'Drag service cards here from the panel on the right',
      emptyMobile: 'Click the star on the service card to add it here',
    },
    recent: {
      title: 'Recent',
      empty: 'Services you have recently opened will appear here',
    },
    close: 'Close',
    menuSettingsTitle: 'Menu settings',
    menuSettingsShowGroupsColors: 'Show category colors',
    menuSettingsShowDescription: 'Show service descriptions',
  },
  'ru-RU': {
    searchByServices: 'Поиск по сервисам и их разделам',
    services: 'Сервисы',
    user: 'Пользователь',
    logout: 'Выйти',
    noData: 'Нет данных',
    noDataFound: 'Ничего не найдено',
    dragGroup: 'Перетащить группу',
    themeModeLabel: 'Тема',
    themeModeLight: 'Светлая',
    themeModeDark: 'Тёмная',
    themeModeSystem: 'Системная',
    contentExpandAllGroups: 'Развернуть все группы',
    contentCollapseAllGroups: 'Свернуть все группы',
    favorite: {
      title: 'Избранное',
      emptyDesktop: 'Перетащите сюда\nкарточки сервисов,\nрасположенные справа',
      emptyMobile: 'Нажмите звездочку на карточке сервиса, чтобы добавить его сюда',
    },
    recent: {
      title: 'Недавнее',
      empty: 'Здесь появятся сервисы,\nкоторое вы недавно\nоткрывали',
    },
    close: 'Закрыть',
    menuSettingsTitle: 'Настройки меню',
    menuSettingsShowGroupsColors: 'Показывать цвета категорий',
    menuSettingsShowDescription: 'Показывать описания сервисов',
  },
});

export type HeaderMessages = (typeof HEADER_MESSAGES)['en-GB'];

export const headerLocale = defineLocale('@ds/uikit-product-header', HEADER_MESSAGES);
