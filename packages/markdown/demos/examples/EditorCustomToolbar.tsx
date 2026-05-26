import { MarkdownEditor, TOOLBAR_ITEM } from '@ds/markdown';
import { PortalContextProvider } from '@ds/portal-context';

const INITIAL = `Оставьте в тулбаре только нужные кнопки через \`toolbar\`.
`;

export function EditorCustomToolbar() {
  return (
    <PortalContextProvider>
      <MarkdownEditor
        defaultValue={INITIAL}
        label='Комментарий'
        toolbar={[TOOLBAR_ITEM.Bold, TOOLBAR_ITEM.Italic, TOOLBAR_ITEM.Link, TOOLBAR_ITEM.BulletList]}
      />
    </PortalContextProvider>
  );
}
