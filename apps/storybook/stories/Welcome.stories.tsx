import { BookSVG, HandshakeSVG, RobotSVG } from '@ds/icons/interface/web';
import { GitHubLogo } from '@ds/icons/logos';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, ReactNode } from 'react';

import { EXTERNAL_LINKS } from '../../docs/src/config/external-links';
import styles from './Welcome.module.scss';

// Storybook в проде отдаётся из подпапки `/<base>/storybook/`, документация — уровнем выше,
// поэтому в собранной статике на неё ведёт относительный путь. В dev документация живёт
// на своём порту (`astro dev`), относительный путь указал бы на сам Storybook.
const DOCS_DEV_URL = 'http://localhost:4321/';
const docsUrl = (path = ''): string => `${import.meta.env.DEV ? DOCS_DEV_URL : '../'}${path}`;

const ICON_SIZE = 24;

type LinkCard = {
  title: string;
  text: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
};

const CARDS: LinkCard[] = [
  {
    title: 'Документация',
    text: 'Гайдлайны, анатомия компонентов, props и живые примеры использования.',
    href: docsUrl(),
    Icon: BookSVG,
  },
  {
    title: 'Contribution Guide',
    text: 'Как завести пакет, писать stories и тесты, что проверяет ревью.',
    href: docsUrl('patterns/contribution-guide/'),
    Icon: HandshakeSVG,
  },
  {
    title: 'GitHub',
    text: 'Исходный код монорепозитория, issues и merge requests.',
    href: EXTERNAL_LINKS.repo,
    Icon: GitHubLogo,
  },
  {
    title: 'llms.txt',
    text: 'Индекс документации для LLM — по пакету и по всей дизайн-системе.',
    href: docsUrl('llms.txt'),
    Icon: RobotSVG,
  },
];

function WelcomePage(): ReactNode {
  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <h1 className={styles.title}>Design System</h1>
        <p className={styles.lead}>
          Библиотека React-компонентов Cloud.ru и сообщества TeamSnack. Здесь, в Storybook, живут интерактивные
          песочницы: выберите компонент в сайдбаре слева, покрутите пропсы в панели Controls, переключите тему, бренд,
          плотность и раскладку в тулбаре сверху.
        </p>
      </section>

      <div className={styles.grid}>
        {CARDS.map(({ title, text, href, Icon }) => (
          <a key={title} className={styles.card} href={href} target='_blank' rel='noopener noreferrer'>
            <span className={styles.cardIcon}>
              <Icon size={ICON_SIZE} />
            </span>
            <h2 className={styles.cardTitle}>{title}</h2>
            <p className={styles.cardText}>{text}</p>
          </a>
        ))}
      </div>

      <p className={styles.hint}>
        У каждого компонента есть Playground (интерактивные контролы) и VisualMatrix (все оси и состояния одной сеткой).
        Панель Readme под превью показывает документацию пакета.
      </p>
    </div>
  );
}

const meta: Meta<typeof WelcomePage> = {
  title: 'Introduction/Welcome',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    figma: { disable: true },
    readme: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof WelcomePage>;

export const Welcome: Story = {
  tags: ['dev'],
  render: () => <WelcomePage />,
};
