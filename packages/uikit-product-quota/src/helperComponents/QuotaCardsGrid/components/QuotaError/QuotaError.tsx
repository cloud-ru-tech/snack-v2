import { Button } from '@ds/button';
import { CrossSVG, UpdateSVG } from '@ds/icons/interface/system';
import { InfoBlock } from '@ds/info-block';

import { quotaLocale } from '../../../../locale';

type QuotaErrorProps = {
  onRefresh: () => void;
};

export function QuotaError({ onRefresh }: QuotaErrorProps) {
  const { t } = quotaLocale.useTranslations();

  return (
    <InfoBlock
      size='m'
      align='vertical'
      content={t('errorText')}
      icon={{ icon: CrossSVG, appearance: 'neutral', decor: true }}
      footer={
        <Button
          appearance='neutral'
          size='m'
          label={t('errorButton')}
          icon={<UpdateSVG size={24} />}
          onClick={onRefresh}
        />
      }
    />
  );
}
