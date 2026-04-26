import { ButtonGroup } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import {
  BUTTON_GROUP_PRIMARY_TEST_ID,
  BUTTON_GROUP_SECONDARY_TEST_ID,
  BUTTON_GROUP_TERTIARY_TEST_ID,
  BUTTON_GROUP_TEST_ID,
} from './testIds';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const TwoActions: Story = {
  tags: ['dev'],
  args: {
    'data-test-id': BUTTON_GROUP_TEST_ID,
    primaryAction: {
      label: 'Сохранить',
      appearance: 'primary',
      view: 'filled',
      'data-test-id': BUTTON_GROUP_PRIMARY_TEST_ID,
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: 'neutral',
      view: 'outline',
      'data-test-id': BUTTON_GROUP_SECONDARY_TEST_ID,
    },
  },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveTextContent('Сохранить');
    await expect(root.getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toHaveTextContent('Отмена');
  },
};

export const ThreeActions: Story = {
  tags: ['dev'],
  args: {
    'data-test-id': BUTTON_GROUP_TEST_ID,
    primaryAction: {
      label: 'Сохранить',
      appearance: 'primary',
      view: 'filled',
      'data-test-id': BUTTON_GROUP_PRIMARY_TEST_ID,
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: 'neutral',
      view: 'outline',
      'data-test-id': BUTTON_GROUP_SECONDARY_TEST_ID,
    },
    tertiaryAction: {
      label: 'Помощь',
      appearance: 'neutral',
      view: 'simple',
      'data-test-id': BUTTON_GROUP_TERTIARY_TEST_ID,
    },
  },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toBeVisible();
    await expect(root.getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toBeVisible();
    await expect(root.getByTestId(BUTTON_GROUP_TERTIARY_TEST_ID)).toBeVisible();
  },
};
