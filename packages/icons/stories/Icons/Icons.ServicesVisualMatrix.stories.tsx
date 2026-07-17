import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import componentPackage from '../../package.json';
import readme from '../../README.md?raw';
import * as Services from '../../src/components/services';
import * as Advanced from '../../src/components/services/sprite/Advanced';
import * as CrossPlatform from '../../src/components/services/sprite/Cross-Platform';
import * as Evolution from '../../src/components/services/sprite/Evolution';
import * as Kubernetes from '../../src/components/services/sprite/Kubernetes';
import * as MlSpace from '../../src/components/services/sprite/ML-Space';
import * as PartnerCabinet from '../../src/components/services/sprite/Partner-Cabinet';
import * as Software from '../../src/components/services/sprite/Software';
import * as Vmware from '../../src/components/services/sprite/VMware';
import { Sprite, SpriteServicesSVG } from '../../src/sprite';
import { SubpathIconsCatalog } from './SubpathIconsCatalog';

type StoryProps = {
  size: number;
};

// Секции повторяют папки svgs/services/<Section> (см. GROUP_CONFIG/иерархию Figma-мастера) —
// используется только для группировки в сторе, публичный @ds/icons/services остаётся плоским.
const SECTION_BY_NAME: Record<string, string> = Object.fromEntries([
  ...Object.keys(Evolution).map(name => [name, 'Evolution']),
  ...Object.keys(MlSpace).map(name => [name, 'ML Space']),
  ...Object.keys(Advanced).map(name => [name, 'Advanced']),
  ...Object.keys(Vmware).map(name => [name, 'VMware']),
  ...Object.keys(PartnerCabinet).map(name => [name, 'Партнерский кабинет']),
  ...Object.keys(CrossPlatform).map(name => [name, 'Кроссплатформенные']),
  ...Object.keys(Software).map(name => [name, 'Software']),
  ...Object.keys(Kubernetes).map(name => [name, 'Kubernetes']),
]);

const meta: Meta<StoryProps> = {
  title: 'Components/Icons/Services Visual Matrix',
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

export const ServicesVisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Каталог иконок сервисов и вендоров (@ds/icons/services) с поиском по названию, сгруппированный по разделам
          Figma-мастера.
        </DemoHint>
        <Sprite content={SpriteServicesSVG} />
        <DemoActions align='center'>
          <SubpathIconsCatalog
            title='Services'
            subpath='@ds/icons/services'
            icons={Services}
            stripSuffix='SVG'
            size={args.size}
            sectionOf={({ exportName }) => SECTION_BY_NAME[exportName] ?? 'Other'}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
