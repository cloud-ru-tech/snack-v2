import { AiButtonGigaOutline, APPEARANCE, ICON_POSITION, SIZE } from '@ds/ai-button-giga';
import { PlusSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';
const meta: Meta<typeof AiButtonGigaOutline> = {
  title: 'AI/ButtonGiga/Outline',
  component: AiButtonGigaOutline,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaOutline>;
const compositions = [
  { key: 'icon-before', props: { label: 'Label text', iconPosition: ICON_POSITION.Before } },
  { key: 'icon-after', props: { label: 'Label text', iconPosition: ICON_POSITION.After } },
  { key: 'label-only', props: { label: 'Label text', icon: null } },
  { key: 'icon-only', props: { 'aria-label': 'Создать ресурс' } },
] as const;
export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Размер и композиция'
        firstColumnHeader='Размер'
        columnHeaders={compositions.map(c => c.key)}
        rows={Object.values(SIZE).map(size => ({
          variantLabel: size,
          cells: compositions.map(c => <AiButtonGigaOutline key={c.key} size={size} {...c.props} />),
        }))}
      />
      <StoryTable
        sectionTitle='Сменная иконка'
        firstColumnHeader='Размер'
        columnHeaders={['Иконка слева', 'Иконка справа', 'Загрузка']}
        rows={Object.values(SIZE).map(size => ({
          variantLabel: size,
          cells: [
            <AiButtonGigaOutline key='before' size={size} label='Label text' icon={<PlusSVG />} />,
            <AiButtonGigaOutline
              key='after'
              size={size}
              label='Label text'
              icon={<PlusSVG />}
              iconPosition={ICON_POSITION.After}
            />,
            <AiButtonGigaOutline key='loading' size={size} label='Label text' icon={<PlusSVG />} loading />,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Загрузка сохраняет композицию и ширину'
        firstColumnHeader='Композиция'
        columnHeaders={['Обычная', 'Загрузка']}
        rows={compositions.map(c => ({
          variantLabel: c.key,
          cells: [
            <AiButtonGigaOutline key='default' {...c.props} />,
            <AiButtonGigaOutline key='loading' {...c.props} loading />,
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
            <AiButtonGigaOutline key='default' appearance={appearance} label='Label text' />,
            <AiButtonGigaOutline key='loading' appearance={appearance} label='Label text' loading />,
            <AiButtonGigaOutline key='disabled' appearance={appearance} label='Label text' disabled />,
          ],
        }))}
      />
    </>
  ),
};
