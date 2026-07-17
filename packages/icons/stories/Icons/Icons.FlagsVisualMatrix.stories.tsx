import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import componentPackage from '../../package.json';
import readme from '../../README.md?raw';
import * as Flags from '../../src/components/flags';
import { SubpathIconsCatalog } from './SubpathIconsCatalog';

type StoryProps = {
  size: number;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Icons/Flags Visual Matrix',
  parameters: {
    layout: 'fullscreen',
    readme: { content: readme },
    packageName: componentPackage.name,
  },
  args: {
    size: 24,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: [16, 24, 32, 40],
      description: 'Размер иконки в пикселях',
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const FlagsVisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Каталог флагов стран (@ds/icons/flags) с поиском по названию.</DemoHint>
        <DemoActions align='center'>
          <SubpathIconsCatalog
            title='Flags'
            subpath='@ds/icons/flags'
            icons={Flags}
            stripSuffix='SVG'
            size={args.size}
            sectionOf={({ label }) => label.charAt(0).toUpperCase()}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
