import { FieldSelectProps } from '@ds/fields';
import { TabsSegmentedItem } from '@ds/site-tabs-segmented';

import sampleBg from './assets/sample-bg.jpg?url';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

export const TITLE = 'Облачные сервисы';
export const DESCRIPTION = 'Инфраструктура, данные и AI в одном облаке. Подключение за несколько минут.';

export const TABS: TabsSegmentedItem[] = [
  { value: 'infrastructure', label: 'Создание инфраструктуры', 'data-test-id': `${TEST_IDS.tabPrefix}-infrastructure` },
  { value: 'data', label: 'Данные', 'data-test-id': `${TEST_IDS.tabPrefix}-data` },
  { value: 'ai', label: 'Искусственный интеллект', 'data-test-id': `${TEST_IDS.tabPrefix}-ai` },
];

const ITEMS = [
  { id: 'all', content: { label: 'Все' } },
  { id: 'popular', content: { label: 'Популярные' } },
  { id: 'new', content: { label: 'Новые' } },
];

export const FILTERS: FieldSelectProps[] = [
  { id: 'category', label: 'Категория', placeholder: 'Выберите категорию', items: ITEMS },
  { id: 'region', label: 'Регион', placeholder: 'Выберите регион', items: ITEMS },
  { id: 'type', label: 'Тип', placeholder: 'Выберите тип', items: ITEMS },
];

/** Картинка для `containerBackground={{ type: 'image' }}`. */
export const SAMPLE_IMAGE = sampleBg;

// Текст внутри — проверка цвета содержимого: он берётся из темы блока, а не со страницы.
export function ContentPlaceholder() {
  return <div className={styles.contentPlaceholder}>Контент секции</div>;
}
