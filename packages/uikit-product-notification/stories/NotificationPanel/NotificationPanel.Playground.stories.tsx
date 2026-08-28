import { Button } from '@ds/button';
import { POSITION, WIDTH } from '@ds/drawer';
import { CrossSVG } from '@ds/icons/interface/system';
import { NotificationPanel, NotificationPanelProps } from '@ds/uikit-product-notification';
import { ValueOf } from '@ds/utils';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { NOTIFICATION_PANEL_PROPS_MOCK } from '../constants';
import { generateCards, renderPanelContent } from '../helpers';
import { TEST_IDS } from '../testIds';

const SEGMENT_FILTER = { All: 'All', Service: 'Service', System: 'System' } as const;
type SegmentFilter = ValueOf<typeof SEGMENT_FILTER>;

type StoryProps = NotificationPanelProps & {
  amount: number;
  groupSize: number;
  stackSize: number;
  showDivider: boolean;
  showError: boolean;
  stackTitle: string;
};

function PlaygroundRender({
  amount,
  groupSize,
  stackSize,
  showDivider,
  showError,
  stackTitle,
  loading,
  readAllButton,
  ...args
}: StoryProps) {
  const [open, setOpen] = useState(false);
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(SEGMENT_FILTER.All);
  const [allRead, setAllRead] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const cards = useMemo(() => {
    const generated = generateCards(amount).map(card => ({ ...card, unread: allRead ? false : card.unread }));

    return unreadOnly ? generated.filter(card => card.unread) : generated;
  }, [amount, allRead, unreadOnly]);

  const content = showError ? (
    <NotificationPanel.Blank
      icon={{ icon: CrossSVG, appearance: 'neutral' }}
      title='Мы уже это исправляем'
      content='Ваши уведомления скоро появятся здесь'
    />
  ) : (
    renderPanelContent({ cards, groupSize, stackSize, showDivider, stackTitle, loading })
  );

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Открыть панель уведомлений триггером ниже. На desktop — drawer, на mobile — bottom-sheet (раскладка из тулбара
          layoutType).
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
      <NotificationPanel
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        loading={!showError && loading}
        content={content}
        readAllButton={readAllButton && { ...readAllButton, onClick: () => setAllRead(prev => !prev) }}
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
      />
    </DemoPage>
  );
}

const range = (min: number, max: number) => ({ control: { type: 'range' as const, min, max, step: 1 } });

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/Notification/NotificationPanel',
  component: NotificationPanel,
  parameters: { layout: 'fullscreen' },
  render: args => <PlaygroundRender {...args} />,
  args: {
    ...NOTIFICATION_PANEL_PROPS_MOCK,
    position: POSITION.Right,
    width: WIDTH.S,
    showBlackout: true,
    closeOnPopstate: true,
    amount: 20,
    groupSize: 2,
    stackSize: 3,
    showDivider: false,
    showError: false,
    stackTitle: 'Стопка карточек',
  },
  argTypes: {
    position: { control: 'radio', options: Object.values(POSITION), if: { global: 'layoutType', neq: 'mobile' } },
    width: { control: 'radio', options: Object.values(WIDTH), if: { global: 'layoutType', neq: 'mobile' } },
    amount: { name: '[Stories]: Кол-во карточек', ...range(0, 100) },
    groupSize: { name: '[Stories]: Размер группы', ...range(0, 10) },
    stackSize: { name: '[Stories]: Размер стопки', ...range(0, 5) },
    showDivider: { name: '[Stories]: Divider read/unread' },
    showError: { name: '[Stories]: Состояние ошибки' },
    stackTitle: { name: '[Stories]: Заголовок стопки', if: { arg: 'stackSize', truthy: true } },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    content: { table: { disable: true } },
    container: { table: { disable: true } },
    segments: { table: { disable: true } },
    chipToggle: { table: { disable: true } },
    scrollEndRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
