import { Button } from '@ds/button';
import { POSITION, WIDTH } from '@ds/drawer';
import {
  NotificationPanel,
  NotificationPanelPopover,
  NotificationPanelPopoverProps,
} from '@ds/uikit-product-notification';
import { LAYOUT_TYPE, ValueOf } from '@ds/utils';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { NOTIFICATION_PANEL_PROPS_MOCK } from '../constants';
import { generateCards, renderPanelContent } from '../helpers';
import { TEST_IDS } from '../testIds';

const SEGMENT_FILTER = { All: 'All', Service: 'Service', System: 'System' } as const;
type SegmentFilter = ValueOf<typeof SEGMENT_FILTER>;

/** Живой контент панели внутри обёртки — генерируемые карточки, группы, стеки и работающая шапка. */
function PanelContent({ layoutType }: Pick<NotificationPanelPopoverProps, 'layoutType'>) {
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(SEGMENT_FILTER.All);
  const [allRead, setAllRead] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const cards = useMemo(() => {
    const generated = generateCards(20).map(card => ({ ...card, unread: allRead ? false : card.unread }));

    return unreadOnly ? generated.filter(card => card.unread) : generated;
  }, [allRead, unreadOnly]);

  return (
    <NotificationPanel
      {...NOTIFICATION_PANEL_PROPS_MOCK}
      data-test-id={TEST_IDS.panel.root}
      content={renderPanelContent({
        cards,
        groupSize: 2,
        stackSize: 3,
        showDivider: false,
        stackTitle: 'Стопка карточек',
      })}
      readAllButton={{ onClick: () => setAllRead(prev => !prev) }}
      segments={{
        items: [
          { value: SEGMENT_FILTER.All, label: 'Все', counter: 20 },
          { value: SEGMENT_FILTER.Service, label: 'Сервисные', counter: 8 },
          { value: SEGMENT_FILTER.System, label: 'Системные', counter: 4 },
        ],
        value: segmentFilter,
        onChange: value => setSegmentFilter(String(value) as SegmentFilter),
      }}
      chipToggle={{ label: 'Непрочитанные', checked: unreadOnly, onChange: setUnreadOnly }}
      layoutType={layoutType}
    />
  );
}

function PlaygroundRender(args: Partial<NotificationPanelPopoverProps>) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Открыть панель уведомлений триггером ниже. На desktop — drawer, на mobile — bottom-sheet (см. layoutType).
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Открыть панель'
            view='outline'
            appearance='neutral'
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <NotificationPanelPopover
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        content={<PanelContent layoutType={args.layoutType} />}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof NotificationPanelPopover> = {
  title: 'Uikit Product/Notification/NotificationPanelPopover',
  component: NotificationPanelPopover,
  parameters: { layout: 'fullscreen' },
  render: args => <PlaygroundRender {...args} />,
  args: {
    layoutType: LAYOUT_TYPE.Desktop,
    position: 'right',
    width: 's',
    showBlackout: true,
    closeOnPopstate: true,
  },
  argTypes: {
    layoutType: { control: 'radio', options: Object.values(LAYOUT_TYPE) },
    position: { control: 'radio', options: Object.values(POSITION), if: { arg: 'layoutType', eq: 'desktop' } },
    width: { control: 'radio', options: Object.values(WIDTH), if: { arg: 'layoutType', eq: 'desktop' } },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    content: { table: { disable: true } },
    container: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationPanelPopover>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
