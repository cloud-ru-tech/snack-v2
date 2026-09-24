import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardNavigation, CardNavigationProps } from '@ds/uikit-product-card-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoResizable, DemoTitle } from '#storybook/components';

import { PROMO_TAG_ARG_TYPE } from '../constants/promoTagArgType';
import { TEST_IDS } from '../testIds';

type StoryProps = CardNavigationProps & {
  showDescription?: boolean;
  showExpandButton?: boolean;
  /** Story-only: `truncate.title` как отдельный number-контрол — удобнее объекта в Controls. */
  truncateTitle?: number;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/CardPredefined/CardNavigation',
  component: CardNavigation,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Мой сервис',
    description: 'Краткое описание сервиса для подробного режима карточки.',
    icon: <PlaceholderSVG size={24} />,
    'data-test-id': TEST_IDS.cardNavigation,
    showDescription: true,
  },
  argTypes: {
    onClick: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    expandable: { table: { disable: true } },
    description: { if: { arg: 'showDescription', truthy: true } },
    tooltip: { table: { disable: true } },
    promoTag: PROMO_TAG_ARG_TYPE,
    truncate: { table: { disable: true } },
    truncateTitle: {
      name: '[Stories]: truncate.title',
      control: 'number',
      if: { arg: 'showDescription', truthy: false },
    },
    showDescription: {
      name: '[Stories]: show description',
      control: 'boolean',
    },
    showExpandButton: {
      name: '[Stories]: show expand button',
      control: 'boolean',
    },
  },
  render: ({ showDescription, showExpandButton, description, truncateTitle, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Без описания — компактный вид, с описанием — подробный. Тяните за угол — меняется ширина.</DemoHint>
        <DemoActions block>
          <DemoResizable>
            <CardNavigation
              {...args}
              description={showDescription ? description : undefined}
              tooltip={showDescription ? undefined : { tip: 'Подсказка компактного вида' }}
              expandable={showExpandButton ? { value: false, onClick: fn() } : undefined}
              truncate={truncateTitle !== undefined ? { title: truncateTitle } : undefined}
            />
          </DemoResizable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClick: fn(),
    actionsVisibility: 'hover',
    favorite: { enabled: true, onChange: fn() },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByTestId(TEST_IDS.cardNavigation);

    await expect(card).toBeVisible();

    // Панель действий монтируется лениво — по первому наведению.
    await expect(canvas.queryByTestId(TEST_IDS.cardNavigationFavorite)).toBeNull();
    await userEvent.hover(card);
    await expect(canvas.getByTestId(TEST_IDS.cardNavigationFavorite)).toBeInTheDocument();
  },
};
