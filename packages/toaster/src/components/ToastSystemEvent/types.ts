import { ValueOf, WithSupportProps } from '@ds/utils';
import { MouseEvent } from 'react';

import { ToastButtonActionProps } from '../../helperComponents/ToastButtonAction';
import { ToastContentProps } from '../../manager/types';
import { TOAST_SYSTEM_EVENT_APPEARANCE } from './constants';

export type ToastSystemEventAppearance = ValueOf<typeof TOAST_SYSTEM_EVENT_APPEARANCE>;

export type ToastSystemEventLink = {
  label: string;
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
};

export type ToastSystemEventProps = ToastContentProps &
  WithSupportProps<{
    /** Заголовок тоста */
    title: string;
    /** Описание под заголовком */
    description?: string;
    /** Цветовая схема */
    appearance?: ToastSystemEventAppearance;
    /** Slot для ссылки */
    link?: ToastSystemEventLink;
    /** Показывать ли ProgressBar внизу */
    progressBar?: boolean;
    /** Возможность закрыть тост */
    closable?: boolean;
    /** Доп. класс корневого элемента */
    className?: string;
    /** Кастомный обработчик клика по кнопке закрытия */
    onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
    /** Кнопки в footer'е */
    action?: ToastButtonActionProps[];
    /**
     * Время автозакрытия в мс. Три состояния различимы намеренно:
     * - `undefined` — потребитель не указал значение, toaster-система подставит
     *   дефолт `AUTO_CLOSE_TIME[TOASTER_TYPE.SystemEvent]` (5000 мс) при рендере;
     *   именно этот случай позволяет ProgressBar анимироваться синхронно с
     *   auto-dismiss таймером менеджера.
     * - `number` — явное значение от потребителя, используется как есть.
     * - `false` — автозакрытие выключено, ProgressBar в этом режиме не рендерится.
     *
     * @default undefined (резолвится в `AUTO_CLOSE_TIME[TOASTER_TYPE.SystemEvent]` = 5000)
     */
    autoClose?: number | false;
  }>;
