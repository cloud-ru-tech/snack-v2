import { PlusSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import alertReadme from '../../README.md?raw';
import { AlertTop, type AlertTopProps, ALIGN, APPEARANCE, SIZE } from '../../src';
import playgroundStyles from '../styles.module.scss';

const defaultActionPrimary = { label: 'Основное', icon: <PlusSVG /> };
const defaultActionSecondary = {
  label: 'Второе',
  icon: <PlusSVG />,
  iconPosition: 'after' as const,
  loading: true,
};

type AlertTopPlaygroundArgs = AlertTopProps & {
  /** Показать кнопку закрытия (передаётся `onClose`) */
  showClose?: boolean;
  /** Показать основное действие в футере */
  showActionPrimary?: boolean;
  /** Показать вторичное действие в футере */
  showActionSecondary?: boolean;
};

const meta: Meta<AlertTopPlaygroundArgs> = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
  parameters: {
    readme: { content: alertReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=17256-13628&m=dev',
    },
  },
  args: {
    'data-test-id': undefined,
    title: 'Заголовок',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet reprehenderit laborum in magnam ducimus officiis incidunt nihil a vitae, quaerat fugit omnis enim quae. Nostrum inventore dolorem quaerat maiores rem!',
    appearance: APPEARANCE.Neutral,
    align: ALIGN.Vertical,
    size: SIZE.M,
    icon: true,
    className: undefined,
    collapsible: false,
    showClose: true,
    showActionPrimary: true,
    showActionSecondary: true,
  },
  argTypes: {
    'data-test-id': { control: false },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    align: {
      control: 'select',
      options: Object.values(ALIGN),
    },
    collapsible: {
      control: 'boolean',
      if: { arg: 'align', eq: ALIGN.Vertical },
    },
    className: { control: false },
    icon: { control: 'boolean' },
    description: { control: 'text' },
    title: { control: 'text' },
    showClose: { control: 'boolean' },
    showActionPrimary: { control: 'boolean' },
    showActionSecondary: { control: 'boolean' },
    actions: { control: false },
    onClose: { control: false },
  },
};

export default meta;
type Story = StoryObj<AlertTopPlaygroundArgs>;

function getDerivedAlertTopPlaygroundProps(args: AlertTopPlaygroundArgs) {
  const { showClose, showActionPrimary, showActionSecondary, onClose, align, collapsible, ...rest } = args;

  const closeEnabled = showClose ?? true;
  const primaryEnabled = showActionPrimary ?? true;
  const secondaryEnabled = showActionSecondary ?? true;

  const actionsProp: AlertTopProps['actions'] | undefined =
    primaryEnabled || secondaryEnabled
      ? ({
          ...(primaryEnabled ? { primary: defaultActionPrimary } : {}),
          ...(secondaryEnabled ? { secondary: defaultActionSecondary } : {}),
        } as AlertTopProps['actions'])
      : undefined;

  return {
    rest,
    align,
    collapsible: align === ALIGN.Horizontal ? false : collapsible,
    actionsProp,
    onClose: closeEnabled ? onClose : undefined,
  };
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    onClose: () => undefined,
  },
  render: args => {
    const { rest, align, collapsible, actionsProp, onClose } = getDerivedAlertTopPlaygroundProps(args);

    return (
      <div className={playgroundStyles.root}>
        <AlertTop {...rest} align={align} collapsible={collapsible} actions={actionsProp} onClose={onClose} />
      </div>
    );
  },
};
