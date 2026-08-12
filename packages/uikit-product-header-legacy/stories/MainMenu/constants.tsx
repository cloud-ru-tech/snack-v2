export { TEST_IDS } from '../../src/components/MainMenu/constants';

export { ADMINISTRATIVE_SECTION, PLATFORM_GROUPS, SERVICE_GROUPS } from './demoData';

export {
  DEFAULT_PLATFORM_OPTION,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  PLATFORM_GROUP,
} from './helperComponents/PlatformSelector/demoData';

export {
  DEFAULT_PROJECT_OPTION,
  PROJECT_DESCRIPTION,
  PROJECT_OPTIONS_BY_ID,
  PROJECT_SELECTOR_ITEMS,
} from './helperComponents/PlatformSelector/projectDemoData';

export const PLATFORM_SELECTOR_DEMO = {
  description: 'Облачные платформы',
  label: 'Evolution',
} as const;

export const REFERRAL_BANNER_DEMO = {
  title: 'Реферальная программа',
  description: 'Зарабатывайте до 20% на рекомендациях сервисов Cloud.ru',
  promoBadge: '20%',
  href: '#',
} as const;

export const MARKETPLACE_BANNER_DEMO = {
  title: 'Маркетплейс',
  description: 'Для разработки, анализа данных и других задач.',
  href: '#',
} as const;

export const NEW_NAVIGATION_BANNER_DEMO = {
  title: 'Новая навигация',
  description: 'Обновили структуру меню и взаимодействие с разделами',
  actionLabel: 'Переключиться',
} as const;
