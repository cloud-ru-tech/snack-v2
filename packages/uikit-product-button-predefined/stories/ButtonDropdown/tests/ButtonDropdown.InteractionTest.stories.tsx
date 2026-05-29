import { ButtonDropdown } from '@ds/uikit-product-button-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

const meta: Meta<typeof ButtonDropdown> = {
  title: 'Uikit Product/ButtonPredefined/ButtonDropdown/Tests/Interaction',
  component: ButtonDropdown,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ButtonDropdown>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <ButtonDropdown
              label='Period'
              size='s'
              layoutType='desktop'
              closeDroplistOnItemClick
              data-test-id={TEST_IDS.buttonDropdown}
              items={[
                { id: 'y', content: { option: 'Year' }, onClick: fn(), 'data-test-id': TEST_IDS.itemYear },
                { id: 'm', content: { option: 'Month' }, onClick: fn(), 'data-test-id': TEST_IDS.itemMonth },
              ]}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('opens droplist on click', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.buttonDropdown));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.droplist)).toBeVisible());
    });

    await step('selects item', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.itemYear));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.itemYear)).toBeNull());
    });
  },
};

export const MobileInteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <ButtonDropdown
              label='Period'
              size='s'
              layoutType='mobile'
              closeDroplistOnItemClick
              data-test-id={TEST_IDS.buttonDropdown}
              items={[
                { id: 'y', content: { option: 'Year' }, onClick: fn(), 'data-test-id': TEST_IDS.itemYear },
                { id: 'm', content: { option: 'Month' }, onClick: fn(), 'data-test-id': TEST_IDS.itemMonth },
              ]}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('mobile: opens modal on trigger click', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.buttonDropdown));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.droplist)).toBeVisible());
    });

    await step('mobile: selects item and closes modal', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.itemMonth));
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.itemMonth)).toBeNull());
    });
  },
};
