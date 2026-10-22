import { AiAttachment, ATTACHMENT_TYPE } from '@ds/ai-attachment';
import { AiFieldBanner, VARIANT } from '@ds/ai-field-banner';
import {
  ACTION_LIST_ITEM_TYPE,
  AiFieldInputActionListItem,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputFooterMenuItem,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSearchPlaceholder,
  AiFieldInputSettingsButton,
  AiFieldInputValue,
  AiFieldInputVoiceButton,
  SEARCH_TRIGGER,
  useAiFieldInputActions,
} from '@ds/ai-field-input';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { useState } from 'react';

import { aiFieldInputStoriesLocale } from './locale';

type StoryTexts = {
  placeholder: string;
  disabledPlaceholder: string;
  slashPlaceholder: string;
  searchPlaceholder: AiFieldInputSearchPlaceholder;
  valueText: AiFieldInputValue;
  valueTextAndSkill: AiFieldInputValue;
  valueSkill: AiFieldInputValue;
  skills: AiFieldInputActionListItem[];
  mentions: AiFieldInputActionListItem[];
  back: string;
  command(index: number): string;
  modelName: string;
  modelNameLong: string;
  effortLevel: string;
  menus: {
    plus: AiFieldInputFooterMenuItem[];
    settings: AiFieldInputFooterMenuItem[];
    models: AiFieldInputFooterMenuItem[];
    efforts: AiFieldInputFooterMenuItem[];
  };
  tooltips: { plus: string; settings: string; model: string; effort: string; context: string; voice: string };
  banner: { content: string; action: string };
  sentMessages(count: number): string;
};

const MODEL_NAMES = [
  'GigaChat 2 Max',
  'GigaChat 2 Pro',
  'GigaChat 2 Lite',
  'GigaChat Max',
  'GigaChat Pro',
  'GigaChat Lite',
  'GigaChat Vision',
  'GigaChat Embeddings',
];

/** Демо-тексты stories на текущем языке Storybook (переключатель языка в тулбаре). */
export function useStoryTexts(): StoryTexts {
  const { t } = aiFieldInputStoriesLocale.useTranslations();

  return {
    placeholder: t('placeholder'),
    disabledPlaceholder: t('disabledPlaceholder'),
    slashPlaceholder: t('slashPlaceholder'),
    searchPlaceholder: { skill: t('searchSkill'), mention: t('searchMention') },
    valueText: [{ type: 'text', text: t('longText') }],
    valueTextAndSkill: [
      { type: 'text', text: t('reportStart') },
      { type: 'skill', id: 'summarize', label: 'summarize' },
      { type: 'text', text: ` ${t('reportParams')}${t('reportMiddle')}` },
      { type: 'mention', id: 'team', label: t('team') },
    ],
    valueSkill: [{ type: 'skill', id: 'summarize', label: 'summarize', paramsPlaceholder: '' }],
    skills: [
      { id: 'summarize', label: 'summarize', caption: t('summarizeCaption'), shortcut: '⌘ S', paramsPlaceholder: '' },
      {
        id: 'translate',
        label: 'translate',
        caption: t('translateCaption'),
        shortcut: '⌘ T',
        paramsPlaceholder: t('translateParams'),
      },
      { id: 'review', label: 'review', caption: t('reviewCaption') },
      {
        id: 'agents',
        label: t('agents'),
        caption: '3',
        type: ACTION_LIST_ITEM_TYPE.DrillDown,
        items: [
          { id: 'hermes', label: t('agentHermes') },
          { id: 'analyst', label: t('agentAnalyst') },
          { id: 'reviewer', label: t('agentReviewer') },
        ],
      },
    ],
    mentions: [
      { id: 'team', label: t('team'), caption: t('teamCaption') },
      { id: 'docs', label: t('docs'), caption: t('docsCaption') },
    ],
    back: t('back'),
    command: index => t('command', { index }),
    modelName: 'GigaChat 2 Max',
    modelNameLong: t('modelNameLong'),
    effortLevel: t('effortLevel'),
    menus: {
      plus: [
        { id: 'files', label: t('plusFiles'), description: t('plusFilesCaption') },
        { id: 'skills', label: t('plusSkills'), description: t('plusSkillsCaption') },
        { id: 'connectors', label: t('plusConnectors'), description: t('plusConnectorsCaption') },
      ],
      settings: [
        { id: 'chat', label: t('settingsChat'), description: t('settingsChatCaption') },
        { id: 'memory', label: t('settingsMemory'), description: t('settingsMemoryCaption') },
        { id: 'instructions', label: t('settingsInstructions'), description: t('settingsInstructionsCaption') },
      ],
      models: MODEL_NAMES.map(name => ({ id: name, label: name })),
      efforts: [
        { id: 'low', label: t('effortLow') },
        { id: 'medium', label: t('effortMedium') },
        { id: 'high', label: t('effortLevel') },
        { id: 'max', label: t('effortMax') },
      ],
    },
    tooltips: {
      plus: t('tooltipPlus'),
      settings: t('tooltipSettings'),
      model: t('tooltipModel'),
      effort: t('tooltipEffort'),
      context: t('tooltipContext'),
      voice: t('tooltipVoice'),
    },
    banner: { content: t('bannerContent'), action: t('bannerAction') },
    sentMessages: count => t('sentMessages', { count }),
  };
}

