import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import componentPackage from '../../package.json';
import readme from '../../README.md?raw';
import * as Extensions from '../../src/components/extensions';
import { Sprite, SpriteExtensionsSVG } from '../../src/sprite';
import { SubpathIconsCatalog } from './SubpathIconsCatalog';

type StoryProps = {
  size: number;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Icons/Extensions Visual Matrix',
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

export const ExtensionsVisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Каталог иконок типов файлов (@ds/icons/extensions) с поиском по названию.</DemoHint>
        <Sprite content={SpriteExtensionsSVG} />
        <DemoActions align='center'>
          <SubpathIconsCatalog
            title='Extensions'
            subpath='@ds/icons/extensions'
            icons={Extensions}
            stripSuffix='SVG'
            size={args.size}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
