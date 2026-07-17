import { Button } from '@ds/button';
import { FileSVG } from '@ds/icons/interface/system';

type LlmsLinkProps = {
  /** Ссылка на .txt-файл (без хвостового слеша). */
  href: string;
  label?: string;
};

/** Ссылка на `llms.txt` пакета — DS-кнопка (`@ds/button`) как anchor с иконкой. */
export function LlmsLink({ href, label = 'llms.txt' }: LlmsLinkProps) {
  return (
    <Button
      as='a'
      href={href}
      target='_blank'
      rel='noopener'
      view='outline'
      appearance='neutral'
      size='s'
      icon={<FileSVG />}
      label={label}
      title='Машиночитаемое описание для LLM: установка, API, примеры'
    />
  );
}
