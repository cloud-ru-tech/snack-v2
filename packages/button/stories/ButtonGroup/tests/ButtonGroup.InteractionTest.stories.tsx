import { APPEARANCE, ButtonGroup, ButtonGroupProps, SIZE, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { BUTTON_GROUP_LABELS } from '../constants';

const renderScenario = (title: string, hint: string) => (args: ButtonGroupProps) => (
  <DemoPage>
    <DemoPanel>
      <DemoTitle>{title}</DemoTitle>
      <DemoHint>{hint}</DemoHint>
      <DemoActions align='center'>
        <ButtonGroup {...args} />
      </DemoActions>
    </DemoPanel>
  </DemoPage>
);

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup/Tests/Interaction',
  component: ButtonGroup,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.M,
    'data-test-id': TEST_IDS.buttonGroup.root,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    primaryAction: {
      label: BUTTON_GROUP_LABELS.primary,
      appearance: APPEARANCE.Primary,
      view: VIEW.Filled,
      onClick: fn(),
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
    secondaryAction: {
      label: BUTTON_GROUP_LABELS.secondary,
      appearance: APPEARANCE.Neutral,
      view: VIEW.Outline,
      onClick: fn(),
      'data-test-id': TEST_IDS.buttonGroup.secondary,
    },
  },
  render: renderScenario('InteractionTest', 'Проверка независимых onClick у действий группы и клавиатуры.'),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const primary = canvas.getByTestId(TEST_IDS.buttonGroup.primary);
    const secondary = canvas.getByTestId(TEST_IDS.buttonGroup.secondary);
    const primaryOnClick = args.primaryAction?.onClick;
    const secondaryOnClick = args.secondaryAction?.onClick;

    await step('click: primary action fires its own onClick', async () => {
      await userEvent.click(primary);
      expect(primaryOnClick).toHaveBeenCalledTimes(1);
      expect(secondaryOnClick).not.toHaveBeenCalled();
    });

    await step('click: secondary action fires its own onClick (no cross-talk)', async () => {
      await userEvent.click(secondary);
      expect(secondaryOnClick).toHaveBeenCalledTimes(1);
      expect(primaryOnClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Enter on focused secondary fires onClick', async () => {
      secondary.focus();
      await expect(secondary).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      expect(secondaryOnClick).toHaveBeenCalledTimes(2);
    });
  },
};

// Baked-args fixtures for Playwright specs that need nested action objects.
// (URL args cannot encode nested object shapes reliably.)
export const DisabledPrimaryFixture: Story = {
  tags: ['test', 'dev'],
  render: renderScenario('DisabledPrimaryFixture', 'Группа с заблокированным первичным действием.'),
  args: {
    primaryAction: {
      label: BUTTON_GROUP_LABELS.primary,
      appearance: APPEARANCE.Primary,
      view: VIEW.Filled,
      disabled: true,
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
    secondaryAction: {
      label: BUTTON_GROUP_LABELS.secondary,
      appearance: APPEARANCE.Neutral,
      view: VIEW.Outline,
      'data-test-id': TEST_IDS.buttonGroup.secondary,
    },
  },
};

export const CriticalPrimaryFixture: Story = {
  tags: ['test', 'dev'],
  render: renderScenario('CriticalPrimaryFixture', 'Группа с критичным первичным действием.'),
  args: {
    primaryAction: {
      label: BUTTON_GROUP_LABELS.primaryCritical,
      appearance: APPEARANCE.Critical,
      view: VIEW.Filled,
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
    secondaryAction: {
      label: BUTTON_GROUP_LABELS.secondary,
      appearance: APPEARANCE.Neutral,
      view: VIEW.Simple,
      'data-test-id': TEST_IDS.buttonGroup.secondary,
    },
  },
};

export const ThreeActionsFixture: Story = {
  tags: ['test', 'dev'],
  render: renderScenario('ThreeActionsFixture', 'Группа из трёх действий: primary, secondary, tertiary.'),
  args: {
    primaryAction: {
      label: BUTTON_GROUP_LABELS.primary,
      appearance: APPEARANCE.Primary,
      view: VIEW.Filled,
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
    secondaryAction: {
      label: BUTTON_GROUP_LABELS.secondary,
      appearance: APPEARANCE.Neutral,
      view: VIEW.Outline,
      'data-test-id': TEST_IDS.buttonGroup.secondary,
    },
    tertiaryAction: {
      label: BUTTON_GROUP_LABELS.tertiary,
      appearance: APPEARANCE.Neutral,
      view: VIEW.Simple,
      'data-test-id': TEST_IDS.buttonGroup.tertiary,
    },
  },
};
