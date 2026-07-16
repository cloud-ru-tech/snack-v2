import { Button } from '@ds/button';
import { Droplist, DroplistProps, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const items: Item[] = [
  { id: 'relevance', content: { label: 'Релевантности' } },
  { id: 'date', content: { label: 'Дате создания' } },
  { id: 'name', content: { label: 'Имени' } },
  { id: 'size', content: { label: 'Размеру' } },
];

const meta: Meta<DroplistProps> = {
  title: 'Components/List/Droplist/Examples/WithHeader',
  component: Droplist,
  parameters: { layout: 'fullscreen' },
  args: {
    items,
    size: 'm',
    placement: 'bottom-start',
    trigger: 'click',
    marker: true,
    header: 'Сортировать по',
    headerDivider: true,
    footer: 'Показаны 4 из 4',
    footerDivider: true,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Droplist with header and footer</DemoTitle>
        <DemoHint>header / footer — слоты над и под списком; разделители отделяют их от тела.</DemoHint>
        <DemoActions align='center'>
          <Droplist {...args}>
            <Button
              data-test-id={TEST_IDS.droplist.triggerOpen}
              label='Open droplist'
              view='outline'
              appearance='neutral'
              size='m'
            />
          </Droplist>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<DroplistProps>;

export const WithHeader: Story = { tags: ['dev', 'test'] };
