import { Markdown } from '@ds/markdown';

const SOURCE = `# Релиз 2.0

Поддерживается **GFM**: таблицы, ~~зачёркивание~~, списки задач и подсветка кода.

| Сервис   | Статус   |
|----------|----------|
| API      | стабилен |
| Realtime | beta     |

\`\`\`ts
export function greet(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`
`;

export function Viewer() {
  return <Markdown value={SOURCE} />;
}