type FooterLeftActionsProps = {
  onPlusSelect?(id: string): void;
  onSettingsSelect?(id: string): void;
  /** Поиск в списке моделей. */
  modelSearchable?: boolean;
};

export function FooterLeftActions({ onPlusSelect, onSettingsSelect, modelSearchable }: FooterLeftActionsProps) {
  const { menus, tooltips } = useStoryTexts();
  const { openActionList } = useAiFieldInputActions();
  const [modelId, setModelId] = useState(menus.models[0].id);
  const [effortId, setEffortId] = useState('high');

  const modelLabel = menus.models.find(item => item.id === modelId)?.label ?? modelId;
  const effortLabel = menus.efforts.find(item => item.id === effortId)?.label ?? effortId;

  const handlePlusSelect = (id: string) => {
    if (id === 'skills') openActionList(SEARCH_TRIGGER.Skill);
    if (id === 'connectors') openActionList(SEARCH_TRIGGER.Mention);
    onPlusSelect?.(id);
  };

  return (
    <>
      <AiFieldInputPlusButton
        items={menus.plus}
        tooltip={{ content: tooltips.plus, shortcut: '⌘ /' }}
        onSelect={handlePlusSelect}
      />
      <AiFieldInputSettingsButton
        items={menus.settings}
        tooltip={{ content: tooltips.settings }}
        onSelect={onSettingsSelect}
      />
      <AiFieldInputModelButton
        label={modelLabel}
        items={menus.models}
        searchable={modelSearchable}
        tooltip={{ content: tooltips.model, shortcut: '⌘ /' }}
        onSelect={setModelId}
      />
      <AiFieldInputEffortButton
        label={effortLabel}
        items={menus.efforts}
        tooltip={{ content: tooltips.effort, shortcut: '⌘ /' }}
        onSelect={setEffortId}
      />
    </>
  );
}

export function FooterRightActions({ contextValue = 15 }: { contextValue?: number }) {
  const { tooltips } = useStoryTexts();

  return (
    <>
      <AiFieldInputContextButton value={contextValue} tooltip={{ content: tooltips.context, shortcut: '⌘ /' }} />
      <AiFieldInputVoiceButton tooltip={{ content: tooltips.voice }} />
    </>
  );
}

export function Attachments({ count = 10 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <AiAttachment key={index} type={ATTACHMENT_TYPE.File} fileName={`document-${index + 1}.pdf`} tooltip='PDF' />
      ))}
    </>
  );
}

type DemoBannerProps = {
  onClose?(): void;
};

export function DemoBanner({ onClose }: DemoBannerProps) {
  const { banner } = useStoryTexts();

  return (
    <AiFieldBanner
      variant={VARIANT.Information}
      icon={<PlaceholderSVG />}
      content={banner.content}
      actionLabel={banner.action}
      onClose={onClose}
    />
  );
}
