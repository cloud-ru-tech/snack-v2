import {
  CONTAINER,
  SECTION_BACKGROUND_FILL,
  SECTION_CONTAINER_BACKGROUND_TYPE,
  SectionBackgroundFill,
  SectionTable,
  SectionTableProps,
} from '@ds/site-section';
import { TABLE_ROW_COLOR } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { CAPTION, COLUMN_DEFINITIONS, DESCRIPTION, ROWS, TariffRow, TITLE } from './fixtures';
import { TEST_IDS } from './testIds';

type StoryProps = Omit<SectionTableProps<TariffRow>, 'containerBackground'> & {
  showCaption: boolean;
  containerFill: SectionBackgroundFill;
};

function SectionTablePlayground({ showCaption, caption, containerFill, ...props }: StoryProps) {
  return (
    <DemoPage>
      <DemoPanel width='fluid'>
        <SectionTable
          {...props}
          caption={showCaption ? caption : undefined}
          containerBackground={{ type: SECTION_CONTAINER_BACKGROUND_TYPE.Bg, fill: containerFill }}
        />
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof SectionTablePlayground> = {
  title: 'Site/Section/SectionTable',
  component: SectionTablePlayground,
  parameters: { layout: 'fullscreen' },
  args: {
    container: CONTAINER.New,
    title: TITLE,
    description: DESCRIPTION,
    caption: CAPTION,
    showCaption: true,
    containerFill: SECTION_BACKGROUND_FILL.NeutralBackground,
    columnDefinitions: COLUMN_DEFINITIONS,
    data: ROWS,
    headerRowBackgroundColor: TABLE_ROW_COLOR.Neutral,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    container: { control: 'radio', options: Object.values(CONTAINER) },
    showCaption: { name: '[Stories]: showCaption', control: 'boolean' },
    containerFill: {
      name: '[Stories]: containerBackground.fill',
      control: 'select',
      options: Object.values(SECTION_BACKGROUND_FILL),
    },
    columnDefinitions: { table: { disable: true } },
    data: { table: { disable: true } },
    headerRowBackgroundColor: {
      control: 'select',
      options: Object.values(TABLE_ROW_COLOR),
    },
    background: { table: { disable: true } },
    tabBarItems: { table: { disable: true } },
    filterItems: { table: { disable: true } },
    pagination: { table: { disable: true } },
    moreButton: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTablePlayground>;

export const Playground: Story = {
  args: {
    containerFill: 'neutralBackground',
  },

  tags: ['dev', 'test'],

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId(TEST_IDS.table)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.caption)).toBeVisible();
  },
};
