import { MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { headingOptionTestId, tableCellTestId, TEST_IDS, toolbarButtonTestId } from '../../testIds';

const SAMPLE = '# Hello\n\nSome paragraph.';

// Минимальный набор тестируемых кнопок — чтобы все умещались в тулбар и не уходили в overflow.
const TOOLBAR = [TOOLBAR_ITEM.Heading, TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Link, TOOLBAR_ITEM.Table, TOOLBAR_ITEM.Image];

const meta: Meta<typeof MarkdownEditor> = {
  title: 'Components/Markdown/MarkdownEditor/Tests/Interaction',
  component: MarkdownEditor,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    defaultValue: SAMPLE,
    toolbar: TOOLBAR,
    onChange: fn(),
    onPreviewChange: fn(),
    'data-test-id': TEST_IDS.editor,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Тулбар (bold), heading-дропдаун, table-picker, clear и preview-тогл.</DemoHint>
        <DemoActions align='start'>
          <MarkdownEditor {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const root = canvas.getByTestId(TEST_IDS.editor);

    await step('default (preview off): raw textarea editable, toolbar active', async () => {
      await expect(canvas.getByTestId(TEST_IDS.editorHeader)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.editorPreviewToggle)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.editorLabel)).toBeVisible();
      // Очистка — overlay, видна при наличии значения.
      await expect(canvas.getByTestId(TEST_IDS.editorClear)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.toolbar)).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.editorRawInput)).toBeVisible();
      await expect(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Bold))).toBeEnabled();
    });

    await step('raw mode: Ctrl+B hotkey wraps the selection with ** (toolbar hotkeys work in raw)', async () => {
      const textarea = canvas.getByTestId(TEST_IDS.editorRawInput) as HTMLTextAreaElement;
      textarea.focus();
      // SAMPLE = '# Hello\n\nSome paragraph.' — выделяем слово «Hello» (индексы 2..7).
      textarea.setSelectionRange(2, 7);
      // Хоткей, а не клик: в raw-режиме keymap TipTap не работает (textarea), биндинг вешает
      // сам тулбар. fireEvent (а не userEvent) — детерминированный keydown с модификатором.
      fireEvent.keyDown(textarea, { key: 'b', code: 'KeyB', ctrlKey: true });
      await waitFor(() =>
        expect((canvas.getByTestId(TEST_IDS.editorRawInput) as HTMLTextAreaElement).value).toContain('**Hello**'),
      );
    });

    await step('raw mode: Link inserts raw markdown `[..](..)` without opening the modal', async () => {
      const textarea = canvas.getByTestId(TEST_IDS.editorRawInput) as HTMLTextAreaElement;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      await userEvent.click(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Link)));
      // Модалка не открывается; в textarea появляется markdown-шаблон ссылки.
      await expect(body.queryByTestId(TEST_IDS.linkModal)).toBeNull();
      await waitFor(() =>
        expect((canvas.getByTestId(TEST_IDS.editorRawInput) as HTMLTextAreaElement).value).toMatch(/\]\(/),
      );
    });

    await step('Preview toggle shows editable WYSIWYG with active toolbar', async () => {
      const native = canvas.getByTestId(`${TEST_IDS.editorPreviewToggle}-native-input`);
      await userEvent.click(native);
      expect(args.onPreviewChange).toHaveBeenCalledWith(true);
      await expect(root).toHaveAttribute('data-preview', 'true');
      // preview=true: форматированный WYSIWYG, тулбар активен.
      await expect(canvas.getByTestId(TEST_IDS.editorContent)).toBeVisible();
      await expect(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Bold))).toBeEnabled();
    });

    // contenteditable от ProseMirror не имеет (и не может иметь) data-test-id — фокусируем напрямую.
    const editable = canvas.getByTestId(TEST_IDS.editorContent).querySelector('.ProseMirror') as HTMLElement;

    await step('Bold toggles active state on the selected text', async () => {
      editable.focus();
      await userEvent.keyboard('{Control>}a{/Control}');
      const bold = canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Bold));
      await userEvent.click(bold);
      await waitFor(() => expect(bold).toHaveAttribute('data-checked', 'true'));
      await userEvent.click(bold);
      await waitFor(() => expect(bold).not.toHaveAttribute('data-checked'));
    });

    await step('Heading dropdown opens and applies H2', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.toolbarHeading));
      await expect(body.getByTestId(TEST_IDS.headingDropdown)).toBeVisible();
      await userEvent.click(body.getByTestId(headingOptionTestId(2)));
      await expect(body.queryByTestId(TEST_IDS.headingDropdown)).toBeNull();
    });

    await step('Table picker opens and inserts a 2×3 table', async () => {
      await userEvent.click(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Table)));
      await expect(body.getByTestId(TEST_IDS.tableGridPicker)).toBeVisible();
      await userEvent.click(body.getByTestId(tableCellTestId(2, 3)));
      await waitFor(() => expect(editable.querySelector('table')).toBeTruthy());
    });

    await step('Customize table opens the modal and Add inserts a table', async () => {
      await userEvent.click(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Table)));
      await userEvent.click(body.getByTestId(TEST_IDS.tableCustomize));
      await expect(body.getByTestId(TEST_IDS.customizeModal)).toBeVisible();
      await userEvent.click(body.getByTestId(TEST_IDS.customizeAdd));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.customizeModal)).toBeNull());
      await waitFor(() => expect(editable.querySelector('table')).toBeTruthy());
    });

    await step('Link modal opens, fills URL and closes on Add', async () => {
      await userEvent.click(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Link)));
      await expect(body.getByTestId(TEST_IDS.linkModal)).toBeVisible();
      const input = body.getByTestId(TEST_IDS.linkModalUrl).querySelector('input') as HTMLInputElement;
      await userEvent.type(input, 'https://example.com');
      await userEvent.click(body.getByTestId(TEST_IDS.linkModalAdd));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.linkModal)).toBeNull());
    });

    await step('Image modal opens, fills URL and closes on Add', async () => {
      await userEvent.click(canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Image)));
      await expect(body.getByTestId(TEST_IDS.imageModal)).toBeVisible();
      const input = body.getByTestId(TEST_IDS.imageModalUrl).querySelector('input') as HTMLInputElement;
      await userEvent.type(input, 'https://example.com/a.png');
      await userEvent.click(body.getByTestId(TEST_IDS.imageModalAdd));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.imageModal)).toBeNull());
    });

    await step('Clear empties the editor and notifies onChange', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.editorClear));
      await waitFor(() => expect(args.onChange).toHaveBeenCalled());
      await expect(canvas.queryByTestId(TEST_IDS.editorClear)).toBeNull();
    });
  },
};
