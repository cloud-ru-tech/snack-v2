import { RichText } from '@ds/site-rich-text';

const HTML = [
  '<ul><li>Виртуальные машины</li><li>Managed Kubernetes</li></ul>',
  '<ol><li>Создайте проект</li><li>Подключите репозиторий</li></ol>',
].join('');

export function Lists() {
  return <RichText content={HTML} />;
}
