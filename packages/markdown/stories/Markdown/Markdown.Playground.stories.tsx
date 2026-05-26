import { Markdown } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const SAMPLE = `# Markdown viewer

Параграф с **жирным**, *курсивом*, ~~зачёркнутым~~ и \`inline code\`.

## Списки

- bullet один
- bullet два
  - вложенный

1. ordered один
2. ordered два

## Цитата

> Цитата с **форматированием**.

## Code block

\`\`\`ts
export function add(a: number, b: number) {
  return a + b
}

export function multiply(a: number, b: number) {
  return a * b
}

export function subtract(a: number, b: number) {
  return a - b
}

export function justAnExampleOfALongFunctionBody() {
  return 'Some very very super long function body that should be scrollable with some extra text'
}
\`\`\`

## Table (GFM)

| Col A | Col B |
|-------|-------|
| one   | two   |
| three | four  |

## Link

[Snack Ui Kit](https://example.com)
`;

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown/Markdown',
  component: Markdown,
  parameters: { layout: 'fullscreen' },
  args: {
    value: SAMPLE,
    skipHtml: true,
    onCodeCopyClick: fn(),
    'data-test-id': TEST_IDS.viewer,
  },
  argTypes: {
    // Контролы/описания — из типов и JSDoc; вручную скрываем только не-сериализуемые слоты.
    remarkPlugins: { table: { disable: true } },
    rehypePlugins: { table: { disable: true } },
    components: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Markdown</DemoTitle>
        <DemoHint>Рендер markdown-строки в безопасный HTML (GFM + подсветка кода).</DemoHint>
        <DemoActions align='start'>
          <Markdown {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof Markdown>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.viewer);
    await expect(root).toBeVisible();

    await step('renders headings, table, code block', async () => {
      // Это отрендеренный из markdown HTML — у produced-узлов нет и не может быть data-test-id,
      // поэтому проверяем сам факт рендера по тегам (единственный возможный селектор здесь).
      await expect(root.querySelector('h1')).toBeTruthy();
      await expect(root.querySelector('table')).toBeTruthy();
      await expect(root.querySelector('pre code')).toBeTruthy();
    });

    await step('Copy button on the code block fires onCodeCopyClick with the raw code', async () => {
      const copy = canvas.getAllByTestId(TEST_IDS.viewerCodeCopy)[0];
      await expect(copy).toBeVisible();
      await userEvent.click(copy);
      expect(args.onCodeCopyClick).toHaveBeenCalledTimes(1);
      expect(args.onCodeCopyClick).toHaveBeenCalledWith(expect.stringContaining('export function add'));
    });
  },
};
