import { Button } from '@design-system/button';
import { PlaceholderSVG } from '@design-system/icons';
import { InfoBlockProps } from '@design-system/info-block';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useMemo, useRef } from 'react';

import { StoryTable } from '#storybook/components';

import dropdownReadme from '../../README.md?raw';
import { Dropdown, DropdownProps } from '../../src';
import { STATE } from '../../src/constants';
import type { DropdownState } from '../../src/types';
import styles from './styles.module.scss';

const meta: Meta<DropdownProps> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    readme: { content: dropdownReadme },
    design: [
      {
        type: 'figma',
        name: 'Dropdown layout',
        url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2254-4950&m=dev',
      },
      {
        type: 'figma',
        name: 'Dropdown info states',
        url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2250-4862&m=dev',
      },
    ],
  },
};

export default meta;

type Story = StoryObj<DropdownProps>;

const noop = () => {};

const placeholderIconProps: InfoBlockProps['icon'] = {
  icon: PlaceholderSVG,
  decor: true,
  appearance: 'neutral',
};

function getStateConfig(stateType: STATE | 'default'): DropdownState | undefined {
  switch (stateType) {
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
}

function DropdownCell({ stateType, content }: { stateType: STATE | 'default'; content: ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const state = useMemo(() => getStateConfig(stateType), [stateType]);

  return (
    <div className={styles.matrixCell}>
      <Dropdown
        open={true}
        onOpenChange={noop}
        state={state}
        content={content}
        triggerRef={buttonRef}
        placement='bottom-start'
      >
        <Button innerRef={buttonRef} label='Dropdown' view='filled' />
      </Dropdown>
    </div>
  );
}

const stateLabels: Array<{ key: STATE | 'default'; label: string }> = [
  { key: 'default', label: 'Default (with content)' },
  { key: STATE.Loading, label: 'Loading' },
  { key: STATE.NotFound, label: 'Not found' },
  { key: STATE.NoData, label: 'No data' },
  { key: STATE.DataError, label: 'Data error' },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='States (stages)'
      firstColumnHeader=''
      columnHeaders={stateLabels.map(s => s.label)}
      rows={[
        {
          variantLabel: '',
          cells: stateLabels.map(({ key }) => (
            <DropdownCell key={key} stateType={key} content={<span># slot content</span>} />
          )),
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Все состояния (stages) дропдауна: с контентом, загрузка, не найдено, нет данных, ошибка. По умолчанию отображаются в раскрытом виде.',
      },
    },
  },
};
