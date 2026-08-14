import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Stepper } from '@ds/stepper';
import { PageForm } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import { FormFields, FormHelp, FormSections, PriceBreakdown } from '../demoData';
import styles from '../styles.module.scss';

const meta: Meta<typeof PageForm> = {
  title: 'Uikit Product/PageLayout/PageForm',
  component: PageForm,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PageForm>;

const FORM_STEPS = [{ title: 'Конфигурация' }, { title: 'Сеть и доступ' }, { title: 'Подтверждение' }];

const stepper = (
  <Stepper steps={FORM_STEPS} defaultCurrentStepIndex={1}>
    {({ stepper: stepperNode }) => stepperNode}
  </Stepper>
);

const priceSummary = { total: '12 000 ₽ / мес', content: <PriceBreakdown /> };

const footer = {
  buttonPrimary: { variant: 'create', onClick: fn() },
  buttonSecondary: { variant: 'cancel', onClick: fn() },
} as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='layout'
        firstColumnHeader='layout'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'with side items',
            cells: [
              <div key='adv' className={styles.deviceForm}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PageForm
                    title='Создание инстанса'
                    subtitle='Заполните параметры конфигурации'
                    stepper={stepper}
                    priceSummary={priceSummary}
                    sideBlock={[{ label: 'Справка', content: <FormHelp /> }]}
                    footer={footer}
                  >
                    <FormSections />
                  </PageForm>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'sticky footer',
            cells: [
              // Фрейм со своим скроллом: только в нём футер прилипает и показывает разделитель.
              <div key='sticky' className={styles.deviceFormScroll}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PageForm
                    title='Создание инстанса'
                    subtitle='Заполните параметры конфигурации'
                    stepper={stepper}
                    footer={footer}
                    stickyFooter
                  >
                    <FormSections />
                  </PageForm>
                </AdaptiveProvider>
              </div>,
            ],
          },
          {
            variantLabel: 'plain form',
            cells: [
              <div key='reg' className={styles.deviceForm}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
                  <PageForm
                    title='Создание инстанса'
                    subtitle='Заполните параметры конфигурации'
                    stepper={stepper}
                    footer={footer}
                  >
                    <FormSections />
                  </PageForm>
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='layoutType'
        firstColumnHeader='layoutType'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'mobile',
            cells: [
              <div key='m' className={styles.deviceMobile}>
                <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
                  <PageForm title='Создание инстанса' priceSummary={priceSummary} footer={footer}>
                    <FormFields />
                  </PageForm>
                </AdaptiveProvider>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
