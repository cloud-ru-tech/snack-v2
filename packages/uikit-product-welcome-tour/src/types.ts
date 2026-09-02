import { ValueOf } from '@ds/utils';
import { ReactNode, RefObject } from 'react';

import { TOUR_BUTTON, TOUR_PLACEMENT, TOUR_STATUS } from './constants';

export type TourStatus = ValueOf<typeof TOUR_STATUS>;

export type TourPlacement = ValueOf<typeof TOUR_PLACEMENT>;

export type TourButton = ValueOf<typeof TOUR_BUTTON>;

/**
 * Отступ выреза от границ целевого элемента, px. Число — одинаково со всех сторон,
 * объект — по сторонам. Отрицательные значения поджимают вырез внутрь элемента.
 */
export type TourSpotlightPadding =
  | number
  | {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

/** Целевой элемент шага: CSS-селектор, DOM-нода, ref или геттер. */
export type TourTarget = string | HTMLElement | RefObject<HTMLElement | null> | (() => HTMLElement | null);

/** Подписи кнопок подсказки. */
export type TourLabels = {
  /** Кнопка перехода к следующему шагу. */
  next: string;
  /** Кнопка возврата к предыдущему шагу. */
  back: string;
  /** Кнопка на последнем шаге. */
  finish: string;
  /** Кнопка-крестик в шапке подсказки. */
  close: string;
};

/** Шаг тура. */
export type TourStep = {
  /** Целевой элемент, вокруг которого подсвечивается вырез и к которому крепится подсказка. */
  target: TourTarget;
  /** Заголовок шага. */
  title?: ReactNode;
  /** Подзаголовок под заголовком. */
  subtitle?: ReactNode;
  /** Тело шага. */
  content?: ReactNode;
  /**
   * Элемент, который подсвечивает вырез, если он не совпадает с `target`. Подсказка
   * остаётся прикреплённой к `target`: так крупный блок подсвечивается целиком, а
   * подсказка цепляется за компактный якорь внутри него и не выходит за вьюпорт.
   *
   * Список целей подсвечивается одним вырезом по их общей области — этим собирают
   * кнопку и раскрытый под ней список, которые в DOM лежат в разных поддеревьях.
   * Каждый селектор берётся целиком: `querySelectorAll`, а не первый совпавший узел.
   */
  spotlightTarget?: TourTarget | TourTarget[];
  /**
   * Положение подсказки относительно целевого элемента.
   * @default 'bottom'
   */
  placement?: TourPlacement;
  /**
   * Ширина подсказки, px или CSS-значение. По умолчанию подсказка растёт по содержимому
   * до 480px; сужение нужно, когда сбоку от цели меньше места и подсказка иначе
   * перекидывается движком на другую сторону.
   */
  width?: number | string;
  /**
   * Отступ выреза от границ целевого элемента. Переопределяет `spotlightPadding` компонента.
   * @default 10
   */
  spotlightPadding?: TourSpotlightPadding;
  /** Подписи кнопок для этого шага. Переопределяют `labels` компонента. */
  labels?: Partial<TourLabels>;
  /**
   * Хук перед показом шага. Тур ждёт разрешения промиса и до тех пор шаг не показывает —
   * этим дожидаются анимации и появления целевого элемента (открытие меню, смена таба).
   * Ожидание ограничено `beforeTimeout` движка (5с); после таймаута шаг пропускается.
   */
  onBeforeShow?(): Promise<void>;
  /**
   * Колбек ухода с шага. Вызывается на любом переходе — «Далее», «Назад», а также при
   * закрытии тура с этого шага. Для отметки «шаг пройден» этого недостаточно: сверяйся
   * со статусом из `onOpenChange`.
   */
  onFinish?(): void;
};

export type WelcomeTourProps = {
  /** Шаги тура. */
  steps: TourStep[];
  /** Запущен ли тур. Управляемый режим. */
  open?: boolean;
  /**
   * Запущен ли тур изначально. Неуправляемый режим.
   * @default false
   */
  defaultOpen?: boolean;
  /** Колбек смены состояния тура. Вторым аргументом приходит статус, с которым тур завершился. */
  onOpenChange?(open: boolean, status: TourStatus): void;
  /** Индекс текущего шага. Управляемый режим. */
  stepIndex?: number;
  /**
   * Индекс шага, с которого начинается тур. Неуправляемый режим.
   * @default 0
   */
  defaultStepIndex?: number;
  /**
   * Колбек смены шага.
   *
   * В неуправляемом режиме сообщает об уже случившемся переходе — в том числе о показе
   * первого шага при запуске тура. В управляемом (когда задан `stepIndex`) это запрос на
   * переход: компонент сам шаг не меняет, новый индекс обязан применить потребитель —
   * иначе тур остановится на текущем шаге.
   */
  onStepChange?(index: number): void;
  /** Подписи кнопок. Переопределяют значения из locale. */
  labels?: Partial<TourLabels>;
  /**
   * Набор кнопок подсказки.
   * @default ['back', 'primary', 'skip']
   */
  buttons?: TourButton[];
  /**
   * Отступ при скролле к целевому элементу, px.
   * @default 20
   */
  scrollOffset?: number;
  /**
   * Отступ выреза от границ целевого элемента для всех шагов. Шаг переопределяет своим
   * `spotlightPadding`.
   * @default 10
   */
  spotlightPadding?: TourSpotlightPadding;
  /** Контейнер для портала. По умолчанию — контейнер из `PortalContextProvider` либо `document.body`. */
  portalContainer?: HTMLElement | null;
};
