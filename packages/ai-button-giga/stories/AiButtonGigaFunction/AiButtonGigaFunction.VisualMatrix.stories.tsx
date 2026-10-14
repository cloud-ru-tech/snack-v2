import { AiButtonGigaFunction, APPEARANCE, SIZE } from '@ds/ai-button-giga';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';
const meta: Meta<typeof AiButtonGigaFunction> = {
  title: 'AI/ButtonGiga/Function',
  component: AiButtonGigaFunction,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaFunction>;
export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Размер и подпись'
        firstColumnHeader='Размер'
        columnHeaders={['С подписью', 'Без подписи']}
        rows={Object.values(SIZE).map(size => ({
          variantLabel: size,
          cells: [
            <AiButtonGigaFunction key='label' size={size} label='Label text' />,
            <AiButtonGigaFunction key='icon' size={size} aria-label='Создать ресурс' />,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Оформление и состояние'
        firstColumnHeader='Оформление'
        columnHeaders={['Обычная', 'Загрузка', 'Недоступная']}
        rows={Object.values(APPEARANCE).map(appearance => ({
          variantLabel: appearance,
          cells: [
            <AiButtonGigaFunction key='default' appearance={appearance} label='Label text' />,
            <AiButtonGigaFunction key='loading' appearance={appearance} label='Label text' loading />,
            <AiButtonGigaFunction key='disabled' appearance={appearance} label='Label text' disabled />,
          ],
        }))}
      />
    </>
  ),
};
