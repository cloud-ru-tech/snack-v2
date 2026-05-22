import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { AdaptiveInfoRow, AdaptiveInfoRowProps, LAYOUT_TYPE, POSITION } from '../../src';
import { TEST_IDS } from '../testIds';

const meta: Meta<AdaptiveInfoRowProps> = {
  title: 'Uikit Product/InfoRow/AdaptiveInfoRow',
  component: AdaptiveInfoRow,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<AdaptiveInfoRowProps>;

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
            <AdaptiveInfoRow
              key={`${layoutType}-${position}`}
              layoutType={layoutType}
              position={position}
              label='Адаптивная метка'
              content='Значение'
              topDivider
              bottomDivider
              data-test-id={TEST_IDS.adaptiveInfoRow.layout(layoutType, position)}
            />
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
            <AdaptiveInfoRow
              key={`${layoutType}-${loading}`}
              layoutType={layoutType}
              position={POSITION.Inner}
              label='Метка'
              content='Значение'
              loading={loading}
              topDivider
              bottomDivider
              data-test-id={TEST_IDS.adaptiveInfoRow.loading(layoutType, loading.toString())}
            />
          )),
        }))}
      />
    </>
  ),
};
