import { SIZE, TagRow } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof TagRow> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
};

export default meta;
type Story = StoryObj<typeof TagRow>;

const keySizes = Object.values(SIZE);

const ITEMS = [
  { id: '1', label: 'Frontend', appearance: 'blue' as const },
  { id: '2', label: 'Backend', appearance: 'green' as const },
  { id: '3', label: 'Design', appearance: 'violet' as const },
  { id: '4', label: 'Mobile', appearance: 'orange' as const },
];

const LONG_ITEMS = Array.from({ length: 16 }, (_, i) => ({
  id: String(i + 1),
  label: [
    'Frontend infrastructure',
    'Backend platform services',
    'Design system foundations',
    'Mobile native applications',
    'Data engineering pipelines',
    'Machine learning research',
    'Developer experience tools',
    'Internal developer platform',
    'Security compliance audit',
    'Site reliability engineering',
    'Quality assurance automation',
    'Product analytics dashboard',
    'Customer success operations',
    'Marketing growth campaigns',
    'Finance reporting systems',
    'Legal documentation review',
  ][i],
  appearance: (['blue', 'green', 'violet', 'orange', 'pink', 'yellow', 'red'] as const)[i % 7],
}));

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size'
        firstColumnHeader='Size'
        columnHeaders={['Row']}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: [
            <div key={size} className={styles.rowContainer}>
              <TagRow size={size} items={ITEMS} />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Overflow — narrow container × rowLimit'
        firstColumnHeader='rowLimit'
        columnHeaders={['Narrow container, 16 long tags']}
        rows={[
          {
            variantLabel: 'unset (wrap)',
            cells: [
              <div key='wrap' className={styles.rowNarrow}>
                <TagRow items={LONG_ITEMS} />
              </div>,
            ],
          },
          {
            variantLabel: 'rowLimit=1',
            cells: [
              <div key='limit-1' className={styles.rowNarrow}>
                <TagRow items={LONG_ITEMS} rowLimit={1} moreButtonLabel='+' />
              </div>,
            ],
          },
          {
            variantLabel: 'rowLimit=2',
            cells: [
              <div key='limit-2' className={styles.rowNarrow}>
                <TagRow items={LONG_ITEMS} rowLimit={2} moreButtonLabel='+' />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
