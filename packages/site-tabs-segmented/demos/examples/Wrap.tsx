import { TabsSegmented } from '@ds/site-tabs-segmented';

const ITEMS = [
  'Инфраструктура',
  'Данные',
  'Искусственный интеллект',
  'Безопасность',
  'Сеть',
  'Хранилища',
  'Аналитика',
  'Разработка',
  'Мониторинг',
  'Поддержка',
].map(label => ({ value: label, label }));

export function Wrap() {
  return <TabsSegmented items={ITEMS} wrap />;
}
