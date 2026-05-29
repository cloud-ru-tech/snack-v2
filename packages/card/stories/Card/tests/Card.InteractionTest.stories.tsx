import { Button } from '@ds/button';
import { Card, CardProps, useCardContext } from '@ds/card';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, forwardRef, MouseEvent } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const NESTED_BUTTON_TEST_ID = 'card-nested-button';
const CONTEXT_PROBE_TEST_ID = 'card-context-probe';

function ContextProbe() {
  const { radius, disabled } = useCardContext();
  return <span data-test-id={CONTEXT_PROBE_TEST_ID} data-context-radius={radius} data-context-disabled={disabled} />;
}
const ANCHOR_CARD_TEST_ID = `${TEST_IDS.root}-anchor`;
const CUSTOM_LINK_TEST_ID = `${TEST_IDS.root}-custom-link`;

type InteractionStoryArgs = CardProps & {
  onButtonClick: () => void;
  'data-test-id'?: string;
};

const meta: Meta<InteractionStoryArgs> = {
  title: 'Components/Card/Tests/Interaction',
  component: Card,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<InteractionStoryArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    onButtonClick: fn(),
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по вложенной кнопке внутри Card вызывает её собственный onClick.</DemoHint>
        <DemoActions align='center'>
          <Card data-test-id={TEST_IDS.root}>
            <Button label='Action' onClick={args.onButtonClick} data-test-id={NESTED_BUTTON_TEST_ID} />
            <ContextProbe />
          </Card>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId(NESTED_BUTTON_TEST_ID);

    await step('nested button: click fires button onClick', async () => {
      await userEvent.click(button);
      expect(args.onButtonClick).toHaveBeenCalledTimes(1);
    });

    await step('useCardContext exposes radius/disabled to children', async () => {
      const probe = canvas.getByTestId(CONTEXT_PROBE_TEST_ID);
      await expect(probe).toHaveAttribute('data-context-radius', 'm');
      await expect(probe).toHaveAttribute('data-context-disabled', 'false');
    });
  },
};

type AnchorStoryArgs = CardProps<'a'> & { 'data-test-id'?: string };

export const AsAnchorDisabled: StoryObj<AnchorStoryArgs> = {
  tags: ['test', 'dev'],
  args: {
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
    disabled: true,
    onClick: fn(),
    'data-test-id': ANCHOR_CARD_TEST_ID,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AsAnchorDisabled</DemoTitle>
        <DemoHint>
          Card как `&lt;a&gt;` в disabled-state: клик не переходит по href (preventDefault), но onClick всё равно
          вызывается — решение «глотать или нет» оставляем потребителю.
        </DemoHint>
        <DemoActions align='center'>
          <Card {...args}>Disabled link</Card>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const card = within(canvasElement).getByTestId(ANCHOR_CARD_TEST_ID);

    await step('anchor renders with aria-disabled and tabindex=-1', async () => {
      await expect(card).toHaveAttribute('aria-disabled', 'true');
      await expect(card).toHaveAttribute('tabindex', '-1');
    });

    await step("target='_blank' injects rel='noopener noreferrer'", async () => {
      await expect(card).toHaveAttribute('rel', 'noopener noreferrer');
    });

    await step('click on disabled anchor: preventDefault fired (no navigation), onClick still called', async () => {
      let defaultPrevented = false;
      // Слушаем на `document`: делегированный React-обработчик на корневом контейнере
      // вызовет preventDefault раньше bubble до document. Listener на самой `card`
      // прочитал бы defaultPrevented до React и увидел false.
      document.addEventListener(
        'click',
        e => {
          defaultPrevented = e.defaultPrevented;
        },
        { once: true },
      );
      // pointer-events на disabled-anchor отключены через CSS — обходим проверку,
      // чтобы прицельно достучаться до onClick-обработчика компонента.
      await userEvent.click(card, { pointerEventsCheck: 0 });
      expect(defaultPrevented).toBe(true);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

// Мок Link из react-router-dom: принимает `to` и рендерит anchor с href=to. Этого
// достаточно, чтобы зафиксировать контракт полиморфизма: Card пробрасывает все
// нестандартные props (`to`) на целевой компонент без модификаций.
type MockLinkProps = ComponentProps<'a'> & { to: string };
const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(({ to, onClick, children, ...rest }, ref) => (
  <a ref={ref} href={to} onClick={onClick as (e: MouseEvent<HTMLAnchorElement>) => void} {...rest}>
    {children}
  </a>
));
MockLink.displayName = 'MockLink';

type CustomLinkStoryArgs = CardProps<typeof MockLink> & { 'data-test-id'?: string };

export const AsCustomLink: StoryObj<CustomLinkStoryArgs> = {
  tags: ['test', 'dev'],
  args: {
    as: MockLink,
    to: '/profile/42',
    onClick: fn(),
    'data-test-id': CUSTOM_LINK_TEST_ID,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AsCustomLink</DemoTitle>
        <DemoHint>
          Card как кастомный компонент (Link из react-router-dom): нестандартные prop&apos;ы (например `to`)
          пробрасываются на целевой компонент без модификаций.
        </DemoHint>
        <DemoActions align='center'>
          <Card {...args}>Profile</Card>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const card = within(canvasElement).getByTestId(CUSTOM_LINK_TEST_ID);

    await step("custom 'to' prop reached MockLink → href='/profile/42'", async () => {
      await expect(card).toHaveAttribute('href', '/profile/42');
      expect(card.tagName.toLowerCase()).toBe('a');
    });

    await step('click fires onClick passed via args', async () => {
      // MockLink — реальный `<a href>`: без перехвата клик увёл бы страницу и оборвал
      // browser-сессию. Capture-listener гасит навигацию, onClick при этом отрабатывает.
      const preventNavigation = (e: Event) => e.preventDefault();
      document.addEventListener('click', preventNavigation, { capture: true });
      try {
        await userEvent.click(card);
        expect(args.onClick).toHaveBeenCalledTimes(1);
      } finally {
        document.removeEventListener('click', preventNavigation, { capture: true });
      }
    });
  },
};
