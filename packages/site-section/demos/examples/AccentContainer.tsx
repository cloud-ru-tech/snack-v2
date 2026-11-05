import { SectionBasic } from '@ds/site-section';

export function AccentContainer() {
  return (
    <SectionBasic
      container='new'
      containerBackground={{ type: 'accent' }}
      title='Облачные сервисы'
      description='Блок по ширине container залит акцентным цветом бренда.'
    >
      <p>Контент секции</p>
    </SectionBasic>
  );
}
