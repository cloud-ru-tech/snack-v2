import { PlaceholderSVG } from '@ds/icons/interface/system';
import { List } from '@ds/list';
import {
  ListItemCustom,
  ListItemGroupCustom,
  renderListItemCustom,
  renderListItemGroupCustom,
} from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Uikit Product/Layout/Header/ListCustom',
  id: 'uikit-product-header-listcustom',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const PLAYGROUND_ROOT = 'header-list-custom-playground';

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: function Render() {
    const [selected, setSelected] = useState<string | number>('a');

    return (
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>ListCustom</DemoTitle>
          <DemoHint>
            `ListItemCustom` и `ListItemGroupCustom` подключаются к `List` через `itemRender` / `groupItemRender`.
            Внутри строки — `ContentWrapperCustom`.
          </DemoHint>
          <DemoActions align='center'>
            <div className={styles.listFrame}>
              <List
                data-test-id={PLAYGROUND_ROOT}
                size='s'
                marker
                selection={{ mode: 'single', value: selected, onChange: setSelected }}
                itemRender={renderListItemCustom}
                groupItemRender={renderListItemGroupCustom}
                items={[
                  {
                    type: 'group',
                    label: 'Группа',
                    groupVariant: 'subtitleTertiary',
                    items: [
                      {
                        id: 'a',
                        beforeContent: <PlaceholderSVG />,
                        content: { label: 'Пункт A', description: 'Описание' },
                      },
                      {
                        id: 'b',
                        beforeContent: <PlaceholderSVG />,
                        content: { label: 'Пункт B', caption: 'meta' },
                      },
                    ],
                  },
                  { type: 'group', divider: true, items: [] },
                  {
                    id: 'c',
                    beforeContent: <PlaceholderSVG />,
                    content: { label: 'Пункт C' },
                    disabled: true,
                  },
                ]}
              />
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(PLAYGROUND_ROOT)).toBeVisible();
    // Компоненты экспортируются и используются как рендеры — smoke на корне списка.
    await expect(ListItemCustom).toBeTruthy();
    await expect(ListItemGroupCustom).toBeTruthy();
  },
};
