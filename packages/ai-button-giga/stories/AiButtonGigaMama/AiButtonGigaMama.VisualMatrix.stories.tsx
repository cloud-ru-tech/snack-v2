import { AiButtonGigaMama, APPEARANCE } from '@ds/ai-button-giga';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';
const meta: Meta<typeof AiButtonGigaMama> = {
  title: 'AI/ButtonGiga/Mama',
  component: AiButtonGigaMama,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaMama>;
export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Ширина и длина подписи'
        firstColumnHeader='Ширина'
        columnHeaders={['Короткая подпись', 'Длинная подпись']}
        rows={[304, 480].map(width => ({
          variantLabel: String(width),
          cells: [
            <AiButtonGigaMama key='short' style={{ width }} label='Label text' />,
            <AiButtonGigaMama
              key='long'
              style={{ width }}
              label='Создать виртуальную машину и настроить все необходимые параметры сети и хранения данных'
            />,
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
            <AiButtonGigaMama key='default' appearance={appearance} label='Label text' />,
            <AiButtonGigaMama key='loading' appearance={appearance} label='Label text' loading />,
            <AiButtonGigaMama key='disabled' appearance={appearance} label='Label text' disabled />,
          ],
        }))}
      />
    </>
  ),
};
