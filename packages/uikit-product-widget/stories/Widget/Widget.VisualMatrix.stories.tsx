import { WIDTH } from '@ds/segment-control';
import { BUTTON_TYPE, Widget, WIDGET_STATE, WidgetLayoutType, WidgetState } from '@ds/uikit-product-widget';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Widget> = {
  title: 'Uikit Product/Widget',
  component: Widget,
};

export default meta;
type Story = StoryObj<typeof Widget>;

const states = Object.values(WIDGET_STATE);
const layoutTypes: WidgetLayoutType[] = ['desktop', 'mobile'];

const demoActions = [
  { label: 'Create', onClick: () => undefined },
  {
    variant: BUTTON_TYPE.Kebab,
    list: {
      items: [
        { content: { option: 'Export' }, onClick: () => undefined },
        { content: { option: 'Archive' }, onClick: () => undefined },
      ],
    },
  },
] satisfies ComponentProps<typeof Widget>['actions'];

const demoSegmentControl = {
  width: WIDTH.Full,
  defaultValue: 'overview',
  items: [
    { value: 'overview', label: 'Overview' },
    { value: 'events', label: 'Events' },
  ],
} satisfies ComponentProps<typeof Widget>['segmentControl'];

const demoErrorState = {
  onClickUpdate: () => undefined,
  errorTitle: 'Не удалось получить данные',
  errorDescription: 'Попробуйте обновить виджет',
  updateButtonLabel: 'Обновить',
} satisfies ComponentProps<typeof Widget>['errorState'];

function renderWidget(state: WidgetState, wide: boolean, extraProps: Partial<ComponentProps<typeof Widget>> = {}) {
  const widthClass = wide ? styles.wide : styles.narrow;

  return (
    <div className={widthClass}>
      <Widget
        header={{ title: 'Cloud servers', href: '#' }}
        state={state}
        wide={wide}
        loadingState={{ showSkeleton: true }}
        errorState={demoErrorState}
        segmentControl={demoSegmentControl}
        actions={demoActions}
        {...extraProps}
      >
        Current usage: 8 instances, 2 alerts.
      </Widget>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='State × wide'
        firstColumnHeader='State'
        columnHeaders={['wide=false', 'wide=true']}
        rows={states.map(state => ({
          variantLabel: state,
          cells: [renderWidget(state, false), renderWidget(state, true)],
        }))}
      />

      <StoryTable
        sectionTitle='layoutType (wide=true on desktop only)'
        firstColumnHeader='layoutType'
        columnHeaders={['wide=false', 'wide=true']}
        rows={layoutTypes.map(layoutType => ({
          variantLabel: layoutType,
          cells: [
            renderWidget(WIDGET_STATE.Default, false, { layoutType }),
            renderWidget(WIDGET_STATE.Default, true, { layoutType }),
          ],
        }))}
      />
    </div>
  ),
};
