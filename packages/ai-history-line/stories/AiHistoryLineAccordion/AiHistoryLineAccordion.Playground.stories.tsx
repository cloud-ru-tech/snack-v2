import { AiHistoryLineAccordion } from '@ds/ai-history-line';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import styles from './styles.module.scss';

const FORCE_OPEN_TEST_ID = 'ai-history-line-accordion-force-open';

const meta: Meta<typeof AiHistoryLineAccordion> = {
  title: 'Components/AiHistoryLine/AiHistoryLineAccordion',
  component: AiHistoryLineAccordion,
  args: {
    id: 'tools',
    title: '2 вызова инструментов',
    defaultOpen: false,
    children: 'Содержимое группы',
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineAccordion>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.card}>
      <AiHistoryLineAccordion {...args} />
    </div>
  ),
};

function ControlledAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card}>
      <button type='button' data-test-id={FORCE_OPEN_TEST_ID} onClick={() => setOpen(true)}>
        Открыть извне
      </button>
      <AiHistoryLineAccordion id='tools' title='2 вызова инструментов' open={open} onOpenChange={setOpen}>
        Содержимое группы
      </AiHistoryLineAccordion>
    </div>
  );
}

export const Controlled: Story = {
  tags: ['dev', 'test'],
  parameters: { controls: { disable: true } },
  render: () => <ControlledAccordion />,
};
