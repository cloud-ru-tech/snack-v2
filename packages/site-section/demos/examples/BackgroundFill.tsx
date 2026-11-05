import { SectionBasic } from '@ds/site-section';

export function BackgroundFill() {
  return (
    <SectionBasic
      container='new'
      background={{ fill: 'blueBackground' }}
      containerBackground={{ type: 'bg', fill: 'neutralBackground1Level' }}
      title='Облачные сервисы'
      description='Голубой внешний фон и светлая подложка блока.'
    >
      <p>Контент секции</p>
    </SectionBasic>
  );
}
