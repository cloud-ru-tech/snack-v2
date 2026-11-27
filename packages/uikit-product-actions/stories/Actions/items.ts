import { Action } from '@ds/uikit-product-actions';
import { fn } from 'storybook/test';

import { TEST_IDS } from './testIds';

export const items: Action[] = [
  { id: 'add', label: 'Добавить', onClick: fn(), 'data-test-id': TEST_IDS.first },
  { id: 'export', variant: 'outline', label: 'Экспортировать', onClick: fn(), 'data-test-id': TEST_IDS.second },
  { id: 'refresh', variant: 'outline', label: 'Обновить', onClick: fn(), 'data-test-id': TEST_IDS.third },
];
