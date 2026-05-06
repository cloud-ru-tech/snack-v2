import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { MobileInfoRow, MobileInfoRowProps, POSITION } from '../../src';

const iconAction = (testId: string) => ({
  icon: <PlaceholderSVG />,
  'aria-label': 'Действие',
  'data-test-id': testId,
});

const meta: Meta<MobileInfoRowProps> = {
  title: 'Uikit Product/InfoRow/MobileInfoRow',
  component: MobileInfoRow,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<MobileInfoRowProps>;

const positions = [POSITION.First, POSITION.Inner, POSITION.Last] as const;
const loadingStates = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Position × Actions'
        firstColumnHeader='position'
        columnHeaders={['actions off', 'actions on']}
        rows={positions.map(position => ({
          variantLabel: position,
          cells: [false, true].map(hasActions => (
            <MobileInfoRow
              key={`${position}-${hasActions}`}
              position={position}
              label='Очень длинная мобильная метка, которая может обрезаться'
              labelTruncate={1}
              content='Значение поля'
              topDivider
              bottomDivider
              data-test-id={`mobile-info-row-position-${position}-${hasActions}`}
              rowActions={
                hasActions
                  ? {
                      first: iconAction(`mobile-info-row-${position}-a1`),
                      second: iconAction(`mobile-info-row-${position}-a2`),
                    }
                  : undefined
              }
            />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Loading'
        firstColumnHeader='position'
        columnHeaders={loadingStates.map(l => (l ? 'loading' : 'idle'))}
        rows={positions.map(position => ({
          variantLabel: position,
          cells: loadingStates.map(loading => (
            <MobileInfoRow
              key={`${position}-${loading}`}
              position={position}
              label='Метка'
              content='Значение'
              loading={loading}
              topDivider
              bottomDivider
              data-test-id={`mobile-info-row-loading-${position}-${loading}`}
            />
          )),
        }))}
      />
    </>
  ),
};
