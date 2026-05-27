import { Card } from '@ds/card';
import { Typography, VARIANT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Examples/Polymorphic',
  component: Card,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Polymorphic: as=&apos;a&apos;</DemoTitle>
        <DemoHint>
          Card рендерится как &lt;a&gt; с href. target=&apos;_blank&apos; автоматически добавляет rel=&apos;noopener
          noreferrer&apos;. Для роутер-линка передавайте as={'{Link}'} и to.
        </DemoHint>
        <DemoActions align='center'>
          <Card as='a' href='https://example.com' target='_blank' interactive data-test-id={`${TEST_IDS.root}-anchor`}>
            <Typography variant={VARIANT.title} size='m'>
              Открыть документацию
            </Typography>
            <Typography variant={VARIANT.body} size='s'>
              example.com — открывается в новой вкладке
            </Typography>
          </Card>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
