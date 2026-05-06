import { HomeSVG, PlusSVG, SettingsSVG } from '@ds/icons';
import { Segment, SegmentControl, SIZE } from '@ds/segment-control';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof SegmentControl> = {
  title: 'Components/SegmentControl',
  component: SegmentControl,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof SegmentControl>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;

const layouts: Array<{ key: string; items: Segment[] }> = [
  {
    key: 'labelOnly',
    items: [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' },
    ],
  },
  {
    key: 'iconBefore',
    items: [
      { value: 'home', label: 'Home', icon: <HomeSVG /> },
      { value: 'settings', label: 'Settings', icon: <SettingsSVG /> },
      { value: 'plus', label: 'Add', icon: <PlusSVG /> },
    ],
  },
  {
    key: 'iconAfter',
    items: [
      { value: 'home', label: 'Home', icon: <HomeSVG />, iconPosition: 'after' },
      { value: 'settings', label: 'Settings', icon: <SettingsSVG />, iconPosition: 'after' },
      { value: 'plus', label: 'Add', icon: <PlusSVG />, iconPosition: 'after' },
    ],
  },
  {
    key: 'iconOnly',
    items: [
      { value: 'home', icon: <HomeSVG /> },
      { value: 'settings', icon: <SettingsSVG /> },
      { value: 'plus', icon: <PlusSVG /> },
    ],
  },
  {
    key: 'withCounter',
    items: [
      { value: 'inbox', label: 'Inbox', counter: 12 },
      { value: 'drafts', label: 'Drafts', counter: 3 },
      { value: 'archive', label: 'Archive' },
    ],
  },
];

const states: Array<{ key: string; props: Partial<Parameters<typeof SegmentControl>[0]> }> = [
  { key: 'default', props: {} },
  { key: 'outline', props: { outline: true } },
  { key: 'full', props: { width: 'full' } },
];

const labelItems: Segment[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' },
  { value: 'c', label: 'Charlie' },
];

const disabledItems: Segment[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo', disabled: true },
  { value: 'c', label: 'Charlie' },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Size × Layout'
        firstColumnHeader='Layout'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={layouts.map(({ key, items }) => ({
          variantLabel: key,
          cells: keySizes.map(size => (
            <div key={size} className={styles.item}>
              <SegmentControl items={items} defaultValue={items[0].value} size={size} />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Size × State (container)'
        firstColumnHeader='State'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={states.map(({ key, props }) => ({
          variantLabel: key,
          cells: keySizes.map(size => (
            <div key={size} className={styles.item}>
              <SegmentControl items={labelItems} defaultValue='a' size={size} {...props} />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Disabled segment'
        firstColumnHeader='Size'
        columnHeaders={['group']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            <div key={size} className={styles.item}>
              <SegmentControl items={disabledItems} defaultValue='a' size={size} />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
