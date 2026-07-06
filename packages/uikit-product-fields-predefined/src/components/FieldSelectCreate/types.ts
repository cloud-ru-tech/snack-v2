import { DrawerProps, Position } from '@ds/drawer';
import { FieldSelectMultipleProps, FieldSelectSingleProps } from '@ds/fields';
import { ModalProps } from '@ds/modal';
import { ValueOf, WithSupportProps } from '@ds/utils';

import { CREATE_LAYOUT_TYPE, PERMISSION } from './constants';

export type CreateLayoutType = ValueOf<typeof CREATE_LAYOUT_TYPE>;

export type Permission = ValueOf<typeof PERMISSION>;

export type EntityName = {
  /** Единственное число (винительный падеж) — для кнопки «Создать <single>». */
  single: string;
  /** Множественное число — для текстов пустых состояний и ошибки. */
  plural: string;
};

// Иконка пустого состояния — как у noDataState.icon.icon базового FieldSelect.
export type EntityIcon = NonNullable<NonNullable<FieldSelectSingleProps['noDataState']>['icon']>['icon'];

// Состояния дроплиста, футер и режим выбора компонент задаёт сам.
type OmittedSelectKeys = 'footer' | 'noDataState' | 'noResultsState' | 'errorDataState';

export type SelectFieldProps =
  | (Omit<FieldSelectSingleProps, OmittedSelectKeys> & { selection?: 'single' })
  | (Omit<FieldSelectMultipleProps, OmittedSelectKeys> & { selection: 'multiple' });

// Модалку/дровер создания компонент открывает/закрывает и снабжает кнопками сам.
type ManagedLayoutKeys = 'open' | 'onClose' | 'approveButton' | 'cancelButton';

export type LayoutProps =
  | {
      /** По клику на «Создать» открывается модальное окно. */
      createLayoutType: 'modal';
      /** Пропсы модалки создания (`content` — форма создания опции). */
      createLayoutProps: Omit<ModalProps, ManagedLayoutKeys>;
    }
  | {
      /** По клику на «Создать» открывается дровер (по умолчанию). */
      createLayoutType?: 'drawer';
      /** Пропсы дровера создания (`content` — форма создания опции); `position` по умолчанию `right`. */
      createLayoutProps: Omit<DrawerProps, ManagedLayoutKeys | 'position'> & { position?: Position };
    };

export type FieldSelectCreateProps = WithSupportProps<
  LayoutProps & {
    /** Название сущности в единственном и множественном числе — для кнопок и пустых состояний. */
    entityName: EntityName;
    /** Действие создания опции: возвращает `value` новой опции, которая выбирается в поле (single-режим). */
    submitHandler(): Promise<string | void>;
    /** Пропсы, прокидываемые в `FieldSelect` (`@ds/fields`). */
    selectProps: SelectFieldProps;
    /** Повтор загрузки в состоянии ошибки (кнопка «Обновить» в футере `errorDataState`). */
    onRefetch?(): void;
    /** CSS-класс корневой обёртки. */
    className?: string;
    /** Колбэк после закрытия модалки/дровера создания. */
    afterClose?(): void;
    /** Иконка пустого состояния `noData` (по умолчанию — иконка поиска). */
    entityIcon?: EntityIcon;
    /**
     * Права пользователя:
     * - `canCreate` (по умолчанию) — доступны и выбор, и создание;
     * - `canRead` — поле активно, но создание недоступно (кнопки «Создать» с tooltip);
     * - `none` — поле недоступно (с tooltip).
     */
    permission?: Permission;
  }
>;
