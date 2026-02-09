# Readme Panel Addon

Аддон Storybook 10: вкладка **Readme** в той же панели, что и Controls, с рендером markdown (как у `@cloud-ru/ft-storybook-readme-addon`).

## Использование

В meta стори задайте параметр `readme`:

```ts
parameters: {
  readme: {
    content: markdownString,  // одна строка markdown
    // или как в старом аддоне:
    // sidebar: [chunk1, chunk2],
  },
}
```

Пример с импортом README пакета (preview-бандл Vite):

```ts
import avatarReadme from '../../README.md?raw';

const meta: Meta<Props> = {
  parameters: {
    readme: { content: avatarReadme },
  },
};
```

## API параметра `readme`

| Поле      | Тип         | Описание |
|----------|-------------|----------|
| `content`| `string`   | Весь markdown одной строкой |
| `sidebar`| `string[]` | Массив кусков markdown (склеиваются через `\n`), совместимо со старым аддоном |

Если параметр не задан, во вкладке показывается подсказка добавить `readme` в meta.

## Порядок вкладок

В Storybook 10 порядок вкладок в панели аддонов (Controls, Actions, Readme, …) задаётся порядком регистрации. Встроенные панели регистрируются ядром до загрузки кастомных аддонов, поэтому вкладка Readme не может быть первой без изменения кода Storybook.
