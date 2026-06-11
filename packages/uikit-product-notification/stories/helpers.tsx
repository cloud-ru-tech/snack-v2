import { SearchSVG } from '@ds/icons';
import { APPEARANCE, NotificationCard, NotificationCardProps, NotificationPanel } from '@ds/uikit-product-notification';
import { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { ACTIONS, BASE_PROPS } from './constants';

const APPEARANCES = Object.values(APPEARANCE);

/**
 * Детерминированный генератор карточек для интерактивного Playground'а панели
 * (аналог `generateCards` из snack-uikit, но без `Math.random` — чтобы скриншоты
 * и play-функции не флакали). appearance циклится, каждая 3-я — прочитанная.
 */
export function generateCards(amount: number): NotificationCardProps[] {
  return Array.from({ length: amount }, (_, i) => ({
    ...BASE_PROPS,
    id: String(i),
    appearance: APPEARANCES[i % APPEARANCES.length],
    unread: i % 3 !== 0,
    primaryButton: { label: 'Основное', onClick: fn() },
    secondaryButton: { label: 'Второстепенное', onClick: fn() },
    actions: ACTIONS,
  }));
}

type BunchParams<T> = {
  bunchSize: number;
  renderBunch: (chunk: T[], index: number) => ReactNode;
  items: T[];
};

/** Режет список на группы по `bunchSize` и рендерит каждую через `renderBunch`. */
export function bunch<T>({ bunchSize, renderBunch, items }: BunchParams<T>): ReactNode[] {
  if (bunchSize <= 0) {
    return [renderBunch(items, 0)];
  }

  const res: ReactNode[] = [];
  for (let i = 0; i < items.length; i += bunchSize) {
    res.push(renderBunch(items.slice(i, i + bunchSize), i / bunchSize));
  }

  return res;
}

type RenderContentParams = {
  cards: NotificationCardProps[];
  groupSize: number;
  stackSize: number;
  showDivider: boolean;
  stackTitle: string;
  loading?: boolean;
};

/** Собирает контент панели из карточек: stacks → groups, с опциональным divider read/unread. */
export function renderPanelContent({
  cards,
  groupSize,
  stackSize,
  showDivider,
  stackTitle,
  loading,
}: RenderContentParams): ReactNode {
  if (loading) {
    return null;
  }

  if (!cards.length) {
    return (
      <NotificationPanel.Blank
        title='Нет уведомлений'
        icon={{ icon: SearchSVG, appearance: 'neutral' }}
        description='Здесь появятся новые уведомления о событиях, когда что-то произойдёт.'
      />
    );
  }

  const renderList = (list: NotificationCardProps[]): ReactNode[] =>
    bunch({
      bunchSize: groupSize,
      items: bunch({
        bunchSize: stackSize,
        items: list.map(card => <NotificationCard key={card.id} {...card} />),
        renderBunch: (chunk, index) => (
          <NotificationPanel.Stack key={`stack-${index}`} title={stackTitle} actions={ACTIONS}>
            {chunk}
          </NotificationPanel.Stack>
        ),
      }),
      renderBunch: (chunk, index) => (
        <NotificationPanel.Group key={`group-${index}`} title={`0${index + 1}.03.2026`}>
          {chunk}
        </NotificationPanel.Group>
      ),
    });

  if (showDivider) {
    const unread = cards.filter(card => card.unread);
    const read = cards.filter(card => !card.unread);

    return (
      <>
        {renderList(unread)}
        {renderList(read)}
      </>
    );
  }

  return renderList(cards);
}
