import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const marks = {
  0: '0',
  50: '50',
  100: '100',
};

function Wrap({ children }: { children: JSX.Element }) {
  return <div className={styles.item}>{children}</div>;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Mode × State'
        firstColumnHeader='Mode'
        columnHeaders={['default', 'disabled']}
        rows={[
          {
            variantLabel: 'single',
            cells: [
              <Wrap key='single-default'>
                <Slider min={0} max={100} defaultValue={40} />
              </Wrap>,
              <Wrap key='single-disabled'>
                <Slider min={0} max={100} defaultValue={40} disabled />
              </Wrap>,
            ],
          },
          {
            variantLabel: 'range',
            cells: [
              <Wrap key='range-default'>
                <Slider range min={0} max={100} defaultValue={[20, 70]} />
              </Wrap>,
              <Wrap key='range-disabled'>
                <Slider range min={0} max={100} defaultValue={[20, 70]} disabled />
              </Wrap>,
            ],
          },
          {
            variantLabel: 'with marks',
            cells: [
              <Wrap key='marks-default'>
                <Slider min={0} max={100} step={50} marks={marks} defaultValue={50} />
              </Wrap>,
              <Wrap key='marks-disabled'>
                <Slider min={0} max={100} step={50} marks={marks} defaultValue={50} disabled />
              </Wrap>,
            ],
          },
        ]}
      />
    </div>
  ),
};
