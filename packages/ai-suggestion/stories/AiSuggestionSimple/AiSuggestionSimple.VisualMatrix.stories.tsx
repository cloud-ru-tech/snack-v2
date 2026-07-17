import { AiSuggestionSimple, APPEARANCE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { matrixCellTestId } from './testIds';

const meta: Meta<typeof AiSuggestionSimple> = {
  title: 'AI/AiSuggestion/AiSuggestionSimple',
  component: AiSuggestionSimple,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tCbbB5RUGyJeBRtjF3dt4d/AI-COMPONENTS?node-id=6450-3666',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AiSuggestionSimple>;

const sizes = [SIZE.S, SIZE.M] as const;
const appearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={sizes.map(size => size.toUpperCase())}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: sizes.map(size => (
            <AiSuggestionSimple
              key={`${appearance}-${size}`}
              appearance={appearance}
              size={size}
              icon={<PlaceholderSVG />}
              data-test-id={matrixCellTestId(appearance, size)}
            />
          )),
        }))}
      />
    </div>
  ),
};
