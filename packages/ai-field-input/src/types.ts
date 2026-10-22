import { ValueOf, WithSupportProps } from '@ds/utils';
import { MouseEvent, ReactNode, Ref } from 'react';

import { ACTION_LIST_ITEM_TYPE, CONTEXT_PROGRESS, SEARCH_TRIGGER, SEND_STATE } from './constants';

export type SendState = ValueOf<typeof SEND_STATE>;
export type ContextProgress = ValueOf<typeof CONTEXT_PROGRESS>;
export type ActionListItemType = ValueOf<typeof ACTION_LIST_ITEM_TYPE>;
export type SearchTrigger = ValueOf<typeof SEARCH_TRIGGER>;

export type AiFieldInputTextSegment = {
  type: 'text';
  /** Текст; `\n` — перенос строки. */
  text: string;
};

export type AiFieldInputSkillSegment = {
  type: 'skill';
  /** Идентификатор скилла или команды. */
  id: string;
  /** Название в чипе. */
  label: string;
  /**
   * Подсказка параметров сразу за чипом (ISM-5): видна, пока за чипом в строке ничего нет.
   * Параметры — обычный текст сообщения после чипа. Пустая строка — подсказка по умолчанию из локали.
   */
  paramsPlaceholder?: string;
  /** Иконка чипа. По умолчанию — заглушка. */
  icon?: ReactNode;
  /** Описание в подсказке при наведении. */
  tooltip?: ReactNode;
};

export type AiFieldInputMentionSegment = {
  type: 'mention';
  /** Идентификатор упоминаемой сущности. */
  id: string;
  /** Название в чипе. */
  label: string;
  /** Иконка чипа. По умолчанию — заглушка. */
  icon?: ReactNode;
  /** Описание в подсказке при наведении. */
  tooltip?: ReactNode;
};

/** Чип в состоянии Search: знак введён, значение ещё не выбрано (ISM-4.1). */
export type AiFieldInputSearchSegment = {
  type: 'search';
  /** Знак, открывший поиск: `/` — скиллы и команды, `@` — упоминания. */
  trigger: SearchTrigger;
  /** Текст, набранный после знака. */
  query: string;
};

export type AiFieldInputSegment =
  AiFieldInputTextSegment | AiFieldInputSkillSegment | AiFieldInputMentionSegment | AiFieldInputSearchSegment;

export type AiFieldInputValue = AiFieldInputSegment[];

export type AiFieldInputSearchPlaceholder = {
  /** Подсказка после `/` — поиск скиллов и команд. */
  skill?: string;
  /** Подсказка после `@` — поиск упоминаний. */
  mention?: string;
};

export type AiFieldInputSend = {
  /** Состояние кнопки отправки. Не задано — выводится из содержимого: пусто `disabled`, иначе `active`. */
  state?: SendState;
  /** Нажатие на кнопку отправки: текущее состояние и содержимое поля. В состоянии `active` поле само вызывает `onSubmit`. */
  onClick?(state: SendState, value: AiFieldInputValue): void;
};

export type AiFieldInputScrollButton = {
  /** Нажатие. Прокрутку выполняет потребитель. */
  onClick?(): void;
  /** Точка «внизу есть непрочитанное сообщение» (ISC-2). */
  indicator?: boolean;
};

export type AiFieldInputOwnProps = {
  /** Содержимое поля (controlled). */
  value?: AiFieldInputValue;
  /** Начальное содержимое (uncontrolled). */
  defaultValue?: AiFieldInputValue;
  /** Изменение содержимого. */
  onChange?(value: AiFieldInputValue): void;
  /** Отправка: Enter без Shift, когда поиск по `/` или `@` не активен, или нажатие кнопки в состоянии `active`. Пока кнопка в `loading` или `stop`, не вызывается. */
  onSubmit?(value: AiFieldInputValue): void;
  /** Подсказка в пустом поле. */
  placeholder?: string;
  /** Подсказки в поиске после `/` и `@`. Не заданный ключ — текст из локали («Введите название» / «Type a name»). */
  searchPlaceholder?: AiFieldInputSearchPlaceholder;
  /** Выключенное поле: ввод недоступен, кнопки футера выключены, ряд вложений скрыт. */
  disabled?: boolean;
  /** Слот над полем: `AiFieldBanner` или `AiFieldNotice`. Пока открыт список по `/` или `@`, на месте баннера стоит список. */
  banner?: ReactNode;
  /** Строки списка по `/`: команды и скиллы. Не заданы — список по `/` не открывается. */
  skills?: AiFieldInputActionListProps['items'];
  /** Строки списка по `@`: ресурсы и сущности. Не заданы — список по `@` не открывается. */
  mentions?: AiFieldInputActionListProps['items'];
  /** Выбор строки списка по `/` или `@`: строка уже стоит в поле чипом. */
  onActionSelect?(item: AiFieldInputActionListItem, trigger: SearchTrigger): void;
  /** Плитки вложений (`AiAttachment` из `@ds/ai-attachment`). Ряд не рендерится, если слот пуст. */
  attachments?: ReactNode;
  /** Шаг сдвига ряда вложений стрелкой, px. По умолчанию — одна плитка с зазором (92). */
  attachmentsScrollStep?: number;
  /** Слот левых действий футера. */
  footerLeftActions?: ReactNode;
  /** Слот дополнительных правых действий футера (перед кнопкой отправки). */
  footerRightActions?: ReactNode;
  /** Кнопка отправки: состояние и нажатие. */
  send?: AiFieldInputSend;
  /** Кнопка прокрутки к последнему сообщению над полем. Не задана — кнопки нет. */
  scrollButton?: AiFieldInputScrollButton;
  /** Текст под полем. По умолчанию — дисклеймер из локали; `null` скрывает текст, отступ сохраняется. */
  disclaimer?: ReactNode;
  /** Доп. класс корня. */
  className?: string;
};

