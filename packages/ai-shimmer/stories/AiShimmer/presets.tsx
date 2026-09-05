import { AiIconGiga } from '@ds/ai-icon-giga';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Sun } from '@ds/loader';

/** Пресеты ведущей иконки узлом: GigaChat, иконка из `@ds/icons`, анимированный Sun. */
export const ICON_PRESETS = {
  none: undefined,
  giga: <AiIconGiga size={16} />,
  placeholder: <PlaceholderSVG size={16} />,
  sun: <Sun size='xs' />,
} as const;
