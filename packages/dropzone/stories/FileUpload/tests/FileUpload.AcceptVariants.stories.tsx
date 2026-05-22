import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { FileUpload, UPLOAD_MODE } from '../../../src';
import { TEST_IDS } from '../../testIds';

// Baked-args fixtures для e2e-проверки проброса `accept` в нативный input.
// URL-args не справляются со значениями типа `image/*` и `.pdf,.doc` (Storybook arg-парсер
// либо рубит `/`, либо трактует `,` как array-разделитель). Поэтому фиксируем варианты
// отдельными story-экспортами с baked args.
const meta: Meta<typeof FileUpload> = {
  title: 'Components/Dropzone/FileUpload/Tests/AcceptVariants',
  component: FileUpload,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onFilesUpload: () => {},
    mode: UPLOAD_MODE.Multiple,
    'data-test-id': TEST_IDS.fileUpload.root,
    children: <Button label='Upload' />,
  },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const AcceptImage: Story = {
  tags: ['test', 'dev'],
  args: { accept: 'image/*' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AcceptImage</DemoTitle>
        <DemoHint>{'Проброс accept=image/* в нативный input.'}</DemoHint>
        <DemoActions align='center'>
          <FileUpload {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const AcceptPdfDoc: Story = {
  tags: ['test', 'dev'],
  args: { accept: '.pdf,.doc' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AcceptPdfDoc</DemoTitle>
        <DemoHint>{'Проброс accept=.pdf,.doc в нативный input.'}</DemoHint>
        <DemoActions align='center'>
          <FileUpload {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
