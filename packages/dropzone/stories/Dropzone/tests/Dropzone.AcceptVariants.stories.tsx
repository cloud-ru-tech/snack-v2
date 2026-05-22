import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Dropzone } from '../../../src';
import { TEST_IDS } from '../../testIds';
import { SlotContent } from '../SlotContent';

// Baked-args fixtures для e2e-проверки проброса `accept` в нативный input.
// Через URL-args значения с `/` и `*` ненадёжно доходят до Storybook'овского
// arg-парсера, поэтому фиксируем варианты значений отдельными story-экспортами.
const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone/Dropzone/Tests/AcceptVariants',
  component: Dropzone,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    'data-test-id': TEST_IDS.dropzone.root,
    onFilesUpload: () => {},
    children: <SlotContent />,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AcceptVariants</DemoTitle>
        <DemoHint>{'Проброс accept в нативный input Dropzone.'}</DemoHint>
        <DemoActions align='center'>
          <Dropzone {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;
type Story = StoryObj<typeof Dropzone>;

export const AcceptImage: Story = {
  tags: ['test', 'dev'],
  args: { accept: 'image/*' },
};
