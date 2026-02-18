import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { MouseEventHandler } from 'react';

import linkReadme from '../../README.md?raw';
import { APPEARANCE, Link, LinkProps, ROLE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    readme: { content: linkReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6913-5372&p=f&m=dev',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj;

const roles = Object.values(ROLE);
const appearances = Object.values(APPEARANCE);

const handleClick: MouseEventHandler = e => {
  e.preventDefault();
};

const Template: StoryFn = () => (
  <div className={styles.wrapper}>
    {roles.map(role => (
      <table key={role} className={styles.linkTable}>
        <thead className={styles.linkTableHeader}>
          <tr className={styles.linkRow}>
            <th className={cn(styles.linkCell, styles.linkTitleCell)}>Role</th>
            <th className={cn(styles.linkCell, styles.linkTitleCell)}>{role}</th>
          </tr>
        </thead>
        {appearances.map(appearance => (
          <tr key={appearance} className={styles.linkRow}>
            <td className={cn(styles.linkCell, styles.colHead)}>{appearance}</td>
            <td className={cn(styles.linkCell, styles.colValue)}>
              <div className={styles.linkWrapper} data-appearance={appearance} data-role={role} data-show-background>
                <Link appearance={appearance} role={role} text='Link text' onClick={handleClick} />
              </div>
            </td>
          </tr>
        ))}
      </table>
    ))}
  </div>
);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: Template,
};
