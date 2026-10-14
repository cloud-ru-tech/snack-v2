import { AdaptiveProvider, LAYOUT_TYPE } from '@ds/adaptive';
import { Button } from '@ds/button';
import { DownloadSVG, PlaceholderSVG, SettingsSVG } from '@ds/icons/interface/system';
import { Toolbar } from '@ds/toolbar';
import { useState } from 'react';

import { MobilePreview } from '../MobilePreview';

export function PinnedAfter() {
  const [search, setSearch] = useState('');

  return (
    <MobilePreview>
      <AdaptiveProvider layoutType={LAYOUT_TYPE.Mobile}>
        <Toolbar
          search={{ value: search, onChange: setSearch, placeholder: 'Поиск' }}
          moreActions={[{ content: { label: 'Экспорт' }, onClick: () => undefined }]}
          pinnedAfter={[
            <Button
              key='download'
              view='function'
              size='m'
              icon={<DownloadSVG />}
              aria-label='Скачать'
              onClick={() => undefined}
            />,
            <Button
              key='settings'
              view='function'
              size='m'
              icon={<SettingsSVG />}
              aria-label='Настройки'
              onClick={() => undefined}
            />,
          ]}
          after={
            <Button
              view='function'
              size='m'
              icon={<PlaceholderSVG />}
              label='Дополнительно'
              onClick={() => undefined}
            />
          }
        />
      </AdaptiveProvider>
    </MobilePreview>
  );
}
