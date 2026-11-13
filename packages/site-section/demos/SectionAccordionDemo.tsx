import { SectionAccordion } from '@ds/site-section';

const ITEMS = [
  { title: 'Как списывается оплата?', description: 'Раз в час по факту потребления.' },
  { title: 'В каких регионах доступно?', description: 'В Москве, Санкт-Петербурге и Казахстане.' },
];

export function SectionAccordionDemo() {
  return (
    <SectionAccordion
      title='Ответы на вопросы'
      items={ITEMS}
      expandedDefault={[`accordion-item-${ITEMS[0].title}-0`]}
    />
  );
}
