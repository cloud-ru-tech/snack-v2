import { AiSuggestionPanel, AiSuggestionPanelItem } from '@ds/ai-suggestion-panel';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { QUESTIONS } from '../constants';

const meta: Meta<typeof AiSuggestionPanel> = {
  title: 'AI/AiSuggestionPanel/Examples/LoadingFlow',
  component: AiSuggestionPanel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AiSuggestionPanel>;

/** Время «ответа ассистента» в демо. */
const ANSWER_DELAY_MS = 2000;

function LoadingFlowDemo() {
  const [pendingValue, setPendingValue] = useState<string>();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!pendingValue) return;

    const timer = setTimeout(() => setPendingValue(undefined), ANSWER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [pendingValue]);

  const items: AiSuggestionPanelItem[] = QUESTIONS.map(question => ({
    ...question,
    loading: question.value === pendingValue,
  }));

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>LoadingFlow</DemoTitle>
        <DemoHint>Нажатый вопрос переходит в Loading, пока ассистент отвечает; крестик скрывает полосу.</DemoHint>
        <DemoActions align='start'>
          {visible && (
            <AiSuggestionPanel items={items} onItemClick={setPendingValue} onClose={() => setVisible(false)} />
          )}
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const LoadingFlow: Story = {
  tags: ['dev', 'test'],
  render: () => <LoadingFlowDemo />,
};
