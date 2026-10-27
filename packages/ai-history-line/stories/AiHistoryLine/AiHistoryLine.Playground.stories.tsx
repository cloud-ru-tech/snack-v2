import { AiHistoryLine } from '@ds/ai-history-line';
import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolText } from '@ds/ai-tool';
import { Avatar } from '@ds/avatar';
import { BulletListSVG } from '@ds/icons/interface/system';
import { BranchSVG } from '@ds/icons/interface/web';
import { ClaudeSonnetLogo } from '@ds/icons/logos';
import { Markdown } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const REQUEST_TIME = '2 октября, 12:40';
const REQUEST_DURATION = '8 мин.';

const AGENT_PLAN = `Разобрал текущий поток. Основные изменения нужны в internal/enable/enable.go и cmd/enable.go: для существующего репозитория добавлю отдельный путь без повторного онбординга, а сценарий первого включения сохраню. Также обновлю тесты для обоих случаев.`;

const AGENT_CONFIRM = 'Внести эти изменения в код?';

const AGENT_APPLY = 'Вношу изменения и добавляю тесты.';

const AGENT_DONE = `Готово. CLI распознаёт уже настроенный репозиторий и предлагает включить хранение ссылок без повторного онбординга. Для новой настройки прежний сценарий сохранён. Добавил тесты для обоих путей и регрессии.`;

const AGENT_REVIEW = `Готово к проверке: реализовал включение хранения ссылок для существующих репозиториев и при первой настройке, обновил CLI и добавил тесты.`;

/** Ответ агента с синтаксисом Markdown — как в Figma History Line / type=Agent. */
const AGENT_MARKDOWN = `#### Heading 4

##### Heading 5

Paragraph Regular

**Paragraph Bold**

- First
- Second
- Third

1. First
2. Second
3. Third

[Текст ссылки](https://example.com)

---

\`\`\`javascript
const value = /* set from \`myEditor.getModel()\`: */ \`function hello() {
alert('Hello world!');
}\`;

// Hover on each property to see its docs!
const myEditor = monaco.editor.create(document.getElementById("container"), {
  value,
  language: "javascript",
  automaticLayout: true,
});
\`\`\`
`;

const INITIAL_INDICATOR = 'request-setup';
const CLICK_LOG_ID = 'ai-history-line-click';

function readIndicatorClick(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  const id = event.currentTarget.closest('li')?.id;
  const label = event.currentTarget.getAttribute('aria-label');

  return [id, label].filter(Boolean).join(' — ');
}

function UserMark() {
  return <Avatar name='W' size='s' shape='rounded' appearance='neutral' />;
}

function AgentMark() {
  return <ClaudeSonnetLogo size={16} aria-hidden />;
}

function ToolsMark() {
  return <BulletListSVG aria-hidden />;
}

function CheckpointMark() {
  return <BranchSVG aria-hidden />;
}

