import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ErrorPage> = {
  title: 'Uikit Product/ErrorPage/Examples/Custom',
  component: ErrorPage,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

/**
 * `ERROR_TYPE.Custom` + `custom` позволяют задать заголовок, текст, код статуса,
 * главную кнопку и видимость ссылок. Логотип — `LOGO_VARIANT.Custom` со своим узлом.
 */
export const Custom: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Custom</DemoTitle>
        <DemoHint>Полностью кастомный контент: свой заголовок, код статуса, кнопка и логотип.</DemoHint>
        <DemoActions block>
          <div className={styles.frame}>
            <ErrorPage
              data-test-id={TEST_IDS.root}
              errorType={ERROR_TYPE.Custom}
              logoVariant={LOGO_VARIANT.Custom}
              logo={<span>ACME</span>}
              mainPageUrl='/dashboard'
              custom={{
                title: 'Quota exceeded',
                description: 'Your project reached its resource limit. Upgrade the plan to continue.',
                statusCode: 429,
                mainButton: { label: 'Upgrade plan', href: '/billing' },
                showMainPageLink: true,
                showBackLink: true,
              }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.statusCode)).toHaveTextContent('429');
    await expect(canvas.getByTestId(TEST_IDS.mainButton)).toBeVisible();
  },
};
