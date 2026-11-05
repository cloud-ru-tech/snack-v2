import { SectionBasic } from '@ds/site-section';

export function ContainerTheme() {
  return (
    <SectionBasic
      container='new'
      background={{ theme: { colorScheme: 'light' } }}
      containerBackground={{ type: 'bg', theme: { colorScheme: 'dark' } }}
      title='Облачные сервисы'
      description='Блок по ширине container тёмный, внешний фон остаётся светлым.'
      tabBarItems={[
        { value: 'infrastructure', label: 'Инфраструктура' },
        { value: 'data', label: 'Данные' },
      ]}
    >
      <p>Контент секции</p>
    </SectionBasic>
  );
}
