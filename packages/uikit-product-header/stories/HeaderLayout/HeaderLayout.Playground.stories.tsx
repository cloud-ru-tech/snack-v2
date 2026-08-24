import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { HeaderLayout, HeaderLayoutProps, Logo } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { Breadcrumbs, BreadcrumbsMobile, Menu, ProjectSelect, Toolbar } from '../PlugElement';
import { TEST_IDS } from '../testIds';

type PlaygroundArgs = HeaderLayoutProps & {
  showMenu?: boolean;
  showLogo?: boolean;
  showSelect?: boolean;
  showBreadcrumbs?: boolean;
  showToolbar?: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/Layout/Header/HeaderLayout',
  id: 'uikit-product-header-headerlayout',
  component: HeaderLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    showMenu: true,
    showLogo: true,
    showSelect: true,
    showBreadcrumbs: true,
    showToolbar: true,
    'data-test-id': TEST_IDS.headerLayout.root,
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
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

function HeaderLayoutPlaygroundContent({
  showBreadcrumbs,
  showLogo,
  showMenu,
  showSelect,
  showToolbar,
  ...args
}: PlaygroundArgs) {
  const isMobile = isMobileLayout(useAdaptiveLayout().layoutType);
  const breadcrumbs = isMobile ? <BreadcrumbsMobile /> : <Breadcrumbs />;

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Слоты шапки: меню, логотип, селект, хлебные крошки и тулбар.</DemoHint>
        <DemoActions block>
          <HeaderLayout
            {...args}
            menu={showMenu ? <Menu /> : undefined}
            logo={showLogo ? <Logo href='/' tooltip={{ tip: 'На главную' }} /> : undefined}
            select={showSelect ? <ProjectSelect /> : undefined}
            breadcrumbs={showBreadcrumbs ? breadcrumbs : undefined}
            toolbar={showToolbar ? <Toolbar /> : undefined}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: HeaderLayoutPlaygroundContent,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.headerLayout.root)).toBeVisible();
  },
};
