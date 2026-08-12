import { MainMenu, useSearch } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import {
  ADMINISTRATIVE_SECTION,
  NEW_NAVIGATION_BANNER_DEMO,
  PLATFORM_GROUPS,
  SERVICE_GROUPS,
  TEST_IDS,
} from '../constants';
import { NewNavigationBanner } from '../helperComponents/NewNavigationBanner';

type TestArgs = {
  setOpen: (open: boolean) => void;
};

function InteractionRender({ setOpen: setOpenProp }: TestArgs) {
  const [open, setOpen] = useState(false);
  const search = useSearch();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Открытие drawer по кнопке MainMenuSVG и закрытие через Escape.</DemoHint>
        <DemoActions align='center'>
          <MainMenu
            open={open}
            setOpen={nextOpen => {
              setOpenProp(nextOpen);
              setOpen(nextOpen);
            }}
            search={search}
            settingItems={ADMINISTRATIVE_SECTION}
            serviceGroups={SERVICE_GROUPS}
            platformGroups={PLATFORM_GROUPS}
            sidebarBottomSlot={<NewNavigationBanner {...NEW_NAVIGATION_BANNER_DEMO} />}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<TestArgs> = {
  title: 'Uikit Product/Layout/Header Legacy/Main Menu/Tests/Interaction',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    setOpen: fn(),
  },
  render: args => <InteractionRender {...args} />,
};

export default meta;
type Story = StoryObj<TestArgs>;

export const InteractionTest: Story = {
  tags: ['test'],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId(TEST_IDS.trigger));

    await waitFor(() => {
      expect(within(document.body).getByTestId(TEST_IDS.drawer)).toBeVisible();
    });

    expect(args.setOpen).toHaveBeenCalledWith(true);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(within(document.body).queryByTestId(TEST_IDS.drawer)).not.toBeInTheDocument();
    });

    expect(args.setOpen).toHaveBeenCalledWith(false);
  },
};
