import { HeaderLayout, HeaderLayoutProps } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Breadcrumbs, BreadcrumbsMobile, Logo, Menu, ProjectSelect, Toolbar } from '../PlugElement';
import { TEST_IDS } from './testIds';

type PlaygroundArgs = HeaderLayoutProps & {
  showMenu?: boolean;
  showLogo?: boolean;
  showSelect?: boolean;
  showBreadcrumbs?: boolean;
  showToolbar?: boolean;
};

function HeaderLayoutPlayground({
  showBreadcrumbs,
  showLogo,
  showMenu,
  showSelect,
  showToolbar,
  isMobile,
  ...args
}: PlaygroundArgs) {
  const breadcrumbs = isMobile ? <BreadcrumbsMobile /> : <Breadcrumbs />;

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>На узком экране селектор скрывается, а хлебные крошки переходят под основную строку.</DemoHint>
        <DemoActions block>
          <HeaderLayout
            {...args}
            isMobile={isMobile}
            menu={showMenu ? <Menu /> : undefined}
            logo={showLogo ? <Logo /> : undefined}
            select={showSelect ? <ProjectSelect /> : undefined}
            breadcrumbs={showBreadcrumbs ? breadcrumbs : undefined}
            toolbar={showToolbar ? <Toolbar /> : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta = {
  title: 'Uikit Product/Layout/Header Legacy/HeaderLayout',
  component: HeaderLayout,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/te3bVXwakjuUc3QTOfu9Mm/FF-8692--navigation-?node-id=11755-132133&m=dev',
    },
  },
  render: HeaderLayoutPlayground,
  args: {
    isMobile: false,
    showMenu: true,
    showLogo: true,
    showSelect: true,
    showBreadcrumbs: true,
    showToolbar: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    showMenu: { name: '[Stories]: showMenu', control: 'boolean' },
    showLogo: { name: '[Stories]: showLogo', control: 'boolean' },
    showSelect: { name: '[Stories]: showSelect', control: 'boolean' },
    showBreadcrumbs: { name: '[Stories]: showBreadcrumbs', control: 'boolean' },
    showToolbar: { name: '[Stories]: showToolbar', control: 'boolean' },
    menu: { table: { disable: true } },
    logo: { table: { disable: true } },
    select: { table: { disable: true } },
    breadcrumbs: { table: { disable: true } },
    toolbar: { table: { disable: true } },
  },
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
