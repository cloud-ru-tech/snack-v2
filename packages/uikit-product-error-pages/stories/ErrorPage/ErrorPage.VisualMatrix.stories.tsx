import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof ErrorPage> = {
  title: 'Uikit Product/ErrorPages',
  component: ErrorPage,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

const errorTypes = [
  ERROR_TYPE.FrontendError,
  ERROR_TYPE.PageUnavailable,
  ERROR_TYPE.PageNotFound,
  ERROR_TYPE.Offline,
  ERROR_TYPE.Redirect,
  ERROR_TYPE.Custom,
] as const;

const logoVariants = [LOGO_VARIANT.Cloud, LOGO_VARIANT.Custom, LOGO_VARIANT.None] as const;

const cell = (node: ReactNode) => <div className={styles.matrixCell}>{node}</div>;

const containerWidths = [
  { label: 'desktop / 1248', className: styles.matrixCell },
  { label: 'tablet / 834', className: styles.matrixCellTablet },
  { label: 'mobile / 360', className: styles.matrixCellMobile },
] as const;

const renderByContainerWidth = ({ label, className }: (typeof containerWidths)[number]) => (
  <div className={className}>
    <ErrorPage data-test-id={TEST_IDS.matrix('frontend', label.split(' ')[0])} logoVariant={LOGO_VARIANT.Cloud} />
  </div>
);

const renderByErrorType = (errorType: (typeof errorTypes)[number]) => {
  const dataTestId = TEST_IDS.matrix(errorType, 'cloud');

  if (errorType === ERROR_TYPE.Custom) {
    return cell(
      <ErrorPage
        data-test-id={dataTestId}
        errorType={ERROR_TYPE.Custom}
        custom={{ title: 'Custom title', description: 'Custom text', statusCode: 418 }}
        logoVariant={LOGO_VARIANT.Cloud}
      />,
    );
  }

  return cell(<ErrorPage data-test-id={dataTestId} errorType={errorType} logoVariant={LOGO_VARIANT.Cloud} />);
};

const renderByLogo = (logoVariant: (typeof logoVariants)[number]) => {
  const dataTestId = TEST_IDS.matrix('frontend', logoVariant.toLowerCase());

  if (logoVariant === LOGO_VARIANT.Custom) {
    return cell(
      <ErrorPage data-test-id={dataTestId} logoVariant={LOGO_VARIANT.Custom} logo={<span>Custom logo</span>} />,
    );
  }

  return cell(<ErrorPage data-test-id={dataTestId} logoVariant={logoVariant} />);
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Error type (logo = Cloud)'
        firstColumnHeader='errorType'
        columnHeaders={['sample']}
        rows={errorTypes.map(errorType => ({
          variantLabel: errorType,
          cells: [renderByErrorType(errorType)],
        }))}
      />
      <StoryTable
        sectionTitle='Logo variant (errorType = FrontendError)'
        firstColumnHeader='logoVariant'
        columnHeaders={['sample']}
        rows={logoVariants.map(logoVariant => ({
          variantLabel: logoVariant,
          cells: [renderByLogo(logoVariant)],
        }))}
      />
      <StoryTable
        sectionTitle='Container width (errorType = FrontendError, logo = Cloud)'
        firstColumnHeader='ширина контейнера'
        columnHeaders={['sample']}
        rows={containerWidths.map(width => ({
          variantLabel: width.label,
          cells: [renderByContainerWidth(width)],
        }))}
      />
    </div>
  ),
};
