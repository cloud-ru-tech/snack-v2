import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const items = [
  { id: '1', content: { option: 'Year' }, onClick: () => undefined },
  { id: '2', content: { option: 'Month' }, onClick: () => undefined },
];

const sizes = ['s', 'm', 'l'] as const;

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Uikit Product/ButtonPredefined/ButtonDropdown',
  component: ButtonDropdown,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ButtonDropdown>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.panel}>
      <StoryTable
        sectionTitle='desktop — closed'
        firstColumnHeader='size'
        columnHeaders={['']}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: [
            <AdaptiveProvider key={`d-${size}-closed`} layoutType={LAYOUT_TYPE.Desktop}>
              <ButtonDropdown label='Period' size={size} items={items} />
            </AdaptiveProvider>,
          ],
        }))}
      />

      {/* Открытое состояние — отдельный снимок `open.png` (portal-overlay в StoryTable
          перекрывает соседние ячейки, ломая сетку). В матрице держим только closed-оси. */}
      <StoryTable
        sectionTitle='mobile — closed'
        firstColumnHeader='size'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 's',
            cells: [
              <AdaptiveProvider key='m-closed' layoutType={LAYOUT_TYPE.Mobile}>
                <ButtonDropdown label='Period' size='s' items={items} />
              </AdaptiveProvider>,
            ],
          },
        ]}
      />
    </div>
  ),
};
