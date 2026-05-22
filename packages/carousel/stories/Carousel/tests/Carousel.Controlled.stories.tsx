import { Carousel } from '@ds/carousel';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const PARENT_STATE_TEST_ID = 'carousel-parent-state';

function ControlledRender() {
  const [page, setPage] = useState(0);
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>{'Внешний state контролирует страницу карусели; клики синхронизируются с родителем.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.container}>
            <div data-test-id={PARENT_STATE_TEST_ID}>{page}</div>
            <Carousel
              data-test-id={TEST_IDS.root}
              showItems={1}
              arrows
              pagination
              controlsVisibility='always'
              state={{ page, onChange: setPage }}
            >
              <div className={`${styles.slide} ${styles.slideIndigo}`}>Slide 1</div>
              <div className={`${styles.slide} ${styles.slideSky}`}>Slide 2</div>
              <div className={`${styles.slide} ${styles.slideEmerald}`}>Slide 3</div>
            </Carousel>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel/Tests/Controlled',
  component: Carousel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <ControlledRender />,
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Controlled: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const parentState = canvas.getByTestId(PARENT_STATE_TEST_ID);

    await step('initial: parent state shows page 0', async () => {
      expect(parentState.textContent).toBe('0');
    });

    await step('click: next arrow updates parent state to 1', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrowNext));
      await waitFor(() => expect(parentState.textContent).toBe('1'));
    });

    await step('click: next arrow again updates parent state to 2', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrowNext));
      await waitFor(() => expect(parentState.textContent).toBe('2'));
    });
  },
};
