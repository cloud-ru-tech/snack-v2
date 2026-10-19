import { LAYOUT_TYPE } from '@ds/adaptive';
import { AiSuggestionPanel, AiSuggestionPanelItem, SIZE } from '@ds/ai-suggestion-panel';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { LayoutScope, StoryTable } from '#storybook/components';

import { QUESTIONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta<typeof AiSuggestionPanel> = {
  title: 'AI/AiSuggestionPanel',
  component: AiSuggestionPanel,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiSuggestionPanel>;

const keySizes = [SIZE.S, SIZE.M] as const;

const [firstQuestion] = QUESTIONS;

const itemStates: { label: string; item: AiSuggestionPanelItem }[] = [
  { label: 'default', item: firstQuestion },
  { label: 'disabled', item: { ...firstQuestion, disabled: true } },
  { label: 'loading', item: { ...firstQuestion, loading: true } },
];

const compositions: { label: string; items: AiSuggestionPanelItem[]; className: string }[] = [
  { label: '1 вопрос', items: QUESTIONS.slice(0, 1), className: styles.wide },
  { label: '2 вопроса', items: QUESTIONS.slice(0, 2), className: styles.wide },
  { label: '5 вопросов, 720px', items: QUESTIONS, className: styles.wide },
  { label: '5 вопросов, 320px', items: QUESTIONS, className: styles.tight },
];

const adaptiveLayouts = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Item state × Size'
        firstColumnHeader='State'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={itemStates.map(({ label, item }) => ({
          variantLabel: label,
          cells: keySizes.map(size => <AiSuggestionPanel key={size} items={[item]} size={size} />),
        }))}
      />

      <StoryTable
        sectionTitle='Состав и перенос в «+N» × Size'
        firstColumnHeader='Состав'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={compositions.map(({ label, items, className }) => ({
          variantLabel: label,
          cells: keySizes.map(size => (
            <div key={size} className={className}>
              <AiSuggestionPanel items={items} size={size} onClose={fn()} />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Layout type (size по пресету раскладки)'
        firstColumnHeader='Layout'
        columnHeaders={['3 вопроса']}
        rows={adaptiveLayouts.map(layoutType => ({
          variantLabel: layoutType,
          cells: [
            <LayoutScope key={layoutType} layoutType={layoutType}>
              <div className={styles.wide}>
                <AiSuggestionPanel items={QUESTIONS.slice(0, 3)} onClose={fn()} />
              </div>
            </LayoutScope>,
          ],
        }))}
      />
    </div>
  ),
};
