import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { InfoRow, InfoRowProps, POSITION } from '../../src';
import { TEST_IDS } from '../testIds';

const meta: Meta<InfoRowProps> = {
  title: 'Uikit Product/InfoRow/InfoRow',
  component: InfoRow,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<InfoRowProps>;

const positions = [POSITION.First, POSITION.Inner, POSITION.Last] as const;
const layouts = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='LayoutType × Position'
        firstColumnHeader='layoutType'
        columnHeaders={positions as unknown as string[]}
        rows={layouts.map(layoutType => ({
          variantLabel: layoutType,
          cells: positions.map(position => (
            <AdaptiveProvider key={`${layoutType}-${position}`} layoutType={layoutType}>
              <InfoRow
                position={position}
                label='Адаптивная метка'
                content='Значение'
                topDivider
                bottomDivider
                data-test-id={TEST_IDS.infoRow.layout(layoutType, position)}
              />
            </AdaptiveProvider>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Loading'
        firstColumnHeader='layoutType'
        columnHeaders={['idle', 'loading']}
        rows={layouts.map(layoutType => ({
          variantLabel: layoutType,
          cells: [false, true].map(loading => (
            <AdaptiveProvider key={`${layoutType}-${loading}`} layoutType={layoutType}>
              <InfoRow
                position={POSITION.Inner}
                label='Метка'
                content='Значение'
                loading={loading}
                topDivider
                bottomDivider
                data-test-id={TEST_IDS.infoRow.loading(layoutType, loading.toString())}
              />
            </AdaptiveProvider>
          )),
        }))}
      />
    </>
  ),
};
