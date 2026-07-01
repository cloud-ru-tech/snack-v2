import { CrossSVG } from '@ds/icons';
import { NotificationPanelContent, NotificationPanelContentProps } from '@ds/uikit-product-notification';
import { ValueOf } from '@ds/utils';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { NOTIFICATION_PANEL_PROPS_MOCK } from '../constants';
import { generateCards, renderPanelContent } from '../helpers';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const SEGMENT_FILTER = {
  All: 'All',
  Service: 'Service',
  System: 'System',
} as const;

type SegmentFilter = ValueOf<typeof SEGMENT_FILTER>;

type StoryProps = Omit<NotificationPanelContentProps, 'segments' | 'content'> & {
  amount: number;
  groupSize: number;
  stackSize: number;
  showDivider: boolean;
  showError: boolean;
  stackTitle: string;
  segments: Omit<NonNullable<NotificationPanelContentProps['segments']>, 'onChange'>;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/Notification/NotificationPanelContent',
  component: NotificationPanelContent,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = ({
  amount,
  groupSize,
  stackSize,
  showDivider,
  showError,
  stackTitle,
  readAllButton,
  segments,
  loading,
  ...args
}: StoryProps) => {
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(SEGMENT_FILTER.All);
  const [allRead, setAllRead] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const cards = useMemo(() => {
    const generated = generateCards(amount).map(card => ({ ...card, unread: allRead ? false : card.unread }));

    return unreadOnly ? generated.filter(card => card.unread) : generated;
  }, [amount, allRead, unreadOnly]);

  const content = showError ? (
    <NotificationPanelContent.Blank
      icon={{ icon: CrossSVG, appearance: 'neutral' }}
      title='Мы уже это исправляем'
      description='Ваши уведомления скоро появятся здесь'
    />
  ) : (
    renderPanelContent({ cards, groupSize, stackSize, showDivider, stackTitle, loading })
  );

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Панель уведомлений: заголовок, фильтры, группы, стеки, divider, blank, loading и error.</DemoHint>
        <DemoActions block>
          <div className={styles.container}>
            <NotificationPanelContent
              {...args}
              loading={!showError && loading}
              content={content}
              readAllButton={readAllButton && { ...readAllButton, onClick: () => setAllRead(prev => !prev) }}
              segments={
                segments && {
                  ...segments,
                  value: segmentFilter,
                  onChange: value => setSegmentFilter(String(value) as SegmentFilter),
                }
              }
              chipToggle={{ label: 'Непрочитанные', checked: unreadOnly, onChange: setUnreadOnly }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

const range = (min: number, max: number) => ({ control: { type: 'range' as const, min, max, step: 1 } });

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    ...NOTIFICATION_PANEL_PROPS_MOCK,
    amount: 20,
    groupSize: 2,
    stackSize: 3,
    showDivider: false,
    showError: false,
    stackTitle: 'Стопка карточек',
    segments: {
      items: [
        { value: SEGMENT_FILTER.All, label: 'Все', counter: 20 },
        { value: SEGMENT_FILTER.Service, label: 'Сервисные', counter: 8 },
        { value: SEGMENT_FILTER.System, label: 'Системные', counter: 4 },
      ],
      value: SEGMENT_FILTER.All,
    },
    settings: { button: { as: 'a', href: '#' } },
    'data-test-id': TEST_IDS.panel.root,
  },
  argTypes: {
    amount: { name: '[Stories]: Кол-во карточек', ...range(0, 100) },
    groupSize: { name: '[Stories]: Размер группы', ...range(0, 10) },
    stackSize: { name: '[Stories]: Размер стопки', ...range(0, 5) },
    showDivider: { name: '[Stories]: Divider read/unread' },
    showError: { name: '[Stories]: Состояние ошибки' },
    stackTitle: { name: '[Stories]: Заголовок стопки', if: { arg: 'stackSize', truthy: true } },
    segments: { table: { disable: true } },
    chipToggle: { table: { disable: true } },
    scrollEndRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.panel.title)).toBeVisible();
  },
};
