import { Actions } from '@ds/uikit-product-actions';
import { Meta, StoryObj } from '@storybook/react';

import { DemoPage, DemoPanel } from '#storybook/components';

import { ActionTypes } from '../../demos/examples/ActionTypes';
import { items } from './items';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Actions> = {
  title: 'Uikit Product/Actions',
  component: Actions,
  parameters: { figma: { disable: true } },
  args: { items, 'data-test-id': TEST_IDS.root },
};
export default meta;
export const Playground: StoryObj<typeof Actions> = {};

export const AllTypes: StoryObj<typeof Actions> = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <DemoPage>
      <DemoPanel>
        <ActionTypes />
      </DemoPanel>
    </DemoPage>
  ),
};
