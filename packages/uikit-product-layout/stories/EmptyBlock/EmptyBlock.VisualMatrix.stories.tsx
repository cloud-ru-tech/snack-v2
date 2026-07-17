import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { ButtonGroup } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { EmptyBlock, EmptyBlockProps } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<EmptyBlockProps> = {
  title: 'Uikit Product/Layout/Layout/EmptyBlock',
  id: 'uikit-product-layout-emptyblock',
  component: EmptyBlock,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<EmptyBlockProps>;

const footer = <ButtonGroup primaryAction={{ label: 'Label text' }} secondaryAction={{ label: 'Label text' }} />;

const adaptiveLayouts = [
  { layoutType: LAYOUT_TYPE.Desktop, label: 'desktop (horizontal)', cellClass: styles.cellDesktop },
  { layoutType: LAYOUT_TYPE.Mobile, label: 'mobile (vertical)', cellClass: styles.cellMobile },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Layout × Footer'
        firstColumnHeader='layoutType'
        columnHeaders={['without footer', 'with footer']}
        rows={adaptiveLayouts.map(({ layoutType, label, cellClass }) => ({
          variantLabel: label,
          cells: [false, true].map(withFooter => (
            <AdaptiveProvider key={`${label}-${withFooter}`} layoutType={layoutType}>
              <div className={cellClass}>
                <EmptyBlock
                  title='Title text'
                  content='Body text'
                  icon={{ icon: PlaceholderSVG }}
                  footer={withFooter ? footer : undefined}
                />
              </div>
            </AdaptiveProvider>
          )),
        }))}
      />
    </div>
  ),
};
