import { AiSuggestionParent, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { matrixCellTestId } from './testIds';

const meta: Meta<typeof AiSuggestionParent> = {
  title: 'AI/AiSuggestion/AiSuggestionParent',
  component: AiSuggestionParent,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tCbbB5RUGyJeBRtjF3dt4d/AI-COMPONENTS?node-id=6467-21511',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AiSuggestionParent>;

const sizes = [SIZE.S, SIZE.M] as const;

const sampleItems = [
  { label: 'Option A', icon: <PlaceholderSVG /> },
  { label: 'Option B', icon: <PlaceholderSVG /> },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × expanded (collapsed / open)'
        firstColumnHeader='Size'
        columnHeaders={['Collapsed', 'Expanded']}
        rows={sizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            <AiSuggestionParent
              key={`${size}-collapsed`}
              size={size}
              icon={<PlaceholderSVG />}
              items={sampleItems}
              data-test-id={matrixCellTestId(size, false)}
            />,
            <AiSuggestionParent
              key={`${size}-expanded`}
              size={size}
              icon={<PlaceholderSVG />}
              expanded
              items={sampleItems}
              data-test-id={matrixCellTestId(size, true)}
            />,
          ],
        }))}
      />
    </div>
  ),
};
