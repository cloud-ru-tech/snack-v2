import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Widget } from '@ds/uikit-product-widget';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Widget> = {
  title: 'Uikit Product/Widget',
  component: Widget,
};

export default meta;
type Story = StoryObj<typeof Widget>;

const header = {
  title: 'Project',
  titleTag: 'h2',
  href: '#project',
  target: '_blank',
  icon: <PlaceholderSVG />,
} as const;

export const HeaderCompatibility: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <Widget header={header} data-test-id='widget-simple'>
        Body
      </Widget>
      <Widget
        header={{ ...header, children: <span data-test-id='custom-header'>Custom header</span> }}
        data-test-id='widget-custom'
      >
        Body
      </Widget>
      <Widget header={{ ...header, children: false }} data-test-id='widget-empty'>
        Body
      </Widget>
    </>
  ),
};
