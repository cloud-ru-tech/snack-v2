import { AiFieldBanner } from '@ds/ai-field-banner';
import { ACTION_LIST_ITEM_TYPE, AiFieldInput, AiFieldInputActionListItem, AiFieldInputValue } from '@ds/ai-field-input';
import { useState } from 'react';

const SKILLS: AiFieldInputActionListItem[] = [
  { id: 'summarize', label: 'summarize', caption: 'Краткое содержание', shortcut: '⌘ S' },
  { id: 'translate', label: 'translate', caption: 'Перевод текста' },
  {
    id: 'agents',
    label: 'Агенты',
    caption: '2',
    type: ACTION_LIST_ITEM_TYPE.DrillDown,
    backLabel: 'К списку команд',
    items: [
      { id: 'hermes', label: 'Гермес' },
      { id: 'analyst', label: 'Аналитик' },
    ],
  },
];

const MENTIONS: AiFieldInputActionListItem[] = [
  { id: 'team', label: 'команде', caption: 'Группа' },
  { id: 'docs', label: 'документация', caption: 'Пространство' },
];

export function SlashCommands() {
  const [value, setValue] = useState<AiFieldInputValue>([]);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <AiFieldInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue([])}
      placeholder='Введите / для скиллов или @ для упоминаний'
      skills={SKILLS}
      mentions={MENTIONS}
      banner={
        bannerVisible ? (
          <AiFieldBanner content='Агент работает в режиме чтения' onClose={() => setBannerVisible(false)} />
        ) : undefined
      }
    />
  );
}
