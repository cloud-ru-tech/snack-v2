export const SIZE = {
  S: 's',
  M: 'm',
} as const;

export const TEST_IDS = {
  root: 'ai-suggestion-panel',
  logo: 'ai-suggestion-panel__logo',
  logoTooltip: 'ai-suggestion-panel__logo-tooltip',
  tooltipTitle: 'ai-suggestion-panel__tooltip-title',
  tooltipDescription: 'ai-suggestion-panel__tooltip-description',
  documentationLink: 'ai-suggestion-panel__documentation-link',
  /** Сегмент вопроса; конкретный вопрос адресуется по `data-value`. */
  item: 'ai-suggestion-panel__item',
  itemLoader: 'ai-suggestion-panel__item-loader',
  more: 'ai-suggestion-panel__more',
  moreList: 'ai-suggestion-panel__more-list',
  moreListItem: 'ai-suggestion-panel__more-list-item',
  close: 'ai-suggestion-panel__close',
} as const;

/** Документация ассистента — ссылка в тултипе кнопки Giga по умолчанию. */
export const AI_DOCS_URL = 'https://cloud.ru/docs/ai_assistant_cloudia/ug/index';
