import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PromoTagPredefined> = {
  title: 'Uikit Product/PromoTagPredefined/Examples/Polymorphic',
  component: PromoTagPredefined,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PromoTagPredefined>;

type MockLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { to: string };
const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(({ to, onClick, children, ...rest }, ref) => (
  <a ref={ref} href={to} onClick={onClick} {...rest}>
    {children}
  </a>
));
MockLink.displayName = 'MockLink';

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Polymorphic</DemoTitle>
        <DemoHint>
          PromoTagPredefined с `as={'{Link}'}` из react-router-dom: prop `to` пробрасывается на целевой компонент.
        </DemoHint>
        <DemoActions align='center'>
          <PromoTagPredefined
            as={MockLink}
            to='https://example.com'
            variant={VARIANTS.Preview}
            context={PREVIEW_CONTEXT.Service}
            data-test-id={TEST_IDS.promoTag}
            target='_blank'
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const root = within(canvasElement);
    const link = root.getByTestId(TEST_IDS.promoTag);

    await step('as={Link} → to prop reaches href', async () => {
      await expect(link).toHaveAttribute('href', 'https://example.com');
    });

    await step('target=_blank пробрасывается на ссылку', async () => {
      await expect(link).toHaveAttribute('target', '_blank');
    });
  },
};
