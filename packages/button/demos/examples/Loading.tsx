import { Button } from '@ds/button';
import { DownloadSVG } from '@ds/icons/interface/system';

export function Loading() {
  return <Button appearance='primary' view='filled' icon={<DownloadSVG />} label='Скачать отчёт' loading />;
}
