import { APPEARANCE, PromoTag, ROLE_APPEARANCE } from '@ds/promo-tag';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PromoTag> = {
  title: 'Components/PromoTag/Examples/Polymorphic',
  component: PromoTag,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PromoTag>;

type MockLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { to: string };
const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(({ to, onClick, children, ...rest }, ref) => (
  <a ref={ref} href={to} onClick={onClick} {...rest}>
    {children}
  </a>
));
MockLink.displayName = 'MockLink';

const onAnchorClick = fn();

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Polymorphic</DemoTitle>
        <DemoHint>
          PromoTag как &lt;a&gt; с href и target=&apos;_blank&apos; (rel добавляется автоматически). Для
          react-router-dom — as={'{Link}'} и to.
        </DemoHint>
        <DemoActions align='center'>
          <PromoTag
            as='a'
            href='https://example.com'
            target='_blank'
            text='External promo'
            appearance={APPEARANCE.Blue}
            role={ROLE_APPEARANCE.Decor}
            data-test-id={TEST_IDS.polymorphicAnchor}
          />
          <PromoTag
            as='a'
            href='https://example.com'
            text='Clickable anchor'
            appearance={APPEARANCE.Green}
            role={ROLE_APPEARANCE.Decor}
            onClick={onAnchorClick}
            data-test-id={TEST_IDS.polymorphicAnchorClick}
          />
          <PromoTag
            as={MockLink}
            to='https://example.com'
            text='Preview link'
            appearance={APPEARANCE.Primary}
            role={ROLE_APPEARANCE.Accent}
            data-test-id={TEST_IDS.polymorphicLink}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const root = within(canvasElement);

    await step("as='a' → href and target", async () => {
      const anchor = root.getByTestId(TEST_IDS.polymorphicAnchor);
      await expect(anchor).toHaveAttribute('href', 'https://example.com');
      await expect(anchor).toHaveAttribute('target', '_blank');
      await expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    });

    await step('as={Link} → to prop reaches href', async () => {
      const link = root.getByTestId(TEST_IDS.polymorphicLink);
      await expect(link).toHaveAttribute('href', 'https://example.com');
    });

    await step("as='a' onClick → handler from props, not rest", async () => {
      onAnchorClick.mockClear();
      await userEvent.click(root.getByTestId(TEST_IDS.polymorphicAnchorClick));
      expect(onAnchorClick).toHaveBeenCalledTimes(1);
    });
  },
};
