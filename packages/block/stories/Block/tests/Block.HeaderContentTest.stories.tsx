import { Block, SIZE } from '@ds/block';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

const meta: Meta<typeof Block> = { title: 'Components/Block/Tests/HeaderContent', component: Block };
export default meta;

function EmptyHeader() {
  return null;
}

const cases: Record<string, ReactNode> = {
  undefined: undefined,
  null: null,
  false: false,
  true: true,
  string: '',
  array: [],
  fragment: <></>,
  component: <EmptyHeader />,
  zero: 0,
  content: <span>Header</span>,
};

export const HeaderContentTest: StoryObj<typeof Block> = {
  tags: ['test', 'dev'],
  render: () => (
    <div>
      {Object.values(SIZE).map(size =>
        Object.entries(cases).map(([name, header]) => (
          <Block key={`${size}-${name}`} size={size} header={header} data-test-id={`header-${size}-${name}`}>
            Body
          </Block>
        )),
      )}
    </div>
  ),
};
