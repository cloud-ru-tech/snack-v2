import { Block, BlockProps, SIZE, VIEW } from '@ds/block';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<BlockProps> = {
  title: 'Components/Block',
  component: Block,
};

export default meta;

type Story = StoryObj<BlockProps>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyViews = Object.values(VIEW);
// Палитра подложки — независимая ось (слот backgroundPredefined в Figma), поэтому идёт
// отдельной секцией, а не декартовым произведением с view.
const keyFills = Object.values(BACKGROUND_PREDEFINED_FILL);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      {[false, true].map(showHeader => (
        <div key={String(showHeader)} className={styles.externalWrapper}>
          <StoryTable
            sectionTitle={`View × Size · showHeader=${showHeader}`}
            firstColumnHeader='View'
            columnHeaders={keySizes.map(s => s.toUpperCase())}
            rows={keyViews.map(view => ({
              variantLabel: view,
              cells: keySizes.map(size => (
                <Block key={size} view={view} size={size} showHeader={showHeader} header='Текст заглавия'>
                  <span className={styles.sampleContent}># slot content</span>
                </Block>
              )),
            }))}
          />
        </div>
      ))}

      <div className={styles.externalWrapper}>
        <StoryTable
          sectionTitle='Nested headers · L → M → S'
          firstColumnHeader='View'
          columnHeaders={['Composition']}
          rows={keyViews.map(view => ({
            variantLabel: view,
            cells: [
              <Block key={view} size={SIZE.L} view={view} header='Большой блок' showHeader>
                <Block size={SIZE.M} view={view} header='Средний блок' showHeader>
                  <Block size={SIZE.S} view={view} header='Малый блок с длинным заголовком' showHeader>
                    <span className={styles.sampleContent}># slot content</span>
                  </Block>
                </Block>
              </Block>,
            ],
          }))}
        />
      </div>
      <div className={styles.externalWrapper}>
        <StoryTable
          sectionTitle='BackgroundPredefined × View'
          firstColumnHeader='BackgroundPredefined'
          columnHeaders={keyViews.map(v => v.toUpperCase())}
          rows={keyFills.map(fill => ({
            variantLabel: fill,
            cells: keyViews.map(view => (
              <Block key={view} view={view} size={SIZE.M} backgroundPredefined={fill}>
                <span className={styles.sampleContent}># slot content</span>
              </Block>
            )),
          }))}
        />
      </div>
    </div>
  ),
};
