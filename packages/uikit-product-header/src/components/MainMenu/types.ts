import { BaseItemProps, ListProps } from '@ds/list';
import { SearchProps as SearchPropsSnack } from '@ds/search';
import { CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import { JSXElementConstructor, MouseEvent, ReactNode } from 'react';

import { FavoritesSegment } from './helperComponents/Favorites/constants';

/**
 * Карточка сервиса или ссылки внутри {@link LinksGroup}.
 *
 * Отображается в сетке MainMenu (`CardServiceSmall`) и может попадать в боковое меню (`mapInnerLinksToListItems`).
 */
export type InnerLink = {
  /**
   * Уникальный идентификатор карточки (также используется в избранном и при поиске).
   *
   * Один и тот же сервис может быть представлен в разных сегментах с разной
   * детализацией (простая карточка в общем каталоге и раскрытая с вложенными
   * сервисами версия в другом сегменте) — в этом случае обеим версиям задаётся
   * общий `id`. При поиске из совпадений с одинаковым `id` в разных сегментах
   * остаётся только первое по приоритету сегментов (см. {@link MainMenuProps.segments}).
   */
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
  /** Краткое описание сервиса — отображается при включённом переключателе «Описание». */
  description?: string;
  onClick(e?: MouseEvent<HTMLElement>): void;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  badge?: CardServiceLightProps['promoTag'];
  /**
   * Вложенные сервисы подкатегории.
   *
   * При наличии карточка раскрывается аккордеоном: в свёрнутом виде — обычная карточка
   * с кнопкой раскрытия, в развёрнутом — заголовок {@link TitleClickable} и сетка вложенных сервисов.
   */
  items?: InnerLink[];
  /**
   * Синонимы для fuzzy-поиска.
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

export type LinksGroupBlockColor =
  'neutral' | 'primary' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'pink';

/**
 * Группа карточек MainMenu с общим заголовком.
 *
 * Используется в `segments[].items` и `platformGroups`.
 * При активном поиске группа может отображаться целиком или с отфильтрованным списком `items`.
 */
export type LinksGroup = {
  /** Уникальный идентификатор группы (якорь скролла, поиск по id). */
  id: string;
  /** Заголовок группы в сетке карточек и в боковой навигации. */
  label: LinksGroupTitle;
  /**
   * Синонимы заголовка группы для fuzzy-поиска.
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
  /** Цвет блока группы. */
  blockColor?: LinksGroupBlockColor;
  /** Визуальное выделение группы */
  highlight?: boolean;
};

/**
 * Сегмент правой панели MainMenu (переключатель в тулбаре над сеткой карточек).
 *
 * Только каталог: порядок и раскрытие групп задаются через {@link MainMenuSegmentPrefs}
 * и колбэки `onSegmentOrderChange` / `onSegmentExpandedChange` на {@link MainMenuProps}.
 */
export type MainMenuSegment = {
  /** Уникальный идентификатор сегмента (значение SegmentControl). */
  id: string;
  /** Подпись сегмента в SegmentControl. */
  label: string;
  /** Иконка сегмента в SegmentControl; без неё — только `label`. */
  icon?: ReactNode;
  /** Группы карточек сегмента (каталог). */
  items: LinksGroup[];
  /**
   * Группы сегмента в выдаче поиска — после совпадений из обычных сегментов и `platformGroups`.
   *
   * @default false
   */
  pinBottomOnSearch?: boolean;
};

/**
 * Пользовательские prefs сегмента (порядок и раскрытие групп).
 *
 * Передаются отдельно от каталога {@link MainMenuSegment}, чтобы `segments` оставался стабильным.
 */
export type MainMenuSegmentPrefs = {
  /** Id сегмента из {@link MainMenuSegment.id}. */
  id: string;
  /**
   * Порядок id групп. Если не передан — uncontrolled для этого сегмента
   * (дефолт = порядок `items`; новые группы добавляются в конец).
   */
  order?: string[];
  /**
   * Id раскрытых групп. Если не передан — uncontrolled (по умолчанию все раскрыты).
   */
  expanded?: string[];
};

export type SearchProps = Pick<SearchPropsSnack, 'onBlur' | 'onFocus'> & {
  value: string;
  onChange(value: string): void;
  onSearchNoResult?(value: string): void;
};

export type FavoriteProps = {
  /** Список id избранных сервисов */
  value: string[];
  /**
   * Колбэк переключения избранного для карточки сервиса.
   *
   * `position` передаётся при добавлении через drag из сетки сервисов — индекс,
   * на который должна встать карточка среди избранного (см. {@link FavoriteProps.onOrderChange}).
   * При переключении избранного кликом не передаётся.
   */
  onChange(productId: string): (addingValue: boolean, position?: number) => void;
  /**
   * Колбэк вызывается после перетаскивания карточек внутри избранного с новым порядком id.
   *
   * Добавление новой карточки через drag из сетки сервисов идёт через
   * {@link FavoriteProps.onChange} с `position` — этот колбэк для такого добавления не вызывается.
   */
  onOrderChange?(orderedIds: string[]): void;
  /** Список id недавно открытых сервисов */
  recentServices?: string[];
  /** Колбэк клика по карточке сервиса в сегменте «Избранное» */
  onFavoriteServiceClick?(serviceId: string, event?: MouseEvent<HTMLElement>): void;
  /** Колбэк клика по карточке сервиса в сегменте «Недавнее» */
  onRecentServiceClick?(serviceId: string, event?: MouseEvent<HTMLElement>): void;
  /** Действия для списка сервисов */
  actions?: {
    items: BaseItemProps[];
    onDroplistOpenChange?(open: boolean): void;
  };
  /**
   * Активный сегмент («Избранное» / «Недавнее») в панели избранного.
   *
   * Не передано — неуправляемое состояние (дефолт `'favorites'`).
   */
  segment?: FavoritesSegment;
  /** Колбэк смены сегмента панели избранного. */
  onSegmentChange?(segment: FavoritesSegment): void;
  /** Флаг загрузки данных */
  loading?: boolean;
};

export type MainMenuToggleProps = {
  value: boolean;
  onChange(value: boolean): void;
};

/**
 * Настройки меню, управляемые из модалки по кнопке в тулбаре сетки карточек.
 *
 * Проп опционален на уровне {@link MainMenuProps.preferences} целиком — без него кнопка
 * настроек в тулбаре не отображается.
 */
export type MainMenuPreferencesProps = {
  /**
   * Открыта ли модалка настроек.
   *
   * Не передано — состояние открытия неуправляемое (модалка сама переключает себя по клику на кнопку).
   */
  open?: boolean;
  /** Колбэк открытия/закрытия модалки. */
  onOpenChange?(open: boolean): void;
  /** Показывать описания сервисов в карточках. */
  showDescription: MainMenuToggleProps;
  /**
   * Отображать цвета блоков групп ({@link LinksGroup.blockColor}).
   * `value: false` скрывает цвета всех групп независимо от заданного `blockColor`.
   */
  showGroupsColors?: MainMenuToggleProps;
};

export type MainMenuProps = {
  disabled?: boolean;
  open?: boolean;
  setOpen?(open: boolean): void;

  logo?: ReactNode;
  leftTop?: ReactNode;
  rightTop?: ReactNode;

  /**
   * Сегменты правой панели (сетка карточек) — только каталог.
   *
   * При поиске: совпадения из сегментов без `pinBottomOnSearch` → `platformGroups` → сегменты с `pinBottomOnSearch`.
   * Если один и тот же {@link InnerLink.id} совпал сразу в нескольких сегментах — остаётся только
   * первое по этому приоритету вхождение, остальные (и опустевшие после этого группы) не показываются.
   * При `segments.length > 1` показывается SegmentControl (скрывается во время поиска).
   * Порядок и раскрытие групп — через `segmentPrefs` и колбэки ниже.
   */
  segments?: MainMenuSegment[];

  /**
   * Пользовательские prefs сегментов (порядок / раскрытие групп).
   *
   * Нет записи для сегмента или omit `order` / `expanded` → uncontrolled для этого поля.
   */
  segmentPrefs?: MainMenuSegmentPrefs[];

  /**
   * Активный сегмент правой панели (значение SegmentControl, см. {@link MainMenuSegment.id}).
   *
   * Не передано — неуправляемое состояние (дефолт — первый сегмент с видимыми карточками).
   */
  activeSegmentId?: string;

  /** Колбэк смены активного сегмента правой панели. */
  onActiveSegmentChange?(segmentId: string): void;

  /**
   * Колбэк после DnD групп в сегменте (без id синтетической группы избранного).
   */
  onSegmentOrderChange?(segmentId: string, orderedGroupIds: string[]): void;

  /**
   * Колбэк при изменении набора раскрытых групп сегмента
   * (без id синтетической группы избранного).
   */
  onSegmentExpandedChange?(segmentId: string, expandedGroupIds: string[]): void;

  /**
   * Пункты левой колонки (desktop) / нижней части списка (mobile).
   *
   * Плоский список `List` (`BaseItem` и при необходимости `type: 'group'` с `divider` для разделителей).
   * Не связан с сегментами правой панели и не меняется при сортировке групп в сегментах.
   */
  settingItems?: ListProps['items'];

  /**
   * Платформенные группы (например «Облачные продукты», «Другие продукты»).
   *
   * Без поиска в сетке карточек **не отображаются**.
   * С поиском: попадают в результаты при совпадении; порядок —
   * после совпадений из сегментов без `pinBottomOnSearch`, перед сегментами с `pinBottomOnSearch`.
   * Обычно `favoritesEnabled: false`; карточки могут быть без `icon` (Avatar по `label`).
   */
  platformGroups?: LinksGroup[];

  favorite?: FavoriteProps;

  search?: SearchProps;

  /**
   * Настройки меню (модалка по кнопке в тулбаре): описания карточек, цвета групп.
   *
   * Не передано — кнопка настроек в тулбаре не отображается.
   */
  preferences?: MainMenuPreferencesProps;

  /**
   * Ширина дровера, с которой открывается меню (desktop only)
   */
  defaultWidth?: number;
  /**
   * Вызывается при окончании изменения ширины дровера (desktop only)
   */
  onWidthChangeEnd?: (width: number) => void;
  /**
   * Текст подсказки для драггера (desktop only)
   */
  draggerTooltip?: string;
  /** Флаг загрузки данных */
  loading?: boolean;
};
