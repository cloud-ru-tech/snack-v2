import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle, usePreviewTheme } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { resolveDrawerStoryMediaSrc, ThemedDrawerMedia } from '../ThemedDrawerMedia';

function WithMediaScenario() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const previewTheme = usePreviewTheme();
  const storyMediaSrc = resolveDrawerStoryMediaSrc(previewTheme);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithMedia</DemoTitle>
        <DemoHint>Слот media — заглавная картинка над текстом. Адаптируется под текущую тему.</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Open onboarding drawer'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Drawer
        data-test-id={TEST_IDS.drawer.root}
        open={open}
        position='right'
        width='m'
        onClose={close}
        media={<ThemedDrawerMedia src={storyMediaSrc} />}
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

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Examples/WithMedia',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const WithMedia: Story = {
  tags: ['dev', 'test'],
  render: () => <WithMediaScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
