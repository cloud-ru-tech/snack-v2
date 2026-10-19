import { defineLocale, defineMessages } from '@ds/locale';

const AI_SUGGESTION_PANEL_MESSAGES = defineMessages({
  'en-GB': {
    tooltipTitle: 'Giga assistant',
    tooltipDescription: 'AI assistant in the cloud',
    documentationLink: 'Documentation',
    close: 'Hide suggestions',
    more: 'More questions: {{count}}',
  },
  'ru-RU': {
    tooltipTitle: 'Гига-помощник',
    tooltipDescription: 'ИИ-помощник в облаке',
    documentationLink: 'Документация',
    close: 'Скрыть подсказки',
    more: 'Ещё вопросы: {{count}}',
  },
});

/** Форма словаря — для типизации сервисных оверрайдов/новых языков. */
export type AiSuggestionPanelMessages = (typeof AI_SUGGESTION_PANEL_MESSAGES)['en-GB'];

/** locale компонента AiSuggestionPanel: `aiSuggestionPanelLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const aiSuggestionPanelLocale = defineLocale('@ds/ai-suggestion-panel', AI_SUGGESTION_PANEL_MESSAGES);
