import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Modal } from '@ds/modal';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, usePreviewTheme } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { resolveModalStoryMediaSrc, ThemedModalMedia } from '../ThemedModalMedia';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/Modal/Examples/WithMedia',
  component: Modal,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Modal>;

function WithMediaScenario() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveModalStoryMediaSrc(previewTheme);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithMedia</DemoTitle>
        <DemoHint>Слот media — заглавная картинка над текстом. Адаптируется под текущую тему.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.modal.triggerOpen}
            label='Open welcome modal'
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
        width='m'
        media={<ThemedModalMedia src={storyMediaSrc} />}
        title='Добро пожаловать'
        subtitle='Кратко о том, что изменилось в этой версии.'
        content='Список ключевых улучшений и ссылки на подробности могут размещаться в теле.'
        footer={
          <ButtonGroup primaryAction={{ label: 'Готово', view: 'filled', appearance: 'primary', onClick: close }} />
        }
      />
    </DemoPage>
  );
}

export const WithMedia: Story = {
  tags: ['dev', 'test'],
  render: () => <WithMediaScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.modal.triggerOpen)).toBeVisible();
  },
};
