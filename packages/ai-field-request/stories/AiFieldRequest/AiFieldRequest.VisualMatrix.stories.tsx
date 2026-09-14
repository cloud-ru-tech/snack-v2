import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiFieldRequest> = {
  title: 'Ai/AiFieldRequest',
  component: AiFieldRequest,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiFieldRequest>;

const SHORT_CONTENT = 'Диски будут удалены вместе с машиной.';
const LONG_CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Дополнительное описание действия занимает несколько строк и используется для проверки раскрытия длинного текста в свёрнутом и развёрнутом состояниях. Ещё один абзац с нейтральным содержимым без привязки к предметной области. Третий абзац нужен, чтобы содержимое переполняло предел по высоте и на широком экране: тогда кнопка «Показать» появляется в любой ширине карточки, а не только в узкой.';

const baseProps = {
  title: 'Удалить виртуальную машину?',
  primaryAction: { label: 'Подтвердить' },
  secondaryAction: { label: 'Отмена' },
  hint: 'Подсказка под панелью',
} as const;

type CellProps = Parameters<typeof AiFieldRequest>[0] & { testId: string };

// Владелец состояния раскрытия: без него `open` делает ячейку контролируемой и «Скрыть» не работает.
function Cell({ open: initialOpen = false, testId, ...props }: CellProps): ReactElement {
  const [open, setOpen] = useState(initialOpen);

  return (
    <AiFieldRequest {...props} open={open} onOpenChange={setOpen} className={styles.matrixCell} data-test-id={testId} />
  );
}

function renderCell(props: Parameters<typeof AiFieldRequest>[0], testId: string): ReactElement {
  return <Cell {...props} testId={testId} />;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        className={styles.matrixSection}
        sectionTitle='Appearance × Expanded'
        firstColumnHeader='Appearance'
        columnHeaders={['Collapsed', 'Expanded', 'Loading']}
        rows={Object.values(APPEARANCE).map(appearance => ({
          variantLabel: appearance,
          cells: [
            renderCell({ ...baseProps, appearance, content: LONG_CONTENT }, `${TEST_IDS.root}-${appearance}-collapsed`),
            renderCell(
              { ...baseProps, appearance, content: LONG_CONTENT, open: true },
              `${TEST_IDS.root}-${appearance}-expanded`,
            ),
            renderCell(
              {
                ...baseProps,
                appearance,
                content: SHORT_CONTENT,
                primaryAction: { label: 'Подтвердить', loading: true },
              },
              `${TEST_IDS.root}-${appearance}-loading`,
            ),
          ],
        }))}
      />
      <StoryTable
        className={styles.matrixSection}
        sectionTitle='Collapsed maxHeight'
        firstColumnHeader='maxHeight'
        columnHeaders={['Collapsed']}
        rows={[
          {
            variantLabel: '88',
            cells: [
              renderCell({ ...baseProps, content: LONG_CONTENT, maxHeight: 88 }, `${TEST_IDS.root}-max-height-88`),
            ],
          },
          {
            variantLabel: '44',
            cells: [
              renderCell({ ...baseProps, content: LONG_CONTENT, maxHeight: 44 }, `${TEST_IDS.root}-max-height-44`),
            ],
          },
        ]}
      />
    </>
  ),
};
