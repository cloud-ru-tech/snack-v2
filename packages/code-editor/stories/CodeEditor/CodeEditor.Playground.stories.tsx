import { CodeEditor } from '@ds/code-editor';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { CODE } from './constants';
import styles from './stories.module.scss';
import { CODE_EDITOR_TEST_ID, KNOWN_LANGUAGES } from './testIds';

const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: { layout: 'padded' },
  decorators: [
    // contrast wrapper, same pattern as segment-control — code editor surface
    // would blend into the storybook background otherwise.
    Story => (
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: CODE,
    language: 'typescript',
    hasHeader: true,
    hasBackground: true,
    showRowNumber: true,
    loading: undefined,
    'data-test-id': CODE_EDITOR_TEST_ID,
  },
  argTypes: {
    value: { control: 'text', description: 'Содержимое редактора' },
    language: {
      control: 'select',
      options: KNOWN_LANGUAGES,
      description: 'Язык подсветки',
    },
    hasHeader: { control: 'boolean', description: 'Показывать шапку (language + copy)' },
    hasBackground: { control: 'boolean', description: 'Псевдо-бекграунд для editor-области' },
    showRowNumber: { control: 'boolean', description: 'Показывать колонку с номерами строк' },
    loading: { control: 'boolean', description: 'Показать спиннер поверх редактора' },
    theme: {
      control: 'select',
      options: ['snack', 'snackDark'],
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
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(CODE_EDITOR_TEST_ID)).toBeVisible();
  },
};
