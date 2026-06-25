import { MarkdownEditor } from '@ds/markdown';

const INITIAL = `# Заметка

Печатайте текст и форматируйте его через тулбар. Поддерживается **markdown**.
`;

export function EditorUncontrolled() {
  return <MarkdownEditor defaultValue={INITIAL} placeholder='Начните писать…' />;
}
