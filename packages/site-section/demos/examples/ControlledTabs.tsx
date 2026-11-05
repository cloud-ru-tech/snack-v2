import { SectionBasic } from '@ds/site-section';
import { useState } from 'react';

const TABS = [
  { value: 'infrastructure', label: 'Создание инфраструктуры' },
  { value: 'data', label: 'Данные' },
  { value: 'ai', label: 'Искусственный интеллект' },
];

export function ControlledTabs() {
  // На странице начальное значение берётся из параметра URL, например `/catalog?tab=ai`.
  const [tab, setTab] = useState('ai');

  return (
    <SectionBasic container='new' title='Каталог' tabBarItems={TABS} tabBarValue={tab} onTabBarChange={setTab}>
      <p>Выбрана вкладка: {tab}</p>
    </SectionBasic>
  );
}
