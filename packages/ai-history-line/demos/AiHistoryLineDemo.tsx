import { AiHistoryLine } from '@ds/ai-history-line';
import { Avatar } from '@ds/avatar';
import { BranchSVG } from '@ds/icons/interface/web';

export function AiHistoryLineDemo() {
  return (
    <AiHistoryLine defaultValue='request-setup'>
      <AiHistoryLine.Item
        id='request-setup'
        indicatorLabel='Запрос: упростить настройку хранения ссылок'
        indicator={<Avatar name='W' size='s' shape='rounded' appearance='neutral' />}
        indicatorBackground={false}
        firstItem
      >
        <AiHistoryLine.Request timestamp='2 октября, 12:40' duration='8 мин.'>
          Упрости настройку хранения ссылок: поддержи и существующие репозитории, и первоначальную настройку.
        </AiHistoryLine.Request>
      </AiHistoryLine.Item>
      <AiHistoryLine.Item
        id='checkpoint-tests'
        indicatorLabel='Чекпоинт: сценарии'
        indicator={<BranchSVG aria-hidden />}
        lastItem
      >
        <AiHistoryLine.Checkpoint
          hash='b12cb69'
          title='Добавлены сценарии для существующего репозитория и первой настройки.'
          added={83}
          removed={26}
        />
      </AiHistoryLine.Item>
    </AiHistoryLine>
  );
}
