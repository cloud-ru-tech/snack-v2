import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { ATTACHMENT_STATE, ATTACHMENT_TYPE } from './constants';

export type AttachmentType = ValueOf<typeof ATTACHMENT_TYPE>;
export type AttachmentState = ValueOf<typeof ATTACHMENT_STATE>;

/**
 * Плитка одного вложения 88×88. Сообщает о трёх событиях отдельно: нажатие крестика, повтора и самой плитки (AT-6.5).
 * Закреплена на платформе webDesktop на обеих раскладках; на mobile крестик крупнее и виден всегда.
 */
export type AiAttachmentProps = WithSupportProps<{
  /** Тип плитки: картинка с превью или файл с именем. По умолчанию `image`. */
  type?: AttachmentType;
  /** Состояние плитки. По умолчанию `default`. */
  state?: AttachmentState;
  /** Адрес превью картинки. */
  src?: string;
  /** Имя файла — для `type='file'`. */
  fileName?: string;
  /** Иконка типа файла. Подставляется снаружи (AT-7.3). */
  icon?: ReactNode;
  /** Подсказка при наведении (только desktop). */
  tooltip?: ReactNode;
  /** Нажатие на крестик. */
  onRemove?(): void;
  /** Нажатие на кнопку повтора в состоянии `error`. */
  onRetry?(): void;
  /** Нажатие на плитку. */
  onClick?(): void;
  /** Доп. класс корня. */
  className?: string;
}>;
