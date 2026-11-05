import { ThemeAppearance } from '@ds/theme';
import { ValueOf } from '@ds/utils';
import { MouseEvent } from 'react';

import { CONTAINER, SECTION_BACKGROUND_FILL, SECTION_CONTAINER_BACKGROUND_TYPE } from './constants';

export type SectionContainer = ValueOf<typeof CONTAINER>;

export type SectionBackgroundFill = ValueOf<typeof SECTION_BACKGROUND_FILL>;

export type SectionContainerBackgroundType = ValueOf<typeof SECTION_CONTAINER_BACKGROUND_TYPE>;

/** Внешний слой фона во всю ширину экрана (Figma `sectionBackground`). */
export type SectionBackground = {
  /** Тема слоя. Не задана — тема страницы. */
  theme?: Partial<ThemeAppearance>;
  /** Заливка. По умолчанию `neutralBackground`. */
  fill?: SectionBackgroundFill;
};

/** Заливка блока по ширине `container` (Figma `bgLocal.type`). Набор полей зависит от `type`. */
export type SectionContainerFill =
  | {
      /** Подложка. */
      type: typeof SECTION_CONTAINER_BACKGROUND_TYPE.Bg;
      /** Подложка. По умолчанию `neutralBackground`. */
      fill?: SectionBackgroundFill;
    }
  | {
      /** Картинка во весь блок, кадрируется по размеру блока. */
      type: typeof SECTION_CONTAINER_BACKGROUND_TYPE.Image;
      /** URL картинки. Картинка декоративная, у `<img>` пустой `alt`. */
      src: string;
    }
  | {
      /** Акцентный цвет бренда (`primary/accent`). */
      type: typeof SECTION_CONTAINER_BACKGROUND_TYPE.Accent;
    };

/** Блок по ширине `container` (Figma `contentWrapper` + `bgLocal`): тема и заливка. */
export type SectionContainerBackground = SectionContainerFill & {
  /** Тема блока и всего содержимого. Не задана — тема внешнего слоя. */
  theme?: Partial<ThemeAppearance>;
};

export type SectionMoreButton = {
  /** Текст кнопки. По умолчанию — «Показать еще» из локали пакета. */
  label?: string;
  /** Ссылка. Если задана, кнопка рендерится как `<a>`. */
  href?: string;
  /** Колбэк клика. */
  onClick?(event: MouseEvent<HTMLElement>): void;
  /** Тестовый id кнопки. По умолчанию — `TEST_IDS.moreButton`. */
  'data-test-id'?: string;
};
