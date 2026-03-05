import { Button } from '@design-system/button';
import { PlaceholderSVG } from '@design-system/icons';
import { InfoBlockProps } from '@design-system/info-block';
import { PLACEMENT, POPOVER_WIDTH_STRATEGY, TRIGGER } from '@design-system/popover-private';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useRef } from 'react';

import dropdownReadme from '../../README.md?raw';
import { Dropdown, DropdownProps } from '../../src';
import { STATE } from '../../src/constants';
import { DropdownState } from '../../src/types';
import styles from './styles.module.scss';

const meta: Meta<DropdownProps> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    readme: { content: dropdownReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2254-442&p=f&m=dev',
    },
  },
  args: {},
  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;

type StoryProps = Exclude<DropdownProps, 'state'> & {
  customText?: string;
  state?: STATE;
};

type Story = StoryObj<StoryProps>;

const noop = () => {};

const placeholderIconProps: InfoBlockProps['icon'] = {
  icon: PlaceholderSVG,
  decor: true,
  appearance: 'neutral',
};

const Template: StoryFn<StoryProps> = ({ state: stateProp, customText, ...args }) => {
  const buttonRef = useRef(null);

  const state: DropdownState | undefined = useMemo(() => {
    switch (stateProp) {
      case STATE.Loading:
        return { type: STATE.Loading };

      case STATE.NotFound:
        return { type: STATE.NotFound, onActionClick: noop };

      case STATE.NoData:
        return { type: STATE.NoData, onActionClick: noop, icon: placeholderIconProps };

      case STATE.DataError:
        return { type: STATE.DataError, onActionClick: noop, icon: placeholderIconProps };

      default:
        return undefined;
    }
  }, [stateProp]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <Dropdown {...args} state={state} content={customText} triggerRef={buttonRef}>
          <Button innerRef={buttonRef} label='Toggle dropdown' view='filled' data-test-id='button-with-dropdown' />
        </Dropdown>
      </div>
    </div>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    state: undefined,
    customText: '# slot content',
    trigger: 'click',
    widthStrategy: 'gte',
    placement: 'bottom-start',
  },
  argTypes: {
    customText: {
      control: 'text',
    },
    state: {
      control: 'select',
      options: Object.values(STATE),
    },
    widthStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_WIDTH_STRATEGY),
    },
    trigger: {
      control: 'select',
      options: Object.values(TRIGGER),
    },
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
    },
  },
};
