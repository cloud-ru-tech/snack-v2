import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { ERROR_TYPE, LOGO_VARIANT } from './constants';

export type ErrorType = ValueOf<typeof ERROR_TYPE>;

export type LogoVariant = ValueOf<typeof LOGO_VARIANT>;

/** Настройки основной (filled) кнопки. */
export type MainButtonConfig = {
  /** Текст кнопки. */
  label?: string;
  /** Ссылка. Если задана — кнопка рендерится как `<a>`. */
  href?: string;
  /** Обработчик клика. */
  onClick?(): void;
  /** Иконка. */
  icon?: ReactNode;
};

export type ErrorPageCustomConfig = {
  /** Кастомный заголовок. */
  title?: string;
  /** Кастомный текст под заголовком. */
  description?: string;
  /** Кастомный код статуса. */
  statusCode?: number;
  /** Кастомные настройки основной кнопки. */
  mainButton?: MainButtonConfig;
  /**
   * Принудительно показать/скрыть ссылку на главную страницу.
   * Если не задано, используется поведение по умолчанию.
   */
  showMainPageLink?: boolean;
  /**
   * Принудительно показать/скрыть ссылку «Назад».
   * Если не задано, используется поведение по умолчанию.
   */
  showBackLink?: boolean;
  /** Кастомный класс для контейнера с действиями. */
  actionWrapperClassName?: string;
};

export type ErrorTypeConfig =
  | {
      errorType: typeof ERROR_TYPE.Custom;
      custom?: ErrorPageCustomConfig;
    }
  | {
      errorType: Exclude<ErrorType, typeof ERROR_TYPE.Custom>;
      custom?: never;
    };

export type ErrorPageContent = {
  title: string;
  description: string;
  statusCode?: number;
};

type ErrorPageCommonProps = {
  /** Дополнительный класс. */
  className?: string;
  /**
   * URL главной страницы (для кнопки/ссылки «На главную»).
   * @default '/'
   */
  mainPageUrl?: string;
  /** Обработчик клика по кнопке «Служба поддержки». Если задан — кнопка отображается. */
  onSupportCenterClick?(): void;
  /**
   * Показать основную (filled) кнопку действия.
   * @default true
   */
  showMainButton?: boolean;
};

type ErrorPageLogoProps =
  | {
      /** Вариант логотипа над заголовком. */
      logoVariant: typeof LOGO_VARIANT.Custom;
      /** Кастомный логотип, используется только с `LOGO_VARIANT.Custom`. */
      logo?: ReactNode;
    }
  | {
      /**
       * Вариант логотипа над заголовком.
       * @default 'None'
       */
      logoVariant?: Exclude<LogoVariant, typeof LOGO_VARIANT.Custom>;
      logo?: never;
    };

type ErrorPageCustomProps =
  | {
      /**
       * Тип ошибки — определяет заголовок, текст, код статуса и набор действий.
       * @default 'FrontendError'
       */
      errorType: typeof ERROR_TYPE.Custom;
      /** Объект с кастомными настройками, используется только для `ERROR_TYPE.Custom`. */
      custom?: ErrorPageCustomConfig;
    }
  | {
      /**
       * Тип ошибки — определяет заголовок, текст, код статуса и набор действий.
       * @default 'FrontendError'
       */
      errorType?: Exclude<ErrorType, typeof ERROR_TYPE.Custom>;
      custom?: never;
    };

export type ErrorPageProps = WithSupportProps<ErrorPageCommonProps & ErrorPageLogoProps & ErrorPageCustomProps>;
