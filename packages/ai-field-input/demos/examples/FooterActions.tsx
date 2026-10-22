import {
  AiFieldInput,
  AiFieldInputContextButton,
  AiFieldInputEffortButton,
  AiFieldInputModelButton,
  AiFieldInputPlusButton,
  AiFieldInputSettingsButton,
  AiFieldInputVoiceButton,
  SEND_STATE,
  SendState,
} from '@ds/ai-field-input';
import { useState } from 'react';

const PLUS_ITEMS = [
  { id: 'files', label: 'Файлы', description: 'Загрузить с устройства' },
  { id: 'skills', label: 'Скиллы', description: 'Добавить скилл в запрос' },
  { id: 'connectors', label: 'Коннекторы', description: 'Внешние источники данных' },
];

const SETTINGS_ITEMS = [
  { id: 'chat', label: 'Настройки чата', description: 'Название, папка и доступ' },
  { id: 'memory', label: 'Память', description: 'Что агент помнит о вас' },
];

const MODELS = [
  { id: 'gigachat-2-max', label: 'GigaChat 2 Max' },
  { id: 'gigachat-2-pro', label: 'GigaChat 2 Pro' },
  { id: 'gigachat-2-lite', label: 'GigaChat 2 Lite' },
];

const EFFORTS = [
  { id: 'low', label: 'Низкий' },
  { id: 'medium', label: 'Средний' },
  { id: 'high', label: 'Высокий' },
];

export function FooterActions() {
  const [state, setState] = useState<SendState | undefined>(undefined);
  const [model, setModel] = useState(MODELS[0]);
  const [effort, setEffort] = useState(EFFORTS[2]);

  const handleModelSelect = (id: string) => setModel(MODELS.find(item => item.id === id) ?? MODELS[0]);
  const handleEffortSelect = (id: string) => setEffort(EFFORTS.find(item => item.id === id) ?? EFFORTS[2]);

  return (
    <AiFieldInput
      defaultValue={[{ type: 'text', text: 'Сгенерируй план релиза' }]}
      footerLeftActions={
        <>
          <AiFieldInputPlusButton
            items={PLUS_ITEMS}
            tooltip={{ content: 'Файлы, скиллы и коннекторы', shortcut: '⌘ /' }}
          />
          <AiFieldInputSettingsButton items={SETTINGS_ITEMS} tooltip={{ content: 'Настройки' }} />
          <AiFieldInputModelButton
            label={model.label}
            items={MODELS}
            tooltip={{ content: 'Выбор модели' }}
            onSelect={handleModelSelect}
          />
          <AiFieldInputEffortButton
            label={effort.label}
            items={EFFORTS}
            tooltip={{ content: 'Уровень усилий' }}
            onSelect={handleEffortSelect}
          />
        </>
      }
      footerRightActions={
        <>
          <AiFieldInputContextButton value={82} tooltip={{ content: 'Лимит: 82%' }} />
          <AiFieldInputVoiceButton tooltip={{ content: 'Голосовой ввод' }} />
        </>
      }
      send={{
        state,
        onClick: current => setState(current === SEND_STATE.Stop ? undefined : SEND_STATE.Stop),
      }}
    />
  );
}
