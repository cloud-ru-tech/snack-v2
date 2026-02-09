import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import readme from '../README.md?raw';
import { Block, BlockProps, SIZE, VARIANT } from '../src';
import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
  parameters: {
    readme: { content: readme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=10940-24646&p=f&m=dev',
    },
  },
  args: {},
};

export default meta;

type StoryProps = BlockProps & {
  showBackground: boolean;
};

type Story = StoryObj<StoryProps>;

function SampleContent() {
  return <span className={styles.sampleContent}># slot content</span>;
}

const Template: StoryFn<StoryProps> = ({ showBackground }: StoryProps) => (
  <div className={styles.externalWrapper} data-show-background={showBackground || undefined}>
    <div className={styles.wrapper}>
      {Object.values(VARIANT).map(variant => (
        <div key={variant} className={styles.column}>
          {Object.values(SIZE).map(size => (
            <div key={size} className={styles.cell}>
              <Block key={variant} variant={variant} size={size}>
                <SampleContent />
              </Block>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  args: {
    showBackground: true,
  },
  argTypes: {
    showBackground: {
      name: '[Stories]: Show colorful background',
    },
  },
  render: Template,
};
