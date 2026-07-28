import { Accordion } from '@ds/accordion';
import { Stepper } from '@ds/stepper';
import { QuestionTooltip } from '@ds/tooltip';
import { PageForm, PageFormProps } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { FormFields, FormHelp, PriceBreakdown } from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const FORM_STEPS = [{ title: 'Конфигурация' }, { title: 'Сеть и доступ' }, { title: 'Подтверждение' }];

const stepper = (
  <Stepper steps={FORM_STEPS} defaultCurrentStepIndex={1}>
    {({ stepper: stepperNode }) => stepperNode}
  </Stepper>
);

const formContent = (
  <div className={styles.formAccordions}>
    <Accordion expandedDefault='basics'>
      <Accordion.CollapseBlockPrimary
        view='outline'
        id='basics'
        title='Основные параметры'
        subTitle='Имя, регион и конфигурация инстанса'
        afterTitle={<QuestionTooltip tip='Эти параметры можно изменить после остановки инстанса' />}
      >
        <FormFields />
      </Accordion.CollapseBlockPrimary>
    </Accordion>
    <Accordion>
      <Accordion.CollapseBlockPrimary
        view='outline'
        id='network'
        title='Сеть'
        subTitle='Подсеть, публичный IP и группы безопасности'
      >
        <FormFields />
      </Accordion.CollapseBlockPrimary>
    </Accordion>
  </div>
);

const priceSummary: PageFormProps['priceSummary'] = {
  total: '12 000 ₽ / мес',
  content: <PriceBreakdown />,
};

const sideBlock: PageFormProps['sideBlock'] = [{ label: 'Справка', content: <FormHelp /> }];

const footer: PageFormProps['footer'] = {
  buttonPrimary: { variant: 'create', onClick: fn() },
  buttonSecondary: { variant: 'cancel', onClick: fn() },
};

// Тогглы видимости слотов — только для Playground (не часть API компонента).
type StoryProps = PageFormProps & {
  showSubtitle: boolean;
  showStepper: boolean;
  showPriceSummary: boolean;
  showSideBlock: boolean;
  showFooter: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/PageLayout/PageForm',
  component: PageForm,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Создание инстанса',
    subtitle: 'Заполните параметры конфигурации',
    stepper,
    priceSummary,
    sideBlock,
    footer,
    children: formContent,
    'data-test-id': TEST_IDS.pageForm.root,
    showSubtitle: true,
    showStepper: true,
    showPriceSummary: true,
    showSideBlock: true,
    showFooter: true,
  },
  argTypes: {
    priceSummary: { table: { disable: true } },
    sideBlock: { table: { disable: true } },
    footer: { table: { disable: true } },
    stepper: { table: { disable: true } },
    children: { table: { disable: true } },
    showSubtitle: { name: '[Stories]: showSubtitle', control: 'boolean' },
    showStepper: { name: '[Stories]: showStepper', control: 'boolean' },
    showPriceSummary: { name: '[Stories]: showPriceSummary', control: 'boolean' },
    showSideBlock: { name: '[Stories]: showSideBlock', control: 'boolean' },
    showFooter: { name: '[Stories]: showFooter', control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showSubtitle, showStepper, showPriceSummary, showSideBlock, showFooter, ...args }) => (
    <div className={styles.fullPage}>
      <PageForm
        {...args}
        subtitle={showSubtitle ? args.subtitle : undefined}
        stepper={showStepper ? args.stepper : undefined}
        priceSummary={showPriceSummary ? args.priceSummary : undefined}
        sideBlock={showSideBlock ? args.sideBlock : undefined}
        footer={showFooter ? args.footer : undefined}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pageForm.root)).toBeVisible();
  },
};
