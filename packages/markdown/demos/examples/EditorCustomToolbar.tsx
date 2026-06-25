import { MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown';

const INITIAL = `Оставьте в тулбаре только нужные кнопки через \`toolbar\`.
`;

export function EditorCustomToolbar() {
  return (
    <MarkdownEditor
      defaultValue={INITIAL}
      label='Комментарий'
      toolbar={[TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Italic, TOOLBAR_ITEM.Link, TOOLBAR_ITEM.BulletList]}
    />
  );
}
