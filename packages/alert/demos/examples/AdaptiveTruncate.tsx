import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Alert } from '@ds/alert';

const LONG_TITLE = 'Плановые технические работы в дата-центре: часть сервисов будет недоступна с 02:00 до 04:00 МСК';

export function AdaptiveTruncate() {
  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
      <div style={{ maxWidth: 360 }}>
        <Alert appearance='info' title={LONG_TITLE} description='На узком экране заголовок усекается в две строки.' />
      </div>
    </AdaptiveProvider>
  );
}
