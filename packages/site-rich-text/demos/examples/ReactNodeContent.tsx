import { RichText } from '@ds/site-rich-text';

export function ReactNodeContent() {
  return (
    <RichText
      content={
        <p>
          Облачная платформа для <a href='https://cloud.ru'>разработки и запуска</a> приложений.
        </p>
      }
    />
  );
}
