import { MarkdownEditor } from '@ds/markdown';
import { PortalContextProvider } from '@ds/portal-context';

const INITIAL = `# Заметка

Печатайте текст и форматируйте его через тулбар. Поддерживается **markdown**.
`;

export function EditorUncontrolled() {
  return (
    <PortalContextProvider>
      <MarkdownEditor defaultValue={INITIAL} placeholder='Начните писать…' />
    </PortalContextProvider>
  );
}
