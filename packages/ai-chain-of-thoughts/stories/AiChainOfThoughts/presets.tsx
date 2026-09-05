import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolSimple } from '@ds/ai-tool';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Sun } from '@ds/loader';

export const CHAIN_DURATION = 31568949;

/** Кастомная иконка заголовка для stories: любой узел вместо GigaChat по умолчанию. */
export const customHeadlineIcon = <PlaceholderSVG size={16} />;

/** Sun Loader в слоте иконки: анимированный узел, который волна тоже покрывает. */
export const sunHeadlineIcon = <Sun size='xs' />;

/**
 * Пресеты слота `icon` для Playground: проп принимает `undefined` (GigaChat по
 * умолчанию), любой узел и `null` (иконка скрыта) — контрол показывает имена, в
 * `args` приходит сам узел.
 */
export const HEADLINE_ICON_PRESETS = {
  giga: undefined,
  custom: customHeadlineIcon,
  sun: sunHeadlineIcon,
  hidden: null,
} as const;

/** Колонки матриц `Shimmer × Icon`: подпись и значение слота `icon`. */
export const HEADLINE_ICON_CASES = [
  { label: 'DEFAULT', icon: undefined },
  { label: 'CUSTOM ICON', icon: customHeadlineIcon },
  { label: 'SUN', icon: sunHeadlineIcon },
  { label: 'NO ICON', icon: null },
] as const;

/**
 * Контент-цепочка по умолчанию: две компактные строки `AiToolSimple` и две
 * полные `AiTool` с длительностью — повторяет дефолтный контент Figma-макета
 * Chain Of Thoughts.
 */
export const chainContentPreset = (
  <>
    <AiToolSimple name='status_for_users' icon={AI_TOOL_ICON_TYPE.Search} connector />
    <AiToolSimple name='status_for_users' icon={AI_TOOL_ICON_TYPE.Search} connector />
    <AiTool
      name='status_for_users'
      icon={AI_TOOL_ICON_TYPE.Search}
      state={AI_TOOL_STATUS_STATE.Success}
      duration={CHAIN_DURATION}
      connector
      call='{ "user_ids": [1, 2, 3] }'
    />
    <AiTool
      name='status_for_users'
      icon={AI_TOOL_ICON_TYPE.Search}
      state={AI_TOOL_STATUS_STATE.Success}
      duration={CHAIN_DURATION}
      call='{ "user_ids": [4, 5, 6] }'
    />
  </>
);
