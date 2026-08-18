import { ERROR_TYPE, ErrorPage, ErrorType, LOGO_VARIANT, LogoVariant } from '@ds/uikit-product-error-pages';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

type PlaygroundArgs = {
  errorType?: ErrorType;
  logoVariant?: Exclude<LogoVariant, typeof LOGO_VARIANT.Custom>;
  mainPageUrl?: string;
  showMainButton?: boolean;
  showSupport?: boolean;
  'data-test-id'?: string;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/ErrorPages',
  component: ErrorPage,
  parameters: { layout: 'fullscreen' },
  args: {
    errorType: ERROR_TYPE.FrontendError,
    logoVariant: LOGO_VARIANT.Cloud,
    mainPageUrl: '/',
    showMainButton: true,
    showSupport: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    errorType: { control: 'select', options: Object.values(ERROR_TYPE) },
    logoVariant: { control: 'radio', options: [LOGO_VARIANT.Cloud, LOGO_VARIANT.None] },
    showSupport: { name: '[Stories]: showSupport', control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ errorType, logoVariant, showSupport, ...args }) => {
    const onSupportCenterClick = showSupport ? fn() : undefined;

    return (
      <div className={styles.playground}>
        {errorType === ERROR_TYPE.Custom ? (
          <ErrorPage
            {...args}
            logoVariant={logoVariant}
            errorType={ERROR_TYPE.Custom}
            custom={{ title: 'Custom title', description: 'Custom text', statusCode: 418 }}
            onSupportCenterClick={onSupportCenterClick}
          />
        ) : (
          <ErrorPage
            {...args}
            logoVariant={logoVariant}
            errorType={errorType}
            onSupportCenterClick={onSupportCenterClick}
          />
        )}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
