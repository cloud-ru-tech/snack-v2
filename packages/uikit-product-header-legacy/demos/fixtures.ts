import { ADMINISTRATIVE_SECTION, SERVICE_GROUPS } from '../stories/MainMenu/demoData';
import {
  DEFAULT_PLATFORM_OPTION,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
} from '../stories/MainMenu/helperComponents/PlatformSelector/demoData';
import {
  DEFAULT_PROJECT_OPTION,
  PROJECT_DESCRIPTION,
  PROJECT_OPTIONS_BY_ID,
  PROJECT_SELECTOR_ITEMS,
} from '../stories/MainMenu/helperComponents/PlatformSelector/projectDemoData';

export {
  DEFAULT_PLATFORM_OPTION,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  DEFAULT_PROJECT_OPTION,
  PROJECT_DESCRIPTION,
  PROJECT_OPTIONS_BY_ID,
  PROJECT_SELECTOR_ITEMS,
  ADMINISTRATIVE_SECTION,
  SERVICE_GROUPS,
};

export const REFERRAL_BANNER = {
  title: 'Реферальная программа',
  description: 'Зарабатывайте до 20% на рекомендациях сервисов Cloud.ru',
  promoBadge: '20%',
} as const;

export const MARKETPLACE_BANNER = {
  title: 'Маркетплейс',
  description: 'Для разработки, анализа данных и других задач.',
} as const;

export const NEW_NAVIGATION_BANNER = {
  title: 'Новая навигация',
  description: 'Обновили структуру меню и взаимодействие с разделами',
  actionLabel: 'Переключиться',
} as const;
