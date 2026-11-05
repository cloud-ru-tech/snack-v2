import { RichText } from '@ds/site-rich-text';

const HTML = '<p>Облачная платформа для <a href="https://cloud.ru">разработки и запуска</a> приложений.</p>';

export function HtmlString() {
  return <RichText content={HTML} />;
}
