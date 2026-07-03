import { MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const SAMPLE = `# Hello editor

Параграф с **жирным**, *курсивом* и \`inline code\`.

- one
- two
`;

const FULL_TOOLBAR = Object.values(TOOLBAR_ITEM);

const meta: Meta<typeof MarkdownEditor> = {
  title: 'Components/Markdown/MarkdownEditor',
  component: MarkdownEditor,
  parameters: { layout: 'fullscreen' },
  args: {
    defaultValue: SAMPLE,
    placeholder: 'Начните писать…',
    defaultPreview: true,
    label: 'Markdown field',
    previewLabel: 'Preview',
    hideHeader: false,
    spellCheck: true,
    toolbar: FULL_TOOLBAR,
    onChange: fn(),
    onPreviewChange: fn(),
    'data-test-id': TEST_IDS.editor,
  },
  argTypes: {
    toolbar: {
      control: 'select',
      // toolbar — массив ToolbarItemId[] | false; редактировать его в панели нельзя,
      // поэтому даём готовые пресеты как slot-mapping.
      options: ['full', 'minimal', 'inline-only', 'hidden'],
      mapping: {
        full: FULL_TOOLBAR,
        minimal: [TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Italic, TOOLBAR_ITEM.Link, TOOLBAR_ITEM.BulletList],
        'inline-only': [TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Italic, TOOLBAR_ITEM.Strikethrough, TOOLBAR_ITEM.InlineCode],
        hidden: false,
      },
    },
    // Контролы и описания docgen выводит из типов + JSDoc — вручную перечисляем только
    // то, что docgen не знает: пресеты тулбара, скрытые пропы, controlled-партнёр value.
    preview: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onPreviewChange: { table: { disable: true } },
    value: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>MarkdownEditor</DemoTitle>
        <DemoHint>WYSIWYG-редактор markdown с тулбаром и preview-тоглом.</DemoHint>
        <DemoActions align='start'>
          <DemoResizable width='fit'>
            <MarkdownEditor {...args} />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByTestId(TEST_IDS.editor);
    await expect(root).toBeVisible();
  },
};
