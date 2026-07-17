import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import componentPackage from '../../package.json';
import readme from '../../README.md?raw';
import * as Logos from '../../src/components/logos';
import { SubpathIconsCatalog } from './SubpathIconsCatalog';

type StoryProps = {
  size: number;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Icons/Logos Visual Matrix',
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
      description: 'Размер логотипа в пикселях (высота — ширина у wordmark-логотипов больше)',
    },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const LogosVisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Каталог логотипов (@ds/icons/logos) — каждый компонент сам переключает Light/Dark вариант через тему.
        </DemoHint>
        <DemoActions align='center'>
          <SubpathIconsCatalog
            title='Logos'
            subpath='@ds/icons/logos'
            icons={Logos}
            size={args.size}
            squareIcons={false}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