export type AiFieldInputProps = WithSupportProps<AiFieldInputOwnProps>;

/** Действия поля для компонентов в его слотах. */
export type AiFieldInputActions = {
  /**
   * Открывает список по `/` (`skills`) или `@` (`mentions`) без знака в тексте. Фокус уходит в список,
   * выбранная строка встаёт чипом туда, где был курсор; после выбора или закрытия фокус возвращается в поле.
   */
  openActionList(trigger: SearchTrigger): void;
};

export type AiFieldInputFooterButtonTooltip = {
  /** Текст подсказки. */
  content: ReactNode;
  /** Сочетание клавиш справа от текста. */
  shortcut?: string;
};

export type AiFieldInputFooterButtonBaseProps = {
  /** Выключенная кнопка. Внутри выключенного поля выключается автоматически. */
  disabled?: boolean;
  /** Подсказка при наведении. */
  tooltip?: AiFieldInputFooterButtonTooltip;
  /** Нажатие. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  /** Ref на кнопку. */
  innerRef?: Ref<HTMLButtonElement>;
  /** Доп. класс корня. */
  className?: string;
};

export type AiFieldInputFooterMenuItem = {
  /** Уникальный идентификатор пункта. */
  id: string;
  /** Название пункта. */
  label: string;
  /** Описание под названием. */
  description?: string;
};

export type AiFieldInputFooterMenuProps = {
  /**
   * Пункты выпадающего списка: на desktop — над кнопкой, на mobile — в шторке снизу.
   * Без пунктов кнопка только сообщает о нажатии через `onClick`.
   */
  items?: AiFieldInputFooterMenuItem[];
  /** Выбор пункта выпадающего списка. */
  onSelect?(id: string): void;
};

export type AiFieldInputPlusButtonProps = WithSupportProps<
  AiFieldInputFooterButtonBaseProps & AiFieldInputFooterMenuProps
>;
export type AiFieldInputSettingsButtonProps = WithSupportProps<
  AiFieldInputFooterButtonBaseProps & AiFieldInputFooterMenuProps
>;
export type AiFieldInputVoiceButtonProps = WithSupportProps<AiFieldInputFooterButtonBaseProps>;

export type AiFieldInputModelButtonProps = WithSupportProps<
  AiFieldInputFooterButtonBaseProps &
    AiFieldInputFooterMenuProps & {
      /** Имя текущей модели. Длиннее 180px обрезается многоточием. */
      label: string;
      /**
       * Поиск по названию в списке моделей. На mobile с поиском шторка раскрывается на весь экран,
       * без него — по высоте списка. По умолчанию `false`.
       */
      searchable?: boolean;
    }
>;

export type AiFieldInputEffortButtonProps = WithSupportProps<
  AiFieldInputFooterButtonBaseProps &
    AiFieldInputFooterMenuProps & {
      /** Текущий уровень усилий. Длиннее 100px обрезается многоточием. */
      label: string;
    }
>;

export type AiFieldInputContextButtonProps = WithSupportProps<
  Omit<AiFieldInputFooterButtonBaseProps, 'disabled'> & {
    /** Доля заполнения контекста, 0–100. Задаёт угол дуги. */
    value: number;
    /** Цвет дуги. Не задан — по порогам: до 70 green, до 90 orange, выше red. */
    progress?: ContextProgress;
  }
>;

export type AiFieldInputSendButtonProps = WithSupportProps<
  Omit<AiFieldInputFooterButtonBaseProps, 'tooltip' | 'disabled'> & {
    /** Состояние кнопки отправки. */
    state: SendState;
  }
>;

export type AiFieldInputActionListItem = {
  /** Уникальный идентификатор строки. */
  id: string;
  /** Вид строки: выбор, переход на следующий уровень или возврат. По умолчанию `default`. */
  type?: ActionListItemType;
  /** Имя строки. */
  label: string;
  /** Описание справа от имени. */
  caption?: string;
  /** Сочетание клавиш в теге справа (строка `default`). */
  shortcut?: string;
  /** Иконка слева. */
  icon?: ReactNode;
  /** Подсказка при наведении. */
  tooltip?: ReactNode;
  /**
   * Только для скиллов (`skills`): подсказка параметров, которая встаёт сразу за выбранным чипом,
   * пока за ним ничего не набрано (ISM-5). Не задана — подсказки нет.
   * Пустая строка — подсказка по умолчанию из локали.
   */
  paramsPlaceholder?: string;
  /** Выбор строки кликом или Enter. */
  onClick?(): void;
  /**
   * Строки следующего уровня у строки `drillDown`. Список поля ввода (`skills`, `mentions`) открывает их
   * по выбору строки и ставит первой строку возврата.
   */
  items?: Array<AiFieldInputActionListItem | AiFieldInputActionListGroup>;
  /** Подпись строки возврата на следующем уровне. По умолчанию «Назад» из локали. */
  backLabel?: string;
};

export type AiFieldInputActionListGroup = {
  /** Уникальный идентификатор группы. */
  id: string;
  /** Заголовок группы. */
  label?: string;
  /** Разделитель над группой. */
  divider?: boolean;
  /** Строки группы. */
  items: AiFieldInputActionListItem[];
};

export type AiFieldInputActionListProps = WithSupportProps<{
  /** Строки и группы строк. */
  items: Array<AiFieldInputActionListItem | AiFieldInputActionListGroup>;
  /** Отступ 8 со всех сторон; без него — только сверху и снизу. По умолчанию `false`. */
  padding?: boolean;
  /** Нажатие Escape. */
  onClose?(): void;
  /** Доп. класс корня. */
  className?: string;
}>;
