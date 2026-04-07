import { PlusSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import alertReadme from '../../README.md?raw';
import { Alert, type AlertProps, ALIGN, APPEARANCE, SIZE } from '../../src';
import playgroundStyles from '../styles.module.scss';

const defaultActionPrimary = { label: 'Основное', icon: <PlusSVG /> };
const defaultActionSecondary = {
  label: 'Второе',
  icon: <PlusSVG />,
  iconPosition: 'after' as const,
  loading: true,
};

type AlertPlaygroundArgs = AlertProps & {
  /** Показать кнопку закрытия (передаётся `onClose`) */
  showClose?: boolean;
  /** Показать основное действие в футере */
  showActionPrimary?: boolean;
  /** Показать вторичное действие в футере */
  showActionSecondary?: boolean;
};

const meta: Meta<AlertPlaygroundArgs> = {
  title: 'Components/Alert/Alert',
  component: Alert,
  parameters: {
    readme: { content: alertReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/MQnuVskw7MyW36cAsZpFV8/FF-8172-slot?node-id=3222-166&m=dev',
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
    outline: false,
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
    outline: { control: 'boolean' },
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
type Story = StoryObj<AlertPlaygroundArgs>;

function getDerivedAlertPlaygroundProps(args: AlertPlaygroundArgs) {
  const { showClose, showActionPrimary, showActionSecondary, onClose, align, collapsible, ...rest } = args;

  const closeEnabled = showClose ?? true;
  const primaryEnabled = showActionPrimary ?? true;
  const secondaryEnabled = showActionSecondary ?? true;

  const actionsProp: AlertProps['actions'] | undefined =
    primaryEnabled || secondaryEnabled
      ? ({
          ...(primaryEnabled ? { primary: defaultActionPrimary } : {}),
          ...(secondaryEnabled ? { secondary: defaultActionSecondary } : {}),
        } as AlertProps['actions'])
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
    const { rest, align, collapsible, actionsProp, onClose } = getDerivedAlertPlaygroundProps(args);

    return (
      <div className={playgroundStyles.root}>
        <Alert {...rest} align={align} collapsible={collapsible} actions={actionsProp} onClose={onClose} />
      </div>
    );
  },
};
