import { LAYOUT_TYPE, LayoutType } from '@ds/adaptive';
import { WIDTH } from '@ds/segment-control';
import { BUTTON_TYPE, Widget, WIDGET_STATE, WidgetState } from '@ds/uikit-product-widget';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { LayoutScope, StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Widget> = {
  title: 'Uikit Product/Widget',
  component: Widget,
};

export default meta;
type Story = StoryObj<typeof Widget>;

const states = Object.values(WIDGET_STATE);
const layoutTypes: LayoutType[] = [LAYOUT_TYPE.Desktop, LAYOUT_TYPE.Mobile];

const demoActions = [
  { label: 'Create', onClick: () => undefined },
  {
    variant: BUTTON_TYPE.Kebab,
    list: {
      items: [
        { content: { label: 'Export' }, onClick: () => undefined },
        { content: { label: 'Archive' }, onClick: () => undefined },
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

function renderWidget(state: WidgetState, wide: boolean) {
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
      >
        Current usage: 8 instances, 2 alerts.
      </Widget>
    </div>
  );
}

// Два блока в теле: зазор между ними задаёт сам виджет (`+ slotBody` в мастере, 12).
function renderWidgetWithBodyBlocks(wide: boolean) {
  return (
    <div className={wide ? styles.wide : styles.narrow}>
      <Widget header={{ title: 'Cloud servers', href: '#' }} wide={wide} actions={demoActions}>
        <div className={styles.bodyBlock}>Compute: 8 instances</div>
        <div className={styles.bodyBlock}>Storage: 2 volumes</div>
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
        sectionTitle='Body blocks'
        firstColumnHeader='body'
        columnHeaders={['wide=false', 'wide=true']}
        rows={[
          {
            variantLabel: 'two blocks',
            cells: [renderWidgetWithBodyBlocks(false), renderWidgetWithBodyBlocks(true)],
          },
        ]}
      />

      <StoryTable
        sectionTitle='layoutType (wide=true on desktop only)'
        firstColumnHeader='layoutType'
        columnHeaders={['wide=false', 'wide=true']}
        rows={layoutTypes.map(layoutType => ({
          variantLabel: layoutType,
          cells: [
            <LayoutScope key={`${layoutType}-narrow`} layoutType={layoutType}>
              {renderWidget(WIDGET_STATE.Default, false)}
            </LayoutScope>,
            <LayoutScope key={`${layoutType}-wide`} layoutType={layoutType}>
              {renderWidget(WIDGET_STATE.Default, true)}
            </LayoutScope>,
          ],
        }))}
      />
    </div>
  ),
};
