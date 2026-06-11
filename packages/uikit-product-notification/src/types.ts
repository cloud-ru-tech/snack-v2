import { BaseItemProps } from '@ds/list';
import { ValueOf } from '@ds/utils';
import { ReactElement } from 'react';

import { APPEARANCE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

/** Действие в выпадающем меню карточки или панели уведомлений */
export type Action = {
  /** Иконка слева от текста */
  icon?: ReactElement;
  /** Лейбл-тег справа от текста */
  tagLabel?: string;
} & Pick<BaseItemProps, 'content' | 'onClick' | 'disabled'>;
