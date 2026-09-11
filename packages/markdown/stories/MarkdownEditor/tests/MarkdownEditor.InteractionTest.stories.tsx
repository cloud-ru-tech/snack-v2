import { MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { headingOptionTestId, tableCellTestId, TEST_IDS, toolbarButtonTestId } from '../../testIds';

const SAMPLE = '# Hello\n\nSome paragraph.';

// Минимальный набор тестируемых кнопок — чтобы все умещались в тулбар и не уходили в overflow.
const TOOLBAR = [TOOLBAR_ITEM.Heading, TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Link, TOOLBAR_ITEM.Table, TOOLBAR_ITEM.Image];

// Выделяет подстроку в contenteditable; selectionchange диспатчим сами, чтобы ProseMirror синхронизировал state сразу.
function selectText(editable: HTMLElement, text: string) {
  const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const index = node.textContent?.indexOf(text) ?? -1;

    if (index >= 0) {
      editable.focus();
      document.getSelection()?.setBaseAndExtent(node, index, node, index + text.length);
      document.dispatchEvent(new Event('selectionchange'));
      return;
    }
  }

  throw new Error(`Text "${text}" not found in editor`);
}

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

    await step('Link modal: editing an existing link updates its text and href independently', async () => {
      const linkButton = canvas.getByTestId(toolbarButtonTestId(TOOLBAR_ITEM.Link));

      selectText(editable, 'paragraph');
      await userEvent.click(linkButton);
      const urlInput = body.getByTestId(TEST_IDS.linkModalUrl).querySelector('input') as HTMLInputElement;
      await userEvent.type(urlInput, 'https://example.com');
      await userEvent.click(body.getByTestId(TEST_IDS.linkModalAdd));
      await waitFor(() => expect(editable.querySelector('a')).toHaveTextContent('paragraph'));

      selectText(editable, 'paragraph');
      await userEvent.click(linkButton);
      const titleInput = body.getByTestId(TEST_IDS.linkModalTitle).querySelector('input') as HTMLInputElement;
      await expect(titleInput).toHaveValue('paragraph');
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'docs');
      await userEvent.click(body.getByTestId(TEST_IDS.linkModalAdd));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.linkModal)).toBeNull());

      await expect(editable.querySelector('a')).toHaveTextContent(/^docs$/);
      await expect(editable.querySelector('a')).toHaveAttribute('href', 'https://example.com');

      selectText(editable, 'docs');
      await userEvent.click(linkButton);
      const editUrlInput = body.getByTestId(TEST_IDS.linkModalUrl).querySelector('input') as HTMLInputElement;
      await expect(editUrlInput).toHaveValue('https://example.com');
      await userEvent.clear(editUrlInput);
      await userEvent.type(editUrlInput, 'https://example.org');
      await userEvent.click(body.getByTestId(TEST_IDS.linkModalAdd));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.linkModal)).toBeNull());

      // В документе есть ещё ссылка из raw-шага — адресуем правленую по href.
      await expect(editable.querySelector('a[href="https://example.com"]')).toBeNull();
      await expect(editable.querySelector('a[href="https://example.org"]')).toHaveTextContent(/^docs$/);
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