const meta: Meta<typeof AiHistoryLine> = {
  title: 'Components/AiHistoryLine/AiHistoryLine',
  component: AiHistoryLine,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiHistoryLine>;

function PlaygroundSession() {
  const [click, setClick] = useState('Кликов ещё не было');

  function selectable(id: string, label: string) {
    return {
      id,
      indicatorLabel: label,
      onIndicatorClick: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        setClick(readIndicatorClick(event));
      },
    };
  }

  return (
    <div className={styles.session}>
      <p className={styles.click} data-test-id={CLICK_LOG_ID}>
        Клик: {click}
      </p>
      <AiHistoryLine defaultValue={INITIAL_INDICATOR} data-test-id={TEST_IDS.root}>
        <AiHistoryLine.Item
          {...selectable('checkpoint-tests-123', 'Чекпоинт: сценарии')}
          indicator={<CheckpointMark />}
          firstItem
        >
          <AiHistoryLine.Checkpoint
            hash='b12cb69'
            title='Добавлены сценарии для существующего репозитория и первой настройки. Добавлены сценарии для существующего репозитория и первой настройки.'
            added={83}
            removed={26}
          />
        </AiHistoryLine.Item>
        <AiHistoryLine.Item
          {...selectable('request-setup', 'Запрос: упростить настройку хранения ссылок')}
          indicator={<UserMark />}
          indicatorBackground={false}
        >
          <AiHistoryLine.Request timestamp={REQUEST_TIME} duration={REQUEST_DURATION}>
            Упрости настройку хранения ссылок: поддержи и существующие репозитории, и первоначальную настройку.
          </AiHistoryLine.Request>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('agent-plan', 'Ответ: план изменений')} indicator={<AgentMark />}>
          <AiHistoryLine.AgentContent>
            <Markdown value={AGENT_PLAN} />
          </AiHistoryLine.AgentContent>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('tools-read', 'Вызовы инструментов')} indicator={<ToolsMark />}>
          <AiHistoryLine.Accordion id='tools-read' title='2 вызова инструментов' defaultOpen>
            <AiTool
              name='enable.go'
              icon={AI_TOOL_ICON_TYPE.Read}
              state={AI_TOOL_STATUS_STATE.Success}
              defaultOpen
              call={<AiToolText>file_path: internal/enable/enable.go</AiToolText>}
              result={<AiToolText mono={false}>Found the relevant control flow and tests for this change.</AiToolText>}
            />
            <AiTool
              name='src/pages/Sessions/index.tsx'
              icon={AI_TOOL_ICON_TYPE.Act}
              state={AI_TOOL_STATUS_STATE.Error}
            />
          </AiHistoryLine.Accordion>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('agent-markdown', 'Ответ: Markdown')} indicator={<AgentMark />}>
          <AiHistoryLine.AgentContent>
            <Markdown value={AGENT_MARKDOWN} />
          </AiHistoryLine.AgentContent>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('agent-confirm', 'Ответ: внести изменения')} indicator={<AgentMark />}>
          <AiHistoryLine.AgentContent>
            <Markdown value={AGENT_CONFIRM} />
          </AiHistoryLine.AgentContent>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item
          {...selectable('request-apply', 'Запрос: да, вноси')}
          indicator={<UserMark />}
          indicatorBackground={false}
        >
          <AiHistoryLine.Request timestamp={REQUEST_TIME} duration={REQUEST_DURATION}>
            Да, вноси
          </AiHistoryLine.Request>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item indicator={<AgentMark />}>
          <AiHistoryLine.AgentContent>
            <Markdown value={AGENT_APPLY} />
          </AiHistoryLine.AgentContent>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('tools-apply', 'Повторные вызовы инструментов')} indicator={<ToolsMark />}>
          <AiHistoryLine.Accordion id='tools-apply' title='2 вызова инструментов'>
            <AiTool name='enable.go' icon={AI_TOOL_ICON_TYPE.Read} state={AI_TOOL_STATUS_STATE.Success} />
            <AiTool
              name='src/pages/Sessions/index.tsx'
              icon={AI_TOOL_ICON_TYPE.Act}
              state={AI_TOOL_STATUS_STATE.Error}
            />
          </AiHistoryLine.Accordion>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('agent-done', 'Ответ: готово')} indicator={<AgentMark />}>
          <AiHistoryLine.AgentContent>
            <Markdown value={AGENT_DONE} />
          </AiHistoryLine.AgentContent>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item
          {...selectable('checkpoint-logic', 'Чекпоинт: логика включения')}
          indicator={<CheckpointMark />}
        >
          <AiHistoryLine.Checkpoint
            hash='b12cb69'
            title='Добавлена логика включения хранения ссылок.'
            added={183}
            removed={43}
          />
        </AiHistoryLine.Item>

        <AiHistoryLine.Item {...selectable('agent-review', 'Ответ: готово к проверке')} indicator={<AgentMark />}>
          <AiHistoryLine.AgentContent>
            <Markdown value={AGENT_REVIEW} />
          </AiHistoryLine.AgentContent>
        </AiHistoryLine.Item>

        <AiHistoryLine.Item
          {...selectable('checkpoint-tests', 'Чекпоинт: сценарии')}
          indicator={<CheckpointMark />}
          lastItem
        >
          <AiHistoryLine.Checkpoint
            hash='b12cb69'
            title='Добавлены сценарии для существующего репозитория и первой настройки. Добавлены сценарии для существующего репозитория и первой настройки.'
            added={83}
            removed={26}
          />
        </AiHistoryLine.Item>
      </AiHistoryLine>
    </div>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: () => <PlaygroundSession />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    const indicators = canvas.getAllByTestId(TEST_IDS.indicator);
    const buttons = indicators.filter(indicator => indicator.tagName === 'BUTTON');
    await expect(buttons).toHaveLength(indicators.length - 1);

    const initial = canvas.getByRole('button', { name: 'Запрос: упростить настройку хранения ссылок' });
    await expect(initial).toHaveAttribute('data-active', 'true');

    await userEvent.click(canvas.getByRole('button', { name: 'Запрос: да, вноси' }));
    await expect(canvas.getByTestId(CLICK_LOG_ID)).toHaveTextContent('request-apply — Запрос: да, вноси');
  },
};
