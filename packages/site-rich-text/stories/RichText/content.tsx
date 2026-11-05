import { ReactNode } from 'react';

const IMAGE_SRC =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22480%22 height=%2280%22%3E%3Crect width=%22480%22 height=%2280%22 fill=%22%23b0b0b0%22/%3E%3C/svg%3E';
const LONG_URL = 'https://cloud.ru/docs/virtual-machines/ug/topics/guides__create-vm';

export const HTML_CONTENT = [
  '<p>Облачная платформа для <a href="https://cloud.ru" data-test-id="rich-text-link">разработки и запуска</a> приложений.</p>',
  '<ul><li>Виртуальные машины</li><li>Managed Kubernetes</li></ul>',
  '<ol><li>Создайте проект</li><li>Подключите репозиторий</li></ol>',
].join('');

/** Одинаковое содержимое в двух формах: HTML-строкой и ReactNode. */
export const CONTENT_VARIANTS: { label: string; html: string; node: ReactNode }[] = [
  {
    label: 'paragraph + lists',
    html: HTML_CONTENT,
    node: (
      <>
        <p>
          Облачная платформа для <a href='https://cloud.ru'>разработки и запуска</a> приложений.
        </p>
        <ul>
          <li>Виртуальные машины</li>
          <li>Managed Kubernetes</li>
        </ul>
        <ol>
          <li>Создайте проект</li>
          <li>Подключите репозиторий</li>
        </ol>
      </>
    ),
  },
  {
    label: 'long link',
    html: `<p>Документация: <a href="https://cloud.ru">${LONG_URL}</a></p>`,
    node: (
      <p>
        Документация: <a href='https://cloud.ru'>{LONG_URL}</a>
      </p>
    ),
  },
  {
    label: 'image',
    html: `<img alt="" src="${IMAGE_SRC}" /><p>Подпись под изображением.</p>`,
    node: (
      <>
        <img alt='' src={IMAGE_SRC} />
        <p>Подпись под изображением.</p>
      </>
    ),
  },
];
