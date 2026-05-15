import { CodeEditor } from '@ds/code-editor';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { CODE, CODE_JSON, CODE_YAML } from './constants';
import styles from './stories.module.scss';
import { matrixCellTestId } from './testIds';

const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

const headerStates = [false, true] as const;
const backgroundStates = [false, true] as const;
const languages = ['typescript', 'json', 'yaml'] as const;

const SAMPLE_BY_LANGUAGE: Record<(typeof languages)[number], string> = {
  typescript: CODE,
  json: CODE_JSON,
  yaml: CODE_YAML,
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='hasHeader × hasBackground (language=json)'
        firstColumnHeader='hasHeader'
        columnHeaders={backgroundStates.map(b => `hasBackground=${b}`)}
        rows={headerStates.map(hasHeader => ({
          variantLabel: String(hasHeader),
          cells: backgroundStates.map(hasBackground => (
            <div key={`${hasHeader}-${hasBackground}`} className={styles.frame}>
              <CodeEditor
                language='json'
                value={CODE_JSON}
                hasHeader={hasHeader}
                hasBackground={hasBackground}
                data-test-id={matrixCellTestId('json', hasHeader, hasBackground)}
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='language × hasHeader'
        firstColumnHeader='language'
        columnHeaders={['hasHeader=false', 'hasHeader=true']}
        rows={languages.map(language => ({
          variantLabel: language,
          cells: headerStates.map(hasHeader => (
            <div key={`${language}-${hasHeader}`} className={styles.frame}>
              <CodeEditor
                language={language}
                value={SAMPLE_BY_LANGUAGE[language]}
                hasHeader={hasHeader}
                data-test-id={matrixCellTestId(language, hasHeader)}
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
