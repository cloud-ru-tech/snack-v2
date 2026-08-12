import { CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import { JSXElementConstructor, MouseEvent, ReactNode } from 'react';

/**
 * Карточка сервиса или ссылки внутри {@link LinksGroup}.
 *
 * Отображается в сетке MainMenu (`CardServiceLight`) и может попадать в боковое меню.
 */
export type InnerLink = {
  /** Уникальный идентификатор карточки (также используется в избранном и при поиске). */
  id: string;
  /**
   * Иконка карточки.
   *
   * Если не задана, вместо иконки рендерится `Avatar` с двухбуквенным текстом по `label`
   * (см. `getAvatarNameFromLabel`).
   */
  icon?: JSXElementConstructor<{
    size?: number;
    className?: string;
  }>;
  /** Заголовок карточки. */
  label: string;
  onClick(e?: MouseEvent<HTMLElement>): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  badge?: CardServiceLightProps['promoTag'];
  /**
   * Синонимы для режима поиска «С синонимами» (fuzzy).
   *
   * В режиме «Точный» (precise) не учитываются.
   */
  aliases: string[];
};

type TitleStatic = {
  text: string;
  onClick?: never;
};

type TitleClickable = {
  text: string;
  onClick?(e?: MouseEvent<HTMLElement>): void;
};

export type LinksGroupTitle = TitleStatic | TitleClickable;

/**
 * Группа карточек MainMenu с общим заголовком.
 *
 * Используется в `serviceGroups`, `platformGroups` и `settingItems`.
 */
export type LinksGroup = {
  /** Уникальный идентификатор группы (якорь скролла, поиск по id). */
  id: string;
  /** Заголовок группы в сетке карточек и в боковой навигации. */
  label: LinksGroupTitle;
  /**
   * Синонимы заголовка группы для режима поиска «С синонимами» (fuzzy).
   *
   * В режиме «Точный» (precise) не учитываются.
   */
  aliases?: string[];
  onClick?(e?: MouseEvent<HTMLElement>): void;
  hidden?: boolean;
  /**
   * Разрешено ли добавление карточек группы в избранное.
   *
   * @default true — избранное доступно, если не передано `false`.
   */
  favoritesEnabled?: boolean;
  /** Карточки сервисов или ссылок внутри группы. */
  items: InnerLink[];
  /** Визуальное выделение группы */
  highlight?: boolean;
};

export type SearchHandler = (searchValue: string, items: LinksGroup[]) => LinksGroup[] | undefined;

export type SearchFunction = {
  id: string;
  label: string;
  handler: SearchHandler;
};

export type SearchProps = {
  searchValue: string;
  /** Колбек на изменение значения в поиске */
  onSearchValueChange(value: string): void;
  /** Опции для чипов */
  searchFunctions: SearchFunction[];
  /** Колбек на смену функции */
  onChangeSearchFn(id: string): void;
  /** Выбранная функция (по id из searchFunctions) */
  searchFn?: string;
  /** Колбек на отсутствие результатов поиска */
  onSearchNoResult?(value: string): void;
  onBlur?(): void;
  onFocus?(): void;
};

export type MainMenuProps = {
  open?: boolean;
  setOpen?(open: boolean): void;

  leftTop?: ReactNode;
  rightTop?: ReactNode;

  /**
   * Административные сервисы (одна группа, например «Административные сервисы»).
   *
   * Без поиска: пункты в нижней части левой колонки (desktop), не в сетке карточек.
   * С поиском: группа попадает в результаты только при совпадении; отображается **последней**
   * (ниже `serviceGroups` и `platformGroups`). Обычно `favoritesEnabled: false`.
   */
  settingItems?: LinksGroup;
  /**
   * Основные группы облачных сервисов (инфраструктура, сеть, хранилище и т.п.).
   *
   * Всегда видны в сетке карточек при пустом поиске; участвуют в избранном и боковой навигации.
   * При поиске фильтруются вместе с остальными группами и показываются **первыми** в выдаче.
   */
  serviceGroups: LinksGroup[];
  /**
   * Платформенные группы (например «Облачные продукты», «Другие продукты»).
   *
   * Без поиска в сетке карточек **не отображаются**.
   * С поиском: попадают в результаты при совпадении; порядок — **после** `serviceGroups`,
   * **перед** `settingItems`. Обычно `favoritesEnabled: false`.
   */
  platformGroups?: LinksGroup[];

  onLinkChange?(value: string): void;

  favorite?: {
    value: string[];
    onChange: (productId: string) => (addingValue: boolean) => void;
  };

  search?: SearchProps;

  isMobile?: boolean;

  /** Нижний слот левой колонки sidebar (Figma `bottom > items`). */
  sidebarBottomSlot?: ReactNode;
};
