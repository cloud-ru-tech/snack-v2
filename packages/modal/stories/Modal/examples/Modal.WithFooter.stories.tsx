import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal/Examples/WithFooter',
  component: Modal,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Modal>;

function WithFooterScenario() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithFooter</DemoTitle>
        <DemoHint>
          Подтверждение деструктивного действия. Футер содержит critical-primary + neutral-secondary action.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.modal.triggerOpen}
            label='Open confirm dialog'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Modal
        data-test-id={TEST_IDS.modal.root}
        open={open}
        onClose={close}
        title='Удалить запись'
        subtitle='Действие необратимо. Связанные данные также будут удалены.'
        content='После подтверждения запись и все её ссылки исчезнут из списка.'
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Удалить', appearance: 'critical', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </DemoPage>
  );
}

export const WithFooter: Story = {
  tags: ['dev', 'test'],
  render: () => <WithFooterScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.modal.triggerOpen)).toBeVisible();
  },
};
