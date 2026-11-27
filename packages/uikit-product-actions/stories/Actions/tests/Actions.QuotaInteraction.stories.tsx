import { TEST_IDS as MODAL_TEST_IDS } from '@ds/modal';
import { Action, Actions, TEST_IDS as ACTION_TEST_IDS } from '@ds/uikit-product-actions';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel, LayoutScope } from '#storybook/components';

import { TEST_IDS as LIST_TEST_IDS } from '../../../../list/src/constants';
import { TEST_IDS as QUOTA_TEST_IDS } from '../../../../uikit-product-quota/src/constants';

const TEST_IDS = {
  overflow: 'actions-quota-overflow',
  widget: 'actions-quota-widget',
  widgetTrigger: 'trigger-actions-quota-widget',
  widgetContent: 'content-actions-quota-widget',
} as const;
const opened = fn();
const openQuotas = fn();
const quota = {
  id: 'quota',
  variant: 'quota',
  quotas: [{ name: 'vCPU', limit: 10, usage: 3, remains: 7, unitDisplayName: 'шт.' }],
  loading: false,
  error: false,
  onRefresh: fn(),
  onWidgetOpen: opened,
  projectName: 'Тестовый проект',
  quotasUrl: '#quotas',
  onQuotasUrlClick: openQuotas,
  canEditQuota: false,
  buttonProps: { label: 'Квоты проекта' },
} satisfies Action;

function QuotaInteraction() {
  const [reordered, setReordered] = useState(false);
  const handleQuotaOpen = () => {
    opened();
    setReordered(true);
  };
  const overflowQuota: Action = { ...quota, onWidgetOpen: handleQuotaOpen };
  return (
    <DemoPage>
      <DemoPanel>
        <LayoutScope layoutType='desktop'>
          <Actions collapse={false} items={[{ ...quota, 'data-test-id': TEST_IDS.widget }]} />
          <Actions
            items={reordered ? [{ id: 'first', label: 'Другое действие' }, overflowQuota] : [overflowQuota]}
            maxVisibleItems={0}
            moreButtonProps={{ 'data-test-id': TEST_IDS.overflow }}
          />
        </LayoutScope>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof Actions> = {
  title: 'Uikit Product/Actions/Actions/Tests/Quota',
  component: Actions,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
};
export default meta;
export const QuotaInteractionTest: StoryObj<typeof Actions> = {
  tags: ['test', 'dev'],
  render: () => <QuotaInteraction />,
  play: async ({ canvasElement, step }) => {
    opened.mockClear();
    openQuotas.mockClear();
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await step('Видимая квота открывает виджет с данными проекта', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.widgetTrigger));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.widgetContent)).toBeVisible());
      await expect(body.getByTestId(TEST_IDS.widgetContent)).toHaveTextContent('Тестовый проект');
      await expect(opened).toHaveBeenCalledOnce();
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.widgetContent)).not.toBeInTheDocument());
    });
    await step('Квота из меню открывает модальное окно и сохраняется при перестановке', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.overflow));
      await waitFor(() => expect(body.getByTestId(new RegExp(`^${LIST_TEST_IDS.baseItem}_`))).toBeVisible());
      await userEvent.click(body.getByTestId(new RegExp(`^${LIST_TEST_IDS.baseItem}_`)));
      await waitFor(() => expect(body.getByTestId(ACTION_TEST_IDS.quotaModal)).toHaveTextContent('Тестовый проект'));
      const modal = body.getByTestId(ACTION_TEST_IDS.quotaModal);
      const content = body.getByTestId(QUOTA_TEST_IDS.quotaWidget.content);
      await expect(content).toHaveTextContent('vCPU');
      await expect(modal.textContent?.match(/Тестовый проект/g)).toHaveLength(1);
      await expect(within(modal).queryByTestId(QUOTA_TEST_IDS.quotaWidget.projectHeader)).not.toBeInTheDocument();
      await waitFor(() => {
        expect(content.getBoundingClientRect().width).toBeGreaterThan(0);
        for (
          let element: HTMLElement | null = content;
          element && modal.contains(element);
          element = element.parentElement
        ) {
          expect(element.scrollWidth).toBeLessThanOrEqual(element.clientWidth + 1);
        }
      });
      const quotaLink = within(modal).getByTestId(ACTION_TEST_IDS.quotaLink);
      await expect(quotaLink).toHaveAttribute('href', '#quotas');
      quotaLink.addEventListener('click', event => event.preventDefault(), { once: true });
      await userEvent.click(quotaLink);
      await expect(openQuotas).toHaveBeenCalledOnce();
      await expect(opened).toHaveBeenCalledTimes(2);
      await userEvent.click(body.getByTestId(MODAL_TEST_IDS.closeButton));
      await waitFor(() => expect(body.queryByTestId(MODAL_TEST_IDS.overlay)).not.toBeInTheDocument());
    });
  },
};
