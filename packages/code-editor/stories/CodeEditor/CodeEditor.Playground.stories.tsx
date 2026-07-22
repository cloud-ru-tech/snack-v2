import { CodeEditor } from '@ds/code-editor';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { CODE } from './constants';
import styles from './styles.module.scss';
import { KNOWN_LANGUAGES, TEST_IDS } from './testIds';

const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: { layout: 'fullscreen' },
  args: {
    value: CODE,
    language: 'typescript',
    hasHeader: true,
    background: true,
    showRowNumber: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    value: { control: 'text', description: 'Содержимое редактора' },
    language: {
      control: 'select',
      options: KNOWN_LANGUAGES,
      description: 'Язык подсветки',
    },
    hasHeader: { control: 'boolean', description: 'Показывать шапку (language + copy)' },
    background: { control: 'boolean', description: 'Псевдо-бекграунд для editor-области' },
    showRowNumber: { control: 'boolean', description: 'Показывать колонку с номерами строк' },
    loading: { control: 'boolean', description: 'Показать спиннер поверх редактора' },
    theme: {
      control: 'text',
      description:
        'Имя зарегистрированной monaco-темы. По умолчанию подбирается автоматически по DS-теме провайдера (`snack` для светлой, `snackDark` для тёмной). Передавай вручную, только если регистрируешь свою тему через `monaco.editor.defineTheme(...)`.',
    },
    themeName: { table: { disable: true } },
    jsonSchema: { table: { disable: true } },
    path: { table: { disable: true } },
    onMount: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onValidate: { table: { disable: true } },
    onCopyClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Редактор кода поверх monaco-editor с поддержкой DS-тем.</DemoHint>
        <DemoActions block>
          <div className={styles.frame}>
            <CodeEditor {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
